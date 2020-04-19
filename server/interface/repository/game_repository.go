package repository

import (
	"context"
	"log"
	"server/domain/model"
	"server/infrastructure/datastore"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type gameRepository struct {
	db *datastore.DbCollection
}

type GameRepository interface {
	FindAll(g []*model.Game) ([]*model.Game, error)
	FindOne(id string) (*model.Game, error)
}

func NewGameRepository(db *datastore.DbCollection) GameRepository {
	return &gameRepository{db}
}

// FindAll is an actual implementation of the interface in usecase/repository/game_repository.go
func (gr *gameRepository) FindAll(g []*model.Game) ([]*model.Game, error) {
	cur, err := gr.db.GameCollection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.Background()) {
		var result *model.Game
		e := cur.Decode(&result)
		if e != nil {
			log.Fatal(e)
		}
		g = append(g, result)
	}

	if err := cur.Err(); err != nil {
		log.Fatal(err)
		return g, err
	}

	cur.Close(context.Background())
	return g, nil
}

func (gr *gameRepository) FindOne(id string) (*model.Game, error) {
	var game *model.Game
	gameID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": gameID}
	err := gr.db.GameCollection.FindOne(context.Background(), filter).Decode(&game)

	if err != nil {
		log.Fatal(err)
	}

	return game, err
}
