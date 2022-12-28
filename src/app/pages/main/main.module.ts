import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";

import { NgbDropdownModule, NgbNavModule } from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";
import { LanguageService } from "src/app/core/services/language.service";
import { TranslateModule } from "@ngx-translate/core";

// Component pages
import { VerticalComponent } from "./vertical/vertical.component";
import { TopbarComponent } from "./topbar/topbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from "./footer/footer.component";
import { MainComponent } from "./main.component";

@NgModule({
	declarations: [
		MainComponent,
		VerticalComponent,
		TopbarComponent,
		SidebarComponent,
		FooterComponent,
	],
	imports: [
		CommonModule,
		RouterModule,
		NgbDropdownModule,
		NgbNavModule,
		SimplebarAngularModule,
		TranslateModule,
	],
	providers: [LanguageService],
})
export class MainModule {}
