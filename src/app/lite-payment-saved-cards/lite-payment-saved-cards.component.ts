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

  customerData = {
    customer: {
      firstName: 'Pedro',
      lastName: 'Perez',
      country: 'Finlandia',
      street: 'The street',
      city: 'The city',
      state: 'The state',
      postCode: '98746',
      email: 'test@example.com',
      phone: '+58 4169855522'
    },
    cart: {
      total: 120,
      items: [
        {
          description: 'Test product description',
          quantity: 1,
          price_unit: 120,
          discount: 25,
          taxes: 12,
          product_reference: 12,
          name: 'Test product',
          amount_total: 120
        }
      ]
    },
    currency: 'MXN'
  };

  async ngOnInit() {
    this.loading = true;
    await this.initializeTonderSDK();
    await this.getCards();
    this.loading = false;
  }

  async initializeTonderSDK() {
    this.liteCheckout = new LiteCheckout({
      mode: 'stage',
      apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
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
    const accessTokenResponse = await fetch('https://stage.tonder.io/api/secure-token/', {
      method: 'POST',
      headers: {
        // not expose your secret token in frontend code
        'Authorization': `Token 197967d431010dc1a129e3f726cb5fd27987da92`,
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
      const response = await this.liteCheckout.payment({ ...this.customerData, card: this.selectedCardId });
    } catch (err: any) {
      console.error('Payment error:', err);
      this.errorMessage = err.message || 'Error en el pago';
      setTimeout(() => { this.errorMessage = ''; }, 5000);
    }
  }
}
