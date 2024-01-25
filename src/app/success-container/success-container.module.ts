import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuccessContainerComponent } from './success-container.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [SuccessContainerComponent],
  exports: [SuccessContainerComponent]
})

export class SuccessContainerComponentModule {}
