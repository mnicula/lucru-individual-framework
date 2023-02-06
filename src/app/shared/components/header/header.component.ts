import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '@app/core/services/auth.service';
import {first} from 'rxjs/operators';
import {UtilityService} from '@app/core/services/utility.service';
import {ToastService} from '@app/core/services/toast.service';

declare var $: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public display: boolean;
  public error: string;
  public errorRegister: string;
  public formLogin: FormGroup = this.formBuilder.group({
    username: [null, Validators.compose([Validators.required])],
    password: [null, Validators.compose([Validators.required])]
  });
  public formRegister: FormGroup = this.formBuilder.group({
    username: [null, Validators.compose([Validators.required])],
    email: [null, Validators.compose([Validators.required, Validators.email])],
    password: [null, Validators.compose([Validators.required,
      Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}')])]
  });

  constructor(private formBuilder: FormBuilder,
              private auth: AuthService,
              private utility: UtilityService,
              private toast: ToastService) {
    this.utility.getDisplay.subscribe((response) => this.display = response);
    this.error = '';
    this.errorRegister = '';

  }

  public ngOnInit(): void {
  }


  public onDisplay(): void {
    this.display = true;
    this.utility.setDisplay(this.display);
    document.body.style.overflow = 'hidden';
  }

  public onClickOutside(): void {
    this.display = false;
    this.utility.setDisplay(this.display);
    document.body.style.overflow = 'auto';
  }

  public onLogin(): void {
    this.auth.login(this.formLogin.value).pipe(first()).subscribe(data => {
      this.onHideModal('#exampleModal2');
      this.formLogin.reset();
      this.toast.toastSuccess('Login with success!');
      this.error = '';
    }, error => {
      this.error = error;
    });
  }

  public onRegister(): void {
    this.auth.register(this.formRegister.value).subscribe(() => {
      this.formRegister.reset();
      this.onHideModal('#exampleModal');
      this.toast.toastSuccess('Register an user with success!');
    }, error => {
      this.errorRegister = error;
    });
  }

  get loginEmail() {
    return this.formLogin.get('username');
  }

  get loginPassword() {
    return this.formLogin.get('password');
  }

  get registerEmail() {
    return this.formRegister.get('email');
  }

  get registerPassword() {
    return this.formRegister.get('password');
  }

  get registerFullName() {
    return this.formRegister.get('username');
  }

  public onHideModal(modal): void {
    $(modal).modal('hide');
  }
}
