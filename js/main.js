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
    document.getElementById("latitude").value = String(latitude);
    document.getElementById("longitude").value = String(longitude);
  }
  function showError(error) {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        document.getElementById("latitude").value =
          "User denied the request for Geolocation.";
        break;
      case error.POSITION_UNAVAILABLE:
        document.getElementById("latitude").value =
          "Location information is unavailable.";
        break;
      case error.TIMEOUT:
        document.getElementById("latitude").value =
          "The request to get user location timed out.";
        break;
      case error.UNKNOWN_ERROR:
        document.getElementById("latitude").value =
          "An unknown error occurred.";
        break;
    }
  }
  if (!navigator.geolocation) {
    document.getElementById("latitude").value = "Cannot Update";
    return ["Cannot Update", "Cannot Update"];
  } else {
    navigator.geolocation.getCurrentPosition(success, showError);
  }
}
window.loadShow = function () {
  document.getElementById("spLoading").style.display = "block";
  document.getElementById("form-register").style.display = "none";
};
window.loadHide = function () {
  document.getElementById("spLoading").style.display = "none";
  document.getElementById("form-register").style.display = "block";
};
function createInputElements(brandName, rspLimitMin, rspLimitMax) {
  var div = document.createElement("div");
  div.className = "form-holder";
  var input = document.createElement("input");
  input.type = "number";
  input.placeholder = "No.of Bags";
  input.className = "form-control";
  input.name = brandName + "_Sale";
  input.id = "id" + new Date().getTime();
  var inputLabel = document.createElement("Label");
  inputLabel.setAttribute("for", input.id);
  inputLabel.innerHTML = brandName + " Sale(No.of bags)";
  div.appendChild(inputLabel);
  div.appendChild(input);
  var div1 = document.createElement("div");
  div1.className = "form-holder";
  var input1 = document.createElement("input");
  input1.type = "number";
  input1.placeholder = "Rs/bag";
  input1.className = "form-control";
  input1.name = brandName + "_RSP";
  rspLimitMin == "" ? (input1.min = 150) : (input1.min = rspLimitMin);
  rspLimitMax == "" ? (input1.max = 700) : (input1.max = rspLimitMax);
  input1.id = "rsp" + input.id;
  var input1Label = document.createElement("Label");
  input1Label.setAttribute("for", input1.id);
  input1Label.innerHTML = brandName + " Retail Sales Price(Rs/Bag)";
  div1.appendChild(input1Label);
  div1.appendChild(input1);
  var formrow = document.createElement("div");
  formrow.className = "form-row";
  formrow.appendChild(div);
  formrow.appendChild(div1);
  return formrow;
}
function createNewBrand(id) {
  var brandName = window.prompt("Enter Brand Name?");
  if (brandName) {
    var formrow = createInputElements(brandName, 100, 700);
    var addButtonNode = document.getElementById("addButton");
    addButtonNode.parentNode.insertBefore(formrow, addButtonNode);
  }
}
