import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullCheckoutContainerComponent } from './fullcheckout-container.component';

describe('FullCheckoutContainerComponent', () => {
  let component: FullCheckoutContainerComponent;
  let fixture: ComponentFixture<FullCheckoutContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), FullCheckoutContainerComponent]
}).compileComponents();

    fixture = TestBed.createComponent(FullCheckoutContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
