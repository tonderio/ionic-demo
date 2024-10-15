import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LiteCheckout } from '@tonder.io/ionic-lite-sdk';
import { MessageService } from '../enrollment-container/message.service'; 
import { Router } from '@angular/router';
import { MaskitoOptions, MaskitoElementPredicate, maskitoTransform } from '@maskito/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-enrollment-lite-native-container',
  templateUrl: './enrollment-lite-native-container.component.html',
  styleUrls: ['./enrollment-lite-native-container.component.scss'],
})

export class EnrollmentLiteNativeContainerComponent {

  @Input() name?: string;
  @Input() errorMessage?: string;
  creditCardBrandIcon = ""
  readonly cvvMask: MaskitoOptions = {
    mask: [...Array(3).fill(/\d/)]
  };

  readonly expirationMask: MaskitoOptions = {
    mask: [
      /\d/, /\d/, '/', /\d/, /\d/
    ]
  }; 
  readonly cardMask: MaskitoOptions = {
    mask: [
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(4).fill(/\d/),
      ' ',
      ...Array(3).fill(/\d/),
    ],
  };

  readonly maskitoPredicate: MaskitoElementPredicate = async (el) => (el as HTMLIonInputElement).getInputElement();

  paymentMethodForm = new FormGroup({
    name: new FormControl('', Validators.required),
    cardNumber: new FormControl('', Validators.required),
    expirationDate: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required)
  });

  constructor(private messageService: MessageService, private router: Router, private alertController: AlertController, private translate: TranslateService) {
    translate.setDefaultLang('es');
    translate.use('es');
  }

  async onSave(): Promise<any> {
    if (!this.paymentMethodForm.valid) {
      await this.presentAlert('Verifique que los campos son los correctos.');
      this.paymentMethodForm.markAllAsTouched()
      return;
    }
    try {
      const secretApiKey = "49a70935cca8e84fd23f978c526af6e722d7499b";
      const apiKey = "00d17d61e9240c6e0611fbdb1558e636ed6389db";
      const baseUrl = "https://stage.tonder.io";
      const abortController = new AbortController();

      let checkoutData = {
        // set your customer information
        customer: {
          name: "Jhon",
          lastname: "Doe",
          email: "john.c.calhoun@examplepetstore.com",
          phone: "+58452258525"
        },
        skyflowTokens: {
          cardholder_name: "",
          card_number: "",
          expiration_year: "",
          expiration_month: "",
          cvv: "",
          skyflow_id: ""
        }
      }

      const liteCheckout = new LiteCheckout({
        baseUrlTonder: baseUrl,
        signal: abortController.signal,
        apiKey: apiKey
      })

      const merchantData: any = await liteCheckout.getBusiness();

      const { vault_id, vault_url } = merchantData;
      const expirationDate = this.paymentMethodForm.value.expirationDate?.split("/");
      const skyflowFields = {
        card_number: this.paymentMethodForm.value.cardNumber,
        cvv: this.paymentMethodForm.value.cvv,
        expiration_month: expirationDate ? expirationDate[0] : '',
        expiration_year: expirationDate ? expirationDate[1] : '',
        cardholder_name: this.paymentMethodForm.value.name
      }
      const skyflowTokens = await liteCheckout.getSkyflowTokens({
        vault_id: vault_id,
        vault_url: vault_url,
        data: skyflowFields
      })

      const customerResponse = await liteCheckout.customerRegister(checkoutData.customer.email)
      if("auth_token" in customerResponse) {
        const { auth_token } = customerResponse;
        const secureTokenResponse = await liteCheckout.getSecureToken(secretApiKey)
        if("access" in secureTokenResponse) {
          const { access } = secureTokenResponse;
          await liteCheckout.registerCustomerCard(access, auth_token, { skyflow_id: skyflowTokens.skyflow_id });
        }
      }
 
      this.messageService.setMessage('Tarjeta guardada exitosamente.');
        this.router.navigate(['/tabs/tab2']);

    } catch (error: any) {
      await this.presentAlert('Error al guardar la tarjeta.');
      this.errorMessage = error.message;
      const timeout = setTimeout(() => {
        this.errorMessage = "";
        clearTimeout(timeout);
      }, 5000)
    }
  
  }

  onCardNumberChange(cardNumber: string) {
    // implement the logic you need
  }

  detectCardBrand(cardNumber: string) {
    // implement the logic you need
  }

  // only a example to show alert
  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: message,
      buttons: ['OK']
    });
  
    await alert.present();
  }
}
