import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EnrollmentLiteNativeContainerComponent } from './enrollment-lite-native-container.component';
import { MaskitoDirective } from '@maskito/angular';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [ CommonModule, ReactiveFormsModule, IonicModule, MaskitoDirective,
    HttpClientModule,  
    TranslateModule.forRoot({
    loader: {
      provide: TranslateLoader,
      useFactory: HttpLoaderFactory,
      deps: [HttpClient]
    }
  })
  ],
  declarations: [EnrollmentLiteNativeContainerComponent],
  exports: [EnrollmentLiteNativeContainerComponent]
})

export class EnrollmentLiteNativeContainerComponentModule {}
