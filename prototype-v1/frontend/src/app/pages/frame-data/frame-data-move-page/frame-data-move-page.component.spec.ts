import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDataMovePageComponent } from './frame-data-move-page.component';

describe('FrameDataMovePageComponent', () => {
  let component: FrameDataMovePageComponent;
  let fixture: ComponentFixture<FrameDataMovePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameDataMovePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameDataMovePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
