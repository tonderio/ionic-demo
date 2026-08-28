import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FullCheckoutContainerComponent } from '../fullcheckout-container/fullcheckout-container.component';

import { Tab5Page } from './tab5.page';

describe('Tab5Page', () => {
  let component: Tab5Page;
  let fixture: ComponentFixture<Tab5Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), FullCheckoutContainerComponent, Tab5Page]
}).compileComponents();

    fixture = TestBed.createComponent(Tab5Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
