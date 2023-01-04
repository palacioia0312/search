import { Injectable } from '@angular/core';
import { RestApiService } from '../api/rest-api.service';

@Injectable({
	providedIn: 'root'
})
export class CommerceService {

	constructor(private _api: RestApiService) { }

	async getDocument(document: string): Promise<any> {
		return await this._api.get('commerce/document/' + document);
	}

	async add(content: any): Promise<any> {
		return await this._api.post('commerce/add', content);
	}

	async addTag(id: string, content: any): Promise<any> {
		return await this._api.post('commerce/' + id + '/add/tag', content);
	}

	async addProduct(id: string, content: any): Promise<any> {
		return await this._api.post('commerce/' + id + '/add/product', content);
	}
}
