package controller

type Context interface {
	JSON(code int, i interface{}) error
	QueryParam(name string) string // ?id=
	Param(name string) string      // path
	Bind(i interface{}) error      // post body
}

type MsgData interface {
}
