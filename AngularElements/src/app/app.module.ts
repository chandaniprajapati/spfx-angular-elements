import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';

import { AngularElementsWebPartComponent } from './angular-elements-web-part/angular-elements-web-part.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
@NgModule({
  declarations: [
    AngularElementsWebPartComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  entryComponents: [AngularElementsWebPartComponent]
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const el = createCustomElement(AngularElementsWebPartComponent, { injector: this.injector });
    customElements.define('app-angular-elements-web-part', el);
  }
}
