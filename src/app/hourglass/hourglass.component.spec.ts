import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HourglassComponent } from './hourglass.component';

describe('HourglassComponent', () => {
  let component: HourglassComponent;
  let fixture: ComponentFixture<HourglassComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HourglassComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HourglassComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
