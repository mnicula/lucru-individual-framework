import {Component, OnInit} from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {UserModel} from '@app/core/models/user.model';
import {Router} from '@angular/router';
import {UtilityService} from '@app/core/services/utility.service';

@Component({
  selector: 'app-admin-header',
  templateUrl: './admin-header.component.html',
  styleUrls: ['./admin-header.component.scss']
})
export class AdminHeaderComponent implements OnInit {
  public open: boolean;
  public currentUser: UserModel;
  public isExpanded: boolean;

  constructor(private auth: AuthService,
              private router: Router,
              private utilityService: UtilityService) {
    this.open = false;
    this.auth.currentUser$.subscribe((res) => this.currentUser = res);
    document.body.style.overflow = 'auto';
    this.isExpanded = false;
  }

  public ngOnInit(): void {
  }

  public onOpen(): void {
    this.open = !this.open;
    this.utilityService.setOpen(this.open);
  }

  public onLogout(): void {
    this.auth.logout();
    this.router.navigate(['../home']);
  }

  public onNavigate(): void {
    this.open = false;
    this.utilityService.setOpen(this.open);
  }

}
