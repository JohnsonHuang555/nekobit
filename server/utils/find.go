package utils

func IsIncludeNumber(numbers []int, n int) bool {
	found := false
	for _, v := range numbers {
		if v == n {
			found = true
			break
		}
	}
	return found
}
