import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryItemComponent } from './glossary-item.component';

describe('GlossaryItemComponent', () => {
  let component: GlossaryItemComponent;
  let fixture: ComponentFixture<GlossaryItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlossaryItemComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlossaryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
