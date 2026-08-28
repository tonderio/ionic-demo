import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IonicModule } from '@ionic/angular';

import { EnrollmentContainerComponent } from './enrollment-container.component';
import { EnrollmentContainerComponentModule } from './enrollment-container.module';

describe('EnrollmentContainerComponent', () => {
  let component: EnrollmentContainerComponent;
  let fixture: ComponentFixture<EnrollmentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule,
        EnrollmentContainerComponentModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
