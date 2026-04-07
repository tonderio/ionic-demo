import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  imports: [ CommonModule, FormsModule, ReactiveFormsModule, IonicModule, ComponentsModule],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent]
})

export class ExploreContainerComponentModule {}
