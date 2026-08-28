import { Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';

export interface CardPreviewData {
  cardholder_name: string;
  card_number: string;
  expiration_month: string;
  expiration_year: string;
}

export interface CardFieldState {
  isEmpty: boolean;
  isValid: boolean;
}

/**
 * Visual credit card preview used in the card enrollment demo.
 *
 * - While collecting  : displays live values captured from Skyflow onChange events.
 * - After save        : hosts the Skyflow Reveal Element iframes (#reveal_<field> divs).
 *
 * This component is purely presentational — it owns no SDK logic.
 */
@Component({
    selector: 'app-card-preview',
    templateUrl: './card-preview.component.html',
    styleUrls: ['./card-preview.component.scss'],
    imports: [NgIf]
})
export class CardPreviewComponent {
  @Input() cardPreview!: CardPreviewData;
  @Input() cardFieldState!: Record<string, CardFieldState>;
  @Input() cardSaved = false;

  formatCardNumber(value: string): string {
    if (!value) return '•••• •••• •••• ••••';
    const groups = value.replace(/\D/g, '').match(/.{1,4}/g) ?? [];
    const missing = 4 - groups.length;
    return [...groups, ...Array(missing).fill('••••')].join(' ');
  }

  formatExpiry(month: string, year: string, monthEmpty: boolean, yearEmpty: boolean): string {
    if (monthEmpty && yearEmpty) return 'MM/YY';
    const m = monthEmpty ? 'MM' : (month || '**');
    const y = yearEmpty  ? 'YY' : (year ? year.slice(-2) : '**');
    return `${m}/${y}`;
  }
}
