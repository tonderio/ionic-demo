import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LiteContainerComponent } from './lite-container.component';

describe('LiteContainerComponent', () => {
  let component: LiteContainerComponent;
  let fixture: ComponentFixture<LiteContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LiteContainerComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LiteContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
