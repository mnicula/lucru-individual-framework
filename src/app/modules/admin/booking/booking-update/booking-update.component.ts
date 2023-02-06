import {Component, OnInit} from '@angular/core';
import {EventModel} from '@app/core/models/event.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '@app/core/services/events.service';
import {DatePipe, Location} from '@angular/common';
import {ToastService} from '@app/core/services/toast.service';
import {RoomModel} from '@app/core/models/room.model';
import {BookingService} from '@app/core/services/booking.service';

@Component({
  selector: 'app-booking-update',
  templateUrl: './booking-update.component.html',
  styleUrls: ['./booking-update.component.scss']
})
export class BookingUpdateComponent implements OnInit {

  public room: RoomModel;
  public form: FormGroup;
  public fileData: File = null;

  constructor(private route: ActivatedRoute, private bookingService: BookingService,
              private builder: FormBuilder, private location: Location,
              private router: Router,
              private toast: ToastService) {
    this.route.params.subscribe((params) => {
      const roomId = params['id'];
      this.bookingService.getRoomById(roomId).subscribe((response) => {
        this.room = response;
        this.onCreateForm();
      });
    });
  }

  ngOnInit() {
  }

  public fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  public preview(): void {
    const mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.fileData);
    reader.onload = (event) => {
      this.room.imageUrl = reader.result;
    };
  }

  public onCreateForm(): void {
    this.form = this.builder.group({
      description: [this.room.description, Validators.required],
      image: [this.room.imageUrl, Validators.required],
      name: [this.room.name, Validators.required],
      pricePerHour: [this.room.pricePerHour, Validators.required],
      roomId: [this.room.id]
    });
  }

  public onBack(): void {
    this.location.back();
  }

  public onCancel(): void {
    this.room.imageUrl = null;
    this.fileData = null;
  }

  public onNumberType(event): void {
    const char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
      event.preventDefault();
    }
  }

  public onSubmit(): void {
    const data = this.form.value;
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('pricePerHour', data.pricePerHour);
    formData.append('roomId', data.roomId);
    this.bookingService.patchRoom(formData, data.roomId).subscribe(room => {
        this.router.navigate(['/admin/booking']);
        setTimeout(() => {
          this.toast.toastSuccess(`Updated room with id ${room.id}`);
        }, 0);
      },
      error => {
        this.toast.toastError(error);
      }
    );
  }


}
