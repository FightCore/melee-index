import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PngAnimationPlayerComponent } from './png-animation-player.component';

describe('PngAnimationPlayerComponent', () => {
  let component: PngAnimationPlayerComponent;
  let fixture: ComponentFixture<PngAnimationPlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PngAnimationPlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PngAnimationPlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
