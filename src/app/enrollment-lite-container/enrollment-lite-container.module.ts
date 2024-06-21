import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentLiteContainerComponent } from './enrollment-lite-container.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [EnrollmentLiteContainerComponent],
  exports: [EnrollmentLiteContainerComponent]
})

export class EnrollmentLiteContainerComponentModule {}
