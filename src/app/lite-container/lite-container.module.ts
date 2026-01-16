import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LiteContainerComponent } from './lite-container.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule],
  declarations: [LiteContainerComponent],
  exports: [LiteContainerComponent]
})

export class LiteContainerComponentModule {}
