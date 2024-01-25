import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-success-container',
  templateUrl: './success-container.component.html',
  styleUrls: ['./success-container.component.scss'],
})

export class SuccessContainerComponent {

  @Input() name?: string;

}
