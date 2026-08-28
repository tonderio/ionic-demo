import { ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit, inject } from '@angular/core';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { MessageService } from '../enrollment-container/message.service';
import { Router } from '@angular/router';
import { DemoConfig, DemoConfigComponent } from '../components/demo-config/demo-config.component';
import { IonContent } from '@ionic/angular';


@Component({
    selector: 'app-enrollment-lite-native-container',
    templateUrl: './enrollment-lite-native-container.component.html',
    styleUrls: ['./enrollment-lite-native-container.component.scss'],
    imports: [IonContent, DemoConfigComponent]
})
export class EnrollmentLiteNativeContainerComponent implements OnInit, OnDestroy {
  private messageService = inject(MessageService);
  private router = inject(Router);
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);


  errorMessage = '';
  isSaving = false;

  cardFieldState: Record<string, { isEmpty: boolean; isValid: boolean }> = {
    cardholder_name:  { isEmpty: true, isValid: false },
    card_number:      { isEmpty: true, isValid: false },
    expiration_month: { isEmpty: true, isValid: false },
    expiration_year:  { isEmpty: true, isValid: false },
    cvv:              { isEmpty: true, isValid: false },
  };

  config: DemoConfig = {
    mode: 'stage',
    apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
    secretApiKey: '197967d431010dc1a129e3f726cb5fd27987da92',
    email: 'test@example.com',
  };

  private liteCheckout?: LiteCheckout;

  get baseUrl(): string {
    return this.config.mode === 'production' ? 'https://app.tonder.io' : 'https://stage.tonder.io';
  }

  get allFieldsValid(): boolean {
    return Object.values(this.cardFieldState).every(f => f.isValid);
  }

  async ngOnInit(): Promise<void> {
    await this.initCheckout();
  }

  ngOnDestroy(): void {
    this.liteCheckout?.unmountCardFields();
  }

  private updateField(field: string, e: { isEmpty: boolean; isValid: boolean }) {
    this.ngZone.run(() => {
      this.cardFieldState[field] = { isEmpty: e.isEmpty, isValid: e.isValid };
      this.cdr.detectChanges();
    });
  }

  private async initCheckout(): Promise<void> {
    try {
      this.liteCheckout = new LiteCheckout({
        mode: this.config.mode,
        apiKey: this.config.apiKey,
        events: {
          cardHolderEvents: { onChange: (e) => this.updateField('cardholder_name', e) },
          cardNumberEvents:  { onChange: (e) => this.updateField('card_number', e) },
          monthEvents:       { onChange: (e) => this.updateField('expiration_month', e) },
          yearEvents:        { onChange: (e) => this.updateField('expiration_year', e) },
          cvvEvents:         { onChange: (e) => this.updateField('cvv', e) },
        },
        customization: {
          styles: {
            enableCardIcon: true,
            cardForm: {
              inputStyles: {
                base: {
                  borderRadius: '12px',
                  border: '1.5px solid #c39bd3',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#2c003e',
                  backgroundColor: '#fdf6ff',
                },
                focus: {
                  borderColor: '#8e44ad',
                  boxShadow: '0 0 0 3px rgba(142,68,173,0.18)',
                  outline: 'none',
                },
                complete: { borderColor: '#27ae60' },
                invalid:  { borderColor: '#e74c3c', color: '#c0392b' },
              },
              labelStyles: {
                base: {
                  fontSize: '12px',
                  fontWeight: '600',
                  color: '#6c3483',
                  marginBottom: '4px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                },
              },
              // errorStyles: {
              //   base: { color: '#e74c3c', fontSize: '10px', marginTop: '3px' },
              // },
            },
            // Card number: extra letter-spacing for readability
            cardNumber: {
              inputStyles: {
                base: { 
                  letterSpacing: '2px',
                  borderRadius: '12px',
                  border: '1.5px solid #c39bd3',
                  padding: '10px 14px',
                  fontSize: '14px',
                  color: '#2c003e',
                  backgroundColor: '#fdf6ff',
                },
                focus: {
                  borderColor: '#8e44ad',
                  boxShadow: '0 0 0 3px rgba(142,68,173,0.18)',
                  outline: 'none',
                },
                complete: { borderColor: '#27ae60' },
                invalid:  { borderColor: '#e74c3c', color: '#c0392b' },
              },
              // errorStyles: {
              //   base: { color: '#e74c3c', fontSize: '10px', marginTop: '3px' },
              // },
            },
          },
        },
      });

      const { access } = await fetch(`${this.baseUrl}/api/secure-token/`, {
        method: 'POST',
        headers: {
          'Authorization': `Token ${this.config.secretApiKey}`,
          'Content-Type': 'application/json',
        },
      }).then(r => r.json());

      this.liteCheckout.configureCheckout({
        customer: { email: this.config.email },
        secureToken: access,
      });

      await this.liteCheckout.mountCardFields({
        fields: [
          { field: 'cardholder_name',  container_id: '#collect_native_cardholder_name' },
          { field: 'card_number',      container_id: '#collect_native_card_number' },
          { field: 'expiration_month', container_id: '#collect_native_expiration_month' },
          { field: 'expiration_year',  container_id: '#collect_native_expiration_year' },
          { field: 'cvv',              container_id: '#collect_native_cvv' },
        ],
      });
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  async onSave(): Promise<void> {
    if (!this.liteCheckout) return;
    this.isSaving = true;
    try {
      await this.liteCheckout.saveCustomerCard();
      this.messageService.setMessage('Tarjeta guardada exitosamente.');
      this.router.navigate(['/tabs/tab2']);
    } catch (error: any) {
      this.errorMessage = error.message;
      setTimeout(() => this.errorMessage = '', 5000);
    } finally {
      this.isSaving = false;
    }
  }
}
