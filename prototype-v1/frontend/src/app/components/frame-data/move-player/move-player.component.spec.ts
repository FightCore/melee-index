import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovePlayerComponent } from './move-player.component';

describe('MovePlayerComponent', () => {
  let component: MovePlayerComponent;
  let fixture: ComponentFixture<MovePlayerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovePlayerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MovePlayerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
