#!/bin/sh -e
psql --variable=ON_ERROR_STOP=1 --username "postgres" <<- EOSQL
    CREATE TABLE game (
        id serial primary key,
        name varchar(50),
        game_pack varchar(50),
        min_players int,
        max_players int,
        brief varchar(100),
        description varchar(255),
        img_url varchar(255),
        estimate_time int,
        created_at date,
        updated_at date
    );

    INSERT INTO game (name, game_pack, min_players, max_players, brief, description, img_url, estimate_time, created_at, updated_at) VALUES ('象棋', 'chinese_chess', 2, 2, '兩人對弈遊戲', '對弈起來', '/img/chinese-chess', 30, '2020-10-10', '2020-10-10');
EOSQL
