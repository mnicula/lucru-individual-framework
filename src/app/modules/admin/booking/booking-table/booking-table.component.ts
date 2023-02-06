import {Component, OnInit} from '@angular/core';
import {RoomModel} from '@app/core/models/room.model';
import {BookingService} from '@app/core/services/booking.service';
import {UtilityService} from '@app/core/services/utility.service';
import {ToastService} from '@app/core/services/toast.service';

@Component({
  selector: 'app-booking-table',
  templateUrl: './booking-table.component.html',
  styleUrls: ['./booking-table.component.scss']
})
export class BookingTableComponent implements OnInit {
  public booking: RoomModel[];
  public isOpen: boolean;
  public id: number;
  public index: number;

  constructor(private bookingService: BookingService, private utilityService: UtilityService,
              private toastService: ToastService) {
    this.isOpen = false;
    this.bookingService.getRooms().subscribe((rooms) => {
      this.booking = rooms;
    });
  }

  public ngOnInit(): void {
    this.utilityService.getOpen.subscribe((response) => this.isOpen = response);
  }

  public onUpdate(object): void {
    this.utilityService.setObject(object);
  }

  public onRead(id): void {
    this.utilityService.setArticleId(id);
  }

  public onOpen(id, index): void {
    this.id = id;
    this.index = index;
  }

  public onDelete(id, index): void {
    this.bookingService.deleteRoom(id).subscribe((response) => {
      this.booking.splice(index, 1);
      this.toastService.toastSuccess('You have deleted an room!');
    }, error => {
      this.toastService.toastSuccess(error);
    });
  }

}
