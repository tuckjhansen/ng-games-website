import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitySpacePirateHuntersComponent } from './unity-space-pirate-hunters.component';

describe('UnitySpacePirateHuntersComponent', () => {
  let component: UnitySpacePirateHuntersComponent;
  let fixture: ComponentFixture<UnitySpacePirateHuntersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnitySpacePirateHuntersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnitySpacePirateHuntersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
