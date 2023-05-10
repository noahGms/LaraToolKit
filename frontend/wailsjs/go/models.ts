export namespace backend {
	
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

