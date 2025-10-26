import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FrameDataBreadcrumbsComponent } from './frame-data-breadcrumbs.component';

describe('FrameDataBreadcrumbsComponent', () => {
  let component: FrameDataBreadcrumbsComponent;
  let fixture: ComponentFixture<FrameDataBreadcrumbsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FrameDataBreadcrumbsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FrameDataBreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
