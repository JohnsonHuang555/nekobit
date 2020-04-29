package registry

import (
	"server/interface/controller"
	ip "server/interface/presenter"
	ir "server/interface/repository"
	"server/usecase/interactor"
	up "server/usecase/presenter"
	ur "server/usecase/repository"
)

func (r *registry) NewRoomController() controller.RoomController {
	return controller.NewRoomController(r.NewRoomInteractor())
}

func (r *registry) NewRoomInteractor() interactor.RoomInteractor {
	return interactor.NewRoomInteractor(r.NewRoomRepository(), r.NewRoomPresenter())
}

func (r *registry) NewRoomRepository() ur.RoomRepository {
	return ir.NewRoomRepository(r.rooms, r.roomNum)
}

func (r *registry) NewRoomPresenter() up.RoomPresenter {
	return ip.NewRoomPresenter()
}
