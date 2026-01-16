import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentContainerComponent } from './enrollment-container.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [EnrollmentContainerComponent],
  exports: [EnrollmentContainerComponent]
})

export class EnrollmentContainerComponentModule {}
