import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemesterpageComponent } from './semesterpage.component';

describe('SemesterpageComponent', () => {
  let component: SemesterpageComponent;
  let fixture: ComponentFixture<SemesterpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemesterpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemesterpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
