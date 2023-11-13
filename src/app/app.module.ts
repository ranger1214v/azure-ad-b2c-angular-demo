import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgModule} from '@angular/core';

import {MsalRedirectComponent,} from '@azure/msal-angular';
import {AppComponent} from "./app.component";
import {AzureModule} from "./azure/azure.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AzureModule,
  ],
  providers: [],
  bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule {
}
