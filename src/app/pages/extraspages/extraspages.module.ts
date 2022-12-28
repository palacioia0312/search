import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// Component pages
import { ExtrapagesRoutingModule } from "./extraspages-routing.module";
import { ComingSoonComponent } from "./coming-soon/coming-soon.component";
import { MaintenanceComponent } from "./maintenance/maintenance.component";

@NgModule({
	declarations: [MaintenanceComponent, ComingSoonComponent],
	imports: [CommonModule, ExtrapagesRoutingModule],
})
export class ExtraspagesModule {}
