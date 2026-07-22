import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitTimelineComponent } from './hit-timeline.component';

describe('HitTimelineComponent', () => {
  let component: HitTimelineComponent;
  let fixture: ComponentFixture<HitTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitTimelineComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
