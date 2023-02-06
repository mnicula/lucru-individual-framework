import {Component, OnInit} from '@angular/core';
import {CarouselModel} from '../../../../core/models/carousel.model';

@Component({
  selector: 'app-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.scss']
})
export class PhotosComponent implements OnInit {
  public items: CarouselModel[];

  constructor() {
    this.items = [
      {
        image: 'https://b2h3x3f6.stackpathcdn.com/assets/landing/img/main-bg.jpg',
        active: true,
        data: 1
      },
      {
        image: 'https://www.mkarchitects.com/wp-content/uploads/2019/08/6-1.jpg',
        data: 2
      },
      {
        image: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/Lubelski_zamek_z_Kaplic%C4%85_%C5%9Bw._Tr%C3%B3jcy_-_panoramio.jpg',
        active: false,
        data: 3
      },
      {
        image: 'https://www.mkarchitects.com/wp-content/uploads/2019/08/7-1.jpg' +
          '',
        active: false,
        data: 4
      }
      ,
      {
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSuLdCmkbm0ixi3UCwDEgvMRkSTUoHK6CCNYSq8u9Bni0b5gMuu&usqp=CAU',
        active: false,
        data: 5
      }

    ];
  }

  ngOnInit() {
  }

}
