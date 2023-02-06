import {Component, ErrorHandler, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EventsService} from '@app/core/services/events.service';
import {ToastService} from '@app/core/services/toast.service';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-events-create',
  templateUrl: './events-create.component.html',
  styleUrls: ['./events-create.component.scss']
})
export class EventsCreateComponent implements OnInit {
  public fileData: File = null;
  public previewUrl: any = '';
  public startDate;
  public endDate;
  public user = JSON.parse(localStorage.getItem('userId'));
  public form: FormGroup = this.builder.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
    userId: [this.user.id],
    endTime: ['', Validators.required],
    startTime: ['', Validators.required],
    location: ['', Validators.required],
    participationFee: [0, Validators.required]
  });

  constructor(private builder: FormBuilder,
              private router: Router,
              private eventsService: EventsService,
              private toast: ToastService,
              private datePipe: DatePipe) {
  }

  public ngOnInit() {
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
      this.previewUrl = reader.result;
    };
  }

  public onCancel(): void {
    this.fileData = null;
    this.previewUrl = null;
  }

  public onSubmit(): void {
    const data = this.form.value;
    const fee = Number(this.form.value.participationFee);
    const formData = new FormData();
    console.log(this.startDate);
    console.log(this.endDate);
    formData.append('image', this.fileData);
    formData.append('title', data.title);
    formData.append('participationFee', `${fee}`);
    formData.append('startTime', this.startDate);
    formData.append('endTime', this.endDate);
    formData.append('location', data.location);
    formData.append('description', data.description);
    formData.append('userId', data.userId);
    this.eventsService.postEvent(formData).subscribe(event => {
        this.router.navigate([`/admin/events/`]);
        setTimeout(() => {
          this.toast.toastSuccess(`Added an event with id ${event.id}`);
        }, 0);
      },
      (error) => {
        this.toast.toastError(error);
      }
    );
  }

  public onNumberType(event): void {
    const char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
      event.preventDefault();
    }
  }

  public changeFormatStart(e): void {
    const data = new Date(e);
    this.startDate = this.datePipe.transform(data, 'yyyy-MM-dd HH:mm:ssZ');
  }

  public changeFormatEnd(e): void {
    const data = new Date(e);
    this.endDate = this.datePipe.transform(data, 'yyyy-MM-dd HH:mm:ssZ');
  }

}
