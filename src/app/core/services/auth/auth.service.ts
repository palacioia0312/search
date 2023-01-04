import { Injectable } from '@angular/core';
import { RestApiService } from '../api/rest-api.service';
import { TokenStorageService } from '../app/token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private _api: RestApiService, private _storage: TokenStorageService) { }

	async signIn(content: any): Promise<any> {
		return await this._api.post('authentication/login', content);
	}

	async codeConfirmation(code: string): Promise<any> {
		return await this._api.post('authentication/confirmation/' + code + '/link');
	}

	async keepalive(): Promise<any> {
		return await this._api.get('authentication/keepalive');
	}

	async remember(email: string, tenantId: string): Promise<any> {
		return await this._api.post('authentication/remember/' + tenantId, { email })
	}

	async logout(userId: string, tenantId: string): Promise<any> {
		return await this._api.post('authentication/logout/' + userId + '/' + tenantId)
	}
}
