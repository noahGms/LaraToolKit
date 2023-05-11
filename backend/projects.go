package backend

import (
	"errors"
	"os/exec"
)

type Project struct {
	ID        uint   `json:"id"`
	Name      string `json:"name"`
	Path      string `json:"path"`
	UpdatedAt string `json:"updated_at"`
	CreatedAt string `json:"created_at"`
}

type CreateAndUpdateProject struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

func (b *Backend) GetAllProjects() ([]Project, error) {
	var projects []Project
	result := b.db.Find(&projects)
	if result.Error != nil {
		return nil, result.Error
	}
	return projects, nil
}

func (b *Backend) GetProject(id uint) (Project, error) {
	var project Project
	result := b.db.First(&project, id)
	if result.Error != nil {
		return Project{}, result.Error
	}
	return project, nil
}

func (b *Backend) CreateProject(data CreateAndUpdateProject) (string, error) {
	alreadyExist := b.checkIfProjectExists(data.Path)
	if alreadyExist {
		return "", errors.New("Project already exists")
	}

	isLaravelProject := b.checkIfIsLaravelProject(data.Path)
	if !isLaravelProject {
		return "", errors.New("Project is not a laravel project")
	}

	var newProject = Project{Name: data.Name, Path: data.Path}

	result := b.db.Create(&newProject)
	if result.Error != nil {
		return "", result.Error
	}
	return "Project created", nil
}

func (b *Backend) UpdateProject(id uint, data CreateAndUpdateProject) (string, error) {
	var project Project
	result := b.db.First(&data, id)
	if result.Error != nil {
		return "", result.Error
	}

	if data.Path != project.Path {
		alreadyExist := b.checkIfProjectExists(data.Path)

		if alreadyExist {
			return "", errors.New("Project already exists")
		}

		isLaravelproject := b.checkIfIsLaravelProject(data.Path)
		if !isLaravelproject {
			return "", errors.New("Project is not a laravel project")
		}
	}

	var updatedProject = Project{Name: data.Name, Path: data.Path}
	result = b.db.Model(&Project{}).Where("id = ?", id).Updates(updatedProject)
	if result.Error != nil {
		return "", result.Error
	}
	return "Project updated", nil
}

func (b *Backend) DeleteProject(id uint) (string, error) {
	result := b.db.Delete(&Project{}, id)
	if result.Error != nil {
		return "", result.Error
	}
	return "Project deleted", nil
}

func (b *Backend) checkIfProjectExists(path string) bool {
	var existingProject Project

	result := b.db.Where("path = ?", path).First(&existingProject)

	if result.Error == nil {
		return true
	}

	return false
}

func (b *Backend) checkIfIsLaravelProject(path string) bool {
	awkCommand := exec.Command("php", "artisan")
	awkCommand.Dir = path

	_, err := awkCommand.Output()
	if err != nil {
		return false
	}

	return true
}
