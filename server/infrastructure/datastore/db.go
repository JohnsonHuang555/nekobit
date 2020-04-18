package datastore

import (
	"context"
	"fmt"
	"log"

	"server/config"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type DbCollection struct {
	GameCollection *mongo.Collection
	RoomCollection *mongo.Collection
}

func NewDB() *DbCollection {
	// Set client options
	clientOptions := options.Client().ApplyURI(config.C.Database.ConnectionString)

	// connect to MongoDB
	client, err := mongo.Connect(context.TODO(), clientOptions)

	if err != nil {
		log.Fatal(err)
	}

	// Check the connection
	err = client.Ping(context.TODO(), nil)

	if err != nil {
		log.Fatal(err)
	}

	GameCollection := client.Database(config.C.Database.DBName).Collection("Game")
	RoomCollection := client.Database(config.C.Database.DBName).Collection("Room")

	fmt.Println("Connected to MongoDB!!")

	return &DbCollection{
		GameCollection,
		RoomCollection,
	}
}
