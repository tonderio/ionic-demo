import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { FullCheckoutContainerComponent } from '../fullcheckout-container/fullcheckout-container.component';

@Component({
    selector: 'app-tab5',
    templateUrl: 'tab5.page.html',
    styleUrls: ['tab5.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, FullCheckoutContainerComponent]
})
export class Tab5Page {

  constructor() {}

}
