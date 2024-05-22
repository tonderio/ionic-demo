import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnrollmentLiteContainerComponent } from './enrollment-lite-container.component';

describe('EnrollmentLiteContainerComponent', () => {
  let component: EnrollmentLiteContainerComponent;
  let fixture: ComponentFixture<EnrollmentLiteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnrollmentLiteContainerComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EnrollmentLiteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
