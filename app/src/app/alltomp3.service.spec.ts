/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { Alltomp3Service } from './alltomp3.service';

describe('Alltomp3Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Alltomp3Service]
    });
  });

  it('should ...', inject([Alltomp3Service], (service: Alltomp3Service) => {
    expect(service).toBeTruthy();
  }));
});
