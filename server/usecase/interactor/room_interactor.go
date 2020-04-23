package interactor

import (
	"server/domain/model"
	"server/usecase/presenter"
	"server/usecase/repository"
)

type roomInteractor struct {
	RoomRepository repository.RoomRepository
	RoomPresenter  presenter.RoomPresenter
}

type RoomInteractor interface {
	Get(r []*model.Room) ([]*model.Room, error)
	GetOne(id string) (*model.Room, error)
	DeleteOne(id string) error
	UpdateOne(id string, room *model.Room) (*model.Room, error)
	AddOne(title string, mode int, password string, gameID string) error
}

func NewRoomInteractor(r repository.RoomRepository, p presenter.RoomPresenter) RoomInteractor {
	return &roomInteractor{r, p}
}

func (ri *roomInteractor) Get(r []*model.Room) ([]*model.Room, error) {
	r, err := ri.RoomRepository.FindAll(r)
	if err != nil {
		return nil, err
	}

	return ri.RoomPresenter.ResponseRooms(r), nil
}

func (ri *roomInteractor) GetOne(id string) (*model.Room, error) {
	var r *model.Room
	r, err := ri.RoomRepository.FindByID(id)
	if err != nil {
		return r, err
	}

	return ri.RoomPresenter.ResponseOneRoom(r), err
}

func (ri *roomInteractor) DeleteOne(id string) error {
	err := ri.RoomRepository.DeleteByID(id)
	return err
}

func (ri *roomInteractor) UpdateOne(id string, room *model.Room) (*model.Room, error) {
	var r *model.Room
	r, err := ri.RoomRepository.UpdateByID(id, room)
	if err != nil {
		return r, err
	}

	return ri.RoomPresenter.ResponseOneRoom(r), err
}

// AddOne 新建房間
func (ri *roomInteractor) AddOne(title string, mode int, password string, gameID string) error {
	err := ri.RoomRepository.Create(title, mode, password, gameID)
	return err
}
