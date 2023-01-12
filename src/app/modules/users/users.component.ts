import { Component, OnInit } from "@angular/core";
import {
	UntypedFormBuilder,
	UntypedFormGroup,
	Validators,
} from "@angular/forms";
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
	isEditUser: boolean = false;
	isShowInformation: boolean = false;

	isLoadingNewUser: boolean = false;
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
		playerIdPush: "",
	};

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

	newUserForm!: UntypedFormGroup;

	constructor(
		private formBuilder: UntypedFormBuilder,
		private _userServices: UserService,
		private _rolServices: RoleService,
		private _optionListServices: OptionListService
	) {}

	ngOnInit(): void {
		this.loadData();
		this.newUserForm = this.formBuilder.group({
			address: [
				"",
				[
					Validators.required,
					Validators.maxLength(100),
					Validators.pattern("^[wds#-]*$"),
				],
			],
			documentNumber: [
				"",
				[
					Validators.required,
					Validators.maxLength(20),
					Validators.pattern("^[a-zA-Z0-9-]*$"),
				],
			],
			email: ["", [Validators.required, Validators.email]],
			lastname: [
				"",
				[
					Validators.required,
					Validators.maxLength(50),
					Validators.pattern("^[a-zA-Z ]*$"),
				],
			],
			mobile: [
				"",
				[
					Validators.required,
					Validators.maxLength(10),
					Validators.pattern("^[d]*$"),
				],
			],
			name: [
				"",
				[
					Validators.required,
					Validators.maxLength(30),
					Validators.pattern("^[a-zA-Z ]*$"),
				],
			],
			nickname: [
				"",
				[
					Validators.required,
					Validators.maxLength(20),
					Validators.minLength(8),
					Validators.pattern("^[wd]*$"),
				],
			],
			password: [
				"",
				[
					Validators.required,
					Validators.maxLength(20),
					Validators.minLength(8),
					Validators.pattern("^[a-z.*-_]*$"),
				],
			],
		});
	}

	loadData(direction?: string): void {
		this.isLoadingUser = true;

		this._userServices.getList().then(({ data }) => {
			this.listUsers = data;
			if (this.listUsers.length > 0 && !direction) {
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
		this.isEditUser = false;

		this._userServices.getById(id).then(({ isError, data }) => {
			if (isError) {
				return;
			}
			this.currentOUser = data;
			if (this.currentOUser) {
				this.currentUser = { id, ...user };
				this.isShowInformation = true;
			}
			this._rolServices.getUserList(this.currentUser.id).then(({ isError, data }) => {
				if (isError) {
					return;
				}
	
				this.currentUser.rolData = data;
			});
		});

	}

	fnShowEditUser(): void {
		const { name, lastname, nickname } = this.currentUser;
		const { documentNumber, mobile, address, email } = this.currentOUser;
		this.f["name"].setValue(name);
		this.f["lastname"].setValue(lastname);
		this.f["documentNumber"].setValue(documentNumber);
		this.f["mobile"].setValue(mobile);
		this.f["address"].setValue(address);
		this.f["email"].setValue(email);
		this.f["email"].disable();
		this.f["nickname"].setValue(nickname);
		this.f["nickname"].disable();

		this.isShowInformation = false;
		this.isNewUser = false;
		this.isEditUser = true;
	}

	fnShowNewUser(): void {
		this.newUserForm.reset();
		this.newUserForm.enable();
		this.isShowInformation = false;
		this.isNewUser = true;
		this.isEditUser = false;
	}

	fnCloseNewUser(): void {
		this.isShowInformation = true;
		this.isNewUser = false;
		this.isEditUser = false;
		this.newUserForm.reset();
	}

	fnNewUser(): void {
		this.isLoadingNewUser = true;
		this.newUserForm.disable();

		console.log(this.newUserForm)

		// if (!this.newUserForm.valid) {
		// 	this.fnShowAlert(
		// 		{ type: "error", message: "Verifique los datos ingresados" },
		// 		() => {
		// 			this.isLoadingNewUser = false;
		// 		}
		// 	);
		// 	return;
		// }

		if (this.isEditUser) {
			this.updateUser();
			return;
		}

		this.createUser();
		return;
	}

	createUser(): void {
		this._userServices
			.create({
				...this.newUserForm.value,
				documentTypeId: "",
				playerIdPush: "",
			})
			.then(({ isError, message, data }) => {
				if (isError) {
					this.fnShowAlert(
						{
							type: "error",
							message:
								message ?? "Verifique los datos ingresados",
						},
						() => {
							this.isLoadingNewUser = false;
							return;
						}
					);
				}
				this.fnShowAlert(
					{
						type: "success",
						message: message ?? "Datos ingresados correctamente",
					},
					() => {
						this.isLoadingNewUser = false;
						this.newUserForm.enable();
						this.loadData("home");
					}
				);
			});
	}

	updateUser(): void {
		this._userServices
			.update(this.currentUser.id, this.newUserForm.value)
			.then(({ isError, message, data }) => {
				if (isError) {
					this.fnShowAlert(
						{
							type: "error",
							message:
								message ?? "Verifique los datos ingresados",
						},
						() => {
							this.isLoadingNewUser = false;
							return;
						}
					);
				}
				this.fnShowAlert(
					{
						type: "success",
						message: message || "Datos actualizados correctamente",
					},
					() => {
						this.isLoadingNewUser = false;
						this.newUserForm.enable();
						this.loadData("home");
					}
				);
			});
	}

	get f() {
		return this.newUserForm.controls;
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
			.changeUserPassword(this.currentUser.id, this.changePassword.password)
			.then(({ isError, data, message }) => {
				if (isError) {
					this.fnShowAlert({ type: "error", message }, () => {});
					return;
				}

				this.fnShowAlert(
					{
						type: "success",
						message: message || "Cambio realizado correctamente",
					},
					() => {
						this.changePassword = { oldPassword: "", password: "" };
					}
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
						type: "success",
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

		callback();
		setTimeout(() => {
			this.alert.active = false;
		}, 2500);
	}
}
