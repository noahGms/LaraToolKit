package backend

import "context"

type Backend struct {
	ctx *context.Context
}

func NewBackend(ctx *context.Context) *Backend {
	return &Backend{
		ctx: ctx,
	}
}
