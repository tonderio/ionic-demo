import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { InlineCheckout } from '@tonder.io/ionic-full-sdk/dist';

import { Platform } from '@ionic/angular';

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
    const apiKey = "00d17d61e9240c6e0611fbdb1558e636ed6389db";
    const totalElement = document.querySelector("#cart-total");
    const returnUrl = "http://localhost:8100/tabs/tab2"
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
      platforms: this.platform.platforms(),
      apiKey: apiKey,
      totalElement: totalElement,
      returnUrl: returnUrl,
      successUrl: returnUrl,
      renderPaymentButton: true,
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
        cardsListContainer: "cardsListContainer",
        msgNotification: "msgNotificationTheming"
      }
    });
    
    this.inlineCheckout.setPaymentData(this.customerData)
    this.inlineCheckout.setCartTotal(250);
    this.inlineCheckout.setCustomerEmail("sergio@grupoapok.com");
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
