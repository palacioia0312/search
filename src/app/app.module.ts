import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

// search module
import { Ng2SearchPipeModule } from "ng2-search-filter";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";

// import { LayoutsModule } from "./layouts/layouts.module";

// Auth
import {
	HttpClientModule,
	HttpClient,
} from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { environment } from "../environments/environment";
import { initFirebaseBackend } from "./authUtils";

// Language
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { MainModule } from "./pages/main/main.module";

export function createTranslateLoader(http: HttpClient): any {
	return new TranslateHttpLoader(http, "assets/i18n/", ".json");
}

if (environment.defaultauth === "firebase") {
	initFirebaseBackend(environment.firebaseConfig);
}

@NgModule({
	declarations: [AppComponent],
	imports: [
		TranslateModule.forRoot({
			defaultLanguage: "en",
			loader: {
				provide: TranslateLoader,
				useFactory: createTranslateLoader,
				deps: [HttpClient],
			},
		}),
		BrowserAnimationsModule,
		HttpClientModule,
		BrowserModule,
		AppRoutingModule,
		MainModule,
		Ng2SearchPipeModule,
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
