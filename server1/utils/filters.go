package utils

func FilterStrings(vs []string, f func(string) bool) []string {
	vsf := make([]string, 0)
	for _, v := range vs {
		if f(v) {
			vsf = append(vsf, v)
		}
	}
	return vsf
}

func FilterNumbers(n []int, f func(int) bool) []int {
	nf := make([]int, 0)
	for _, v := range n {
		if f(v) {
			nf = append(nf, v)
		}
	}
	return nf
}
