import { Booked } from "../booked.model";
import { varifyPayment } from "./payment.utlis";

const paymentUpdate = async (transactionId: string, status: string) => {
  console.log(transactionId, status);
  const varifyResponse = await varifyPayment(transactionId);
  let result;
  if (varifyResponse && varifyResponse.pay_status === "Successful") {
    result = await Booked.findOneAndUpdate(
      { transactionId },
      {
        paymentStatus: "Paid",
      }
    );
  }
  return ` <div style="text-align: center; margin-top: 50px;">
  <h1 style="color: green;">Payment ${status}</h1>
  <p style="font-size: 18px; color: #333;">
    Thank you for your purchase. You will be redirected to the home page shortly.
  </p>
  <button style="padding: 10px 20px; text-align: center; background-color: #4CAF50; border: none; color: white; cursor: pointer;">
    <a href="http://localhost:5173/" style="color: white; text-decoration: none;">Home</a>
  </button>
</div>
`;
};

export const paymentService = {
  paymentUpdate,
};
