import { Component, Input, OnDestroy, OnInit, inject, ChangeDetectionStrategy } from '@angular/core';

import { InlineCheckout } from "@tonder.io/ionic-full-sdk";

import { Platform } from '@ionic/angular';
import { IProcessPaymentRequest } from '@tonder.io/ionic-full-sdk/dist/types/commons';
import { DemoConfig, DemoConfigComponent } from '../components/demo-config/demo-config.component';
import { FormsModule } from '@angular/forms';


@Component({
    selector: 'app-explore-container',
    templateUrl: './explore-container.component.html',
    styleUrls: ['./explore-container.component.scss'],
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [DemoConfigComponent, FormsModule]
})

export class ExploreContainerComponent implements OnInit, OnDestroy {
  platform = inject(Platform);


  @Input() name?: string;

  externalButton: boolean;

  showLayer: boolean;

  inlineCheckout?: any;

  customerData: IProcessPaymentRequest | null;

  secureToken: string | null;

  config: DemoConfig = {
    mode: 'stage',
    apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
    secretApiKey: '197967d431010dc1a129e3f726cb5fd27987da92',
    email: 'test@example.com',
    amount: 100,
    currency: 'MXN',
    metadataJson: '',
  };

  get baseUrl(): string {
    return this.config.mode === 'production' ? 'https://app.tonder.io' : 'https://stage.tonder.io';
  }

  constructor() {
    this.externalButton = false;
    this.customerData = null;
    this.secureToken = null;
    this.showLayer = false;
  }

  async onPayment(event: any) {
    const response = await this.inlineCheckout.payment(this.customerData)
    console.log('Payment response', response)
  }

  initCheckout(renderButton?: boolean) {

    fetch(`${this.baseUrl}/api/secure-token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.config.secretApiKey}`,
        'Content-Type': 'application/json'
      },
    }).then(response => {
      response.json().then(result => {
        const returnUrl = `${window.location.origin}/tabs/tab2`
        this.inlineCheckout?.removeCheckout()
        this.inlineCheckout = new InlineCheckout({
          mode: this.config.mode,
          apiKey: this.config.apiKey,
          returnUrl: returnUrl,
          renderPaymentButton: !renderButton,
          callBack: (response: any) => {
            this.showLayer = true
            console.log('Callback Payment response', response)
          },
          isOpenPaySandbox: true,
          customization: {
            saveCards: {
              showSaveCardOption: true,
              showSaved: true
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

        let configData: any = {
          ...this.customerData,
          secureToken: result?.access
        };

        // Parse and add metadata if provided
        if (this.config.metadataJson?.trim()) {
          try {
            const metadata = JSON.parse(this.config.metadataJson);
            configData.metadata = metadata;
          } catch (e) {
            console.error("Invalid JSON format for metadata:", e);
          }
        }

        this.inlineCheckout.configureCheckout(configData);
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
    console.log('Initializing checkout');
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
      },
      cart: {
        total: this.config.amount ?? 100,
        items: [
          {
            description: "Test product description",
            quantity: 1,
            price_unit: this.config.amount ?? 100,
            discount: 0,
            taxes: 0,
            product_reference: 1,
            name: "Test product",
            amount_total: this.config.amount ?? 100
          }
        ]
      },
      currency: this.config.currency ?? 'MXN'
    }
    this.initCheckout()
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }
}
