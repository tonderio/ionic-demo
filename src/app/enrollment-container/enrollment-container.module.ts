import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentContainerComponent } from './enrollment-container.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [EnrollmentContainerComponent],
  exports: [EnrollmentContainerComponent]
})

export class EnrollmentContainerComponentModule {}
