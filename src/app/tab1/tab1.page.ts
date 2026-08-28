import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { ExploreContainerComponent } from '../explore-container/explore-container.component';

@Component({
    selector: 'app-tab1',
    templateUrl: 'tab1.page.html',
    styleUrls: ['tab1.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, ExploreContainerComponent]
})
export class Tab1Page {

  constructor() {}

}
