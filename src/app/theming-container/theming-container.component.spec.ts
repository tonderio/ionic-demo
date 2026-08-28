import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ThemingContainerComponent } from './theming-container.component';

describe('ThemingContainerComponent', () => {
  let component: ThemingContainerComponent;
  let fixture: ComponentFixture<ThemingContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [IonicModule.forRoot(), ThemingContainerComponent]
}).compileComponents();

    fixture = TestBed.createComponent(ThemingContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
