import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class FileService {
	constructor(private _api: RestApiService) {}

	async getFolderList(): Promise<any> {
		return await this._api.get("folder/list");
	}

	async getFolderFileList(name: string): Promise<any> {
		return await this._api.get("folder/" + name + "/file/list");
	}

	async createFolder(name: string): Promise<any> {
		return await this._api.post("folder/" + name + "/add");
	}

	async deleteFolder(path: string): Promise<any> {
		return await this._api.post("folder/delete", { path });
	}

	async renameFolder(
		pathSource: string,
		pathDestination: string
	): Promise<any> {
		return await this._api.post("folder/rename", {
			pathSource,
			pathDestination,
		});
	}

	async createFile(nameFile: string): Promise<any> {
		return await this._api.post("folder/" + nameFile + "/file/add");
	}

	async deleteFile(path: string): Promise<any> {
		return await this._api.post("folder/file/delete", { path });
	}
}
