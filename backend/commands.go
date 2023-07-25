package backend

// Commands struct
type Commands struct {
	Application CommandsApplication `json:"application"`
	Commands    []Command           `json:"commands"`
	Namespaces  []Namespace         `json:"namespaces"`
}

// CommandsApplication struct
type CommandsApplication struct {
	Name    string `json:"name"`
	Version string `json:"version"`
}

// CommandDefinition struct
type CommandDefinition struct {
	Arguments interface{} `json:"arguments"`
	Options   interface{} `json:"options"`
}

// Command struct
type Command struct {
	Definition  CommandDefinition `json:"definition"`
	Description string            `json:"description"`
	Help        string            `json:"help"`
	Hidden      bool              `json:"hidden"`
	Name        string            `json:"name"`
	Usage       []string          `json:"usage"`
}

// Namespace struct
type Namespace struct {
	Commands []string `json:"commands"`
	ID       string   `json:"id"`
}
