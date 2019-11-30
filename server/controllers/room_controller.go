package controllers

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"

	"server/models"
)

// GetRooms from the DB and return it
func GetRooms(collection *mongo.Collection, gameID string) []models.Room {
	cur, err := collection.Find(context.Background(), bson.M{"gameid": gameID})
	if err != nil {
		log.Fatal(err)
	}

	var results []models.Room
	for cur.Next(context.Background()) {
		var result models.Room
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		results = append(results, result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
	}

	cur.Close(context.Background())
	return results
}

type roomInfo struct {
	room models.Room
	game models.Game
}

// GetRoomInfo get room info
func GetRoomInfo(roomCollection *mongo.Collection, gameCollection *mongo.Collection,  roomID string) interface{} {
	var room models.Room
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id}
	err := roomCollection.FindOne(context.Background(), filter).Decode(&room)
	if err != nil {
		log.Fatal(err)
	}

	var game models.Game

	gameID, _ := primitive.ObjectIDFromHex(room.GameID)
	gameFilter := bson.M{"_id": gameID}
	gameErr := gameCollection.FindOne(context.Background(), gameFilter).Decode(&game)
	if gameErr != nil {
		log.Fatal(err)
	}

	data := struct {
		models.Room
		models.Game
	}{room, game}

	return data
}

// CreateRoom create a room
func CreateRoom(collection *mongo.Collection, room models.Room) interface{} {
	room.CurrentPlayer = 1
	createResult, err := collection.InsertOne(context.Background(), room)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Create room", createResult.InsertedID)
	return createResult.InsertedID
}

// JoinRoom websocket
func JoinRoom(collection *mongo.Collection, user interface{}, roomID string) (models.Room, error) {
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id}
	update := bson.M{"$push": bson.M{"userlist": user}, "$inc": bson.M{"currentplayer": 1}}
	upsert := true
	after := options.After
	opt := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
		Upsert:         &upsert,
	}

	result := collection.FindOneAndUpdate(context.Background(), filter, update, &opt)
	if result.Err() != nil {
		log.Fatal(result.Err())
	}

	var room models.Room
	decodeErr := result.Decode(&room)

	return room, decodeErr
}

// SetGameReady websocket
func SetGameReady(collection *mongo.Collection, roomID string, userId string, isReady bool) {
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id, "userlist.id": userId}
	update := bson.M{"$set": bson.M{"userlist.$.isready": !isReady}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("set game ready", result.ModifiedCount)
}

func SetGameStart(collection *mongo.Collection, roomID string) {
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id}
	update := bson.M{"$set": bson.M{"gamestatus": 1}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("set game start", result.ModifiedCount)
}

// LeaveRoom websocket
func LeaveRoom(collection *mongo.Collection, userId string, roomID string,) (models.Room, error) {
	fmt.Println(userId)
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id}
	update := bson.M{"$pull": bson.M{"userlist": bson.M{"id": userId}}, "$inc": bson.M{"currentplayer": -1}}
	upsert := true
	after := options.After
	opt := options.FindOneAndUpdateOptions{
		ReturnDocument: &after,
		Upsert:         &upsert,
	}

	result := collection.FindOneAndUpdate(context.Background(), filter, update, &opt)
	if result.Err() != nil {
		log.Fatal(result.Err())
	}

	var room models.Room
	decodeErr := result.Decode(&room)

	return room, decodeErr
}