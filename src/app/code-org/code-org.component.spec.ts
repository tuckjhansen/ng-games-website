import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOrgComponent } from './code-org.component';

describe('CodeOrgComponent', () => {
  let component: CodeOrgComponent;
  let fixture: ComponentFixture<CodeOrgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeOrgComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeOrgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
