import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterSelectionBarComponent } from './character-selection-bar.component';

describe('CharacterSelectionBarComponent', () => {
  let component: CharacterSelectionBarComponent;
  let fixture: ComponentFixture<CharacterSelectionBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CharacterSelectionBarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterSelectionBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
