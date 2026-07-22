import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDataCharacterPageComponent } from './frame-data-character-page.component';

describe('FrameDataCharacterPageComponent', () => {
  let component: FrameDataCharacterPageComponent;
  let fixture: ComponentFixture<FrameDataCharacterPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameDataCharacterPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameDataCharacterPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
