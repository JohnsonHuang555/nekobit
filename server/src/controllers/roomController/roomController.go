package roomcontroller

import (
	"context"
	"log"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"

	"models/roomModel"
)

// GetAllGames from the DB and return it
func GetRooms(collection *mongo.Collection, gameName string) []roomModel.Room {
	cur, err := collection.Find(context.Background(), bson.M{"gamename": gameName})
	if err != nil {
		log.Fatal(err)
	}

	var results []roomModel.Room
	for cur.Next(context.Background()) {
		var result roomModel.Room
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

func GetRoomInfo(collection *mongo.Collection, roomId string) roomModel.Room {
	var room roomModel.Room
	id, _ := primitive.ObjectIDFromHex(roomId)
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.Background(), filter).Decode(&room)
	if err != nil {
		log.Fatal(err)
	}
	return room
}

func CreateRoom(collection *mongo.Collection, room roomModel.Room) {
	createResult, err := collection.InsertOne(context.Background(), room)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Create room", createResult.InsertedID)
}