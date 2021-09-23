import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HerokuWarningCardComponent } from './heroku-warning-card.component';

describe('HerokuWarningCardComponent', () => {
  let component: HerokuWarningCardComponent;
  let fixture: ComponentFixture<HerokuWarningCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HerokuWarningCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HerokuWarningCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
