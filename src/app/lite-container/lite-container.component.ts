import { Component, Input } from '@angular/core';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { IProcessPaymentRequest } from '@tonder.io/ionic-lite-sdk/dist/types/checkout';
import { DemoConfig, DemoConfigComponent } from '../components/demo-config/demo-config.component';

@Component({
    selector: 'app-lite-container',
    templateUrl: './lite-container.component.html',
    styleUrls: ['./lite-container.component.scss'],
    imports: [DemoConfigComponent]
})

export class LiteContainerComponent {

  @Input() name?: string;
  @Input() errorMessage?: string;
  liteCheckout?: LiteCheckout;
  abortController = new AbortController();

  config: DemoConfig = {
    mode: 'stage',
    apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
    secretApiKey: '197967d431010dc1a129e3f726cb5fd27987da92',
    email: 'test@example.com',
    amount: 100,
    currency: 'MXN',
    metadataJson: '',
  };

  returnUrl = `${window.location.origin}/tabs/tab3`;

  get baseUrl(): string {
    return this.config.mode === "production" ? "https://app.tonder.io" : "https://stage.tonder.io";
  }

  customerData: IProcessPaymentRequest | null;

  constructor() {
    this.customerData = null;
  }

  async onPayment(event: Event): Promise<any> {
    try {
      let paymentData: any = { ...this.customerData };

      // Parse and add metadata if provided
      if (this.config.metadataJson && this.config.metadataJson.trim()) {
        try {
          const metadata = JSON.parse(this.config.metadataJson);
          paymentData.metadata = metadata;
        } catch (e) {
          this.errorMessage = "Invalid JSON format for metadata";
          const timeout = setTimeout(() => {
            this.errorMessage = "";
            clearTimeout(timeout);
          }, 5000);
          return;
        }
      }

      // Card data is collected from mounted Skyflow Elements — no raw values needed
      const response = await this.liteCheckout!.payment(paymentData);
      console.log('Payment response', response)
      alert('Payment status: ' + response?.transaction_status);
    } catch (error: any) {
      console.log("error====", error.message, '-', error.code, '-', error.status, '-', error.statusCode, '-', error.details);
      this.errorMessage = error.message;
      const timeout = setTimeout(() => {
        this.errorMessage = "";
        clearTimeout(timeout);
      }, 5000);
    }
  }

  async ngOnInit() {
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
        total: this.config.amount!,
        items: [
          {
            description: "Test product description",
            quantity: 1,
            price_unit: this.config.amount!,
            discount: 0,
            taxes: 0,
            product_reference: 1,
            name: "Test product",
            amount_total: this.config.amount!
          }
        ]
      },
      currency: this.config.currency!
    };
    await this.initCheckout();
  }

  async initCheckout() {
    this.liteCheckout = new LiteCheckout({
      mode: this.config.mode,
      apiKey: this.config.apiKey,
      callBack: (response: any) => {
        console.log('Callback Payment response', response)
      },
      customization: {
        redirectOnComplete: false
      }
    });

    const secureTokenResponse = await fetch(`${this.baseUrl}/api/secure-token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.config.secretApiKey}`,
        'Content-Type': 'application/json'
      },
    });
    const result = await secureTokenResponse.json();

    this.liteCheckout.configureCheckout({
      ...this.customerData!,
      secureToken: result.access
    });

    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response);
    });

    // Mount Skyflow Elements for the new card form
    await this.liteCheckout.mountCardFields({
      fields: ['cardholder_name', 'card_number', 'expiration_month', 'expiration_year', 'cvv']
    });
  }
}
