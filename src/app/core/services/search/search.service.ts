import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class SearchService {
	constructor(private _api: RestApiService) { }

	async filter(content: { label: string, ip: string, device: string }): Promise<any> {
		return await this._api.post('search/filter', content);
	}

	async interaction(headquarterId: string, socialId: string): Promise<any> {
		return await this._api.post('search/interaction/headquarter/' + headquarterId + '/social/' + socialId);
	}
}
