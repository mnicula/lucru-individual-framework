import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ArticleService} from '@app/core/services/article.service';
import {Router} from '@angular/router';
import {ToastService} from '@app/core/services/toast.service';
import {BookingService} from '@app/core/services/booking.service';

@Component({
  selector: 'app-booking-create',
  templateUrl: './booking-create.component.html',
  styleUrls: ['./booking-create.component.scss']
})
export class BookingCreateComponent implements OnInit {
  public fileData: File = null;
  public previewUrl: any = '';
  public form: FormGroup;

  constructor(private builder: FormBuilder,
              private bookingService: BookingService,
              private router: Router,
              private toast: ToastService) {
    this.createForm();
  }

  ngOnInit() {
  }

  public fileProgress(fileInput: any) {
    this.fileData = fileInput.target.files[0];
    this.preview();
  }

  public createForm(): void {
    this.form = this.builder.group({
      name: [null, Validators.required],
      description: [null, Validators.required],
      pricePerHour: [null, Validators.required]
    });
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

  get name() {
    return this.form.get('name');
  }

  get description() {
    return this.form.get('description');
  }

  get price() {
    return this.form.get('pricePerHour');
  }

  public onSubmit(): void {
    const data = this.form.value;
    const formData = new FormData();
    formData.append('image', this.fileData);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('pricePerHour', data.pricePerHour);
    this.bookingService.postRoom(formData).subscribe(event => {
        this.router.navigate([`/admin/booking/`]);
        setTimeout(() => {
          this.toast.toastSuccess(`Added an article with id ${event.id}`);
        }, 200);
      }, error => {
        this.toast.toastError(error);
      }
    );
  }

  public allowOnlyNumbers(event): void {
    const char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
      event.preventDefault();
    }
  }

}
