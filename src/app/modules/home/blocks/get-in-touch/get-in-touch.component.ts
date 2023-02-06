import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilityService} from '@app/core/services/utility.service';
import {ToastService} from '@app/core/services/toast.service';


@Component({
  selector: 'app-get-in-touch',
  templateUrl: './get-in-touch.component.html',
  styleUrls: ['./get-in-touch.component.scss']
})
export class GetInTouchComponent implements OnInit, AfterViewInit {
  @ViewChild('subscribe', {static: false}) subscribe: ElementRef;
  public form: FormGroup = this.formBuilder.group({
    email: [null, Validators.compose([Validators.required, Validators.email])],
    subject: [null, Validators.required],
    message: [null, Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(156)])]
  });


  constructor(private formBuilder: FormBuilder,
              private utility: UtilityService,
              private toast: ToastService) {
  }

  public ngOnInit(): void {
  }
  public ngAfterViewInit(): void {
    this.utility.setElement(this.subscribe);
  }

  public onSubmit(): void {
    this.form.reset();
    this.toast.toastSuccess('Subscribed to news letter!');
  }

  get email() {
    return this.form.get('email');
  }

  get subject() {
    return this.form.get('subject');
  }

  get message() {
    return this.form.get('message');
  }

}
