package repository

import (
	"context"
	"log"
	"server/domain/model"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type gameRepository struct {
	db *mongo.Collection
}

type GameRepository interface {
	FindAll(g []*model.Game) ([]*model.Game, error)
}

func NewGameRepository(db *mongo.Collection) GameRepository {
	return &gameRepository{db}
}

func (gr *gameRepository) FindAll(g []*model.Game) ([]*model.Game, error) {
	cur, err := gr.db.Find(context.Background(), bson.M{})
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
