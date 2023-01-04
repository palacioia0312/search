import { Injectable } from '@angular/core';
import { TokenStorageService } from '../utils/token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class RestApiService {
	private _path: string = 'https://quillasearch.azurewebsites.net/api/';
	private _bearerKey: string = this._storage.getToken() || '';

	constructor(private _storage: TokenStorageService) { }


	async post(path: string, content?: any): Promise<any> {
		const headersList = {
			"Accept": "*/*",
			"User-Agent": "Quilla Search",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + this._bearerKey
		}
		return await fetch(this._path + path, { headers: headersList, body: JSON.stringify(content), method: 'POST' }).then((response) => response.json());
	}

	async get(path: string): Promise<any> {
		const headersList = {
			"Accept": "*/*",
			"User-Agent": "Quilla Search",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + this._bearerKey
		}
		return await fetch(this._path + path, { headers: headersList }).then((response) => response.json());
	}

	async put(path: string, content?: any): Promise<any> {
		const headersList = {
			"Accept": "*/*",
			"User-Agent": "Quilla Search",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + this._bearerKey
		}
		return await fetch(this._path + path, { headers: headersList, body: JSON.stringify(content), method: 'PUT' }).then((response) => response.json());
	}

	async delete(path: string): Promise<any> {
		const headersList = {
			"Accept": "*/*",
			"User-Agent": "Quilla Search",
			"Content-Type": "application/json",
			"Authorization": "Bearer " + this._bearerKey
		}
		return await fetch(this._path + path, { headers: headersList, method: 'DELETE' }).then((response) => response.json());
	}
}
