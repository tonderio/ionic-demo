import { Component, Input, OnDestroy, OnInit, inject } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';

import { MessageService } from './message.service';
import { Router } from '@angular/router';
import { DemoConfig, DemoConfigComponent } from '../components/demo-config/demo-config.component';
import { FormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-enrollment-container',
    templateUrl: './enrollment-container.component.html',
    styleUrls: ['./enrollment-container.component.scss'],
    imports: [DemoConfigComponent, FormsModule, NgIf]
})

export class EnrollmentContainerComponent implements OnInit, OnDestroy {
  platform = inject(Platform);
  private messageService = inject(MessageService);
  private router = inject(Router);


  @Input() name?: string;

  externalButton: boolean;

  inlineCheckout?: any;

  customerData: any;

  config: DemoConfig = {
    mode: 'stage',
    apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
    secretApiKey: '197967d431010dc1a129e3f726cb5fd27987da92',
    email: 'test@example.com',
  };

  constructor() {
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
      apiKey: this.config.apiKey,
      returnUrl: returnUrl,
      mode: this.config.mode,
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
    const secureToken = await this.inlineCheckout.getSecureToken(this.config.secretApiKey)
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
        email: this.config.email,
        phone: "+58 4169855522"
      }
    }
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
