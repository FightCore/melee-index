import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSourceComponent } from './create-source.component';

describe('CreateSourceComponent', () => {
  let component: CreateSourceComponent;
  let fixture: ComponentFixture<CreateSourceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSourceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSourceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
