import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';
import { Card } from '@tonder.io/ionic-full-sdk/dist/helpers/template';

import { MessageService } from './message.service'; 
import { Router } from '@angular/router';

@Component({
  selector: 'app-enrollment-container',
  templateUrl: './enrollment-container.component.html',
  styleUrls: ['./enrollment-container.component.scss'],
})

export class EnrollmentContainerComponent implements OnInit, OnDestroy {

  @Input() name?: string;

  externalButton: boolean;

  inlineCheckout?: any;

  customerData: any;

  constructor(public platform: Platform, private messageService: MessageService, private router: Router) {
    this.externalButton = false;
    this.customerData = null;
  }

  onSave(event: any) {
    this.inlineCheckout.saveCard()
  }

  initCheckout(renderButton: boolean = false) {
    
    const secretApiKey = "49a70935cca8e84fd23f978c526af6e722d7499b";
    const apiKey = "e0097a032daa0dcf090ce86c2d7c62e0110cde43"
    const returnUrl = "http://localhost:8100/tabs/tab2"
    this.inlineCheckout?.removeCheckout()
    this.inlineCheckout = new InlineCheckout({
      publicApiKey: apiKey,
      returnUrl: returnUrl,
      renderPaymentButton: false,
      renderSaveCardButton: !renderButton,
      isEnrollmentCard: true,
      containerId: "tonder-checkout-enrollment",
      collectorIds: {
        cardNumber: "collectCardNumberEnrollment",
        cvv: "collectCvvEnrollment",
        holderName: "collectHolderNameEnrollment",
        expirationMonth: "collectExpirationMonthEnrollment",
        expirationYear: "collectExpirationYearEnrollment",
        msgError: "msgErrorEnrollment",
        tonderPayButton: "tonderPayButtonEnrollment",
        cardsListContainer: "cardsListContainerEnrollment",
        msgNotification: "msgNotificationEnrollment",
        tonderSaveCardButton: "tonderSaveCardButtonEnrollment"
      },
      callBack: (response) => {
        this.messageService.setMessage('Tarjeta guardada exitosamente.');
        this.router.navigate(['/tabs/tab2']);
        this.inlineCheckout?.removeCheckout()
      },
    });
    this.inlineCheckout.setSecretApiKey(secretApiKey)
    this.inlineCheckout.configureCheckout({customer: this.customerData?.customer});
    this.inlineCheckout.injectCheckout();
  }

  onExternalSelectorClick(event: any) {
    this.externalButton = event.target.checked;
    this.initCheckout(event.target.checked)
  }
  
  ngOnInit() {
    this.customerData = {
      customer: {
        firstName: "Pedro",
        lastName: "Perez",
        country: "Finlandia",
        street: "The street",
        city: "The city",
        state: "The state",
        postCode: "98746",
        email: "jhon.doe@example.com",
        phone: "+58 4169855522"
      }
    }
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
