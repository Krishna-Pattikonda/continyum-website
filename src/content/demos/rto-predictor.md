---
name: RTO Predictor
tagline: Scores every cash-on-delivery order for refusal risk before it ships.
problem: When a cash-on-delivery parcel is refused at the door, the business pays to ship it both ways and the stock is stuck in transit. Many of those orders show warning signs before they ever leave the warehouse.
howItWorks:
  - Reads every new cash-on-delivery order as it arrives.
  - Weighs signals such as the pincode, the customer's order history, the time of the order and the quality of the address.
  - Gives each order a refusal-risk score.
  - Recommends an action for risky orders, such as asking for prepayment, calling the customer or blocking the order.
status: In development
exampleOutput: |-
  Order #1043 · Cash on delivery · ₹1,499
  Refusal risk: High (72/100)
  Signals: first order from this customer · placed at 1:12 am · address has no landmark
  Recommended action: ask for prepayment
demoUrl: "[PLACEHOLDER]"
videoUrl: "[PLACEHOLDER]"
screenshots:
  - "[PLACEHOLDER]"
illustration: rto
featured: true
order: 1
draft: false
---

Built for D2C and e-commerce teams that ship a large share of their orders as cash on delivery and want to catch risky orders before paying to send them.
