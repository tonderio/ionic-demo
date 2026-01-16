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

  apiKey: string = "11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27";
  secretApiKey: string = "197967d431010dc1a129e3f726cb5fd27987da92";
  mode: "development" | "stage" | "production" = "stage";
  email: string = "test@example.com";

  get baseUrl(): string {
    return this.mode === "production" ? "https://app.tonder.io" : "https://stage.tonder.io";
  }

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

      const abortController = new AbortController();

      let checkoutData = {
        customer: {
          name: "Jhon",
          lastname: "Doe",
          email: this.email,
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
        mode: this.mode,
        signal: abortController.signal,
        apiKey: this.apiKey
      })
    const secureTokenResponse = await fetch(`${this.baseUrl}/api/secure-token/`, {
      method: 'POST',
      headers: {
        'Authorization': `Token ${this.secretApiKey}`,
        'Content-Type': 'application/json'
      },
    })
    const result =  await secureTokenResponse.json();

      liteCheckout.configureCheckout({
        customer: checkoutData.customer,
        secureToken: result?.access
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
