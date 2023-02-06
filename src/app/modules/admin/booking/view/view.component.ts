import { Component, OnInit } from '@angular/core';
import {UtilityService} from '@app/core/services/utility.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {RoomModel} from '@app/core/models/room.model';
import {BookingService} from '@app/core/services/booking.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {

  public room: RoomModel;
  public dataLoaded: boolean;

  constructor(private utilityService: UtilityService, private route: ActivatedRoute,
              private bookingService: BookingService, private location: Location) {
    this.dataLoaded = false;
    this.utilityService.getArticleId.subscribe((id) => {
      if (id === null) {
        this.route.params.subscribe((params) => {
          const roomId = params['id'];
          this.bookingService.getRoomById(roomId).subscribe((response) => {
            this.room = response;
            this.dataLoaded = true;
          });
        });
      } else {
        this.bookingService.getRoomById(id).subscribe((response) => {
          this.room = response;
          this.dataLoaded = true;
        });
      }
    });
  }

  ngOnInit() {
  }

  public onBack(): void {
    this.location.back();
  }

}
