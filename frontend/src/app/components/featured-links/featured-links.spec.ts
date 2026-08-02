import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FeaturedLinks } from './featured-links';

describe('FeaturedLinks', () => {
  let component: FeaturedLinks;
  let fixture: ComponentFixture<FeaturedLinks>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FeaturedLinks],
    }).compileComponents();

    fixture = TestBed.createComponent(FeaturedLinks);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
