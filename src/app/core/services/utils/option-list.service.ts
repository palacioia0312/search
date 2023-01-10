import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class OptionListService {

	data: any = {
	};

	constructor(private _api: RestApiService) {}

	async getById(id: string): Promise<any> {
		return await this._api.get("item/" + id);
	}

	async getListByKey(key: string): Promise<any> {
		return await this._api.get("item/listbykey/" + key);
	}

	async getListByParent(key: string, parentId: string): Promise<any> {
		return await this._api.get("item/listbyparent/" + key + "/" + parentId);
	}

	async getDetailListByKey(key: string): Promise<any> {
		if (this.data.hasOwnProperty(key) && this.data[key].length > 0) {
			return this.data[key];
		} 
		const response = await this._api.get("item/detail/" + key + "/list");
		this.data[key] = await response;

		return await this.data[key];
	}

	async create(content: any): Promise<any> {
		return await this._api.post("item/add", content);
	}

	async getListByKeys(content: any): Promise<any> {
		return await this._api.post("item/listbykeys", content);
	}

	async changeOrder(id: string, order: string): Promise<any> {
		return await this._api.put("item/" + id + "/changeorder/" + order);
	}

	async changeParent(id: string, parentId: string): Promise<any> {
		return await this._api.put("item/" + id + "/changeparent/" + parentId);
	}

	async changeStatus(id: string): Promise<any> {
		return await this._api.put("item/" + id + "/changestatus");
	}

	async update(id: string): Promise<any> {
		return await this._api.put("item/update/" + id);
	}

	async delete(id: string): Promise<any> {
		return await this._api.delete("item/delete/" + id);
	}
}
