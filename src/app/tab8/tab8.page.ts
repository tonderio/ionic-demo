import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EnrollmentLiteNativeContainerComponent } from '../enrollment-lite-native-container/enrollment-lite-native-container.component';

@Component({
    selector: 'app-tab8',
    templateUrl: 'tab8.page.html',
    styleUrls: ['tab8.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, EnrollmentLiteNativeContainerComponent]
})
export class Tab8Page {

  constructor() {}

}
