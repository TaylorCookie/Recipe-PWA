import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkeletonLoadingCardsComponent } from './skeleton-loading-cards.component';

describe('SkeletonLoadingCardsComponent', () => {
  let component: SkeletonLoadingCardsComponent;
  let fixture: ComponentFixture<SkeletonLoadingCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SkeletonLoadingCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SkeletonLoadingCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
