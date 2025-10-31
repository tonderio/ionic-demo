import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab9Page } from './tab9.page';

import { Tab9PageRoutingModule } from './tab9-routing.module';
import { LitePaymentSavedCardsComponentModule } from '../lite-payment-saved-cards/lite-payment-saved-cards.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    LitePaymentSavedCardsComponentModule,
    Tab9PageRoutingModule
  ],
  declarations: [Tab9Page]
})
export class Tab9PageModule {}
