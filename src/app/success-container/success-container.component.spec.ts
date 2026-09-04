import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { SuccessContainerComponent } from './success-container.component';

describe('SuccessContainerComponent', () => {
  let component: SuccessContainerComponent;
  let fixture: ComponentFixture<SuccessContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SuccessContainerComponent],
      providers: [provideIonicAngular()]
}).compileComponents();

    fixture = TestBed.createComponent(SuccessContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
