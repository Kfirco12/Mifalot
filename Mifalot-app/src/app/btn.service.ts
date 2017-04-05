import { Injectable } from '@angular/core';

@Injectable()
export class BtnService {
  private id: String;
  private txt: String;
  private bg_color: String;
  private shadow_color: String;

  constructor(id:String, txt:String, bg_color:String, shdow_color: String) {
    this.id = id;
    this.txt = txt;
    this.bg_color = bg_color;
    this.shadow_color = shdow_color;
   }

}
