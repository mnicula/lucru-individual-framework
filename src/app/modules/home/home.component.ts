import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UtilityService} from '@app/core/services/utility.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public subscribe: ElementRef;

  constructor(private utility: UtilityService) {

  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.utility.getSubscribe.subscribe((response) => {
      this.utility.getElement.subscribe((res) => this.subscribe = res);
      if (response && this.subscribe) {
        this.subscribe.nativeElement.scrollIntoView({behavior: 'smooth', block: 'start'});
        this.utility.setSubscribe(false);
      }
    });
  }

}
