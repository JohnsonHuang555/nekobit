package service

import (
	"server/domain/repository"
)

type RoomService struct {
	repo repository.RoomRepository
}

func NewRoomService(repo repository.RoomRepository) *RoomService {
	return &RoomService{
		repo: repo,
	}
}
