package controllers

import (
	"context"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/bson/primitive"

	"server/models"
)

// GetAllGames from the DB and return it
func GetAllGames(collection *mongo.Collection) []models.Game {
	cur, err := collection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	var results []models.Game
	for cur.Next(context.Background()) {
		var result models.Game
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

// GetGameInfo a
func GetGameInfo(collection *mongo.Collection, gameID string) models.Game {
	var game models.Game
	id, _ := primitive.ObjectIDFromHex(gameID)
	filter := bson.M{"_id": id}
	err := collection.FindOne(context.Background(), filter).Decode(&game)
	if err != nil {
		log.Fatal(err)
	}
	return game
}
