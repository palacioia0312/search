import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { RestApiService } from '../api/rest-api.service';
import { TokenStorageService } from '../utils/token-storage.service';

@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(private _api: RestApiService, private _storage: TokenStorageService, private _router: Router) { }

	async signIn(content: any, fnError: any, fnSuccess: any): Promise<any> {
		return await this._api.post('authentication/login', content).then(({ isError, data, ...content }) => {
			const { token, ...contentData} = data;

			if (isError) {
				fnError(content);
				return;
			}

			fnSuccess(data);
			this._storage.saveToken(data.token);
			this._storage.saveUser(contentData);
		});
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

	async logout(tenantId: string): Promise<any> {
		const { id } = this._storage.getUser();
		console.log(this._storage.getUser());
		return await this._api.post('authentication/logout/' + id + '/' + tenantId).then(({data, isError}) => {
			if (data && !isError) {
				this._storage.signOut();
				this._router.navigate(["/auth/sign-in"]);
			}
		})
	}
}
