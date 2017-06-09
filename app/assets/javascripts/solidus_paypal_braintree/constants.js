SolidusPaypalBraintree = {
  APPLY_PAY_API_VERSION: 1,

  /*
   * Invoke this when you are sure that Spree.pathFor is available.
   * This will most of the time be on DOMContentLoaded
   */
  init: function init() {
    // Need to override the paths dynamically, as we don't know the Solidus engine mount point while loading this file.
    this.config.paths.clientTokens = Spree.pathFor('solidus_paypal_braintree/client_token');
    this.config.paths.transactions = Spree.pathFor('solidus_paypal_braintree/transactions');
  },

  config: {
    paths: {
      clientTokens: '/solidus_paypal_braintree/client_token',
      transactions: '/solidus_paypal_braintree/transactions'
    },

    // Override to provide your own error messages.
    braintreeErrorHandle: function(braintreeError) {
      var $contentContainer = $("#content");
      var $flash = $("<div class='flash error'>" + braintreeError.name + ": " + braintreeError.message + "</div>");
      $contentContainer.prepend($flash);

      $flash.show().delay(5000).fadeOut(500);
    },

    classes: {
      hostedForm: function() {
        return SolidusPaypalBraintree.HostedForm;
      },

      client: function() {
        return SolidusPaypalBraintree.Client;
      },

      paypalButton: function() {
        return SolidusPaypalBraintree.PaypalButton;
      }
    }
  },

  createHostedForm: function() {
    return SolidusPaypalBraintree._factory(SolidusPaypalBraintree.config.classes.hostedForm(), arguments);
  },

  createClient: function() {
    return SolidusPaypalBraintree._factory(SolidusPaypalBraintree.config.classes.client(), arguments);
  },

  createPaypalButton: function() {
    return SolidusPaypalBraintree._factory(SolidusPaypalBraintree.config.classes.paypalButton(), arguments);
  },

  _factory: function(klass, args) {
    var normalizedArgs = Array.prototype.slice.call(args);
    return new (Function.prototype.bind.apply(klass, [null].concat(normalizedArgs)));
  }
};
