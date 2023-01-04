import { Injectable } from "@angular/core";
import { RestApiService } from "../api/rest-api.service";

@Injectable({
	providedIn: "root",
})
export class MessageService {
	constructor(private _api: RestApiService) {}

	async sendAllClients(content: {
		message: string;
		title: string;
	}): Promise<any> {
		return await this._api.post("message/sendpushallclients", content);
	}

	async sendToClient(
		userId: string,
		content: { message: string; title: string }
	): Promise<any> {
		return await this._api.post(
			"message/sendpushtouser/" + userId,
			content
		);
	}
}
