import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';
import { LitePaymentSavedCardsComponent } from './lite-payment-saved-cards.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ComponentsModule],
  declarations: [LitePaymentSavedCardsComponent],
  exports: [LitePaymentSavedCardsComponent]
})

export class LitePaymentSavedCardsComponentModule {}
