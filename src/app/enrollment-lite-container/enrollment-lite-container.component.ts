import { Component, Input } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { MessageService } from '../enrollment-container/message.service';
import { Router } from '@angular/router';
import {ISaveCardRequest} from "@tonder.io/ionic-lite-sdk/src/types/card";

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

      const secretApiKey = "49a70935cca8e84fd23f978c526af6e722d7499b";
      const apiKey = "e0097a032daa0dcf090ce86c2d7c62e0110cde43";
      const baseUrl = "https://stage.tonder.io";
      const abortController = new AbortController();

      let checkoutData = {
        customer: {
          name: "Jhon",
          lastname: "Doe",
          email: "john.c.calhoun@examplepetstore.com",
          phone: "+58452258525"
        },
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
        apiKey: apiKey
      })
      const secureToken = await liteCheckout.getSecureToken(secretApiKey)

      liteCheckout.configureCheckout({
        customer: checkoutData.customer,
        secureToken: secureToken?.access
      });

      const skyflowFields: ISaveCardRequest = {
        card_number: this.paymentForm.value.cardNumber!,
        cvv: this.paymentForm.value.cvv!,
        expiration_month: this.paymentForm.value.month!,
        expiration_year: this.paymentForm.value.expirationYear!,
        cardholder_name: this.paymentForm.value.name!
      }

      await liteCheckout.saveCustomerCard(skyflowFields);

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
