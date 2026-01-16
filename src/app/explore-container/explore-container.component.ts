import { Component, Input, OnDestroy, OnInit } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';
import { IProcessPaymentRequest } from '@tonder.io/ionic-full-sdk/dist/types/commons';

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

  customerData: IProcessPaymentRequest | null;

  secureToken: string | null;

  publicKey: string = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
  secretKey: string = "197967d431010dc1a129e3f726cb5fd27987da92";
  mode: "development" | "stage" | "production" = "stage";
  amount: number = 100;
  currency: string = "MXN";

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
        'Authorization': `Token ${this.secretKey}`,
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(result => {
        const apiKey = this.publicKey
        const returnUrl = `${window.location.origin}/tabs/tab2`
        this.inlineCheckout?.removeCheckout()
        this.inlineCheckout = new InlineCheckout({
          mode: this.mode,
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
            paymentButton: {
              show: true,
              text: "Depositar",
              showAmount: true
            },
            redirectOnComplete: false
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
          }
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
        total: this.amount,
        items: [
          {
            description: "Test product description",
            quantity: 1,
            price_unit: this.amount,
            discount: 0,
            taxes: 0,
            product_reference: 1,
            name: "Test product",
            amount_total: this.amount
          }
        ]
      },
      currency: this.currency
    }
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
