import { Component, OnInit } from '@angular/core';
import {RoomModel} from '@app/core/models/room.model';
import {BookingService} from '@app/core/services/booking.service';
import {AuthService} from '@app/core/services/auth.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  public spaces: RoomModel[];
  public scroll;
  public image: string;
  public isAuthenticated: boolean;

  constructor(private bookingService: BookingService,
              private authService: AuthService) {
    this.image = '../../../assets/images/booking.svg';
    this.bookingService.getRooms().subscribe((response) => {
      this.spaces = response;
    });
  }

  public ngOnInit(): void {
    this.authService.currentUser$.subscribe((response) => {
      this.isAuthenticated = response !== null;
    });
  }

  public onScroll(id): void {
    this.scroll = document.getElementById(id);
    this.scroll.scrollIntoView({behavior: 'smooth', block: 'center'});
  }

}
