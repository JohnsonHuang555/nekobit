package repository

import (
	"errors"
	"go-server/domain"
	"time"

	uuid "github.com/gofrs/uuid"
)

type roomRepository struct {
	rooms []*domain.Room
}

func NewRoomRepository(rooms []*domain.Room) domain.RoomRepository {
	return &roomRepository{rooms}
}

func (rr *roomRepository) FindAll() []*domain.Room {
	return rr.rooms
}

func (rr *roomRepository) FindByID(id string) (*domain.Room, error) {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return nil, errors.New("No room found")
	}
	return rr.rooms[index], nil
}

func (rr *roomRepository) Create(r *domain.Room) (string, error) {
	r.ID = uuid.Must(uuid.NewV4()).String()
	r.Status = domain.Preparing
	r.CreatedAt = time.Now()
	r.NowTurn = ""
	r.Players = []*domain.Player{}
	rr.rooms = append(rr.rooms, r)
	return r.ID, nil
}

func (rr *roomRepository) DeleteByID(id string) error {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return errors.New("No room found")
	}

	rr.rooms = append(rr.rooms[:index], rr.rooms[index+1:]...)
	return nil
}

func (rr *roomRepository) UpdateByID(id string, r *domain.Room) error {
	index := rr.findRoomIndexByID(id)
	if index == -1 {
		return errors.New("No room found")
	}

	rr.rooms[index] = r
	return nil
}

func (rr *roomRepository) FindAllPlayers(rid string) []*domain.Player {
	index := rr.findRoomIndexByID(rid)
	if index == -1 {
		return nil
	}

	return rr.rooms[index].Players
}

func (rr *roomRepository) FindPlayerByID(rid string, pid string) (*domain.Player, error) {
	roomIndex := rr.findRoomIndexByID(rid)
	if roomIndex == -1 {
		return nil, errors.New("No room found")
	}

	playerIndex := rr.findPlayerIndexByID(pid, roomIndex)
	if playerIndex == -1 {
		return nil, errors.New("No user found")
	}

	return rr.rooms[roomIndex].Players[playerIndex], nil
}

func (rr *roomRepository) CreatePlayer(rid string, p *domain.Player) error {
	roomIndex := rr.findRoomIndexByID(rid)
	if roomIndex == -1 {
		return errors.New("No room found")
	}

	rr.rooms[roomIndex].Players = append(rr.rooms[roomIndex].Players, p)
	return nil
}

func (rr *roomRepository) DeletePlayerByID(rid string, pid string) error {
	roomIndex := rr.findRoomIndexByID(rid)
	if roomIndex == -1 {
		return errors.New("No room found")
	}

	playerIndex := rr.findPlayerIndexByID(pid, roomIndex)
	if playerIndex == -1 {
		return errors.New("No user found")
	}

	players := rr.rooms[roomIndex].Players
	players = append(players[:playerIndex], players[playerIndex+1:]...)
	return nil
}

func (rr *roomRepository) UpdatePlayerByID(rid string, pid string, p *domain.Player) error {
	roomIndex := rr.findRoomIndexByID(rid)
	if roomIndex == -1 {
		return errors.New("No room found")
	}

	playerIndex := rr.findPlayerIndexByID(pid, roomIndex)
	if playerIndex == -1 {
		return errors.New("No user found")
	}

	rr.rooms[roomIndex].Players[playerIndex] = p
	return nil
}

// private methods
func (rr *roomRepository) findRoomIndexByID(id string) int {
	// for each
	index := -1
	for i := 0; i < len(rr.rooms); i++ {
		if rr.rooms[i].ID == id {
			// found
			index = i
		}
	}
	return index
}

func (rr *roomRepository) findPlayerIndexByID(playerID string, roomIndex int) int {
	players := rr.rooms[roomIndex].Players
	index := -1
	for i := 0; i < len(players); i++ {
		if players[i].ID == playerID {
			index = i
		}
	}
	return index
}
