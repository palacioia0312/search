import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class PermissionService {
	constructor(private _api: RestApiService) {}

	async getList(): Promise<any> {
		return await this._api.get("permission/list");
	}

	async getListByRole(roleId: string): Promise<any> {
		return await this._api.get("permission/role/" + roleId + "/list");
	}
}
