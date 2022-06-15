import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BounceUpComponent } from './bounce-up.component';

describe('BounceUpComponent', () => {
  let component: BounceUpComponent;
  let fixture: ComponentFixture<BounceUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BounceUpComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BounceUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
