package repository

import (
	"context"
	"log"
	"server/domain"
	"server/infrastructure/datastore"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
)

type gameRepository struct {
	db *datastore.DbCollection
}

// NewGameRepository well create an object theat represent the game.Repository interface
func NewGameRepository(db *datastore.DbCollection) domain.GameRepository {
	return &gameRepository{db}
}

func (gr *gameRepository) FindAll(g []*domain.Game) ([]*domain.Game, error) {
	cur, err := gr.db.GameCollection.Find(context.Background(), bson.M{})
	if err != nil {
		log.Fatal(err)
	}

	for cur.Next(context.Background()) {
		var result *domain.Game
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

func (gr *gameRepository) FindOne(id string) (*domain.Game, error) {
	var game *domain.Game
	gameID, _ := primitive.ObjectIDFromHex(id)
	filter := bson.M{"_id": gameID}
	err := gr.db.GameCollection.FindOne(context.Background(), filter).Decode(&game)

	if err != nil {
		log.Fatal(err)
	}

	return game, err
}
