import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatechangesComponent } from './statechanges.component';

describe('StatechangesComponent', () => {
  let component: StatechangesComponent;
  let fixture: ComponentFixture<StatechangesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatechangesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StatechangesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
