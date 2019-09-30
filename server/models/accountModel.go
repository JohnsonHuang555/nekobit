package accountModel

import "go.mongodb.org/mongo-driver/bson/primitive"

// Account schema structure
type Account struct {
	ID       primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	Account  string             `json:"account,omitempty"`
	Name     string             `json:"name,omitempty"`
	Password string             `json:"password,omitempty"`
}
