import { Booked } from "../booked.model";
import { varifyPayment } from "./payment.utlis";

const paymentUpdate = async (transactionId: string, status: string) => {
  const varifyResponse = await varifyPayment(transactionId);
  let result;
  if (varifyResponse && varifyResponse.pay_status === "successful") {
    result = await Booked.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );
  }
  return `<h1>Payment ${status}</h1>`;
};
export const paymentService = {
  paymentUpdate,
};
