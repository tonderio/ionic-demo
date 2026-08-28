import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { LiteContainerComponent } from '../lite-container/lite-container.component';

@Component({
    selector: 'app-tab3',
    templateUrl: 'tab3.page.html',
    styleUrls: ['tab3.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, LiteContainerComponent]
})
export class Tab3Page {

  constructor() {}

}
