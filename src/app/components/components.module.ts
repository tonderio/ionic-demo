import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DemoConfigComponent } from './demo-config/demo-config.component';
import { CardPreviewComponent } from './card-preview/card-preview.component';

@NgModule({
  declarations: [DemoConfigComponent, CardPreviewComponent],
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [DemoConfigComponent, CardPreviewComponent],
})
export class ComponentsModule {}
