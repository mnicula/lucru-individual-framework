export class PaymentModel {
  payment: {
    billingAddress: BillingAddress;
    cardDetails: CardDetails
  };
  paymentDetails: PaymentDetails;
  userId: number;
}

export interface BillingAddress {
  fullName: string;
  address1: string;
  address2: string;
  city: string;
  zipCode: string;
}

export interface CardDetails {
  cardNr: number;
  name: string;
  month: string;
  year: string;
  CVC: number;
}

export interface PaymentDetails {
  eventId: number;
}

export interface EventDetails {
  email: string;
  eventDetails: {
    id: number;
    participationFee: number;
    startTime: string;
    endTime: string;
    title: string;
    location: string;
    description: string;
  };
  orderId: number;
}
