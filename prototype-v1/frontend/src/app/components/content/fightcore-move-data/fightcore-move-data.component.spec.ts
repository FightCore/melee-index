import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FightcoreMoveDataComponent } from './fightcore-move-data.component';

describe('FightcoreMoveDataComponent', () => {
  let component: FightcoreMoveDataComponent;
  let fixture: ComponentFixture<FightcoreMoveDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FightcoreMoveDataComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FightcoreMoveDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
