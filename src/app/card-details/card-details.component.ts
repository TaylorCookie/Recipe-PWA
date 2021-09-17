import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from 'src/assets/interfaces/recipe';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.css'],
})
export class CardDetailsComponent implements OnInit {
  @Input() recipe?: Recipe;
  timeFormatted?: string;

  constructor() {}

  ngOnInit(): void {
    this.convertTime(this.recipe?.time);
  }

  convertTime(time: number | undefined): void {
    if (time === undefined) return;

    const hours = Math.trunc(time / 60);
    const minutes = time % 60;

    if (hours == 0) {
      this.timeFormatted = `${minutes}min`;
    } else if (minutes == 0) {
      this.timeFormatted = `${hours}hr`;
    } else {
      this.timeFormatted = `${hours}:${minutes}`;
    }
  }
}
