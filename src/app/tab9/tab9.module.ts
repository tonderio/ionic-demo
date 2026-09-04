import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab9Page } from './tab9.page';

import { Tab9PageRoutingModule } from './tab9-routing.module';


@NgModule({
    imports: [
    CommonModule,
    FormsModule,
    Tab9PageRoutingModule,
    Tab9Page
]
})
export class Tab9PageModule {}
