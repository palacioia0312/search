import { Component, OnInit } from "@angular/core";
import {
	UntypedFormBuilder,
	UntypedFormGroup,
	Validators,
} from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "src/app/core/services/auth/auth.service";
import { TokenStorageService } from "src/app/core/services/token-storage.service";
import { TextService } from "src/app/core/services/utils/text.service";

@Component({
	selector: "app-login",
	templateUrl: "./sign-in.component.html",
})
export class SignInComponent implements OnInit {
	loginForm!: UntypedFormGroup;
	submitted = false;
	fieldTextType!: boolean;
	error = "";
	returnUrl!: string;

	toast!: false;

	year: number = new Date().getFullYear();

	alert: { type: string; message: string; active: boolean } = {
		type: "success",
		message: "",
		active: false,
	};

	constructor(
		private formBuilder: UntypedFormBuilder,
		private _authService: AuthService,
		private _router: Router,
		private _tokenStorage: TokenStorageService
	) {}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ["", [Validators.required]],
			password: ["", [Validators.required]],
		});
	}

	get f() {
		return this.loginForm.controls;
	}

	onSubmit() {
		if (this.loginForm.invalid) {
			this.fnShowAlert({
				type: "error",
				message: "Ingrese todos los campos",
			});
			return;
		}

		this.submitted = true;
		this.loginForm.disable();

		this._authService
			.signIn(
				{
					...this.loginForm.value,
					tenantId: "00E316D7-BFAF-43B5-B58F-11DC899F696B",
				},
				(content: any) => {
					this.fnShowAlert({
						type: "error",
						message: content.message,
					});
				},
				(content: any) => {
					this.fnShowAlert({
						type: "success",
						message: "Ingreso correctamente",
					});
					this._router.navigate(['/users'])
				}
			)
			.then(() => {
				this.submitted = false;
				this.loginForm.enable();
			});
	}

	toggleFieldTextType() {
		this.fieldTextType = !this.fieldTextType;
	}

	fnShowAlert(content: { type: string; message: string }): void {
		this.alert = { ...content, active: true };

		setTimeout(() => {
			this.alert.active = false;
		}, 2500);
	}
}
