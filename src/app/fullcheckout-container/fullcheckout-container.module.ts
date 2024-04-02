import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FullCheckoutContainerComponent } from './fullcheckout-container.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [FullCheckoutContainerComponent],
  exports: [FullCheckoutContainerComponent]
})

export class FullCheckoutContainerComponentModule {}
