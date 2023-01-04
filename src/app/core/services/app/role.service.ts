import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class RoleService {
	constructor(private _api: RestApiService) {}

	async getList(): Promise<any> {
		return await this._api.get("role/list");
	}

	async getById(roleId: string): Promise<any> {
		return await this._api.get("role/" + roleId);
	}

	async getUserList(userId: string): Promise<any> {
		return await this._api.get("role/user/" + userId + "/list");
	}

	async getListByPage(content: {
		columnOrder: string;
		orderType: string;
		pageSize: number;
		sortDirection: number;
		startIndex: number;
	}): Promise<any> {
		return await this._api.post("role/listbypage", content);
	}

	async create(content: any): Promise<any> {
		return await this._api.post("role/add", content);
	}

	async addUerToRole(roleId: string, userId: string): Promise<any> {
		return await this._api.post("role/" + roleId + "/add/user/" + userId);
	}

	async addPermissionToRole(
		roleId: string,
		permissionId: string
	): Promise<any> {
		return await this._api.post(
			"role/" + roleId + "/add/permission/" + permissionId
		);
	}

	async update(
		roleId: string,
		content: { description: string; id: string; name: string; icon: string }
	): Promise<any> {
		return await this._api.put("role/" + roleId + "/update", content);
	}

	async changeUserToRole(roleId: string, userId: string): Promise<any> {
		return await this._api.put("role/" + roleId + "/update/user/" + userId);
	}

	async deleteUserToRole(roleId: string, userId: string): Promise<any> {
		return await this._api.delete(
			"role/" + roleId + "/remove/user/" + userId
		);
	}

	async deletePermissionToRole(
		roleId: string,
		permissionId: string
	): Promise<any> {
		return await this._api.delete(
			"role/" + roleId + "/remove/permission/" + permissionId
		);
	}
}
