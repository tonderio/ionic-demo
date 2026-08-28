import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'app-success-container',
    templateUrl: './success-container.component.html',
    changeDetection: ChangeDetectionStrategy.Eager,
    styleUrls: ['./success-container.component.scss']
})

export class SuccessContainerComponent {

  @Input() name?: string;
  @Input() message: string = 'El pago fue exitoso';
}
