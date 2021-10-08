import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SsinComponent } from './ssin.component';

describe('SsinComponent', () => {
  let component: SsinComponent;
  let fixture: ComponentFixture<SsinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SsinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SsinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
