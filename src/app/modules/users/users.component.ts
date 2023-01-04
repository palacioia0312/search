import { Component, OnInit } from "@angular/core";
import { RoleService } from "src/app/core/services/app/role.service";
import { UserService } from "src/app/core/services/user/user.service";
import Rol from "src/app/core/types/rol/rol";
import oUser from "src/app/core/types/user/oUser";
import User from "src/app/core/types/user/user";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
	isNewUser: boolean = false;
	isShowInformation: boolean = false;

	listUsers: User[] = [];
	listRols: Rol[] = [];

	currentUser: User = {
		id: "",
		name: "",
		isLockedOut: false,
		lastname: "",
		mobile: "",
		email: "",
		nickname: "",
		playerPushId: "",
		roleName: "",
		status: false,
		telephone: "",
		createdOn: "",
		modifieddOn: "",
	};

	currentOUser: oUser = {
		address: "",
		documentNumber: "",
		documentTypeId: "",
		email: "",
		id: "",
		lastname: "",
		mobile: "",
		name: "",
		nickname: "",
	};

	constructor(
		private _userServices: UserService,
		private _rolServices: RoleService
	) {}

	ngOnInit(): void {
		this.loadData();
	}

	loadData(): void {
		this._userServices
			.getList()
			.then(({ data }) => (this.listUsers = data));

		this._rolServices.getList().then(({ data }) => (this.listRols = data));
	}

	async getUser({ id }: User): Promise<void> {
		this.currentOUser = await this._userServices.getById(id);
	}
}
