import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';
import { Card } from '@tonder.io/ionic-full-sdk/dist/helpers/template';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})

export class ExploreContainerComponent implements OnInit, OnDestroy {

  @Input() name?: string;

  externalButton: boolean;

  inlineCheckout?: any;

  customerData: any;

  constructor(public platform: Platform) {
    this.externalButton = false;
    this.customerData = null;
  }

  onPayment(event: any) {
    this.inlineCheckout.payment(this.customerData)
  }

  initCheckout(renderButton?: boolean) {
    
    const apiKey = "00d17d61e9240c6e0611fbdb1558e636ed6389db";
    const returnUrl = "http://localhost:8100/tabs/tab2"
    this.inlineCheckout?.removeCheckout()
    this.inlineCheckout = new InlineCheckout({
      apiKey: apiKey,
      returnUrl: returnUrl,
      successUrl: returnUrl,
      renderPaymentButton: !renderButton,
      callBack: (response) => {
        if(response?.next_action?.redirect_to_url?.url) {
          window.location = response.next_action.redirect_to_url.url
        }
      },
      isOpenPaySandbox: true
    });
    this.inlineCheckout.setPaymentData(this.customerData)
    this.inlineCheckout.setCartTotal(this.customerData.cart.total);
    this.inlineCheckout.setCustomerEmail(this.customerData.customer.email);
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
        email: "sergio.hernandez-ext@dominion-global.com",
        phone: "+58 4169855522"
      },
      cart: {
        total: 2500,
        items: [
          {
            description: "Test product description",
            quantity: 1,
            price_unit: 2500,
            discount: 25,
            taxes: 12,
            product_reference: 12,
            name: "Test product",
            amount_total: 2500
          }
        ]
      },
      currency: "MXN"
    }
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
