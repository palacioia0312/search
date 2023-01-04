import { Injectable } from "@angular/core";
import {
	CanActivate,
	ActivatedRouteSnapshot,
	RouterStateSnapshot,
	Router,
} from "@angular/router";

// Auth Services
import { TokenStorageService } from "../services/utils/token-storage.service";

@Injectable({ providedIn: "root" })
export class AuthGuard implements CanActivate {
	constructor(
		private _storage: TokenStorageService,
		private _router: Router
	) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
		if (this._storage.getUser() && this._storage.getToken()) {
			return true;
		}

		this._router.navigate(["/auth/sign-in"]);
		return false;
	}
}
