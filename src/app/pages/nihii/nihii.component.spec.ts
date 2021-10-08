import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NihiiComponent } from './nihii.component';

describe('NihiiComponent', () => {
  let component: NihiiComponent;
  let fixture: ComponentFixture<NihiiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NihiiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NihiiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
