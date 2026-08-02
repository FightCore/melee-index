import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkTable } from './link-table';

describe('LinkTable', () => {
  let component: LinkTable;
  let fixture: ComponentFixture<LinkTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinkTable],
    }).compileComponents();

    fixture = TestBed.createComponent(LinkTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
