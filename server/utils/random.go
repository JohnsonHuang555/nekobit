package utils

import (
	"math/rand"
	"time"
)

// 陣列隨機排序
func RandomShuffle(maxVal int) []int {
	slice := []int{}
	for i := 0; i < maxVal; i++ {
		slice = append(slice, i+1)
	}

	randLocation := slice
	r := rand.New(rand.NewSource(time.Now().Unix()))
	for n := len(randLocation); n > 0; n-- {
		randIndex := r.Intn(n)
		randLocation[n-1], randLocation[randIndex] = randLocation[randIndex], randLocation[n-1]
	}

	return randLocation
}
