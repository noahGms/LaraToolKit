// Cynhyrchwyd y ffeil hon yn awtomatig. PEIDIWCH Â MODIWL
// This file is automatically generated. DO NOT EDIT
import {backend} from '../models';

export function CreateOrUpdateSetting(arg1:string,arg2:string):Promise<string>;

export function CreateProject(arg1:backend.CreateAndUpdateProject):Promise<string>;

export function DeleteProject(arg1:number):Promise<string>;

export function GetAllProjects():Promise<Array<backend.Project>>;

export function GetAllSettings():Promise<Array<any>>;

export function GetProject(arg1:number):Promise<backend.Project>;

export function GetProjectCommands(arg1:number):Promise<backend.Commands>;

export function OpenFolderDialog():Promise<string>;

export function RunProjectCommands(arg1:number,arg2:string,arg3:{[key: string]: any},arg4:{[key: string]: any}):Promise<string>;

export function SyncProjectCommands(arg1:number):Promise<string>;

export function UpdateProject(arg1:number,arg2:backend.CreateAndUpdateProject):Promise<string>;
