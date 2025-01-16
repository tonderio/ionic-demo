import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';
import { PaymentData } from '@tonder.io/ionic-full-sdk/dist/types/commons';

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})

export class ExploreContainerComponent implements OnInit, OnDestroy {

  @Input() name?: string;

  externalButton: boolean;

  showLayer: boolean;

  inlineCheckout?: any;

  customerData: PaymentData | null;

  secureToken: string | null;

  constructor(public platform: Platform) {
    this.externalButton = false;
    this.customerData = null;
    this.secureToken = null;
    this.showLayer = false
  }

  onPayment(event: any) {
    this.inlineCheckout.payment(this.customerData)
  }

  initCheckout(renderButton?: boolean) {

    fetch("https://stage.tonder.io/api/secure-token/", {
      method: 'POST',
      headers: {
        'Authorization': `Token 49a70935cca8e84fd23f978c526af6e722d7499b`,
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(result => {
        const apiKey = "e0097a032daa0dcf090ce86c2d7c62e0110cde43"
        const returnUrl = "http://localhost:8100/tabs/tab2"
        this.inlineCheckout?.removeCheckout()
        this.inlineCheckout = new InlineCheckout({
          apiKey: apiKey,
          returnUrl: returnUrl,
          renderPaymentButton: !renderButton,
          callBack: (response: any) => {
            this.showLayer = true
          },
          isOpenPaySandbox: true,
          customization: {
            saveCards: {
              showSaveCardOption: true, // Usar para mostrar/ocultar el checkbox de guardar tarjeta para futuros pagos
              // autoSave: true,           // Usar para guardar automáticamente la tarjeta (sin necesidad de mostrar el checkbox)
              showSaved: true           // Usar para mostrar/ocultar el listado de tarjetas guardadas
            },
            redirectOnComplete: false
          },
        });
        // this.inlineCheckout.setPaymentData(this.customerData)
        // this.inlineCheckout.setCartTotal(this.customerData?.cart.total);
        this.inlineCheckout.configureCheckout({
          ...this.customerData,
          secureToken: result?.access
        });
        this.inlineCheckout.injectCheckout();
        this.inlineCheckout.verify3dsTransaction().then((response: any) => {
          console.log('Verify 3ds response', response)
        })
      })
    })
  }

  onLayerClick(event: any) {
    this.showLayer = false;
    this.inlineCheckout?.removeCheckout()
    this.initCheckout()
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
        email: "sergioh81@gmail.com",
        phone: "+58 4169855522"
      },
      cart: {
        total: 120,
        items: [
          {
            description: "Test product description",
            quantity: 1,
            price_unit: 120,
            discount: 25,
            taxes: 12,
            product_reference: 12,
            name: "Test product",
            amount_total: 120
          }
        ]
      },
      currency: "BRL"
    }
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
