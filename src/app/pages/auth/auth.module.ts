import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

import { NgbToastModule } from "@ng-bootstrap/ng-bootstrap";

import { defineLordIconElement } from 'lord-icon-element';
import lottie from 'lottie-web';

import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";
import { SignOutComponent } from "./sign-out/sign-out.component";
import { AuthRoutingModule } from "./auth-routing.module";

@NgModule({
	declarations: [SignInComponent, SignUpComponent, SignOutComponent],
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		NgbToastModule,
		AuthRoutingModule
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AuthModule {
	constructor() {
		defineLordIconElement(lottie.loadAnimation);
	}
}
