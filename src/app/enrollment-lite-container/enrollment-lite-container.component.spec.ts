import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { EnrollmentLiteContainerComponent } from './enrollment-lite-container.component';

describe('EnrollmentLiteContainerComponent', () => {
  let component: EnrollmentLiteContainerComponent;
  let fixture: ComponentFixture<EnrollmentLiteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [EnrollmentLiteContainerComponent],
      providers: [provideIonicAngular()]
}).compileComponents();

    fixture = TestBed.createComponent(EnrollmentLiteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
