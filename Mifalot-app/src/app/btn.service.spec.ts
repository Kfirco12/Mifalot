/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BtnService } from './btn.service';

describe('BtnService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BtnService]
    });
  });

  it('should ...', inject([BtnService], (service: BtnService) => {
    expect(service).toBeTruthy();
  }));
});
