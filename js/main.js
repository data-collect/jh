$(function () {
  $("#form-register").validate({
    rules: {
      password: {
        required: true,
      },
      confirm_password: {
        equalTo: "#password",
      },
    },
    messages: {
      username: {
        required: "Please provide an username",
      },
      email: {
        required: "Please provide an email",
      },
      password: {
        required: "Please provide a password",
      },
      confirm_password: {
        required: "Please provide a password",
        equalTo: "Please enter the same password",
      },
    },
  });
  $("#form-total").steps({
    headerTag: "h2",
    bodyTag: "section",
    transitionEffect: "fade",
    // enableAllSteps: true,
    autoFocus: true,
    transitionEffectSpeed: 500,
    titleTemplate: '<div class="title">#title#</div>',
    labels: {
      previous: "Back",
      next: '<i class="zmdi">Next</i>',
      finish: '<i class="zmdi zmdi-arrow-right"></i>',
      current: "",
    },
    onStepChanging: function (event, currentIndex, newIndex) {
      $("#form-register").validate().settings.ignore = ":disabled,:hidden";
      return $("#form-register").valid();
    },
  });
});
function getLocation() {
  function success(position) {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    alert(latitude)
    document.getElementById("latitude").value = String(latitude);
    document.getElementById("longitude").value = String(longitude);
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById("latitude").value="User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById("latitude").value="Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.getElementById("latitude").value="The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById("latitude").value="An unknown error occurred.";
        break;
    }
  }
  if (!navigator.geolocation) {
    document.getElementById("latitude").value="Cannot Update"
    return(["Cannot Update", "Cannot Update"]);
  } else {
    navigator.geolocation.getCurrentPosition(success, showError);
  }
}
