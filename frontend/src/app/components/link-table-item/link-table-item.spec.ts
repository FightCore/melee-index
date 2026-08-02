import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTableItem } from './link-table-item';

describe('LinkTableItem', () => {
  let component: LinkTableItem;
  let fixture: ComponentFixture<LinkTableItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkTableItem],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkTableItem);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
