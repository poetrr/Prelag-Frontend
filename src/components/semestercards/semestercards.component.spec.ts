import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SemestercardsComponent } from './semestercards.component';

describe('SemestercardsComponent', () => {
  let component: SemestercardsComponent;
  let fixture: ComponentFixture<SemestercardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SemestercardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SemestercardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
