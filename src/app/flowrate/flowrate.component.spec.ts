import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlowrateComponent } from './flowrate.component';

describe('DungeoncrawlerComponent', () => {
  let component: FlowrateComponent;
  let fixture: ComponentFixture<FlowrateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlowrateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlowrateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
