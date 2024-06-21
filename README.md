
# Tonder SDK Ionic demo app

## Getting started 

<font size="3">Web development environment</font>

```bash

$ npm install

$ ionic serve

```

<font size="3">Navigate to http://localhost:8100</font>

## Sections

<font size="4">Payment</font>

<font size="3">It is the basic checkout integration, it include the default styles and settings to get the checkout loaded</font>

<font size="4">Lite Checkout</font>

<font size="3">It demonstrate the main way to integrate the @tonder.io/ionic-lite-sdk, how to use the methods included in this SDK </font>

<font size="4">Theming</font>

<font size="3">This section illustrate how to customize the checkout look and feel, it include two elements can be customized, the first element is the styles property to the checkout form</font>

```javascript

this.customStyles = {
    inputStyles: {
        base: {
            border: "1px solid green",
            padding: "10px 7px",
            borderRadius: "5px",
            color: "#1d1d1d",
            marginTop: "2px",
            backgroundColor: "white",
            fontFamily: '"Inter", sans-serif',
            fontSize: '16px',
            '&::placeholder': {
                color: "#ccc",
            },
        },
        cardIcon: {
            position: 'absolute',
            left: '6px',
            bottom: 'calc(50% - 12px)',
        },
        complete: {
            color: "#4caf50",
        },
        empty: {},
        focus: {},
        invalid: {
            border: "1px solid #f44336",
        },
        global: {
            '@import': 'url("https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap")',
        }
    },
    labelStyles: {
        base: {
            fontSize: '16px',
            fontWeight: '500',
            fontFamily: '"Roboto", sans-serif'
        }
    },
    errorTextStyles: {
        base: {
            fontSize: '12px',
            fontWeight: '500',
            color: "#f44336",
            fontFamily: '"Roboto", sans-serif'
        },
    },
    labels: {
        cardLabel: '',
        cvvLabel: '',
        expiryMonthLabel: '',
        expiryYearLabel: ''
    },
    placeholders: {
        cardPlaceholder: '',
        cvvPlaceholder: '',
        expiryMonthPlaceholder: '',
        expiryYearPlaceholder: ''
    }
};

this.inlineCheckout = new InlineCheckout({
    apiKey: apiKey,
    returnUrl: returnUrl,
    successUrl: returnUrl,
    renderPaymentButton: true,
    styles: this.customStyles
});

```

<font size="3">This object contain the styles related to the form elements included into the checkout</font>

<font size="3">The global styles is injected from the file /src/assets/scss/theming-container.scss, here is the styles related to the checkout container, buttons and cards list included into the checkout</font>

```scss

#tonder-checkout-theming {
  
  .container-tonder {

    background-color: #F9F9F9;
    margin: 0 auto;
    padding: 30px 10px 30px 10px;
    overflow: hidden;
    transition: max-height 0.5s ease-out;
    max-width: 600px;
    border: solid 1px #e3e3e3;

    .error-custom-inputs-tonder {
      background-color: white;
      position: absolute;
      left: 0px;
      bottom: -1px;
      width: 100%;
      font-size: 12px;
      color: red;
      font-family: "Inter", sans-serif;
    }

    .expiration-year .error-custom-inputs-tonder {
      background-color: white;
      position: absolute;
      left: 0px;
      bottom: 3px;
      width: 100%;
      font-size: 12px;
      color: red;
      font-family: "Inter", sans-serif;
    }
    
    .collect-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    .collect-row {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }
    
    .collect-row > :first-child {
      min-width: 120px;
    }
    
    .expiration-year {
      position: relative;
      padding-top: 25px;
    }
    
    .empty-div {
      position: relative;
      height: 80px;
      margin-top: 2px;
      margin-bottom: 4px;
      margin-left: 10px;
      margin-right: 10px;
    }
    
    .error-container{
      color: red;
      background-color: #FFDBDB;
      margin-bottom: 13px;
      font-size: 80%;
      padding: 8px 10px;
      border-radius: 10px;
      text-align: left;
    }
    
    .message-container{
      color: green;
      background-color: #DAFCE4;
      margin-bottom: 13px;
      font-size: 80%;
      padding: 8px 10px;
      border-radius: 10px;
      text-align: left;
    }
    
    .pay-button {
      font-size: 16px;
      font-weight: bold;
      min-height: 2.3rem;
      border-radius: 0.5rem;
      cursor: pointer;
      width: 100%;
      padding: 1rem;
      text-align: center;
      border: none;
      background-color: #000;
      color: #fff;
      margin-bottom: 10px;
      display: none;
      font-family: "Inter", sans-serif;
    }
    
    .pay-button:disabled, .pay-button[disabled] {
      background-color: #B9B9B9;
    }
    
    .lds-dual-ring {
      display: inline-block;
      width: 14px;
      height: 14px;
    }
    
    .lds-dual-ring:after {
      content: " ";
      display: block;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      border: 6px solid #fff;
      border-color: #fff transparent #fff transparent;
      animation: lds-dual-ring 1.2s linear infinite;
    }
    
    @keyframes lds-dual-ring {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    
    @media screen and (max-width: 600px) {
      .payment_method_zplit {
        font-size: 16px;
        width: 100%;
      }
    
      .payment_method_zplit  label img {
        display: none;
      }
    }

  }

  .cards-list-container {
    display: flex;
    flex-direction: column;
    padding: 0px 10px 0px 10px;
    gap: 33% 20px;
  }
  
  .checkbox label {
    margin-left: 10px;
    font-size: '12px';
    font-weight: '500';
    color: #1D1D1D;
    font-family: "Inter", sans-serif;
  }
  
  .checkbox {
    margin-top: 10px;
    margin-bottom: 10px;
    width: 100%;
    text-align: left;
  }
  
  .pay-new-card {
    display: flex;
    justify-content: start;
    align-items: center;
    color: #1D1D1D;
    gap: 33% 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 90%;
  }
  
  .pay-new-card .card-number {
    font-size: 16px;
    font-family: "Inter", sans-serif;
  }
  
  .card-image {
    width: 39px;
    height: 24px;
    text-align: left;
  }
  
  .card-item-label-new {
    display: flex;
    justify-content: start;
    align-items: center;
    color: #1D1D1D;
    gap: 33% 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 90%;
  }
  
  .card-item-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #1D1D1D;
    gap: 33% 20px;
    margin-top: 10px;
    margin-bottom: 10px;
    padding-left: 10px;
    padding-right: 10px;
    width: 90%;
  }

  .card-item {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 33% 20px;
  }

  .card-item .card-number {
    font-size: 16px;
    font-family: "Inter", sans-serif !important;
  }

  .card-item .card-expiration {
    font-size: 16px;
    font-family: "Inter", sans-serif !important;
  }

  .card_selected {
    position: relative;
    width: 16px;
    height: 16px;
    appearance: none;
    cursor: pointer;
    border-radius: 100%;
    border: 1px #3bc635 solid;
    color: #3bc635;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .card_selected:before {
    width: 8px;
    height: 8px;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: #3bc635;
    opacity: 0;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .card_selected:checked {
    border: 1px #3bc635 solid;
    position: relative;
    width: 16px;
    height: 16px;
    appearance: none;
    cursor: pointer;
    border-radius: 100%;
    color: #3bc635;
    transition-property: all;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .card_selected:checked:before {
    content: "";
    border: 1px #3bc635 solid;
    width: 8px;
    height: 8px;
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: #3bc635;
    opacity: 50;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
  }

  .card_selected:hover:before {
    width: 8px;
    height: 8px;
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    display: block;
    transform: translate(-50%, -50%);
    border-radius: 100%;
    background-color: #3bc635;
    transition-property: opacity;
    transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
    transition-duration: 150ms;
    opacity: 10;
  }

}

```