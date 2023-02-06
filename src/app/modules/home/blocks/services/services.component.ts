import {Component, OnInit} from '@angular/core';
import {FeatureModel} from '../../../../core/models/feature.model';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  public featuresLeft: FeatureModel[];
  public featuresRight: FeatureModel[];

  constructor() {
    this.featuresLeft = [
      {
        title: 'Create',
        paragraph: 'Create the engineering projects from scratch',
        number: 1
      },
      {
        title: 'Development',
        paragraph: 'Automatization of the mechanical work',
        number: 2
      },
      {
        title: 'Creative',
        paragraph: 'Invent the unique and successful idea',
        number: 3
      }
    ];
    this.featuresRight = [
       {
        title: 'Team-work',
        paragraph: 'Learn to be tolerant and work into team',
         number: 4
      },
      {
        title: 'Increasing of technical skills',
        paragraph: 'Opportunity to work like an engineer',
        number: 5
      }, {
        title: 'Management',
        paragraph: 'Perform a plan, follow and get the final result',
        number: 6
      }
    ];
  }

  ngOnInit() {
  }

}
