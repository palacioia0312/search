import { Injectable } from '@angular/core';
import { RestApiService } from '../api/rest-api.service';

@Injectable({
	providedIn: 'root'
})
export class HeadquarterService {

	constructor(private _api: RestApiService) { }

	async getResume(id: string): Promise<any> {
		return await this._api.get('headquarter/' + id + '/resume');
	}

	async getList(): Promise<any> {
		return await this._api.get('headquarter/list');
	}

	async changeHeadquarter(id: string, content: any): Promise<any> {
		return await this._api.put('headquarter/' + id, content);
	}

	async addSocial(id: String, content: any): Promise<any> {
		return await this._api.post('headquarter/' + id + '/add/social', content);
	}
}
