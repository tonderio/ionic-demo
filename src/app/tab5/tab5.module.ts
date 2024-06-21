import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab5Page } from './tab5.page';

import { Tab5PageRoutingModule } from './tab5-routing.module';
import { FullCheckoutContainerComponentModule } from '../fullcheckout-container/fullcheckout-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FullCheckoutContainerComponentModule,
    Tab5PageRoutingModule
  ],
  declarations: [Tab5Page]
})
export class Tab5PageModule {}
