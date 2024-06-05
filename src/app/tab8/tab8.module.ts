import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab8Page } from './tab8.page';

import { Tab8PageRoutingModule } from './tab8-routing.module';
import { EnrollmentLiteNativeContainerComponentModule } from '../enrollment-lite-native-container/enrollment-lite-native-container.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    EnrollmentLiteNativeContainerComponentModule,
    Tab8PageRoutingModule
  ],
  declarations: [Tab8Page]
})
export class Tab8PageModule {}
