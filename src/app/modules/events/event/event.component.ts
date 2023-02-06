import {Component, OnInit} from '@angular/core';
import {EventsService} from '@app/core/services/events.service';
import {EventModel} from '@app/core/models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
  public pastEvents: EventModel[];
  public upcomingEvents: EventModel[];

  constructor(private eventsService: EventsService) {
    this.eventsService.getPastEvents().subscribe((response) => {
      this.pastEvents = response;
    });
    this.eventsService.getUpcomingEvents().subscribe((response) => {
      this.upcomingEvents = response;
    });
  }

  ngOnInit() {
  }

}
