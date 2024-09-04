import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { Platform } from '@ionic/angular';
import {InlineCheckout} from "@tonder.io/ionic-full-sdk";

@Component({
  selector: 'app-theming-container',
  templateUrl: './theming-container.component.html',
  styleUrls: ['./theming-container.component.scss'],
})

export class ThemingContainerComponent implements OnInit, OnDestroy {

  @Input() name?: string;

  customerData: any;

  inlineCheckout: any;

  customStyles: any;

  constructor(public platform: Platform) {
    this.customerData = null;
  }

  initCheckout() {
    const apiKey = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
    const returnUrl = "http://localhost:8100/tabs/tab4"
    this.inlineCheckout?.removeCheckout()

    this.customStyles = {
      inputStyles: {
        base: {
          border: "1px solid green",
          padding: "10px 7px",
          borderRadius: "5px",
          color: "#1d1d1d",
          marginTop: "2px",
          backgroundColor: "white",
          fontFamily: '"Roboto", sans-serif',
          fontSize: '16px',
          '&::placeholder': {
            color: "#ccc",
          },
        },
        cardIcon: {
          position: 'absolute',
          left: '6px',
          bottom: 'calc(50% - 12px)',
        },
        complete: {
          color: "#4caf50",
        },
        empty: {},
        focus: {},
        invalid: {
          border: "1px solid #f44336",
        },
        global: {
          '@import': 'url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap")',
        }
      },
      labelStyles: {
        base: {
          fontSize: '16px',
          fontWeight: '500',
          fontFamily: '"Roboto", sans-serif'
        }
      },
      errorTextStyles: {
        base: {
          fontSize: '12px',
          fontWeight: '500',
          color: "#f44336",
          fontFamily: '"Roboto", sans-serif'
        },
      },
      labels: {
        cardLabel: '',
        cvvLabel: '',
        expiryMonthLabel: '',
        expiryYearLabel: ''
      },
      placeholders: {
        cardPlaceholder: '',
        cvvPlaceholder: '',
        expiryMonthPlaceholder: '',
        expiryYearPlaceholder: ''
      }
    }

    this.inlineCheckout = new InlineCheckout({
      apiKey: apiKey,
      returnUrl: returnUrl,
      renderPaymentButton: true,
      mode: "stage", // You can now specify the environment type, by default stage
      styles: this.customStyles,
      containerId: "tonder-checkout-theming",
      collectorIds: {
        cardNumber: "collectCardNumberTheming",
        cvv: "collectCvvTheming",
        holderName: "collectHolderNameTheming",
        expirationMonth: "collectExpirationMonthTheming",
        expirationYear: "collectExpirationYearTheming",
        msgError: "msgErrorTheming",
        tonderPayButton: "tonderPayButtonTheming",
        cardsListContainer: "cardsListContainerTheming",
        msgNotification: "msgNotificationTheming"
      },
      callBack: (response) => {
        if(response?.next_action?.redirect_to_url?.url) {
          window.location = response.next_action.redirect_to_url.url
        }
      }
    });

    this.inlineCheckout.setPaymentData(this.customerData)
    this.inlineCheckout.setCartTotal(250);
    this.inlineCheckout.configureCheckout({customer: this.customerData?.customer});
    this.inlineCheckout.injectCheckout();
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
        email: "sergio@grupoapok.com",
        phone: "+58 4169855522"
      },
      cart: {
        total: 250,
        items: [
          {
            description: "Test product description",
            quantity: 1,
            price_unit: 250,
            discount: 25,
            taxes: 12,
            product_reference: 12,
            name: "Test product",
            amount_total: 250
          }
        ]
      }
    }
    this.initCheckout();
  }

  ngOnDestroy(): void {
    this.inlineCheckout?.removeCheckout()
  }

}
