import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnrollmentLiteNativeContainerComponent } from '../enrollment-lite-native-container/enrollment-lite-native-container.component';

import { Tab8Page } from './tab8.page';

describe('Tab7Page', () => {
  let component: Tab8Page;
  let fixture: ComponentFixture<Tab8Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), EnrollmentLiteNativeContainerComponent, Tab8Page]
}).compileComponents();

    fixture = TestBed.createComponent(Tab8Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
