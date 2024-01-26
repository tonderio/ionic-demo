import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-theming-container',
  templateUrl: './theming-container.component.html',
  styleUrls: ['./theming-container.component.scss'],
})

export class ThemingContainerComponent {

  @Input() name?: string;

}
