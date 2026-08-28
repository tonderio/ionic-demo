import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideIonicAngular } from '@ionic/angular';

import { EnrollmentContainerComponent } from './enrollment-container.component';

describe('EnrollmentContainerComponent', () => {
  let component: EnrollmentContainerComponent;
  let fixture: ComponentFixture<EnrollmentContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        EnrollmentContainerComponent
      ],
      providers: [provideIonicAngular()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
