import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsService} from '@app/core/services/events.service';
import {EventModel} from '@app/core/models/event.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DatePipe, Location} from '@angular/common';
import {ToastService} from '@app/core/services/toast.service';

@Component({
  selector: 'app-events-update',
  templateUrl: './events-update.component.html',
  styleUrls: ['./events-update.component.scss']
})
export class EventsUpdateComponent implements OnInit {
  public event: EventModel;
  public form: FormGroup;
  public fileData: File = null;
  public startDate;
  public endDate;

  constructor(private route: ActivatedRoute, private eventsService: EventsService,
              private builder: FormBuilder, private location: Location,
              private datePipe: DatePipe,
              private router: Router,
              private toast: ToastService) {
    this.route.params.subscribe((params) => {
      const eventId = params['id'];
      this.eventsService.getEventById(eventId).subscribe((response) => {
        this.event = response;
        this.event.startTime = new Date(this.event.startTime);
        this.event.endTime = new Date(this.event.endTime);
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
      this.event.imageUrl = reader.result;
    };
  }

  public onCreateForm(): void {
    const user = JSON.parse(localStorage.getItem('userId'));
    this.form = this.builder.group({
      description: [this.event.description, Validators.required],
      endTime: [this.event.endTime, Validators.required],
      participationFee: [this.event.participationFee, Validators.required],
      image: [this.event.imageUrl, Validators.required],
      location: [this.event.location, Validators.required],
      startTime: [this.event.startTime, Validators.required],
      title: [this.event.title, Validators.required]
    });
  }

  public onBack(): void {
    this.location.back();
  }

  public onCancel(): void {
    this.event.imageUrl = null;
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
    this.startDate = this.datePipe.transform(this.event.startTime, 'yyyy-MM-dd HH:mm:ssZ');
    this.endDate = this.datePipe.transform(this.event.endTime, 'yyyy-MM-dd HH:mm:ssZ');
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('title', data.title);
    formData.append('description', data.description);
    formData.append('startTime', this.startDate);
    formData.append('endTime', this.endDate);
    formData.append('location', data.location);
    formData.append('participationFee', data.participationFee);
    this.eventsService.patchEvent(formData, this.event.id).subscribe(event => {
        this.router.navigate(['/admin/events']);
        setTimeout(() => {
          this.toast.toastSuccess(`Updated article with id ${event.id}`);
        }, 0);
      },
      error => {
        this.toast.toastError(error);
      }
    );
  }

}
