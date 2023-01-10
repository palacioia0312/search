import { Component, OnInit } from "@angular/core";
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';

import { RoleService } from "src/app/core/services/app/role.service";
import { UserService } from "src/app/core/services/user/user.service";
import { OptionListService } from "src/app/core/services/utils/option-list.service";
import Rol from "src/app/core/types/rol/rol";
import nUser from "src/app/core/types/user/nUser";
import oUser from "src/app/core/types/user/oUser";
import User from "src/app/core/types/user/user";

@Component({
	selector: "app-users",
	templateUrl: "./users.component.html",
	styleUrls: ["./users.component.scss"],
})
export class UsersComponent implements OnInit {
	alert: { type: string; message: string; active: boolean } = {
		type: "success",
		message: "",
		active: false,
	};

	isNewUser: boolean = false;
	isShowInformation: boolean = false;
	isLoadingUser: boolean = false;

	isLoadingChangePassword: boolean = false;
	isLoadingRemoveRole: boolean = false;
	isLoadingChangeRole: boolean = false;

	listUsers: User[] = [];
	listRols: Rol[] = [];
	listDocumentType: any[] = [];

	selectedRole: any;

	changePassword: any = { oldPassword: "", password: "" };

	newUser: nUser = {
		address: "",
		documentNumber: "",
		documentTypeId: "none",
		email: "",
		lastname: "",
		mobile: "",
		name: "",
		nickname: "",
		password: "",
		playerIdPush: ""
	}

	newUserForm!: UntypedFormGroup;

	currentUser: User | any = {
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

	currentOUser: oUser | any = {
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
		private formBuilder: UntypedFormBuilder,
		private _userServices: UserService,
		private _rolServices: RoleService,
		private _optionListServices: OptionListService
	) {}

	ngOnInit(): void {
		this.newUserForm = this.formBuilder.group({
			
		});

		this.loadData();
	}

	loadData(): void {
		this.isLoadingUser = true;

		this._userServices.getList().then(({ data }) => {
			this.listUsers = data;
			if (this.listUsers.length > 0) {
				this.getUser(this.listUsers[0]);
			}

			this.isLoadingUser = false;
		});

		this._rolServices.getList().then(({ isError, data }) => {
			if (isError) {
				return;
			}

			this.listRols = data;
		});

		this._optionListServices
			.getListByKey("DOCUMENT")
			.then(({ isError, data }) => {
				if (isError) {
					return;
				}

				this.listDocumentType = data;
			});
	}

	async getUser({ id, ...user }: User): Promise<void> {
		this.isNewUser = false;

		this._userServices.getById(id).then(({ isError, data }) => {
			if (isError) {
				return;
			}
			this.currentOUser = data;
			if (this.currentOUser) {
				this.currentUser = { id, ...user };
				this.isShowInformation = true;
			}
		});
	}

	fnShowNewUser(): void {
		this.isShowInformation = false;
		this.isNewUser = true;
	}

	fnCloseNewUser(): void {
		this.isShowInformation = true;
		this.isNewUser = false;
	}

	fnNewUser(): void {
		console.log(this.newUser);
	}

	fnChangeRol(role: Rol): void {
		this.selectedRole = role;
	}

	fnDisabledBtnChangePassword(): boolean {
		return (
			!this.changePassword.oldPassword ||
			!this.changePassword.password ||
			this.changePassword.password.length < 8
		);
	}

	fnChangePassword(): void {
		this.isLoadingChangePassword = true;
		this._userServices
			.changePassowrd(this.changePassword)
			.then(({ isError, data, message }) => {
				if (isError) {
					this.fnShowAlert({ type: "error", message }, () => {});
					return;
				}

				this.fnShowAlert(
					{
						type: " success",
						message: message ?? "Cambio realizado correctamente",
					},
					() => {}
				);
				this.isLoadingChangePassword = false;
			});
	}

	fnRemoveRole(): void {
		this._rolServices
			.deleteUserToRole("", this.currentUser.id)
			.then(({ isError, message }) => {
				if (isError) {
					this.fnShowAlert({ type: "error", message }, () => {});
					return;
				}

				this.fnShowAlert(
					{
						type: " success",
						message: message ?? "Cambio realizado correctamente",
					},
					() => {}
				);
				this.isLoadingRemoveRole = false;
			});
	}

	fnChangeRole(): void {
		this.isLoadingChangeRole = true;
		this._rolServices
			.changeUserToRole(this.selectedRole.id, this.currentUser.id)
			.then(({ isError, message }) => {
				if (isError) {
					this.fnShowAlert({ type: "error", message }, () => {});
					return;
				}

				this.fnShowAlert(
					{
						type: "success",
						message: message || "Cambio realizado correctamente",
					},
					() => {}
				);
				this.isLoadingChangeRole = false;
			});
	}

	fnShowAlert(
		content: { type: string; message: string },
		callback: () => any
	): void {
		this.alert = {
			...content,
			active: true,
		};

		setTimeout(() => {
			this.alert.active = false;

			callback();
		}, 2500);
	}
}
