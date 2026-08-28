import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnrollmentLiteNativeContainerComponent } from './enrollment-lite-native-container.component';

describe('EnrollmentLiteNativeContainerComponent', () => {
  let component: EnrollmentLiteNativeContainerComponent;
  let fixture: ComponentFixture<EnrollmentLiteNativeContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), EnrollmentLiteNativeContainerComponent]
}).compileComponents();

    fixture = TestBed.createComponent(EnrollmentLiteNativeContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
