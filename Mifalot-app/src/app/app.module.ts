import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { BtnService } from './btn.service';
import { AppComponent } from './app.component';
import { MButtonComponent } from './m-button/m-button.component';
import { MainComponent } from './main/main.component';

@NgModule({
  declarations: [
    AppComponent,
    MButtonComponent,
    MainComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [BtnService],
  bootstrap: [AppComponent]
})
export class AppModule { }
