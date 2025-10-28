import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { IProcessPaymentRequest } from '@tonder.io/ionic-lite-sdk/dist/types/checkout';
@Component({
  selector: 'app-lite-container',
  templateUrl: './lite-container.component.html',
  styleUrls: ['./lite-container.component.scss'],
})

export class LiteContainerComponent {

  @Input() name?: string;
  @Input() errorMessage?: string;
  liteCheckout?: any;
  abortController = new AbortController();
  secretApiKey = "49a70935cca8e84fd23f978c526af6e722d7499b";
  apiKey = "e0097a032daa0dcf090ce86c2d7c62e0110cde43"
  baseUrl = "https://stage.tonder.io";
  returnUrl = "http://localhost:8100/tabs/tab3";
  paymentForm = new FormGroup({
    name: new FormControl('Pedro Paramo'),
    cardNumber: new FormControl('4242424242424242'),
    month: new FormControl('12'),
    expirationYear: new FormControl('28'),
    cvv: new FormControl('123')
  });
  customerData: IProcessPaymentRequest | null;

  constructor() {
    this.customerData = null;
  }

  async onPayment(event: Event): Promise<any> {

    try {

      const cardFields = {
        card_number: this.paymentForm.value.cardNumber,
        cvv: this.paymentForm.value.cvv,
        expiration_month: this.paymentForm.value.month,
        expiration_year: this.paymentForm.value.expirationYear,
        cardholder_name: this.paymentForm.value.name
      }
      this.liteCheckout.payment({...this.customerData, card: cardFields})
    } catch (error: any) {
      this.errorMessage = error.message;
      const timeout = setTimeout(() => {
        this.errorMessage = "";
        clearTimeout(timeout);
      }, 5000)
    }

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
        email: "dav@gmail.com",
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
      currency: "MXN"
    }
    this.initCheckout()
  }
  async initCheckout() {
    this.liteCheckout = new LiteCheckout({
      baseUrlTonder: this.baseUrl,
      signal: this.abortController.signal,
      apiKey: this.apiKey,
      callBack: (response: any) => {
       console.log('Checkout response', response);
      },
      customization: {
         redirectOnComplete: false
      }
    })

    this.liteCheckout.configureCheckout({
      ...this.customerData,
    });

    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response)
    })
  }
}

