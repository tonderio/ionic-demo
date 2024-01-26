import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ThemingContainerComponent } from './theming-container.component';

@NgModule({
  imports: [ CommonModule, FormsModule, IonicModule],
  declarations: [ThemingContainerComponent],
  exports: [ThemingContainerComponent]
})

export class ThemingContainerComponentModule {}
