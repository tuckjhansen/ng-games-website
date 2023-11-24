import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DungeoncrawlerComponent } from './dungeoncrawler.component';

describe('DungeoncrawlerComponent', () => {
  let component: DungeoncrawlerComponent;
  let fixture: ComponentFixture<DungeoncrawlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DungeoncrawlerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DungeoncrawlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
