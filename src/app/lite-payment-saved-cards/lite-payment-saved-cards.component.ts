import { Component, OnInit } from '@angular/core';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { DemoConfig } from '../components/demo-config/demo-config.component';

@Component({
  selector: 'app-lite-payment-saved-cards',
  templateUrl: './lite-payment-saved-cards.component.html',
  styleUrls: ['./lite-payment-saved-cards.component.scss']
})
export class LitePaymentSavedCardsComponent implements OnInit {
  liteCheckout?: LiteCheckout;
  cardsResponse: { user_id: number; cards: any[] } = { user_id: 0, cards: [] };
  selectedCard: any = null;
  loading: boolean = false;
  errorMessage: string = '';

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
    return this.config.mode === "production" ? "https://app.tonder.io" : "https://stage.tonder.io";
  }

  get customerData() {
    return {
      customer: {
        firstName: 'Pedro',
        lastName: 'Perez',
        country: 'Finlandia',
        street: 'The street',
        city: 'The city',
        state: 'The state',
        postCode: '98746',
        email: this.config.email,
        phone: '+58 4169855522'
      },
      cart: {
        total: this.config.amount!,
        items: [
          {
            description: 'Test product description',
            quantity: 1,
            price_unit: this.config.amount!,
            discount: 0,
            taxes: 0,
            product_reference: 1,
            name: 'Test product',
            amount_total: this.config.amount!
          }
        ]
      },
      currency: this.config.currency!
    };
  }

  async ngOnInit() {
    this.loading = true;
    await this.initCheckout();
    await this.getCards();
    this.loading = false;
  }

  async initCheckout() {
    this.liteCheckout = new LiteCheckout({
      mode: this.config.mode,
      apiKey: this.config.apiKey,
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

    const secureTokenResponse = await fetch(`${this.baseUrl}/api/secure-token/`, {
      method: 'POST',
      headers: {
        // Note: never expose your secret key in frontend code in production
        'Authorization': `Token ${this.config.secretApiKey}`,
        'Content-Type': 'application/json'
      },
    });
    const result = await secureTokenResponse.json();

    this.liteCheckout.configureCheckout({ ...this.customerData, secureToken: result.access });

    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response);
    });
  }

  async getCards() {
    if (!this.liteCheckout) return;
    this.cardsResponse = await this.liteCheckout.getCustomerCards();
  }

  handleSelectCard(card: any) {
    if (this.selectedCard?.fields?.skyflow_id === card.fields.skyflow_id) return;
    this.selectedCard = card;

    // Only mount CVV field for cards without a subscription (require CVV entry)
    if (!card.fields.subscription_id) {
      this.liteCheckout!.mountCardFields({ fields: ['cvv'], card_id: card.fields.skyflow_id });
    }
  }

  async handlePayment() {
    if (!this.selectedCard) return;
    try {
      let paymentData: any = {
        ...this.customerData,
        card: this.selectedCard.fields.skyflow_id
      };

      if (this.config.metadataJson && this.config.metadataJson.trim()) {
        try {
          paymentData.metadata = JSON.parse(this.config.metadataJson);
        } catch (e) {
          this.errorMessage = "Invalid JSON format for metadata";
          setTimeout(() => { this.errorMessage = ''; }, 5000);
          return;
        }
      }

      const response = await this.liteCheckout!.payment(paymentData);
      alert('Payment status: ' + response?.transaction_status);
    } catch (err: any) {
      console.error('Payment error:', err);
      this.errorMessage = err.message || 'Error en el pago';
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    }
  }
}
