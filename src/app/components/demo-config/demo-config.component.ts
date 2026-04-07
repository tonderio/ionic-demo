import { Component, EventEmitter, Input, Output } from '@angular/core';

export interface DemoConfig {
  mode: 'development' | 'stage' | 'production';
  apiKey: string;
  secretApiKey: string;
  email: string;
  amount?: number;
  currency?: string;
  metadataJson?: string;
}

/**
 * Reusable demo configuration accordion used across all SDK demo screens.
 * Pass the parent's config object — it is mutated in-place via ngModel.
 * Emit (refresh) to trigger re-initialization in the parent.
 */
@Component({
  selector: 'app-demo-config',
  templateUrl: './demo-config.component.html',
  styleUrls: ['./demo-config.component.scss'],
})
export class DemoConfigComponent {
  /** Config object shared with the parent component (mutated in-place). */
  @Input() config!: DemoConfig;

  /** Show Amount + Currency + Metadata fields (payment demos). */
  @Input() showPaymentFields = false;

  /** Show the Refresh button. Emit (refresh) on click. */
  @Input() showRefresh = false;

  @Output() refresh = new EventEmitter<void>();
}
