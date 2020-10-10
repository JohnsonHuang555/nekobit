package mysql

import (
	"context"
	"database/sql"
	"server/domain"
	"server/features/game/repository"

	"github.com/sirupsen/logrus"
)

type gameRepository struct {
	Conn *sql.DB
}

// NewGameRepository well create an object that represent the game.Repository interface
func NewGameRepository(conn *sql.DB) domain.GameRepository {
	return &gameRepository{conn}
}

func (m *gameRepository) fetch(ctx context.Context, query string, args ...interface{}) (result []domain.Game, err error) {
	rows, err := m.Conn.QueryContext(ctx, query, args...)
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

	result = make([]domain.Game, 0)
	for rows.Next() {
		t := domain.Game{}
		err = rows.Scan(
			&t.ID,
			&t.Name,
			&t.MinPlayers,
			&t.MaxPlayers,
			&t.ImgURL,
			&t.Brief,
			&t.Description,
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

func (gr *gameRepository) FindAll(ctx context.Context, cursor string, num int64) (res []domain.Game, nextCursor string, err error) {
	query := `SELECT * FROM game_platform.game WHERE created_at > ? ORDER BY created_at LIMIT ? `

	decodedCursor, err := repository.DecodeCursor(cursor)
	if err != nil && cursor != "" {
		return nil, "", domain.ErrBadParamInput
	}

	res, err = gr.fetch(ctx, query, decodedCursor, num)
	if err != nil {
		return nil, "", err
	}

	if len(res) == int(num) {
		nextCursor = repository.EncodeCursor(res[len(res)-1].CreatedAt)
	}

	return
}

func (gr *gameRepository) FindOneByID(ctx context.Context, id int64) (res domain.Game, err error) {
	query := `SELECT * FROM game_platform.game WHERE ID = ?`

	list, err := gr.fetch(ctx, query, id)
	if err != nil {
		return domain.Game{}, err
	}

	if len(list) > 0 {
		res = list[0]
	} else {
		return res, domain.ErrNotFound
	}

	return
}
