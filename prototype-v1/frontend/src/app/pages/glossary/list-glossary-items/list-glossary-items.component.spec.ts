import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListGlossaryItemsComponent } from './list-glossary-items.component';

describe('ListGlossaryItemsComponent', () => {
  let component: ListGlossaryItemsComponent;
  let fixture: ComponentFixture<ListGlossaryItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListGlossaryItemsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ListGlossaryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
