import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HitboxesMergedTableComponent } from './hitboxes-merged-table.component';

describe('HitboxesMergedTableComponent', () => {
  let component: HitboxesMergedTableComponent;
  let fixture: ComponentFixture<HitboxesMergedTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HitboxesMergedTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HitboxesMergedTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
