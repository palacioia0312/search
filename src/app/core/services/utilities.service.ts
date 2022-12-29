import { Injectable } from "@angular/core";

@Injectable({
	providedIn: "root",
})
export class UtilitiesService {
	private readonly _apiURL: string = "";
	private readonly headers = {
		"Accept": "*/*",
		"Content-Type": "application/json",
		"Authorization": "Bearer "
	}

	constructor() {}

	async post(path: string, body?: any): Promise<any> {
		return await fetch(this._apiURL + path, {
			method: "POST",
			body: JSON.stringify(body),
			headers: this.headers,
		}).then((response) => response.json());
	}

	async get(path: string): Promise<any> {
		return await fetch(this._apiURL + path).then((response) =>
			response.json()
		);
	}

	async put(path: string, body: any): Promise<any> {
		return await fetch(this._apiURL + path, {
			method: "PUT",
			body: JSON.stringify(body),
			headers: this.headers,
		}).then((response) => response.json());
	}

	async delete(path: string): Promise<any> {
		return await fetch(this._apiURL + path, {
			method: "DELETE",
			headers: this.headers,
		}).then((response) => response.json());
	}
}
