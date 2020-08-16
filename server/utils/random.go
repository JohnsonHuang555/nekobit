package utils

import (
	"fmt"
	"math/rand"
	"sort"
	"time"
)

// 隨機排序 從'0'開始
func RandomShuffle(maxVal int) []int {
	slice := []int{}
	for i := 0; i < maxVal; i++ {
		slice = append(slice, i)
	}

	randLocation := slice
	r := rand.New(rand.NewSource(time.Now().Unix()))
	for n := len(randLocation); n > 0; n-- {
		randIndex := r.Intn(n)
		randLocation[n-1], randLocation[randIndex] = randLocation[randIndex], randLocation[n-1]
	}

	return randLocation
}

// 隨機取樣
func RandomSampling(min int, max int, n int) []int {
	var allNumbers []int
	var randNumbers []int
	for i := min; i < max+1; i++ {
		allNumbers = append(allNumbers, i)
	}
	for i := 0; i < n; i++ {
		randIndex := rand.Intn(len(allNumbers))
		randNumbers = append(randNumbers, allNumbers[randIndex])
		allNumbers = append(allNumbers[:randIndex], allNumbers[randIndex+1:]...)
		max--
	}
	sort.Ints(randNumbers)
	fmt.Println(randNumbers)
	return randNumbers
}
