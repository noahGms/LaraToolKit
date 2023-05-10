package backend

import (
	"context"
	"fmt"

	"gorm.io/gorm"
)

type Backend struct {
	ctx *context.Context
	db  *gorm.DB
}

func NewBackend(ctx *context.Context) *Backend {
	db, err := InitDb()

	if err != nil {
		fmt.Printf("%s", err)
	}

	return &Backend{
		ctx: ctx,
		db:  db,
	}
}
