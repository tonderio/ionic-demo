import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EnrollmentLiteContainerComponent } from '../enrollment-lite-container/enrollment-lite-container.component';

@Component({
    selector: 'app-tab7',
    templateUrl: 'tab7.page.html',
    styleUrls: ['tab7.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, EnrollmentLiteContainerComponent]
})
export class Tab7Page {

  constructor() {}

}
