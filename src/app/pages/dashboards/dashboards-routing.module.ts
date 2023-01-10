import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UsersComponent } from '../../modules/users/users.component';
import { ContractComponent } from 'src/app/modules/contract/contract.component';
const routes: Routes = [
	{ 
		path: 'users', component: UsersComponent
	},
	{ 
		path: 'contract', component: ContractComponent
	}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class DashboardsRoutingModule { }
