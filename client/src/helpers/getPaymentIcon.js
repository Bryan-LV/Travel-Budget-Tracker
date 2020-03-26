import cash from '../imgs/money.png'
import debt from '../imgs/debt.png'
import creditCard from '../imgs/credit-card.png'

const getPaymentIcon = (methodOfPayment) => {
  let paymentIcon;
    switch (methodOfPayment) {
      case 'cash':
        paymentIcon = cash;
        break;
      case 'credit':
        paymentIcon = creditCard;
        break;
      case 'debt':
        paymentIcon = debt;
        break
      default:
        break;
    }
  
  return paymentIcon
}

export default getPaymentIcon;



