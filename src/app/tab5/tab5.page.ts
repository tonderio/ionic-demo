import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FullCheckoutContainerComponent } from '../fullcheckout-container/fullcheckout-container.component';

@Component({
    selector: 'app-tab5',
    templateUrl: 'tab5.page.html',
    styleUrls: ['tab5.page.scss'],
    imports: [IonicModule, FullCheckoutContainerComponent]
})
export class Tab5Page {

  constructor() {}

}
