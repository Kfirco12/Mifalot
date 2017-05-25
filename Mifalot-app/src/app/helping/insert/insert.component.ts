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
private team = 'מתנ"ס בית חנינה - בנים';

  constructor(private afService: AF) { }

  private readSingleFile(e) {
    var fileName = e.target.files[0];
    console.log("f   "+fileName);
    if (!fileName) {
      return;
    }
    var reader = new FileReader();
    reader.readAsText(fileName,'ISO-8859-8');
    reader.onload = file => {
      
      var contents: any = file.target;
      this.text = contents.result;
      //console.log(reader.result.substring(0, 1000));
      //this.st = reader.result;
      //console.log(this.st);
      var readInStrings = reader.result.split('\n');
       var toStore = { name: '', lastName:'',ID: Number, missed:0 };
      for(var i=0; i<readInStrings.length; i++){
        if(i%3 == 0)
          toStore.name = readInStrings[i];
  
        else if(i%3 == 1)
          toStore.lastName = readInStrings[i];
        
         else if(i%3 == 2){
          toStore.ID = readInStrings[i];
          this.students.push(toStore);
          toStore = { name: '', lastName:'',ID: Number, missed:0 };
        }
      }
      

      
      console.log(this.students);
    };
    
    
   //console.log(reader.readAsText(fileName))
   //console.log(this.str);

}

  ngOnInit() {
  }

}
