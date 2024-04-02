import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';

@Component({
  selector: 'app-fullcheckout-container',
  templateUrl: './fullcheckout-container.component.html',
  styleUrls: ['./fullcheckout-container.component.scss'],
})

export class FullCheckoutContainerComponent {

  @Input() name?: string;
  @Input() errorMessage?: string;

  paymentForm = new FormGroup({
    name: new FormControl('Pedro Paramo'),
    cardNumber: new FormControl('4242424242424242'),
    month: new FormControl('12'),
    expirationYear: new FormControl('28'),
    cvv: new FormControl('123')
  });

  async onPayment(event: Event): Promise<any> {
    
    try {
      const apiKey = "00d17d61e9240c6e0611fbdb1558e636ed6389db";
      const returnUrl = "http://localhost:8100/tabs/tab2";
      const baseUrl = "https://stage.tonder.io";
      const abortController = new AbortController();

      let checkoutData = {
        customer: {
          name: "Jhon",
          lastname: "Doe",
          email: "john.c.calhoun@examplepetstore.com",
          phone: "+58452258525"
        },
        order: {
          items: [
            {
              description: "Test product description",
              quantity: 1,
              price_unit: 25,
              discount: 1,
              taxes: 12,
              product_reference: 89456123,
              name: "Test product",
              amount_total: 25
            }
          ]
        },
        return_url: returnUrl,
        total: 25,
        isSandbox: true,
        metadata: {},
        currency: "MXN",
        skyflowTokens: {
          cardholder_name: "",
          card_number: "",
          expiration_year: "",
          expiration_month: "",
          cvv: "",
          skyflow_id: ""
        }
      }

      const liteCheckout = new LiteCheckout({
        baseUrlTonder: baseUrl,
        signal: abortController.signal,
        apiKeyTonder: apiKey
      })

      const merchantData: any = await liteCheckout.getBusiness();

      const { vault_id, vault_url } = merchantData;

      const skyflowFields = {
        card_number: this.paymentForm.value.cardNumber,
        cvv: this.paymentForm.value.cvv,
        expiration_month: this.paymentForm.value.month,
        expiration_year: this.paymentForm.value.expirationYear,
        cardholder_name: this.paymentForm.value.name
      }

      const skyflowTokens = await liteCheckout.getSkyflowTokens({
        vault_id: vault_id,
        vault_url: vault_url,
        data: skyflowFields
      })

      checkoutData.skyflowTokens = skyflowTokens;

      const jsonResponseRouter: any = await liteCheckout.startCheckoutRouterFull(
        checkoutData
      );

      if (jsonResponseRouter) {
        window.location.href = returnUrl;
      } else {
        console.log("Error al procesar el pago");
      }

    } catch (error: any) {
      this.errorMessage = error.message;
      const timeout = setTimeout(() => {
        this.errorMessage = "";
        clearTimeout(timeout);
      }, 5000)
    }
  
  }

}
