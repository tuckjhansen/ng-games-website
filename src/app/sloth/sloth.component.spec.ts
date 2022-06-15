import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlothComponent } from './sloth.component';

describe('SlothComponent', () => {
  let component: SlothComponent;
  let fixture: ComponentFixture<SlothComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlothComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlothComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
