import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class SalesService {
	constructor(private _api: RestApiService) {}

	async getVendor(): Promise<any> {
		return await this._api.get("sales/vendor");
	}

	async getVendorById(vendorId: string): Promise<any> {
		return await this._api.get("sales/vendor/" + vendorId);
	}
}
