import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityhomeComponent } from './unityhome.component';

describe('UnityhomeComponent', () => {
  let component: UnityhomeComponent;
  let fixture: ComponentFixture<UnityhomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnityhomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnityhomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
