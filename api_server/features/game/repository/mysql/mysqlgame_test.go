package mysql_test

import (
	"context"
	"fmt"
	"server/domain"
	"testing"
	"time"

	"server/features/game/repository"
	_gameRepo "server/features/game/repository/mysql"

	"github.com/stretchr/testify/assert"
	sqlmock "gopkg.in/DATA-DOG/go-sqlmock.v1"
)

func TestFetch(t *testing.T) {
	db, mock, err := sqlmock.New()
	if err != nil {
		t.Fatalf("an error '%s' was not expected when opening a stub database connection", err)
	}

	mockGames := []domain.Game{
		{
			ID: 1, Name: "象棋", Brief: "兩人對弈遊戲",
			MinPlayers: 2, MaxPlayers: 2, Description: "測試資料",
			ImgURL: "/img/chinese-chess", EstimateTime: 30,
			CreatedAt: time.Now(), UpdatedAt: time.Now(),
		},
	}

	rows := sqlmock.NewRows([]string{"id", "name", "brief", "description", "min_players", "max_players", "img_url", "estimate_time", "created_at", "updated_at"})
	rows.AddRow(mockGames[0].ID, mockGames[0].Name, mockGames[0].Brief, mockGames[0].Description, mockGames[0].MinPlayers, mockGames[0].MaxPlayers, mockGames[0].ImgURL, mockGames[0].EstimateTime, mockGames[0].CreatedAt, mockGames[0].UpdatedAt)

	query := "SELECT * FROM game_platform.game WHERE created_at > \\? ORDER BY created_at LIMIT \\?"

	mock.ExpectQuery(query).WillReturnRows(rows)
	g := _gameRepo.NewGameRepository(db)
	cursor := repository.EncodeCursor(mockGames[0].CreatedAt)
	list, nextCursor, err := g.FindAll(context.TODO(), cursor, 10)
	fmt.Println(list)
	assert.NotEmpty(t, nextCursor)
	assert.NoError(t, err)
	assert.Len(t, list, 1)
}
