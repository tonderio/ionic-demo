import { Component, Input, OnInit } from '@angular/core';

import { InlineCheckout } from "@tonder/ionic-full-sdk";

@Component({
  selector: 'app-explore-container',
  templateUrl: './explore-container.component.html',
  styleUrls: ['./explore-container.component.scss'],
})

export class ExploreContainerComponent implements OnInit {

  @Input() name?: string;
  
  ngOnInit() {
    const form = document.querySelector("#payment-form");
    const apiKey = "00d17d61e9240c6e0611fbdb1558e636ed6389db";
    const totalElement = document.querySelector("#cart-total");
    const returnUrl = "http://localhost:8100/tabs/tab2"
    const inlineCheckout = new InlineCheckout({
      form: form,
      apiKey: apiKey,
      totalElement: totalElement,
      returnUrl: returnUrl,
      successUrl: returnUrl,
      renderPaymentButton: true
    });
    inlineCheckout.setPaymentData({
      customer: {
        firstName: "Sergio",
        lastName: "Hernandez",
        country: "Venezuela",
        street: "La calle",
        city: "La ciudad",
        state: "El estado",
        postCode: "8050",
        email: "sergioh81@gmail.com",
        phone: "+58 4169855522"
      },
      cart: {
        total: 250,
        items: [
          {
            description: "Probando ando",
            quantity: 1,
            price_unit: 250,
            discount: 25,
            taxes: 12,
            product_reference: 12,
            name: "El producto de prueba",
            amount_total: 250
          }
        ]
      }
    })
    inlineCheckout.setCartTotal(250);
    inlineCheckout.setCustomerEmail("sergioh81@gmail.com");
    inlineCheckout.injectCheckout();
  }

}
