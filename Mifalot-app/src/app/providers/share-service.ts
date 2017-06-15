
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()

export class ShareService 
{
  private backButton: { name: string, icon: string };

  // ================================

  constructor(private router: Router) 
  {
    this.backButton = { name: '' , icon: '' };
  }

  // ================================
  // Uses routes array in app.module.ts
  
  navigate(page: string)
  {
    this.router.navigate([page]);
  }
  
  // ================================

  updateBackButton(type)
  {
    if (type == 'home')
    {
      this.backButton.name = 'דף הבית';
      this.backButton.icon = 'fa-home';
    }
    else if (type == 'back')
    {
      this.backButton.name = 'חזור';
      this.backButton.icon = 'fa-chevron-left';
    }
    else
      this.backButton.name = this.backButton.icon = '';
  }
  
  // ================================

  getButton()
  {
    return this.backButton;
  }

  // ================================

}

