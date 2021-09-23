import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton-loading-cards',
  templateUrl: './skeleton-loading-cards.component.html',
  styleUrls: ['./skeleton-loading-cards.component.css'],
})
export class SkeletonLoadingCardsComponent implements OnInit {
  @Input() herokuWarning: boolean = false;

  constructor() {}

  ngOnInit(): void {}
}
