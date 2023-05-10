package main

import (
	"embed"
	"laratoolkit/backend"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
)

//go:embed all:frontend/dist
var assets embed.FS

func main() {
	// Create an instance of the app structure
	app := NewApp()
	backend := backend.NewBackend(&app.ctx)

	// Create application with options
	err := wails.Run(&options.App{
		Title:            "LaraToolKit",
		Width:            1024,
		Height:           768,
		Assets:           assets,
		BackgroundColour: &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		OnStartup:        app.startup,
		Bind: []interface{}{
			app,
			backend,
		},
	})

	if err != nil {
		println("Error:", err.Error())
	}
}
