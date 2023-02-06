import {Component, OnInit} from '@angular/core';
import {UserModel} from '@app/core/models/user.model';
import {AuthService} from '@app/core/services/auth.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {ToastService} from '@app/core/services/toast.service';
import {ActivatedRoute, Router} from '@angular/router';
import {PaymentService} from '@app/core/services/payment.service';
import {EventDetails} from '@app/core/models/payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  public isAuthenticated: boolean;
  public currentUser: UserModel;
  public isSignPage: boolean;
  public isJoinPage: boolean;
  public signInForm: FormGroup;
  public registerForm: FormGroup;
  public error: string;
  public checked: boolean;
  public errorRegister: string;
  public billingForm: FormGroup;
  public code: string;
  public cardDetails: FormGroup;
  public nameCard = '';
  public card = '';
  public eventId = null;
  public step3: boolean;
  public eventDetails: EventDetails;
  public orderId: number;


  constructor(private auth: AuthService, private formBuilder: FormBuilder,
              private toast: ToastService, private route: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router) {
    this.code = '';
    this.checked = false;
    this.step3 = false;
    this.error = '';
    this.isJoinPage = false;
    this.isSignPage = true;
    this.isAuthenticated = false;
    this.auth.currentUser$.subscribe((response: UserModel) => {
      this.currentUser = response;
      this.isAuthenticated = !!this.currentUser;
    });
    this.createFormSign();
    this.createFormRegister();
    this.createBillingForm();
    this.createCardForm();
    this.route.params.subscribe((params) => {
      this.eventId = params['id'];
    });
  }

  ngOnInit() {
  }

  public createFormSign(): void {
    this.signInForm = this.formBuilder.group({
      username: [null, Validators.required],
      password: [null, Validators.required]
    });
  }

  public createFormRegister(): void {
    this.registerForm = this.formBuilder.group({
      username: [null, Validators.compose([Validators.required])],
      email: [null, Validators.compose([Validators.required, Validators.email])],
      password: [null, Validators.required]
    });
  }

  public get username() {
    return this.signInForm.get('username');
  }

  public get password() {
    return this.signInForm.get('password');
  }

  public get registerFullName() {
    return this.registerForm.get('username');
  }

  public get registerEmail() {
    return this.registerForm.get('email');
  }

  public get registerPassword() {
    return this.registerForm.get('password');
  }

  public onSubmitSign(): void {
    this.auth.login(this.signInForm.value).pipe(first()).subscribe(data => {
      this.signInForm.reset();
      this.toast.toastSuccess(`Signed in with username ${data.username}`);
      this.error = '';
    }, error => {
      this.error = error;
    });
  }

  public onRegister(): void {
    if (this.checked) {
      this.auth.register(this.registerForm.value).subscribe((data) => {
          this.registerForm.reset();
          this.isJoinPage = false;
          this.isSignPage = true;
          this.toast.toastSuccess(`Created an account with username ${data.username}`);
          this.errorRegister = '';
        },
        error => {
          this.errorRegister = error;
        });
    }
  }

  public createBillingForm(): void {
    this.billingForm = this.formBuilder.group({
      fullName: [null, Validators.required],
      address1: [null],
      address2: [null],
      city: [null, Validators.required],
      zipCode: [null, Validators.pattern('(MD)-[0-9]{4}')]
    });
  }

  public createCardForm(): void {
    this.cardDetails = this.formBuilder.group({
      cardNr: [null, Validators.compose([Validators.required, Validators.minLength(16),
        this.validateInput
      ])],
      name: [null, Validators.required],
      month: [null, Validators.required],
      year: [null, Validators.required],
      CVC: [null, Validators.required]
    });

  }

  public get fullName() {
    return this.billingForm.get('fullName');
  }

  public get city() {
    return this.billingForm.get('city');
  }

  public get zipCode() {
    return this.billingForm.get('zipCode');
  }

  public get cardNr() {
    return this.cardDetails.get('cardNr');
  }

  public get name() {
    return this.cardDetails.get('name');
  }

  public get month() {
    return this.cardDetails.get('month');
  }

  public get year() {
    return this.cardDetails.get('year');
  }

  public get cvv() {
    return this.cardDetails.get('CVC');
  }

  public onChange(event): void {
    this.checked = event;
  }

  public onInsert(event): void {
    setTimeout(() => {
      if (event.data !== null && event.target.value.length >= 2) {
        this.code = (event.target.value.slice(0, 2) + '-').toUpperCase();
      }
    }, 200);
  }

  public onValidate(event): void {
    const char = String.fromCharCode(event.which);
    if (!(/[0-9]/.test(char))) {
      event.preventDefault();
    }
  }

  public VisaCard(input) {
    const card = /^(?:4[0-9]{12}(?:[0-9]{3})?)$/;
    return card.test(input);
  }

  public MasterCard(input) {
    const card = /^(?:5[1-5][0-9]{14})$/;
    return card.test(input);
  }


  public validateInput(c: FormControl) {
    const visa = /^4[0-9]{12}(?:[0-9]{3})?$/;
    const masterCard = /^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/;
    return (visa.test(c.value) || masterCard.test(c.value)) ? null : {
      validateInput: {
        valid: false
      }
    };
  }

  public onView(event): void {
    this.card = event.target.value;
  }

  public getIcon(): string {
    let icon = '';
    if (this.MasterCard(this.card)) {
      icon = 'fab fa-cc-mastercard';
    } else if (this.VisaCard(this.card)) {
      icon = 'fab fa-cc-visa';
    }
    return icon;
  }

  public onSubmit(): void {
    if (this.eventId !== null) {
      const userId = JSON.parse(localStorage.getItem('userId'));
      const submitObject = {
        payment: {
          billingAddress: this.billingForm.value,
          cardDetails: this.cardDetails.value
        },
        paymentDetails: {
          eventId: Number(this.eventId)
        },
        userId: Number(userId.id)
      };
      this.paymentService.postPaymentDetails(submitObject).subscribe((response) => {
        this.step3 = true;
        this.eventDetails = response;
        this.orderId = Math.abs(this.eventDetails.orderId);
        setTimeout(() => {
          this.router.navigate(['/events']);
        }, 5000);
      });
    }
  }
}
