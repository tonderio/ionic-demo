import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';

@Component({
  selector: 'app-lite-container',
  templateUrl: './lite-container.component.html',
  styleUrls: ['./lite-container.component.scss'],
})

export class LiteContainerComponent {

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
      const customerEmail = "john.c.calhoun@examplepetstore.com";
      const customerPhone = "+584169850705";
      const baseUrl = "https://stage.tonder.io";
      const abortController = new AbortController();
      const total = 25;

      const liteCheckout = new LiteCheckout({
        baseUrlTonder: baseUrl,
        signal: abortController.signal,
        apiKeyTonder: apiKey
      })

      const merchantData: any = await liteCheckout.getBusiness();

      const { openpay_keys, reference, business, vault_id, vault_url } = merchantData;

      let deviceSessionIdTonder;
      
      if (openpay_keys.merchant_id && openpay_keys.public_key) {
        deviceSessionIdTonder = await liteCheckout.getOpenpayDeviceSessionID(
          openpay_keys.merchant_id,
          openpay_keys.public_key,
          true
        );
      }

      const { auth_token, id: customerId }: any = await liteCheckout.customerRegister(customerEmail);

      const cartItems = [
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

      const orderData: any = {
        business: apiKey,
        client: auth_token,
        billing_address_id: null,
        shipping_address_id: null,
        amount: total,
        status: "A",
        reference: reference,
        is_oneclick: true,
        items: cartItems,
      };

      const jsonResponseOrder: any = await liteCheckout.createOrder(
        orderData
      );

      const now = new Date();
      const dateString = now.toISOString();

      const paymentData = {
        business_pk: business.pk,
        amount: total,
        date: dateString,
        order_id: jsonResponseOrder.id,
        client_id: customerId,
      };

      const jsonResponsePayment: any = await liteCheckout.createPayment(
        paymentData
      );

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

      const cardTokensSkyflowTonder = skyflowTokens;

      const routerData = {
        card: cardTokensSkyflowTonder,
        name: cardTokensSkyflowTonder.cardholder_name,
        last_name: "",
        email_client: customerEmail,
        phone_number: customerPhone,
        return_url: returnUrl,
        id_product: "no_id",
        quantity_product: 1,
        id_ship: "0",
        instance_id_ship: "0",
        amount: total,
        title_ship: "shipping",
        description: "Test checkout router description",
        device_session_id: deviceSessionIdTonder,
        token_id: "",
        order_id: jsonResponseOrder.id,
        business_id: business.pk,
        payment_id: jsonResponsePayment.pk,
        source: 'ionic-lite-sdk',
        currency: "MXN",
        metadata: null
      };

      const jsonResponseRouter: any = await liteCheckout.startCheckoutRouter(
        routerData
      );

      if (jsonResponseRouter) {
        const url = jsonResponseRouter?.next_action?.redirect_to_url?.url
        window.location = url;
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
