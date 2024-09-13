import axios from "axios";
import config from "../../../config";

export const initialPayment = async (paymentData: any) => {
  const {
    transactionId,
    totalCost,
    customerName,
    custormarEmail,
    custormarPhone,
  } = paymentData;
  const response = await axios.post(config.payment_url!, {
    store_id: config.store_id,
    signature_key: config.signature_id,
    tran_id: transactionId,
    success_url: `http://localhost:5000/api/payment/confirmation?transactionId=${paymentData.transactionId}&status=success`,
    fail_url: `http://localhost:5000/api/payment/confirmation?status=faild`,
    cancel_url: "http://localhost:5173/",
    amount: totalCost,
    currency: "BDT",
    desc: "Merchant Registration Payment",
    cus_name: customerName,
    cus_email: custormarEmail,
    cus_add1: "House B-158 Road 22",
    cus_add2: "Mohakhali DOHS",
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1206",
    cus_country: "Bangladesh",
    cus_phone: custormarPhone,
    type: "json",
  });
  //   console.log(response);
  return response.data;
};
export const varifyPayment = async (transactionId: string) => {
  const response = await axios.get(config.payment_varifyUrl!, {
    params: {
      store_id: config.store_id,
      signature_key: config.signature_id,
      type: "json",
      request_id: transactionId,
    },
  });
  return response.data;
};
