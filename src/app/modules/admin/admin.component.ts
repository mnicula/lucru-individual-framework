import { Component, OnInit } from '@angular/core';
import {UtilityService} from '@app/core/services/utility.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
public isOpen: boolean;
  constructor(private utilityService: UtilityService) {
    this.isOpen = false;
    this.utilityService.getOpen.subscribe((response) => this.isOpen = response);
  }

  ngOnInit() {
  }

}
