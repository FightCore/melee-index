import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteSectionCardComponent } from './website-section-card.component';

describe('WebsiteSectionCardComponent', () => {
  let component: WebsiteSectionCardComponent;
  let fixture: ComponentFixture<WebsiteSectionCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebsiteSectionCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WebsiteSectionCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
