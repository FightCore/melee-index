import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LatestPostCarouselComponent } from './latest-post-carousel.component';

describe('LatestPostCarouselComponent', () => {
  let component: LatestPostCarouselComponent;
  let fixture: ComponentFixture<LatestPostCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LatestPostCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LatestPostCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
