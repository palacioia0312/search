import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class SettingService {
	constructor(private _api: RestApiService) {}

	async getSettingList(): Promise<any> {
		return await this._api.get("setting/list");
	}

	async getSettingById(id: string): Promise<any> {
		return await this._api.get("setting/" + id + "/list");
	}

	async update(
		content: { id: string; value: string }[]
	): Promise<any> {
		return await this._api.put("setting", content);
	}
}
