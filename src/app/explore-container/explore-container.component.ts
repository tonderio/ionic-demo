import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';
import { PaymentData } from '@tonder.io/ionic-full-sdk/dist/types/commons';
import {IInlineCheckout} from "@tonder.io/ionic-full-sdk/dist/types/inlineCheckout";
import {IProcessPaymentRequest} from "@tonder.io/ionic-lite-sdk/dist/types/checkout";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})

export class ExploreContainerComponent implements OnInit, OnDestroy {

  @Input() name?: string;

  externalButton: boolean;

  inlineCheckout!: IInlineCheckout;

  customerData: IProcessPaymentRequest;

  constructor(public platform: Platform) {
    this.externalButton = false;
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
  }

  async onPayment(event: any) {
    await this.inlineCheckout.payment(this.customerData)
  }

  initCheckout(renderButton?: boolean) {

    const apiKey = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
    const returnUrl = "http://localhost:8100/tabs/tab1"
    this.inlineCheckout?.removeCheckout()
    this.inlineCheckout = new InlineCheckout({
      apiKey: apiKey,
      returnUrl: returnUrl,
      renderPaymentButton: !renderButton,
      callBack: (response) => {
        window.location.href = returnUrl;
      },
      mode: "stage", // You can now specify the environment type, by default stage
      isOpenPaySandbox: true,
      customization: {
        saveCards: {
          showSaveCardOption: true, // Usar para mostrar/ocultar el checkbox de guardar tarjeta para futuros pagos
          autoSave: false,           // Usar para guardar automáticamente la tarjeta (sin necesidad de mostrar el checkbox)
          showSaved: true           // Usar para mostrar/ocultar el listado de tarjetas guardadas
        }
      },
    });
    this.inlineCheckout.configureCheckout({customer: this.customerData?.customer});
    this.inlineCheckout.setPaymentData(this.customerData)
    // this.inlineCheckout.setCartTotal(this.customerData?.cart.total); // Deprecated function, it is now handled automatically during the payment process
    this.inlineCheckout.injectCheckout();
    this.inlineCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response)
    })
  }

  onExternalSelectorClick(event: any) {
    this.externalButton = event.target.checked;
    this.initCheckout(event.target.checked)
  }

  ngOnInit() {
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
