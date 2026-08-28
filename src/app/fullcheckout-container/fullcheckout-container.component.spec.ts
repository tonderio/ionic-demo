import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { FullCheckoutContainerComponent } from './fullcheckout-container.component';

describe('FullCheckoutContainerComponent', () => {
  let component: FullCheckoutContainerComponent;
  let fixture: ComponentFixture<FullCheckoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FullCheckoutContainerComponent],
      providers: [provideIonicAngular()]
}).compileComponents();

    fixture = TestBed.createComponent(FullCheckoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
