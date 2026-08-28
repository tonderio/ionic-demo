import { ChangeDetectorRef, Component, NgZone, OnInit, inject } from '@angular/core';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { DemoConfig, DemoConfigComponent } from '../components/demo-config/demo-config.component';
import { CardPreviewComponent } from '../components/card-preview/card-preview.component';


@Component({
    selector: 'app-enrollment-lite-container',
    templateUrl: './enrollment-lite-container.component.html',
    styleUrls: ['./enrollment-lite-container.component.scss'],
    imports: [DemoConfigComponent, CardPreviewComponent]
})
export class EnrollmentLiteContainerComponent implements OnInit {
  private ngZone = inject(NgZone);
  private cdr = inject(ChangeDetectorRef);


  // ── Demo config (bound to <app-demo-config>) ────────────────────────────────
  config: DemoConfig = {
    mode: 'stage',
    apiKey: '11e3d3c3e95e0eaabbcae61ebad34ee5f93c3d27',
    secretApiKey: '197967d431010dc1a129e3f726cb5fd27987da92',
    email: 'test@example.com',
  };

  // ── UI state ─────────────────────────────────────────────────────────────────
  errorMessage = '';
  isSaving     = false;
  cardSaved    = false;

  // ── Card preview (driven by Skyflow onChange events) ─────────────────────────
  cardPreview = { cardholder_name: '', card_number: '', expiration_month: '', expiration_year: '' };

  cardFieldState: Record<string, { isEmpty: boolean; isValid: boolean }> = {
    cardholder_name:  { isEmpty: true, isValid: false },
    card_number:      { isEmpty: true, isValid: false },
    expiration_month: { isEmpty: true, isValid: false },
    expiration_year:  { isEmpty: true, isValid: false },
    cvv:              { isEmpty: true, isValid: false },
  };

  private liteCheckout?: LiteCheckout;

  get baseUrl() {
    return this.config.mode === 'production' ? 'https://app.tonder.io' : 'https://stage.tonder.io';
  }

  async ngOnInit() {
        console.log('Initializing enroll checkout');
    await this.initCheckout();
  }

  // ── Private ──────────────────────────────────────────────────────────────────

  private updateField(field: string, e: { value?: string; isEmpty: boolean; isValid: boolean }) {
    this.ngZone.run(() => {
      if (field in this.cardPreview) (this.cardPreview as any)[field] = e.value ?? '';
      this.cardFieldState[field] = { isEmpty: e.isEmpty, isValid: e.isValid };
      this.cdr.detectChanges();
    });
  }

  private async initCheckout() {
    try {
      this.liteCheckout = new LiteCheckout({
        mode: this.config.mode,
        apiKey: this.config.apiKey,
        events: {
          cardHolderEvents: { onChange: (e) => this.updateField('cardholder_name',  e) },
          cardNumberEvents:  { onChange: (e) => this.updateField('card_number',      e) },
          monthEvents:       { onChange: (e) => this.updateField('expiration_month', e) },
          yearEvents:        { onChange: (e) => this.updateField('expiration_year',  e) },
          cvvEvents:         { onChange: (e) => this.updateField('cvv',              e) },
        },
      });

      const { access } = await fetch(`${this.baseUrl}/api/secure-token/`, {
        method: 'POST',
        headers: { 'Authorization': `Token ${this.config.secretApiKey}`, 'Content-Type': 'application/json' },
      }).then(r => r.json());

      this.liteCheckout.configureCheckout({ customer: { email: this.config.email }, secureToken: access });

      await this.liteCheckout.mountCardFields({
        fields: [{container_id: '#collect_enroll_cardholder_name', field: 'cardholder_name'}, {container_id: '#collect_enroll_card_number', field: 'card_number'}, {container_id: '#collect_enroll_expiration_month', field: 'expiration_month'}, {container_id: '#collect_enroll_expiration_year', field: 'expiration_year'}, {container_id: '#collect_enroll_cvv', field: 'cvv'}],
      });
    } catch (error: any) {
      this.errorMessage = error.message;
    }
  }

  // ── Public ───────────────────────────────────────────────────────────────────

  async onSave() {
    this.isSaving = true;
    try {
      await this.liteCheckout!.saveCustomerCard();

      this.cardSaved = true;
      await new Promise(r => setTimeout(r, 50)); // wait for Angular to render reveal divs

      await this.liteCheckout!.revealCardFields({
        fields: [
          { field: 'card_number',      styles: { inputStyles: { base: REVEAL_TEXT_STYLE } } },
          { field: 'cardholder_name',  styles: { inputStyles: { base: REVEAL_TEXT_STYLE } } },
          { field: 'expiration_month', styles: { inputStyles: { base: REVEAL_EXPIRY_STYLE } } },
          { field: 'expiration_year',  styles: { inputStyles: { base: REVEAL_EXPIRY_STYLE } } },
        ],
      });
    } catch (error: any) {
      this.errorMessage = error.message;
      setTimeout(() => this.errorMessage = '', 5000);
    } finally {
      this.isSaving = false;
    }
  }

  async reset() {
    this.cardSaved    = false;
    this.errorMessage = '';
    this.cardPreview  = { cardholder_name: '', card_number: '', expiration_month: '', expiration_year: '' };
    this.cardFieldState = {
      cardholder_name:  { isEmpty: true, isValid: false },
      card_number:      { isEmpty: true, isValid: false },
      expiration_month: { isEmpty: true, isValid: false },
      expiration_year:  { isEmpty: true, isValid: false },
      cvv:              { isEmpty: true, isValid: false },
    };
    await this.initCheckout();
  }
}

// ─── Styles passed to Skyflow Reveal Elements rendered inside the card ─────────

const REVEAL_TEXT_STYLE = {
  color: '#ffffff', fontFamily: '"Courier New", Courier, monospace',
  fontSize: '15px', fontWeight: '600', letterSpacing: '2px',
  border: 'none', background: 'transparent', padding: '0', margin: '0',
  width: '100%', height: '24px',
};

const REVEAL_EXPIRY_STYLE = { ...REVEAL_TEXT_STYLE, fontSize: '13px', letterSpacing: '1px' };
