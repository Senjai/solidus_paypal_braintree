Deface::Override.new(
  virtual_path: "spree/checkout/_payment",
  name: "disable_submit_button_on_payment",
  replace_contents: "[data-hook='buttons']",
  partial: "solidus_paypal_braintree/checkout/payment_button"
)
