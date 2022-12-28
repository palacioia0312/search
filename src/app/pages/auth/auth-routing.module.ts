import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

// Component Pages
import { SignOutComponent } from "./sign-out/sign-out.component";
import { SignInComponent } from "./sign-in/sign-in.component";
import { SignUpComponent } from "./sign-up/sign-up.component";

const routes: Routes = [
	{
		path: "sign-out",
		component: SignOutComponent,
	},
	{
		path: "sign-in",
		component: SignInComponent,
	},
	{
		path: "sign-up",
		component: SignUpComponent,
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AuthRoutingModule {}
