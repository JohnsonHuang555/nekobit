package roomModel

import "go.mongodb.org/mongo-driver/bson/primitive"

type user struct {
	Id string
	Name string
	IsMaster bool
	IsReady bool
	PlayOrder int
}

type Room struct {
	ID            primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	UserList		  []user
	Title				  string
	Password		  string
	Mode				  int
	IsLock			  bool
	CurrentPlayer int
	MaxPlayers    int
	CreatedDate   string
	NowTurn				int
	GameStatus		int
	GameName      string
}