package repository

import (
	"database/sql"
	"go-server/domain"

	"github.com/lib/pq"
	"github.com/sirupsen/logrus"
)

// 檔名 camelCase + featureName + Repository
type postgreSqlGameRepository struct {
	db *sql.DB
}

// NewpostgreSqlGameRepository
func NewpostgreSqlGameRepository(db *sql.DB) domain.GameRepository {
	return &postgreSqlGameRepository{db}
}

func (p *postgreSqlGameRepository) fetch(query string) (result []*domain.Game, err error) {
	rows, err := p.db.Query(query)
	if err != nil {
		logrus.Error(err)
		return nil, err
	}

	defer func() {
		errRow := rows.Close()
		if errRow != nil {
			logrus.Error(errRow)
		}
	}()

	result = make([]*domain.Game, 0)
	for rows.Next() {
		t := &domain.Game{}
		err = rows.Scan(
			&t.ID,
			&t.Name,
			(*pq.StringArray)(&t.Modes),
			&t.GamePack,
			&t.MinPlayers,
			&t.MaxPlayers,
			&t.Brief,
			&t.Description,
			&t.ImgURL,
			&t.EstimateTime,
			&t.UpdatedAt,
			&t.CreatedAt,
		)

		if err != nil {
			logrus.Error(err)
			return nil, err
		}
		result = append(result, t)
	}

	return result, nil
}

func (p *postgreSqlGameRepository) FindAll() (res []*domain.Game, err error) {
	query := `SELECT * FROM game`
	res, err = p.fetch(query)

	if err != nil {
		logrus.Error(err)
		return nil, err
	}

	return res, nil
}

func (p *postgreSqlGameRepository) FindOneByID(gamePack string) (res *domain.Game, err error) {
	query := "SELECT * FROM game WHERE game_pack ='" + gamePack + "'"
	list, err := p.fetch(query)

	if err != nil {
		return nil, err
	}

	if len(list) > 0 {
		res = list[0]
	} else {
		return res, domain.ErrNotFound
	}

	return res, nil
}
