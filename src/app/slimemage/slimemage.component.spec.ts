import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlimemageComponent } from './slimemage.component';

describe('SlimemageComponent', () => {
  let component: SlimemageComponent;
  let fixture: ComponentFixture<SlimemageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlimemageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlimemageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
