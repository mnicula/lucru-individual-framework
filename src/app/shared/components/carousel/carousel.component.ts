import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';
import {EventModel} from '@app/core/models/event.model';


@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  animations: [
    trigger('carouselAnimation', [
      transition('void => *', [
        style({opacity: 0}),
        animate('300ms', style({opacity: 1}))
      ]),
      transition('* => void', [
        animate('300ms', style({opacity: 0}))
      ])
    ])]

})

export class CarouselComponent implements OnInit {
  @Input() slides: EventModel[];
  public firstSlide = 0;
  public secondSlide = 1;
  public item1: EventModel;
  public item2: EventModel;

  constructor() {
  }

  public ngOnInit(): void {
    this.slides.forEach((item, index) => {
      this.item1 = index === this.firstSlide ? item : this.item1;
      this.item2 = index === this.secondSlide ? item : this.item2;
    });
  }

  public onPreviousClick(): void {
    const first = this.firstSlide - 1;
    const previous = this.secondSlide - 1;
    this.firstSlide = first < 0 ? this.slides.length - 1 : first;
    this.secondSlide = previous < 0 ? this.slides.length - 1 : previous;
    this.slides.forEach((item, index) => {
      this.item1 = index === this.firstSlide ? item : this.item1;
      this.item2 = index === this.secondSlide ? item : this.item2;
    });
  }

  public onNextClick(): void {
    const first = this.firstSlide + 1;
    const next = this.secondSlide + 1;
    this.firstSlide = first === this.slides.length ? 0 : first;
    this.secondSlide = next === this.slides.length ? 0 : next;
    this.slides.forEach((item, index) => {
      this.item1 = index === this.firstSlide ? item : this.item1;
      this.item2 = index === this.secondSlide ? item : this.item2;
    });
  }
}
