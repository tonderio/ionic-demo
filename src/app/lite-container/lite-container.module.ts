import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiteContainerComponent } from './lite-container.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [LiteContainerComponent],
  exports: [LiteContainerComponent]
})

export class LiteContainerComponentModule {}
