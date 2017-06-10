import { Component, OnInit } from '@angular/core';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AF } from "../../providers/af";

@Component({
  selector: 'app-insert',
  templateUrl: './insert.component.html',
  styleUrls: ['./insert.component.css']
})
export class InsertComponent implements OnInit {

private text;
private students = [];
private str = '' ;
private team = 'מתנ"ס סילואן - בנים 2';
private output = 'out:\n';

  constructor(private afService: AF) { }

  private readSingleFile(e) {
    let fileName = e.target.files[0];
    console.log("f   "+fileName);
    if (!fileName) { 
      return;
    }
    let reader = new FileReader();
    reader.readAsText(fileName,'ISO-8859-8');
    reader.onload = file => {
      
      let contents: any = file.target;
      this.text = contents.result;
      let readInStrings = reader.result.split('\r\n');
       let pupils = { name: '', lastName:'',ID: Number, missed:0 };
      for(let i=0; i<readInStrings.length; i++){
        if(i%3 == 0){
          pupils.name = readInStrings[i];
          this.output += readInStrings[i];
          this.output += '\t';
        }
  
        else if(i%3 == 1){
          pupils.lastName = readInStrings[i];
          this.output += readInStrings[i];
          this.output += '\t';
      }
         else if(i%3 == 2){
          pupils.ID = readInStrings[i];
          this.output += readInStrings[i];
          this.output += '\t';
          this.students.push(pupils);
          this.afService.af.database.list('teams/'+this.team+'/pupils').push(pupils);
          pupils = { name: '', lastName:'',ID: Number, missed:0 };
        }
      }
      
      this.afService.af.database.list('teams/').update(this.team,{name:this.team});
      this.afService.af.database.list('teams/').update(this.team,{coachID:''});
      this.afService.af.database.list('teams/').update(this.team,{managerID:''});
//var info = 
      console.log(this.students);
    };
    

}

  ngOnInit() {
  }

}
//<app-insert></app-insert>