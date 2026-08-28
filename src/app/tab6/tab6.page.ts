import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { EnrollmentContainerComponent } from '../enrollment-container/enrollment-container.component';

@Component({
    selector: 'app-tab6',
    templateUrl: 'tab6.page.html',
    styleUrls: ['tab6.page.scss'],
    imports: [IonicModule, EnrollmentContainerComponent]
})
export class Tab6Page {

  constructor() {}

}
