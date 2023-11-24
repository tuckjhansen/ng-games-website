import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastdysonComponent } from './lastdyson.component';

describe('LastdysonComponent', () => {
  let component: LastdysonComponent;
  let fixture: ComponentFixture<LastdysonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LastdysonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LastdysonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
