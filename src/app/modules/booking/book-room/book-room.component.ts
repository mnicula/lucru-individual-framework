import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookingService} from '@app/core/services/booking.service';
import {RoomModel} from '@app/core/models/room.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {ToastService} from '@app/core/services/toast.service';

@Component({
  selector: 'app-book-room',
  templateUrl: './book-room.component.html',
  styleUrls: ['./book-room.component.scss']
})
export class BookRoomComponent implements OnInit {
  public room: RoomModel;
  public form: FormGroup;
  public startDate;
  public endDate;

  constructor(private route: ActivatedRoute,
              private formBuilder: FormBuilder,
              private bookingService: BookingService,
              private datePipe: DatePipe,
              private toast: ToastService,
              private router: Router) {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      this.bookingService.getRoomById(id).subscribe((response) => {
        this.room = response;
      });
    });
    this.createForm();
  }

  ngOnInit() {
  }

  public createForm(): void {
    this.form = this.formBuilder.group({
      fullName: [null, Validators.required],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      date: [null, Validators.required],
      startTime: [null, Validators.required],
      endTime: [null, Validators.required],
      reason: [null, Validators.required],
      comment: [null, Validators.required]
    });
  }

  public get email() {
    return this.form.get('email');
  }

  public get fullName() {
    return this.form.get('fullName');
  }

  public get date() {
    return this.form.get('date');
  }

  public get startTime() {
    return this.form.get('startTime');
  }

  public get endTime() {
    return this.form.get('endTime');
  }

  public get reason() {
    return this.form.get('reason');
  }

  public get comment() {
    return this.form.get('comment');
  }

  public changeFormatStart(e): void {
    const data = new Date(e);
    this.startDate = this.datePipe.transform(data, 'yyyy-MM-dd HH:mm:ssZ');
  }

  public changeFormatEnd(e): void {
    const data = new Date(e);
    this.endDate = this.datePipe.transform(data, 'yyyy-MM-dd HH:mm:ssZ');
  }

  public onSubmit(): void {
    this.toast.toastSuccess('Booked a room with success!');
    this.form.reset();
    setTimeout(() => {
      this.router.navigate(['/booking']);
    }, 3000);
  }

}
