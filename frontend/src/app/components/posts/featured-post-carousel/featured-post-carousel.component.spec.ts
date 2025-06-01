import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedPostCarouselComponent } from './featured-post-carousel.component';

describe('FeaturedPostCarouselComponent', () => {
  let component: FeaturedPostCarouselComponent;
  let fixture: ComponentFixture<FeaturedPostCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedPostCarouselComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FeaturedPostCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
