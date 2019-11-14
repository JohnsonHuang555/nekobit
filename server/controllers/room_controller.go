package controllers

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"server/models"
)

// GetRooms from the DB and return it
func GetRooms(collection *mongo.Collection, gameName string) []models.Room {
	cur, err := collection.Find(context.Background(), bson.M{"gamename": gameName})
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

// GetRoomInfo get room info
func GetRoomInfo(collection *mongo.Collection, roomID string) models.Room {
	var room models.Room
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.Background(), filter).Decode(&room)
	if err != nil {
		log.Fatal(err)
	}
	return room
}

// CreateRoom create a room
func CreateRoom(collection *mongo.Collection, room models.Room) interface{} {
	createResult, err := collection.InsertOne(context.Background(), room)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Create room", createResult.InsertedID)
	return createResult.InsertedID
}

func JoinRoom(collection *mongo.Collection, user models.User, roomID string) bool {
	id, _ := primitive.ObjectIDFromHex(roomID)
	filter := bson.M{"_id": id}
	update := bson.M{"$push": bson.M{"userlist": user}}
	result, err := collection.UpdateOne(context.Background(), filter, update)
	if err != nil {
		log.Fatal(err)
		return false
	}

	fmt.Println("join room", result.ModifiedCount)
	return true
}
