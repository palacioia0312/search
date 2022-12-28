import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./core/guards/auth.guard";
import { MainComponent } from "./pages/main/main.component";

const routes: Routes = [
	{
		path: "",
		component: MainComponent,
		loadChildren: () =>
			import("./modules/modules.module").then((m) => m.ModulesModule),
		canActivate: [AuthGuard],
	},
	//   { path: 'auth', loadChildren: () => import('./account/account.module').then(m => m.AccountModule)  },
	{
		path: "process",
		loadChildren: () =>
			import("./pages/extraspages/extraspages.module").then(
				(m) => m.ExtraspagesModule
			),
	},
	{
		path: "auth",
		loadChildren: () =>
			import("./pages/auth/auth.module").then((m) => m.AuthModule),
	},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
