import {Component, OnInit} from '@angular/core';
import {LiteCheckout} from '@tonder.io/ionic-lite-sdk';

@Component({
  selector: 'app-lite-payment-saved-cards',
  templateUrl: './lite-payment-saved-cards.component.html',
  styleUrls: ['./lite-payment-saved-cards.component.scss']
})
export class LitePaymentSavedCardsComponent implements OnInit {
  liteCheckout: any;
  cardsResponse: { user_id: number; cards: any[] } = { user_id: 0, cards: [] };
  selectedCardId: string | null = null;
  loading: boolean = false;
  errorMessage: string = '';
  accessToken: string = '';

  apiKey: string = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
  secretApiKey: string = "197967d431010dc1a129e3f726cb5fd27987da92";
  mode: "development" | "stage" | "production" = "stage";
  amount: number = 100;
  currency: string = "MXN";
  email: string = "test@example.com";
  metadataJson: string = "";

  get baseUrl(): string {
    return this.mode === "production" ? "https://app.tonder.io" : "https://stage.tonder.io";
  }

  customerData: any = {}

  constructor() {
    this.updateCustomerData();
  }

  updateCustomerData() {
    this.customerData = {
    customer: {
      firstName: 'Pedro',
      lastName: 'Perez',
      country: 'Finlandia',
      street: 'The street',
      city: 'The city',
      state: 'The state',
      postCode: '98746',
      email: this.email,
      phone: '+58 4169855522'
    },
    cart: {
      total: this.amount,
      items: [
        {
          description: 'Test product description',
          quantity: 1,
          price_unit: this.amount,
          discount: 0,
          taxes: 0,
          product_reference: 1,
          name: 'Test product',
          amount_total: this.amount
        }
      ]
    },
    currency: this.currency
    };
  }

  async ngOnInit() {
    this.loading = true;
    await this.initializeTonderSDK();
    await this.getCards();
    this.loading = false;
  }

  async initializeTonderSDK() {
    this.liteCheckout = new LiteCheckout({
      mode: this.mode,
      apiKey: this.apiKey,
      returnUrl: window.location.href,
      customization: {
        redirectOnComplete: false
      },
      events: {
        cvvEvents: {
          onChange: (data: any) => {
            console.log('CVV onChange event data:', data);
          }
        }
      }
    });
    // get a secure token from your backend
    const accessTokenResponse = await fetch(`${this.baseUrl}/api/secure-token/`, {
      method: 'POST',
      headers: {
        // not expose your secret token in frontend code
        'Authorization': `Token ${this.secretApiKey}`,
        'Content-Type': 'application/json'
      },
    });
    const accessTokenJson = await accessTokenResponse.json();
    this.accessToken = accessTokenJson.access;
    this.liteCheckout.configureCheckout({ ...this.customerData, secureToken: this.accessToken });
    await this.liteCheckout.injectCheckout();
    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response);
    });
  }

  async getCards() {
    if (!this.liteCheckout) return;
    this.cardsResponse = await this.liteCheckout.getCustomerCards();
  }

  handleSelectCard(cardId: string) {
    if (cardId === this.selectedCardId) return;
    this.selectedCardId = cardId === this.selectedCardId ? null : cardId;
    // setTimeout(() => {
      this.liteCheckout.mountCardFields({ fields: ['cvv'], card_id: cardId });
    // }, 200)
  }

  async handlePayment() {
    if (!this.selectedCardId) return;
    try {
      let paymentData: any = { ...this.customerData, card: this.selectedCardId };

      // Parse and add metadata if provided
      if (this.metadataJson.trim()) {
        try {
          const metadata = JSON.parse(this.metadataJson);
          paymentData.metadata = metadata;
        } catch (e) {
          this.errorMessage = "Invalid JSON format for metadata";
          setTimeout(() => { this.errorMessage = ''; }, 5000);
          return;
        }
      }

      const response = await this.liteCheckout.payment(paymentData);
    } catch (err: any) {
      console.error('Payment error:', err);
      this.errorMessage = err.message || 'Error en el pago';
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    }
  }
}
