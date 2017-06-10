import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})

export class LoadingComponent implements OnInit 
{
  constructor(private router: Router) {}

  // ====================

  ngOnInit() 
  {
     setTimeout(() => { this.router.navigate(['']); }, 1000);  // 1s
  }

  // ====================

}
