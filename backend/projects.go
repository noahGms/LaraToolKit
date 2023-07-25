package backend

import (
	"encoding/json"
	"errors"
	"os"
	"os/exec"
	"strconv"
)

type Project struct {
	ID           uint   `json:"id"`
	Name         string `json:"name"`
	Path         string `json:"path"`
	CommandsPath string `json:"commands_path"`
	UpdatedAt    string `json:"updated_at"`
	CreatedAt    string `json:"created_at"`
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

func (b *Backend) SyncProjectCommands(id uint) (string, error) {
	var project Project
	err := b.db.First(&project, id).Error
	if err != nil {
		return "", err
	}

	awkCommand := exec.Command("php", "artisan", "list", "--format=json")
	awkCommand.Dir = project.Path

	output, err := awkCommand.Output()
	if err != nil {
		return "", err
	}

	var payload interface{}
	err = json.Unmarshal(output, &payload)
	if err != nil {
		return "", err
	}

	jsonData, _ := json.Marshal(payload)
	path := "commands/commands_" + strconv.Itoa(int(project.ID)) + ".json"

	err = os.WriteFile(path, jsonData, 0644)
	if err != nil {
		return "", err
	}

	err = b.db.Model(&project).Update("commands_path", path).Error
	return "Project commands synced", err
}

func (b *Backend) GetProjectCommands(id uint) (Commands, error) {
	var project Project
	err := b.db.First(&project, id).Error
	if err != nil {
		return Commands{}, err
	}

	payload, err := os.ReadFile(project.CommandsPath)
	if err != nil {
		return Commands{}, err
	}

	var commands Commands
	err = json.Unmarshal(payload, &commands)
	if err != nil {
		return Commands{}, err
	}

	return commands, nil
}

func (b *Backend) RunProjectCommands(id uint, command string, arguments map[string]interface{}, options map[string]interface{}) (string, error) {
	var project Project
	err := b.db.First(&project, id).Error
	if err != nil {
		return "", err
	}

	awkCommand := exec.Command("php", "artisan", command)
	awkCommand.Dir = project.Path

	for _, value := range arguments {
		awkCommand.Args = append(awkCommand.Args, value.(string))
	}

	for key, value := range options {
		if value == true {
			awkCommand.Args = append(awkCommand.Args, key)
			continue
		}

		if value == false {
			continue
		}

		if value != "" {
			awkCommand.Args = append(awkCommand.Args, key+"="+value.(string))
			continue
		}

		continue
	}

	out, err := awkCommand.Output()
	if err != nil {
		return string(out), nil
	}

	return string(out), err
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
