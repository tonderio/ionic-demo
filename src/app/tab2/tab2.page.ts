import { Component } from '@angular/core';
import { MessageService } from '../enrollment-container/message.service';
import { IonicModule } from '@ionic/angular';
import { SuccessContainerComponent } from '../success-container/success-container.component'; 

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss'],
    imports: [IonicModule, SuccessContainerComponent]
})
export class Tab2Page {
  public message: string = '';
  constructor(private messageService: MessageService) {}

  ngOnInit() {
    this.message = this.messageService.getMessage();
  }

}
