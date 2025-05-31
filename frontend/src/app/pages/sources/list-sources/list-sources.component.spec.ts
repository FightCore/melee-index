import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSourcesComponent } from './list-sources.component';

describe('ListSourcesComponent', () => {
  let component: ListSourcesComponent;
  let fixture: ComponentFixture<ListSourcesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListSourcesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSourcesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
