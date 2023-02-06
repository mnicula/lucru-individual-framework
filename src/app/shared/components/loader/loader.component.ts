import {Component, Input, OnInit} from '@angular/core';
import {LoaderService} from '@app/core/services/loader.service';
import {LoaderModel} from '@app/core/models/loader.model';

@Component({
    selector: 'app-loader',
    templateUrl: './loader.component.html',
    styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {
    @Input() public id = 'global';
    public show: boolean;

    constructor(private loaderService: LoaderService) {
    }

    ngOnInit() {
        this.loaderService.loaderStatus$.subscribe((response: LoaderModel) => {
            this.show = this.id === response.id && response.status;
        });
    }

}
