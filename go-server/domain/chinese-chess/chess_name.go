package chinesechess

type ChineseChessSide string
type ChineseChessName string

const (
	Red   ChineseChessSide = "RED"
	Black ChineseChessSide = "BLACK"
)

const (
	KingBlack     ChineseChessName = "將"
	KingRed       ChineseChessName = "帥"
	GuardsBlack   ChineseChessName = "士"
	GuardsRed     ChineseChessName = "仕"
	MinisterBlack ChineseChessName = "象"
	MinisterRed   ChineseChessName = "相"
	ChariotsBlack ChineseChessName = "車"
	ChariotsRed   ChineseChessName = "俥"
	CannonsBlack  ChineseChessName = "包"
	CannonsRed    ChineseChessName = "炮"
	HorsesBlack   ChineseChessName = "馬"
	HorsesRed     ChineseChessName = "傌"
	SoldiersBlack ChineseChessName = "卒"
	SoldiersRed   ChineseChessName = "兵"
)

var ChineseChessMap = map[int]*ChineseChess{
	0: {
		ID:   1,
		Side: Black,
		Name: KingBlack,
		Rank: 6,
	},
	1: {
		ID:   2,
		Side: Black,
		Name: GuardsBlack,
		Rank: 5,
	},
	2: {
		ID:   3,
		Side: Black,
		Name: GuardsBlack,
		Rank: 5,
	},
	3: {
		ID:   4,
		Side: Black,
		Name: MinisterBlack,
		Rank: 4,
	},
	4: {
		ID:   5,
		Side: Black,
		Name: MinisterBlack,
		Rank: 4,
	},
	5: {
		ID:   6,
		Side: Black,
		Name: ChariotsBlack,
		Rank: 3,
	},
	6: {
		ID:   7,
		Side: Black,
		Name: ChariotsBlack,
		Rank: 3,
	},
	7: {
		ID:   8,
		Side: Black,
		Name: HorsesBlack,
		Rank: 2,
	},
	8: {
		ID:   9,
		Side: Black,
		Name: HorsesBlack,
		Rank: 2,
	},
	9: {
		ID:   10,
		Side: Black,
		Name: SoldiersBlack,
		Rank: 1,
	},
	10: {
		ID:   11,
		Side: Black,
		Name: SoldiersBlack,
		Rank: 1,
	},
	11: {
		ID:   12,
		Side: Black,
		Name: SoldiersBlack,
		Rank: 1,
	},
	12: {
		ID:   13,
		Side: Black,
		Name: SoldiersBlack,
		Rank: 1,
	},
	13: {
		ID:   14,
		Side: Black,
		Name: SoldiersBlack,
		Rank: 1,
	},
	14: {
		ID:   15,
		Side: Black,
		Name: CannonsBlack,
		Rank: 0,
	},
	15: {
		ID:   16,
		Side: Black,
		Name: CannonsBlack,
		Rank: 0,
	},
	16: {
		ID:   17,
		Side: Red,
		Name: KingRed,
		Rank: 6,
	},
	17: {
		ID:   18,
		Side: Red,
		Name: GuardsRed,
		Rank: 5,
	},
	18: {
		ID:   19,
		Side: Red,
		Name: GuardsRed,
		Rank: 5,
	},
	19: {
		ID:   20,
		Side: Red,
		Name: MinisterRed,
		Rank: 4,
	},
	20: {
		ID:   21,
		Side: Red,
		Name: MinisterRed,
		Rank: 4,
	},
	21: {
		ID:   22,
		Side: Red,
		Name: ChariotsRed,
		Rank: 3,
	},
	22: {
		ID:   23,
		Side: Red,
		Name: ChariotsRed,
		Rank: 3,
	},
	23: {
		ID:   24,
		Side: Red,
		Name: HorsesRed,
		Rank: 2,
	},
	24: {
		ID:   25,
		Side: Red,
		Name: HorsesRed,
		Rank: 2,
	},
	25: {
		ID:   26,
		Side: Red,
		Name: SoldiersRed,
		Rank: 1,
	},
	26: {
		ID:   27,
		Side: Red,
		Name: SoldiersRed,
		Rank: 1,
	},
	27: {
		ID:   28,
		Side: Red,
		Name: SoldiersRed,
		Rank: 1,
	},
	28: {
		ID:   29,
		Side: Red,
		Name: SoldiersRed,
		Rank: 1,
	},
	29: {
		ID:   30,
		Side: Red,
		Name: SoldiersRed,
		Rank: 1,
	},
	30: {
		ID:   31,
		Side: Red,
		Name: CannonsRed,
		Rank: 0,
	},
	31: {
		ID:   32,
		Side: Red,
		Name: CannonsRed,
		Rank: 0,
	},
}
