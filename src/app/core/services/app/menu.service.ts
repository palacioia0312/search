import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class MenuService {
	constructor(private _api: RestApiService) {}

	async get(): Promise<any> {
		return await this._api.get("menu");
	}

	async getListByRole(roleId: string): Promise<any> {
		return await this._api.get("menu/listbyrole/" + roleId);
	}

	async getList(): Promise<any> {
		return await this._api.get("list");
	}

	async add(contentMenu: any): Promise<any> {
		return await this._api.post("menu/add", contentMenu);
	}

	async addAsociate(roleId: string, jsonMenu: any): Promise<any> {
		return await this._api.post("menu/add/asociate/" + roleId, {
			jsonMenu,
		});
	}

	async create(id: string, contentMenu: any): Promise<any> {
		return await this._api.post("menu/" + id, contentMenu);
	}

	async addPermissionAdmin(contentMenu: any): Promise<any> {
		return await this._api.post("menu/add/permission/admin", contentMenu);
	}
}
