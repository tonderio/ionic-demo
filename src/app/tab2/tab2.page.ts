import { Component, inject } from '@angular/core';
import { MessageService } from '../enrollment-container/message.service';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular';
import { SuccessContainerComponent } from '../success-container/success-container.component'; 

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    imports: [IonContent, IonHeader, IonTitle, IonToolbar, SuccessContainerComponent]
})
export class Tab2Page {
  private messageService = inject(MessageService);

  public message: string = '';

  ngOnInit() {
    this.message = this.messageService.getMessage();
  }

}
