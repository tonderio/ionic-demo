import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { MessageService } from '../enrollment-container/message.service';
import { Router } from '@angular/router';
import {ILiteCheckout} from "@tonder.io/ionic-lite-sdk/dist/types/liteInlineCheckout";

@Component({
  selector: 'app-enrollment-lite-container',
  templateUrl: './enrollment-lite-container.component.html',
  styleUrls: ['./enrollment-lite-container.component.scss'],
})

export class EnrollmentLiteContainerComponent {

  @Input() name?: string;
  @Input() errorMessage?: string;

  paymentForm = new FormGroup({
    name: new FormControl('Pedro Paramo'),
    cardNumber: new FormControl('4242424242424242'),
    month: new FormControl('12'),
    expirationYear: new FormControl('28'),
    cvv: new FormControl('123')
  });

  constructor(private messageService: MessageService, private router: Router) {}

  async onSave(event: Event): Promise<any> {

    try {
      const apiKey = "00d17d61e9240c6e0611fbdb1558e636ed6389db";

      let customer =  {
          email: "john.c.calhoun@examplepetstore.com",
        }

      const liteCheckout: ILiteCheckout = new LiteCheckout({
        // baseUrlTonder: baseUrl, // deprecated method, no longer required
        // signal: abortController.signal, // deprecated method, no longer required
        // apiKeyTonder: apiKey, // deprecated method, use apiKey
        apiKey: apiKey,
        mode: "stage" // You can now specify the environment type, by default stage
      })

      // These methods are deprecated and will be removed in future versions. Instead, you can use the configureCheckout and saveCustomerCard functions directly.

      // const merchantData: any = await liteCheckout.getBusiness();
      //
      // const { vault_id, vault_url } = merchantData;
      //
      // const skyflowFields = {
      //   card_number: this.paymentForm.value.cardNumber,
      //   cvv: this.paymentForm.value.cvv,
      //   expiration_month: this.paymentForm.value.month,
      //   expiration_year: this.paymentForm.value.expirationYear,
      //   cardholder_name: this.paymentForm.value.name
      // }
      // const skyflowTokens = await liteCheckout.getSkyflowTokens({
      //   vault_id: vault_id,
      //   vault_url: vault_url,
      //   data: skyflowFields
      // })
      //
      // const customerResponse = await liteCheckout.customerRegister(customer.email)
      // if("auth_token" in customerResponse) {
      //   const { auth_token } = customerResponse;
      //   await liteCheckout.registerCustomerCard(auth_token, { skyflow_id: skyflowTokens.skyflow_id });
      // }

      liteCheckout.configureCheckout({customer: customer})

      await liteCheckout.saveCustomerCard({
        card_number: this.paymentForm.value.cardNumber || "",
        cvv: this.paymentForm.value.cvv || "",
        expiration_month: this.paymentForm.value.month || "",
        expiration_year: this.paymentForm.value.expirationYear || "",
        cardholder_name: this.paymentForm.value.name || ""
      });


      this.messageService.setMessage('Tarjeta guardada exitosamente.');
        this.router.navigate(['/tabs/tab2']);

    } catch (error: any) {
      this.errorMessage = error.message;
      const timeout = setTimeout(() => {
        this.errorMessage = "";
        clearTimeout(timeout);
      }, 5000)
    }

  }

}
