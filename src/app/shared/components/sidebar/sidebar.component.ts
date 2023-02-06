import {AfterViewInit, Component, ElementRef, HostListener, Input, OnInit, ViewChild} from '@angular/core';
import {AuthService} from '@app/core/services/auth.service';
import {UserModel} from '@app/core/models/user.model';
import {UtilityService} from '@app/core/services/utility.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, AfterViewInit {
  public display: boolean;
  @ViewChild('logIn', {static: false}) logIn: ElementRef;
  @ViewChild('register', {static: false}) register: ElementRef;
  @ViewChild('subscribe', {static: false}) subscribe: ElementRef;
  @ViewChild('home', {static: false}) home: ElementRef;
  @ViewChild('article', {static: false}) article: ElementRef;
  @ViewChild('event', {static: false}) event: ElementRef;
  @ViewChild('book', {static: false}) book: ElementRef;
  @ViewChild('dashboard', {static: false}) dashboard: ElementRef;
  @ViewChild('logOut', {static: false}) logOut: ElementRef;
  public currentUser: UserModel;
  public isAuthenticated: boolean;
  public isAdmin: boolean;
  public isClicked: boolean;
  public routerLink: string;


  constructor(private auth: AuthService,
              private utility: UtilityService,
              private router: Router) {
    this.utility.getDisplay.subscribe((response) => this.display = response);
    this.utility.setDisplay(this.display);
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.utility.getSubscribe.subscribe((response) => this.isClicked = response);

    this.auth.currentUser$.subscribe((response: UserModel) => {
      this.currentUser = response;
      this.isAuthenticated = !!this.currentUser;
      if (this.currentUser) {
        this.currentUser.authorities.forEach((item) => {
          this.isAdmin = item.authority === 'ROLE_ADMIN';
        });
      }
    });
    this.router.events.subscribe((events) => {
      if (this.router.url.includes('articles')) {
        this.routerLink = '../../../admin';
      } else {
        this.routerLink = '../admin';
      }
    });
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
  }

  get login() {
    let login;
    if (this.logIn) {
      login = this.logIn.nativeElement;
    }
    return login;
  }

  get subscribeComp() {
    let subscribe;
    if (this.subscribe) {
      subscribe = this.subscribe.nativeElement;
    }
    return subscribe;
  }

  get registerComp() {
    let register;
    if (this.register) {
      register = this.register.nativeElement;
    }
    return register;
  }

  get bookComp() {
    let book;
    if (this.book) {
      book = this.book.nativeElement;
    }
    return book;
  }

  get eventComp() {
    let event;
    if (this.event) {
      event = this.event.nativeElement;
    }
    return event;
  }

  get homeComp() {
    let home;
    if (this.home) {
      home = this.home.nativeElement;
    }
    return home;
  }

  get articleComp() {
    let article;
    if (this.article) {
      article = this.article.nativeElement;
    }
    return article;
  }

  get dashboardComp() {
    let dashboard;
    if (this.dashboard) {
      dashboard = this.dashboard.nativeElement;
    }
    return dashboard;
  }

  get logoutComp() {
    let logOut;
    if (this.logOut) {
      logOut = this.logOut.nativeElement;
    }
    return logOut;
  }

  @HostListener('click', ['$event'])
  public onClick(event: any): void {
    switch (event.target) {
      case this.login:
        event.preventDefault();
        break;
      case this.subscribeComp:
        event.preventDefault();
        break;
      case this.registerComp:
        event.preventDefault();
        break;
      case this.bookComp:
        event.preventDefault();
        break;
      case this.eventComp:
        event.preventDefault();
        break;
      case this.homeComp:
        event.preventDefault();
        break;
      case this.articleComp:
        event.preventDefault();
        break;
      case this.dashboardComp:
        event.preventDefault();
        break;
      case this.logoutComp:
        event.preventDefault();
        break;
      default:
        return event.stopPropagation();
    }
  }

  public onLogout(): void {
    this.auth.logout();
    this.display = false;
  }

  public onSubscribe(): void {
    if (this.router.url.includes('home')) {
      this.isClicked = true;
      this.utility.setSubscribe(this.isClicked);
    } else {
      this.router.navigate(['home']);
      setTimeout(() => {
        if (this.router.url.includes('home')) {
          this.isClicked = true;
          this.utility.setSubscribe(this.isClicked);
        }
      }, 0);
    }
  }
}
