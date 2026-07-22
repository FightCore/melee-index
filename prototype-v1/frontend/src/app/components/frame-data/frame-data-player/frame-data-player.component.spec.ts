import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDataPlayerComponent } from './frame-data-player.component';

describe('FrameDataPlayerComponent', () => {
  let component: FrameDataPlayerComponent;
  let fixture: ComponentFixture<FrameDataPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameDataPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameDataPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
