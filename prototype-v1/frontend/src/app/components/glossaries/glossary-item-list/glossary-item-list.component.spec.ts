import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryItemListComponent } from './glossary-item-list.component';

describe('GlossaryItemListComponent', () => {
  let component: GlossaryItemListComponent;
  let fixture: ComponentFixture<GlossaryItemListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlossaryItemListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GlossaryItemListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
