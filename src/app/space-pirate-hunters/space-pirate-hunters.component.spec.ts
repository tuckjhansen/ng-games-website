import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacePirateHuntersComponent } from './space-pirate-hunters.component';

describe('SpacePirateHuntersComponent', () => {
  let component: SpacePirateHuntersComponent;
  let fixture: ComponentFixture<SpacePirateHuntersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacePirateHuntersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacePirateHuntersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
