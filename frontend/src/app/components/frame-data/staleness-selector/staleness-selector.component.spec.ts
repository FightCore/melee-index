import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StalenessSelectorComponent } from './staleness-selector.component';

describe('StalenessSelectorComponent', () => {
  let component: StalenessSelectorComponent;
  let fixture: ComponentFixture<StalenessSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StalenessSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StalenessSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
