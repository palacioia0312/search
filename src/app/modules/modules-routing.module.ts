import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

// Component pages
import { UsersComponent } from "./users/users.component";

const routes: Routes = [
	{
		path: "users",
		component: UsersComponent		
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ModulesRoutingModule {}
