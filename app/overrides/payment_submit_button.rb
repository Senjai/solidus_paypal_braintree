#jkDeface::Override.new(
#jk  virtual_path: "spree/checkout/_payment",
#jk  name: "disable_submit_button_on_payment",
#jk  replace_contents: "[data-hook='buttons']",
#jk  partial: "solidus_paypal_braintree/checkout/payment_button"
#jk)
