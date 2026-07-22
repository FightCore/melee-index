import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDataOverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: FrameDataOverviewComponent;
  let fixture: ComponentFixture<FrameDataOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameDataOverviewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FrameDataOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
