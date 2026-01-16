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

  apiKey: string = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
  secretApiKey: string = "197967d431010dc1a129e3f726cb5fd27987da92";
  mode: "development" | "stage" | "production" = "stage";

  constructor(public platform: Platform, private messageService: MessageService, private router: Router) {
    this.externalButton = false;
    this.customerData = null;
  }

  onSave(event: any) {
    this.inlineCheckout.saveCard()
  }

  async initCheckout(renderButton: boolean = false) {

    const returnUrl = `${window.location.origin}/tabs/tab2`
    this.inlineCheckout?.removeCheckout()
    this.inlineCheckout = new InlineCheckout({
      apiKey: this.apiKey,
      returnUrl: returnUrl,
      mode: this.mode,
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
      events: {
              cardHolderEvents: {
                onChange: (event: any) => {
                  // console.log('Card holder change event', event);
                },
                onFocus: (event: any) => {
                  // console.log('Card holder focus event', event);
                },
                onBlur: (event: any) => {
                  // console.log('Card holder blur event', event);
                }
              },
              cvvEvents: {
                onChange: (event: any) => {
                  console.log('Cvv change event', event);
                },
                onFocus: (event: any) => {
                  console.log('Cvv focus event', event);
                },
                onBlur: (event: any) => {
                  console.log('Cvv blur event', event);
                }
              }
      },
      callBack: (response) => {
        this.messageService.setMessage('Tarjeta guardada exitosamente.');
        this.router.navigate(['/tabs/tab2']);
        this.inlineCheckout?.removeCheckout()
      },
    });
    const secureToken = await this.inlineCheckout.getSecureToken(this.secretApiKey)
    this.inlineCheckout.configureCheckout({customer: this.customerData?.customer, secureToken: secureToken?.access});
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
