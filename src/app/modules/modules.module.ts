import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import {
	NgbToastModule,
	NgbProgressbarModule,
	NgbAlertModule,
	NgbCarouselModule,
	NgbModalModule,
	NgbTooltipModule,
	NgbPopoverModule,
	NgbPaginationModule,
	NgbNavModule,
	NgbAccordionModule,
	NgbCollapseModule,
} from "@ng-bootstrap/ng-bootstrap";

import { NgbDropdownModule } from "@ng-bootstrap/ng-bootstrap";
import { SimplebarAngularModule } from "simplebar-angular";

// Swiper Slider
import { SWIPER_CONFIG } from "ngx-swiper-wrapper";
import { SwiperConfigInterface } from "ngx-swiper-wrapper";

// Pages Routing
import { ModulesRoutingModule } from "./modules-routing.module";
import { SharedModule } from "../shared/shared.module";
import { UsersComponent } from "./users/users.component";

const DEFAULT_SWIPER_CONFIG: SwiperConfigInterface = {
	direction: "horizontal",
	slidesPerView: "auto",
};

@NgModule({
	declarations: [UsersComponent],
	imports: [
		ModulesRoutingModule,
		CommonModule,
		SharedModule,
		FormsModule,
		NgbAlertModule,
		NgbCarouselModule,
		NgbDropdownModule,
		NgbModalModule,
		NgbProgressbarModule,
		NgbTooltipModule,
		NgbPopoverModule,
		NgbPaginationModule,
		NgbNavModule,
		NgbAccordionModule,
		NgbCollapseModule,
		NgbToastModule,
		SimplebarAngularModule,
	],
	providers: [
		{
			provide: SWIPER_CONFIG,
			useValue: DEFAULT_SWIPER_CONFIG,
		},
	],
	schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ModulesModule {
	constructor() {}
}
