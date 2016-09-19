import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {Hello} from './app.component.js';

@NgModule({
    imports: [BrowserModule],
    declarations: [Hello],
    bootstrap: [Hello]
})
export class AppModule {}
