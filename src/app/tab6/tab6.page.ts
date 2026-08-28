import { Component, ChangeDetectionStrategy } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { EnrollmentContainerComponent } from '../enrollment-container/enrollment-container.component';

@Component({
    selector: 'app-tab6',
    templateUrl: 'tab6.page.html',
    styleUrls: ['tab6.page.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, EnrollmentContainerComponent]
})
export class Tab6Page {

  constructor() {}

}
