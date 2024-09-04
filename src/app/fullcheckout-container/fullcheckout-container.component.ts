import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import {APM} from "@tonder.io/ionic-lite-sdk/dist/types/commons";
import {IProcessPaymentRequest} from "@tonder.io/ionic-lite-sdk/dist/types/checkout";
import {ILiteCheckout} from "@tonder.io/ionic-lite-sdk/dist/types/liteInlineCheckout";

@Component({
  selector: 'app-fullcheckout-container',
  templateUrl: './fullcheckout-container.component.html',
  styleUrls: ['./fullcheckout-container.component.scss']
})

export class FullCheckoutContainerComponent {
  @Input() name?: string;
  @Input() errorMessage?: string;
  selectedAPM: APM | null = null;
  activeAPMs: APM[] = []
  paymentForm = new FormGroup({
    name: new FormControl('Pedro Paramo'),
    cardNumber: new FormControl('4242424242424242'),
    month: new FormControl('12'),
    expirationYear: new FormControl('28'),
    cvv: new FormControl('123')
  });
  checkoutData: IProcessPaymentRequest;
  liteCheckout!: ILiteCheckout;
  apiKey = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
  returnUrl = "http://localhost:8100/tabs/tab5";

  constructor (){
    // Example data for checkout. In a real scenario, this data
    // should come from your application or service.

    // these structure is deprecated, use IProcessPaymentRequest
    // this.checkoutData = {
    //   customer: {
    //     name: "Jhon",
    //     lastname: "Doe",
    //     email: "john.c.calhoun@examplepetstore.com",
    //     phone: "+58452258525"
    //   },
    //   order: {
    //     items: [
    //       {
    //         description: "Test product description",
    //         quantity: 1,
    //         price_unit: 25,
    //         discount: 1,
    //         taxes: 12,
    //         product_reference: 89456123,
    //         name: "Test product",
    //         amount_total: 25
    //       }
    //     ]
    //   },
    //   return_url: this.returnUrl,
    //   total: 25,
    //   isSandbox: true,
    //   metadata: null,
    //   currency: "MXN"
    // }

    this.checkoutData = {
      customer: {
        firstName: "Jhon",
        lastName: "Doe",
        email: "john.c.calhoun@examplepetstore.com",
        phone: "+58452258525"
      },
      cart: {
        total: 25,
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
      isSandbox: true,
      metadata: {},
      currency: "MXN"
    }
  }

  async onPayment(event: Event): Promise<any> {

    try {

      // These methods are deprecated and will be removed in future versions. Instead, you can use the payment function directly.

      // if(!this.selectedAPM){
      //   const merchantData: any = await this.liteCheckout.getBusiness();
      //
      //   const { vault_id, vault_url } = merchantData;
      //
      //   const skyflowFields = {
      //     card_number: this.paymentForm.value.cardNumber,
      //     cvv: this.paymentForm.value.cvv,
      //     expiration_month: this.paymentForm.value.month,
      //     expiration_year: this.paymentForm.value.expirationYear,
      //     cardholder_name: this.paymentForm.value.name
      //   }
      //
      //   const skyflowTokens = await this.liteCheckout.getSkyflowTokens({
      //     vault_id: vault_id,
      //     vault_url: vault_url,
      //     data: skyflowFields
      //   })
      //
      //  this.checkoutData.skyflowTokens = skyflowTokens;
      // }
      //
      // const jsonResponseRouter: any = await this.liteCheckout.startCheckoutRouterFull(
      //   this.checkoutData
      // );

      const jsonResponseRouter = await this.liteCheckout.payment({
        ...this.checkoutData,
        ...(!this.selectedAPM
          ? {
            card: { // Datos de la tarjeta.
              card_number: this.paymentForm.value.cardNumber || "",
              cvv: this.paymentForm.value.cvv || "",
              expiration_month: this.paymentForm.value.month || "",
              expiration_year: this.paymentForm.value.expirationYear || "",
              cardholder_name: this.paymentForm.value.name || ""
            },
            // card: "skyflow_id" // En caso muestre el listado de tarjetas guardadas y el usuario selecione alguna envie directo el skyflow_id de la tarjeta.
          }
          : {
            payment_method: this.selectedAPM?.payment_method, // Método de pago seleccionado
          }),
      });


      if (jsonResponseRouter) {
        console.log("router response: ", jsonResponseRouter)
        // window.location.href = this.returnUrl;
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

  selectAPM(apm: APM | null = null) {
    this.selectedAPM = apm;
    console.log('Selected APM:', this.selectedAPM);
  }

  async ngOnInit() {
    this.liteCheckout = new LiteCheckout({
      returnUrl: this.returnUrl,
      apiKey: this.apiKey,
    })

    // Initial configurarion with customer information
    this.liteCheckout.configureCheckout({
      customer: this.checkoutData.customer,
    });

    // Initialize lite sdk
    await this.liteCheckout.injectCheckout();

    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response)
    })


    // Method to retrieve payment methods.
    this.activeAPMs = await this.liteCheckout.getCustomerPaymentMethods();
  }

}
