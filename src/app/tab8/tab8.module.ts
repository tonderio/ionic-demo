import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab8Page } from './tab8.page';

import { Tab8PageRoutingModule } from './tab8-routing.module';


@NgModule({
    imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab8PageRoutingModule,
    Tab8Page
]
})
export class Tab8PageModule {}
