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

  async onPayment(event: Event): Promise<any> {

    try {
      const customerEmail = "john.c.calhoun@examplepetstore.com";
      const customerPhone = "+584169850705";
      const customerName = "Jhon";
      const customerLastName = "Calhoun";
      const total = 25;

      const merchantData: any = await this.liteCheckout.getBusiness();

      const { openpay_keys, reference, business, vault_id, vault_url } = merchantData;

      let deviceSessionIdTonder;

      if (openpay_keys.merchant_id && openpay_keys.public_key) {
        deviceSessionIdTonder = await this.liteCheckout.getOpenpayDeviceSessionID(
          openpay_keys.merchant_id,
          openpay_keys.public_key,
          true
        );
      }

      const { auth_token, id: customerId }: any = await this.liteCheckout.customerRegister(customerEmail);

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
        business: this.apiKey,
        client: auth_token,
        billing_address_id: null,
        shipping_address_id: null,
        amount: total,
        status: "A",
        reference: reference,
        is_oneclick: true,
        items: cartItems,
      };

      const jsonResponseOrder: any = await this.liteCheckout.createOrder(
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

      const jsonResponsePayment: any = await this.liteCheckout.createPayment(
        paymentData
      );

      const skyflowFields = {
        card_number: this.paymentForm.value.cardNumber,
        cvv: this.paymentForm.value.cvv,
        expiration_month: this.paymentForm.value.month,
        expiration_year: this.paymentForm.value.expirationYear,
        cardholder_name: this.paymentForm.value.name
      }

      const skyflowTokens = await this.liteCheckout.getSkyflowTokens({
        vault_id: vault_id,
        vault_url: vault_url,
        data: skyflowFields
      })

      const cardTokensSkyflowTonder = skyflowTokens;

      const routerData = {
        card: cardTokensSkyflowTonder,
        name: customerName,
        last_name: customerLastName,
        email_client: customerEmail,
        phone_number: customerPhone,
        return_url: this.returnUrl,
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

      const jsonResponseRouter: any = await this.liteCheckout.startCheckoutRouter(
        routerData
      );

      if (jsonResponseRouter) {
        console.log("router response: ", jsonResponseRouter)
        const url = jsonResponseRouter?.next_action?.redirect_to_url?.url
        if (!!url)
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

  ngOnInit() {
    this.liteCheckout = new LiteCheckout({
      baseUrlTonder: this.baseUrl,
      signal: this.abortController.signal,
      apiKey: this.apiKey
    })
    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response)
    })
  }
}
