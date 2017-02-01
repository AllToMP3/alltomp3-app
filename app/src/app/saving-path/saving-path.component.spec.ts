/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SavingPathComponent } from './saving-path.component';

describe('SavingPathComponent', () => {
  let component: SavingPathComponent;
  let fixture: ComponentFixture<SavingPathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavingPathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavingPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
