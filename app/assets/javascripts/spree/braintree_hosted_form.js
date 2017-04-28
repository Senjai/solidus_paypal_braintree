function BraintreeHostedForm($paymentForm, $hostedFields, paymentMethodId) {
  this.paymentForm = $paymentForm;
  this.hostedFields = $hostedFields;
  this.paymentMethodId = paymentMethodId;

  this.errorCallback = null;

  this.submitPending = false;
  this.submitHandler = function(){};

  this.bindSubmitHandler();
}

BraintreeHostedForm.prototype.initializeHostedFields = function(errorCallback) {
  this.errorCallback = errorCallback || null;

  return this.getToken().
    then(this.createClient.bind(this)).
    then(this.createHostedFields()).
    then(this.addFormHook())
}

BraintreeHostedForm.prototype.bindSubmitHandler = function() {
  this.submitHandler = function(event) {
    this.submitPending = true;
  }

  this.paymentForm.on("submit", function(event) {
    if (this.hostedFields.is(":visible")) {
      debugger
      event.preventDefault();

      this.submitHandler();
    }
  }.bind(this));
}

BraintreeHostedForm.prototype.promisify = function (fn, args, self) {
  var d = $.Deferred();

  fn.apply(self || this, (args || []).concat(function (err, data) {
    err && d.reject(err);
    d.resolve(data);
  }));

  return d.promise();
}

BraintreeHostedForm.prototype.getToken = function () {
  var opts = {
    url: "/solidus_paypal_braintree/client_token",
    method: "POST",
    data: {
      payment_method_id: this.paymentMethodId
    },
  };

  function onSuccess(data) {
    return data.client_token;
  }

  return Spree.ajax(opts).then(onSuccess, this.errorCallback);
}

BraintreeHostedForm.prototype.createClient = function (token) {
  var opts = { authorization: token };
  return this.promisify(braintree.client.create, [opts]);
}

BraintreeHostedForm.prototype.createHostedFields = function () {
  var self = this;
  var id = this.paymentMethodId;

  return function(client) {
    var opts = {
      client: client,

      fields: {
        number: {
          selector: "#card_number" + id
        },

        cvv: {
          selector: "#card_code" + id
        },

        expirationDate: {
          selector: "#card_expiry" + id
        }
      }
    };

    return self.promisify(braintree.hostedFields.create, [opts]);
  }
}

BraintreeHostedForm.prototype.addFormHook = function (braintreeResponse) {
  function submit(payload) {
    $("#payment_method_nonce", this.hostedFields).val(payload.nonce);
    this.paymentForm.submit();
  }

  this.submitHandler = function() {
    braintreeResponse.tokenize(function(err, payload) {
      if (err && self.errorCallback) {
        self.errorCallback(err);
      } else {
        submit(payload);
      }
    })
  }

  if(this.submitPending) {
    this.submitPending = false;
    this.submitHandler();
  }
}
