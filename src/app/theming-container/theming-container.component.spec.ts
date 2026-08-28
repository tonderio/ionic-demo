import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideIonicAngular } from '@ionic/angular';

import { ThemingContainerComponent } from './theming-container.component';

describe('ThemingContainerComponent', () => {
  let component: ThemingContainerComponent;
  let fixture: ComponentFixture<ThemingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ThemingContainerComponent],
      providers: [provideIonicAngular()]
}).compileComponents();

    fixture = TestBed.createComponent(ThemingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
