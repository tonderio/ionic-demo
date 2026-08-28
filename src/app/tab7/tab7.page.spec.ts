import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EnrollmentLiteContainerComponent } from '../enrollment-lite-container/enrollment-lite-container.component';

import { Tab7Page } from './tab7.page';

describe('Tab7Page', () => {
  let component: Tab7Page;
  let fixture: ComponentFixture<Tab7Page>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), EnrollmentLiteContainerComponent, Tab7Page]
}).compileComponents();

    fixture = TestBed.createComponent(Tab7Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
