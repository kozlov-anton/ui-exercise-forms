import $ from "jquery";

$(document).ready(function () {
  // Submit form
  var $form = $("#reset-password-form"),
    $emailField = $form.find("input[type=email]");

  $form.submit(function (e) {
    var data = $emailField.val(),
      filter = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
      $error = $form.find(".msg-error"),
      $errorTemp = $("<div/>", {
        class: "msg-error",
        html: $("<span/>", {
          text: "Please enter valid email address",
        }),
      }),
      $successTemp = $("<h2/>", {
        class: "msg-success",
        text: "Success, we have emailed your password rest link.",
      }),
      urlRequest = "http://localhost:3005/users/";

    // Validate Email address
    if (!filter.test(data)) {
      if (!$error.length) {
        $emailField.addClass("error");
        $emailField.after($errorTemp);
      }
      return false;
    } else {
      if ($error.length) {
        $emailField.removeClass("error");
        $error.remove();
      }

      e.preventDefault();

      // Send request
      $.ajax({
        type: "POST",
        url: urlRequest,
        data: {
          email: data,
        },
        dataType: "json",
        success: function () {
          $form.before($successTemp);
        },
      })
        .then((resp) => {
          console.log(resp);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  });

  // Collapsible description
  var $descriptionTitle = $(".description__title"),
    $descriptionInfo = $(".description__info"),
    activeClass = "active";

  $descriptionTitle.click(function () {
    $(this).next($descriptionInfo).toggleClass(activeClass);
  });
});
