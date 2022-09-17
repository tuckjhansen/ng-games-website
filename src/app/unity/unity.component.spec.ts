import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnityComponent } from './unity.component';

describe('UnityComponent', () => {
  let component: UnityComponent;
  let fixture: ComponentFixture<UnityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UnityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
