import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { APM } from '@tonder.io/ionic-lite-sdk/dist/types/commons';
import {ILiteCheckout} from "@tonder.io/ionic-lite-sdk/dist/types/liteInlineCheckout";

@Component({
  selector: 'app-fullcheckout-container',
  templateUrl: './fullcheckout-container.component.html',
  styleUrls: ['./fullcheckout-container.component.scss'],
})

export class FullCheckoutContainerComponent {

  @Input() name?: string;
  @Input() errorMessage?: string;
  liteCheckout!: ILiteCheckout;
  abortController = new AbortController();

  secretApiKey = "49a70935cca8e84fd23f978c526af6e722d7499b";
  apiKey = "e0097a032daa0dcf090ce86c2d7c62e0110cde43"
  baseUrl = "https://stage.tonder.io";
  returnUrl = "http://localhost:8100/tabs/tab5";
  selectedAPM: APM | null = null;
  activeAPMs: APM[] = []
  paymentForm = new FormGroup({
    name: new FormControl('Pedro Paramo'),
    cardNumber: new FormControl('4242424242424242'),
    month: new FormControl('12'),
    expirationYear: new FormControl('28'),
    cvv: new FormControl('123')
  });

  async onPayment(event: Event): Promise<any> {

    try {
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
        return_url: this.returnUrl,
        total: 25,
        isSandbox: true,
        metadata: null,
        currency: "MXN",
        skyflowTokens: {
          cardholder_name: "",
          card_number: "",
          expiration_year: "",
          expiration_month: "",
          cvv: "",
          skyflow_id: ""
        },
        payment_method: this.selectedAPM?.payment_method
      }

      if(!this.selectedAPM){
        const merchantData: any = await this.liteCheckout.getBusiness();

        const { vault_id, vault_url } = merchantData;

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

       checkoutData.skyflowTokens = skyflowTokens;
      }

      const jsonResponseRouter: any = await this.liteCheckout.startCheckoutRouterFull(
        checkoutData
      );

      if (jsonResponseRouter) {
        console.log("router response: ", jsonResponseRouter)
        window.location.href = this.returnUrl;
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
      baseUrlTonder: this.baseUrl,
      signal: this.abortController.signal,
      apiKey: this.apiKey
    })
    this.liteCheckout.verify3dsTransaction().then((response: any) => {
      console.log('Verify 3ds response', response)
    })
    // Metodo para obtener APMs
    this.activeAPMs = await this.liteCheckout.getActiveAPMs();
  }

}
