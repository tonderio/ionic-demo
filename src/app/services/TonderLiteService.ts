import {Inject, Injectable} from '@angular/core';
import {LiteCheckout} from "@tonder.io/ionic-lite-sdk";
import {IConfigureCheckout, IInlineLiteCheckoutOptions} from "@tonder.io/ionic-lite-sdk/dist/types/commons";
import {ITransaction} from "@tonder.io/ionic-lite-sdk/dist/types/transaction";
import {IProcessPaymentRequest, IStartCheckoutResponse} from "@tonder.io/ionic-lite-sdk/dist/types/checkout";
import {IPaymentMethod} from "@tonder.io/ionic-lite-sdk/dist/types/paymentMethod";
import {ICustomerCardsResponse, ISaveCardRequest} from "@tonder.io/ionic-lite-sdk/dist/types/card";
import {ILiteCheckout} from "@tonder.io/ionic-lite-sdk/dist/types/liteInlineCheckout";

@Injectable({
  providedIn: 'root'
})

// This is an example/recommendation for use; you can use it or adapt it to your project's needs.
// Add your own logic if necessary.

export class TonderLiteService {
  private liteCheckout!: ILiteCheckout;

  constructor(@Inject(Object) private sdkParameters: IInlineLiteCheckoutOptions) {
    this.initializeInlineCheckout();
  }

  private initializeInlineCheckout(): void {
    this.liteCheckout = new LiteCheckout({...this.sdkParameters});
  }

  configureCheckout(customerData: IConfigureCheckout): void {
    this.liteCheckout.configureCheckout({ ...customerData });
  }

  async injectCheckout(): Promise<void> {
    await this.liteCheckout.injectCheckout();
  }

  verify3dsTransaction(): Promise<ITransaction | IStartCheckoutResponse | void> {
    return this.liteCheckout.verify3dsTransaction();
  }

  removeCheckout(): void {
    // Puede limpiar datos que necesite de su logica
  }

  payment(
    checkoutData: IProcessPaymentRequest,
  ): Promise<IStartCheckoutResponse> {
    return this.liteCheckout.payment(checkoutData);
  }

  getCustomerPaymentMethods(): Promise<IPaymentMethod[]> {
    return this.liteCheckout.getCustomerPaymentMethods();
  }

  getCustomerCards(): Promise<ICustomerCardsResponse> {
    return this.liteCheckout.getCustomerCards();
  }

  saveCustomerCard(cardData: ISaveCardRequest): Promise<any> {
    return this.liteCheckout.saveCustomerCard(cardData);
  }

  removeCustomerCard(cardId: string): Promise<string> {
    return this.liteCheckout.removeCustomerCard(cardId);
  }
}
