import {Component, OnInit} from '@angular/core';
import {UtilityService} from '@app/core/services/utility.service';
import {ActivatedRoute} from '@angular/router';
import {EventsService} from '@app/core/services/events.service';
import {EventModel} from '@app/core/models/event.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  public event: EventModel;
  public dataLoaded: boolean;

  constructor(private utilityService: UtilityService, private route: ActivatedRoute,
              private eventsService: EventsService, private location: Location) {
    this.dataLoaded = false;
    this.utilityService.getArticleId.subscribe((id) => {
      if (id === null) {
        this.route.params.subscribe((params) => {
          const eventId = params['id'];
          this.eventsService.getEventById(eventId).subscribe((response) => {
            this.event = response;
            this.dataLoaded = true;
          });
        });
      } else {
        this.eventsService.getEventById(id).subscribe((response) => {
          this.event = response;
          this.dataLoaded = true;
        });
      }
    });
  }

  ngOnInit() {
  }

  public onBack(): void {
    this.location.back();
  }

}
