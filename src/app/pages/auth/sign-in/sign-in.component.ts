import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './sign-in.component.html',
})

export class SignInComponent implements OnInit {

	loginForm!: UntypedFormGroup;
	submitted = false;
	fieldTextType!: boolean;
	error = '';
	returnUrl!: string;

	toast!: false;

	year: number = new Date().getFullYear();


	alert: { type: string, message: string, active: boolean } = {
		type: 'success',
		message: '',
		active: false
	}

	constructor(private formBuilder: UntypedFormBuilder, private _authService: AuthService) {

	}

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			username: ['', [Validators.required]],
			password: ['', [Validators.required]],
		});
	}

	get f() { return this.loginForm.controls; }

	onSubmit() {
		this.submitted = true;

		this._authService.signIn({ ...this.loginForm.value, tenantId: '00E316D7-BFAF-43B5-B58F-11DC899F696B' })
			.then(({ isError, data, ...content }) => {
				if (isError) {
					this.alert = {
						type: 'error',
						message: content.message,
						active: true
					}
					setTimeout(() => {
						this.alert.active = false;
					}, 2500);
					return;
				}

			})

	}

	toggleFieldTextType() {
		this.fieldTextType = !this.fieldTextType;
	}

}
