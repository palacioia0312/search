import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class UserService {
	constructor(private _api: RestApiService) {}

	async getList(): Promise<any> {
		return await this._api.get("user/list");
	}

	async getListByPage(content: {
		columnOrder: string;
		orderType: string;
		pageSize: number;
		sortDirection: number;
		startIndex: number;
	}): Promise<any> {
		return await this._api.post("user/listbypage", content);
	}

	async getListByRole(roleId: string): Promise<any> {
		return await this._api.get("user/listbyrole/" + roleId);
	}

	async getByDocument(
		documentId: string,
		documentNumber: string
	): Promise<any> {
		return await this._api.get("user/" + documentId + "/" + documentNumber);
	}

	async getById(userId: string): Promise<any> {
		return await this._api.get("user/" + userId);
	}

	async getStatus(userId: string): Promise<any> {
		return await this._api.get("user/" + userId + "/enable");
	}

	async create(content: any): Promise<any> {
		return await this._api.post("user/add", content);
	}

	async addPictureToUser(content: any): Promise<any> {
		return await this._api.post("user/add/mypicture", content);
	}

	async update(
		userId: string,
		content: {
			lastname: string;
			mobile: string;
			name: string;
			nickname: string;
		}
	): Promise<any> {
		return await this._api.put("user/" + userId + "/update", content);
	}

	async changePassowrd(content: {
		oldPassword: string;
		password: string;
	}): Promise<any> {
		return await this._api.put("user/update/mypassword", content);
	}

	async changeUserPassword(userId: string, password: string): Promise<any> {
		return await this._api.put("user/" + userId + "/update/password", {
			password,
		});
	}

	async recoveryPassword(code: string): Promise<any> {
		return await this._api.put('user/' + code + '/recovery/password')
	}

	async changeUserStatus(userId: string): Promise<any> {
		return await this._api.put('user/' + userId + '/change/status');
	}
}
