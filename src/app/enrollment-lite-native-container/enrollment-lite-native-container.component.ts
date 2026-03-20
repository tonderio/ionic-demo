import { Component, Input, OnInit } from '@angular/core';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { MessageService } from '../enrollment-container/message.service';
import { Router } from '@angular/router';
import { DemoConfig } from '../components/demo-config/demo-config.component';

@Component({
  selector: 'app-enrollment-lite-native-container',
  templateUrl: './enrollment-lite-native-container.component.html',
  styleUrls: ['./enrollment-lite-native-container.component.scss'],
})
export class EnrollmentLiteNativeContainerComponent implements OnInit {

  @Input() name?: string;
  @Input() errorMessage?: string;

  config: DemoConfig = {
    mode: 'stage',
    apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
    secretApiKey: '197967d431010dc1a129e3f726cb5fd27987da92',
    email: 'test@example.com',
  };

  private liteCheckout?: LiteCheckout;

  get baseUrl(): string {
    return this.config.mode === "production" ? "https://app.tonder.io" : "https://stage.tonder.io";
  }

  constructor(private messageService: MessageService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    await this.initCheckout();
  }

  private async initCheckout(): Promise<void> {
    try {
      const abortController = new AbortController();

      this.liteCheckout = new LiteCheckout({
        mode: this.config.mode,
        signal: abortController.signal,
        apiKey: this.config.apiKey
      });

      const secureTokenResponse = await fetch(`${this.baseUrl}/api/secure-token/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.config.secretApiKey}`,
          'Content-Type': 'application/json'
        },
      });
      const result = await secureTokenResponse.json();

      this.liteCheckout.configureCheckout({
        customer: { email: this.config.email },
        secureToken: result?.access
      });

      // Mount Skyflow Elements into the placeholder divs
      await this.liteCheckout.mountCardFields({
        fields: [{container_id: '#collect_native_cardholder_name', field: 'cardholder_name'}, {container_id: '#collect_native_card_number', field: 'card_number'}, {container_id: '#collect_native_expiration_month', field: 'expiration_month'}, {container_id: '#collect_native_expiration_year', field: 'expiration_year'}, {container_id: '#collect_native_cvv', field: 'cvv'}],
      });
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async onSave(event: Event): Promise<any> {
    try {
      if (!this.liteCheckout) {
        throw new Error('Checkout not initialized');
      }

      // Card data is collected from mounted Skyflow Elements — no raw values needed
      await this.liteCheckout.saveCustomerCard();

      this.messageService.setMessage('Tarjeta guardada exitosamente.');
      this.router.navigate(['/tabs/tab2']);

    } catch (error: any) {
      this.errorMessage = error.message;
      const timeout = setTimeout(() => {
        this.errorMessage = "";
        clearTimeout(timeout);
      }, 5000);
    }
  }
}
