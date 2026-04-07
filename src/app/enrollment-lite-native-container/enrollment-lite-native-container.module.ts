import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';
import { EnrollmentLiteNativeContainerComponent } from './enrollment-lite-native-container.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule],
  declarations: [EnrollmentLiteNativeContainerComponent],
  exports: [EnrollmentLiteNativeContainerComponent],
})
export class EnrollmentLiteNativeContainerComponentModule {}
