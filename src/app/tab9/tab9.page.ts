import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { LitePaymentSavedCardsComponent } from '../lite-payment-saved-cards/lite-payment-saved-cards.component';

@Component({
    selector: 'app-tab9',
    templateUrl: 'tab9.page.html',
    styleUrls: ['tab9.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, LitePaymentSavedCardsComponent]
})
export class Tab9Page {

  constructor() {}

}
