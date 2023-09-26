/**
 * Template Name: SoftLand
 * Updated: Sep 18 2023 with Bootstrap v5.3.2
 * Template URL: https://bootstrapmade.com/softland-bootstrap-app-landing-page-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#header");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Testimonials slider
   */
  new Swiper(".testimonials-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  // lightswitch
  let lightSwitch = document.getElementById("lightSwitch");
  if (lightSwitch) {
    darkMode();
    lightSwitch.addEventListener("change", () => {
      lightMode();
    });
    function darkMode() {
      let isSelected =
        localStorage.getItem("lightSwitch") !== null &&
        localStorage.getItem("lightSwitch") === "dark";
      if (isSelected) {
        document.querySelectorAll(".bg-light").forEach((element) => {
          element.className = element.className.replace(/-light/g, "-dark");
        });
        document
          .querySelector("svg g g[fill]")
          .setAttribute("fill", "rgba(var(--bs-dark-rgb)");
        document.body.classList.add("bg-dark");
        if (document.body.classList.contains("text-dark")) {
          document.body.classList.replace("text-dark", "text-light");
        } else {
          document.body.classList.add("text-light");
        }
        document.querySelectorAll(".btn-close").forEach((element) => {
          element.classList.add("btn-close-white");
        });
        lightSwitch.checked = true;
      }
    }
    function lightMode() {
      if (lightSwitch.checked) {
        localStorage.setItem("lightSwitch", "dark");
        darkMode();
      } else {
        document.querySelectorAll(".bg-dark").forEach((element) => {
          element.className = element.className.replace(/-dark/g, "-light");
        });
        document
          .querySelector("svg g g[fill]")
          .setAttribute("fill", "rgba(var(--bs-light-rgb)");
        document.body.classList.replace("text-light", "text-dark");
        document.querySelectorAll(".btn-close").forEach((element) => {
          element.classList.remove("btn-close-white");
        });
        localStorage.removeItem("lightSwitch");
      }
    }
  }

  // datetimepicker
  var today = new Date();
  var minDate = today.setDate(today.getDate() + 1);

  $("#datePicker").datetimepicker({
    useCurrent: false,
    format: "MM/DD/YYYY",
    minDate: minDate,
  });

  var firstOpen = true;
  var time;

  $("#timePicker")
    .datetimepicker({
      useCurrent: false,
      format: "hh:mm A",
    })
    .on("dp.show", function () {
      if (firstOpen) {
        time = moment().startOf("day");
        firstOpen = false;
      } else {
        time = "01:00 PM";
      }

      $(this).data("DateTimePicker").date(time);
    });

  // tooltip
  var tooltipTriggerList = [].slice.call(
    document.querySelectorAll('[data-bs-toggle="tooltip"]')
  );
  var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl);
  });
})();

// upload img
function readURL(input) {
  if (input.files && input.files[0]) {
    var reader = new FileReader();

    reader.onload = function (e) {
      $(".imageResult").attr("src", e.target.result);
    };
    reader.readAsDataURL(input.files[0]);
  }
}

$(function () {
  $(".upload").on("change", function () {
    readURL(input);
  });
});

// create reg link
$(".rowAdder").click(function () {
  newRowAdd =
    '  <div id="row">' +
    '                              <div class="input-group mt-3">' +
    '                                <select class="form-select">' +
    '                                  <option value="1" selected>WhatsApp</option>' +
    '                                  <option value="2">Telegram</option>' +
    '                                  <option value="3">Facebook</option>' +
    '                                  <option value="3">Instagram</option>' +
    "                                </select>" +
    '                                <input type="text" class="form-control m-input" placeholder="Registration\'s link" aria-label="Registration\'s link" aria-describedby="DeleteRow" />' +
    '                                <button class="btn normal-btn btn-outline-danger" type="button" id="DeleteRow" >' +
    '                                  <i class="bi bi-trash"></i> Delete' +
    "                                </button>" +
    "                              </div>" +
    "                            </div>";

  $("#newinput").append(newRowAdd);
});
$("body").on("click", "#DeleteRow", function () {
  $(this).parents("#row").remove();
});

// edit reg link
$(".rowAdder2").click(function () {
  newRowAdd =
    '  <div id="row">' +
    '                              <div class="input-group mt-3">' +
    '                                <select class="form-select">' +
    '                                  <option value="1" selected>WhatsApp</option>' +
    '                                  <option value="2">Telegram</option>' +
    '                                  <option value="3">Facebook</option>' +
    '                                  <option value="3">Instagram</option>' +
    "                                </select>" +
    '                                <input type="text" class="form-control m-input" placeholder="Registration\'s link" aria-label="Registration\'s link" aria-describedby="DeleteRow" />' +
    '                                <button class="btn normal-btn btn-outline-danger" type="button" id="DeleteRow" >' +
    '                                  <i class="bi bi-trash"></i> Delete' +
    "                                </button>" +
    "                              </div>" +
    "                            </div>";

  $("#newinput2").append(newRowAdd);
});
$("body").on("click", "#DeleteRow", function () {
  $(this).parents("#row2").remove();
});
