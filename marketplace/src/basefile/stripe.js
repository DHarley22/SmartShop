import React from "react";
import Stripe from "react-stripe-checkout";
import smartshopapi from "../smartshopapi";
function Stripe_app() {
async function handleToken(token) {
console.log(token);
await smartshopapi.post("api/payment/charge", "", {         headers: {
  token: token.id,
  amount: 500,
},}).then(() => {
   alert("Payment Success");
   }).catch((error) => {
   alert(error);
   });
}
return (
<div className="App">
<Stripe
stripeKey="pk_test_51KUpVQGCgG8mbdIxGn7rF5ATYxByPhA3lKigx2mKySvlm520ZWUjsGA4SoVv3eLaO7tIIkfHIFObRCTEwyh9mB5z00QnLYezAL"
token={handleToken}
/>
</div>
);
}
export default Stripe_app;