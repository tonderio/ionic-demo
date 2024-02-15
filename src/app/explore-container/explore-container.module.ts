import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule],
  declarations: [ExploreContainerComponent],
  exports: [ExploreContainerComponent]
})

export class ExploreContainerComponentModule {}
