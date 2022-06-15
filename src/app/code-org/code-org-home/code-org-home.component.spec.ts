import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOrgHomeComponent } from './code-org-home.component';

describe('CodeOrgHomeComponent', () => {
  let component: CodeOrgHomeComponent;
  let fixture: ComponentFixture<CodeOrgHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodeOrgHomeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CodeOrgHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
