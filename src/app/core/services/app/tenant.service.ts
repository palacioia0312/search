import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class TenantService {
	constructor(private _api: RestApiService) {}

	async getList(): Promise<any> {
		return await this._api.get("tenant/list");
	}

	async getListById(id: string): Promise<any> {
		return await this._api.get("tenant/" + id);
	}

	async create(content: any): Promise<any> {
		return await this._api.post("tenant/add", content);
	}

	async update(id: string, content: any): Promise<any> {
		return await this._api.put("tenant/" + id + "/update", content);
	}

	async changeStatus(id: string, content: any): Promise<any> {
		return await this._api.put("tenant/" + id + "/change/status", content);
	}
}
