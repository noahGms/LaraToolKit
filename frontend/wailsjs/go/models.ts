export namespace backend {
	
	export class CommandDefinition {
	    arguments: any;
	    options: any;
	
	    static createFrom(source: any = {}) {
	        return new CommandDefinition(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.arguments = source["arguments"];
	        this.options = source["options"];
	    }
	}
	export class Command {
	    definition: CommandDefinition;
	    description: string;
	    help: string;
	    hidden: boolean;
	    name: string;
	    usage: string[];
	
	    static createFrom(source: any = {}) {
	        return new Command(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.definition = this.convertValues(source["definition"], CommandDefinition);
	        this.description = source["description"];
	        this.help = source["help"];
	        this.hidden = source["hidden"];
	        this.name = source["name"];
	        this.usage = source["usage"];
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Namespace {
	    commands: string[];
	    id: string;
	
	    static createFrom(source: any = {}) {
	        return new Namespace(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.commands = source["commands"];
	        this.id = source["id"];
	    }
	}
	export class CommandsApplication {
	    name: string;
	    version: string;
	
	    static createFrom(source: any = {}) {
	        return new CommandsApplication(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.version = source["version"];
	    }
	}
	export class Commands {
	    application: CommandsApplication;
	    commands: Command[];
	    namespaces: Namespace[];
	
	    static createFrom(source: any = {}) {
	        return new Commands(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.application = this.convertValues(source["application"], CommandsApplication);
	        this.commands = this.convertValues(source["commands"], Command);
	        this.namespaces = this.convertValues(source["namespaces"], Namespace);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class CreateAndUpdateProject {
	    name: string;
	    path: string;
	
	    static createFrom(source: any = {}) {
	        return new CreateAndUpdateProject(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.name = source["name"];
	        this.path = source["path"];
	    }
	}
	
	export class Project {
	    id: number;
	    name: string;
	    path: string;
	    commands_path: string;
	    updated_at: string;
	    created_at: string;
	
	    static createFrom(source: any = {}) {
	        return new Project(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.name = source["name"];
	        this.path = source["path"];
	        this.commands_path = source["commands_path"];
	        this.updated_at = source["updated_at"];
	        this.created_at = source["created_at"];
	    }
	}
	export class Setting {
	    id: number;
	    key: string;
	    value: string;
	    updated_at: string;
	    created_at: string;
	
	    static createFrom(source: any = {}) {
	        return new Setting(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.key = source["key"];
	        this.value = source["value"];
	        this.updated_at = source["updated_at"];
	        this.created_at = source["created_at"];
	    }
	}

}

