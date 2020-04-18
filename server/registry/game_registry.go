package registry

import (
	"server/interface/controller"
	ip "server/interface/presenter"
	ir "server/interface/repository"
	"server/usecase/interactor"
	up "server/usecase/presenter"
	ur "server/usecase/repository"
)

func (r *registry) NewGameController() controller.GameController {
	return controller.NewGameController(r.NewGameInteractor())
}

func (r *registry) NewGameInteractor() interactor.GameInteractor {
	return interactor.NewGameInteractor(r.NewGameRepository(), r.NewGamePresenter())
}

func (r *registry) NewGameRepository() ur.GameRepository {
	return ir.NewGameRepository(r.db)
}

func (r *registry) NewGamePresenter() up.GamePresenter {
	return ip.NewGamePresenter()
}
