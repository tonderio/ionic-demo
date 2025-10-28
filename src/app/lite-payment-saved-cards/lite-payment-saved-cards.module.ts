import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LitePaymentSavedCardsComponent } from './lite-payment-saved-cards.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [LitePaymentSavedCardsComponent],
  exports: [LitePaymentSavedCardsComponent]
})

export class LitePaymentSavedCardsComponentModule {}
