import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { FullCheckoutContainerComponent } from '../fullcheckout-container/fullcheckout-container.component';

import { Tab6Page } from './tab6.page';

describe('Tab6Page', () => {
  let component: Tab6Page;
  let fixture: ComponentFixture<Tab6Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [FullCheckoutContainerComponent, Tab6Page],
      providers: [provideIonicAngular()]
}).compileComponents();

    fixture = TestBed.createComponent(Tab6Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
