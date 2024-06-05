import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab7Page } from './tab7.page';

import { Tab7PageRoutingModule } from './tab7-routing.module';
import { EnrollmentLiteContainerComponentModule } from '../enrollment-lite-container/enrollment-lite-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EnrollmentLiteContainerComponentModule,
    Tab7PageRoutingModule
  ],
  declarations: [Tab7Page]
})
export class Tab7PageModule {}
