import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrouchCancelPercentagesTableComponent } from './crouch-cancel-percentages-table.component';

describe('CrouchCancelPercentagesTableComponent', () => {
  let component: CrouchCancelPercentagesTableComponent;
  let fixture: ComponentFixture<CrouchCancelPercentagesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CrouchCancelPercentagesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CrouchCancelPercentagesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
