import { Component } from '@angular/core';
import { IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { colorPalette, square, triangle } from 'ionicons/icons';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss'],
    imports: [IonIcon, IonLabel, IonTabBar, IonTabButton, IonTabs]
})
export class TabsPage {

  constructor() {
    addIcons({ triangle, square, 'color-palette': colorPalette });
  }

}
