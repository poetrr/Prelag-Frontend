import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApiconnectingComponent } from './apiconnecting.component';

describe('ApiconnectingComponent', () => {
  let component: ApiconnectingComponent;
  let fixture: ComponentFixture<ApiconnectingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApiconnectingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApiconnectingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
