package backend

import "github.com/wailsapp/wails/v2/pkg/runtime"

func (b *Backend) OpenFolderDialog() (string, error) {
	folder, err := runtime.OpenDirectoryDialog(*b.ctx, runtime.OpenDialogOptions{})

	if err != nil {
		return "", err
	}

	return folder, nil
}
