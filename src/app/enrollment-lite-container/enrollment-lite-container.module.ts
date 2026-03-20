import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';
import { EnrollmentLiteContainerComponent } from './enrollment-lite-container.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, ComponentsModule],
  declarations: [EnrollmentLiteContainerComponent],
  exports: [EnrollmentLiteContainerComponent],
})
export class EnrollmentLiteContainerComponentModule {}
