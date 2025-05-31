import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SourceOverviewComponent } from './source-overview.component';

describe('SourceOverviewComponent', () => {
  let component: SourceOverviewComponent;
  let fixture: ComponentFixture<SourceOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SourceOverviewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SourceOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
