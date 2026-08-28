import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { ThemingContainerComponent } from '../theming-container/theming-container.component';

@Component({
    selector: 'app-tab4',
    templateUrl: 'tab4.page.html',
    styleUrls: ['tab4.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, ThemingContainerComponent]
})
export class Tab4Page {

  constructor() {}

}
