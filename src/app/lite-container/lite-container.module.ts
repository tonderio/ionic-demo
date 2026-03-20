import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComponentsModule } from '../components/components.module';
import { LiteContainerComponent } from './lite-container.component';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ComponentsModule],
  declarations: [LiteContainerComponent],
  exports: [LiteContainerComponent]
})

export class LiteContainerComponentModule {}
