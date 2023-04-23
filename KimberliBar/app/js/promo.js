$(document).ready(function () {

  $("a[rel=gallery]").fancybox({});
  $(".lazy").lazy();

  $('input[name="Phone"]').inputmask('+389999999999', {
    "clearIncomplete": true
  });


  $(".footer .bgel .footer-preview-bg").css({
    "-webkit-transform": "translateX(-" + $(window).width() + "px)",
  });

  $(".request-open-btn").click(function () {
    $(".header").removeClass("active");
    $("#request-popup.sli-popup_container").addClass("active");
  });

  $(".location-open-btn").click(function () {
    $(".header").removeClass("active");
    $("#location-popup.sli-popup_container").addClass("active");
  });

  $(".menu-open-btn").click(function () {
    $(".header").removeClass("active");
    $("#menu-popup.sli-popup_container").addClass("active");
    $("#menu-popup .bg-element-container").addClass("bg-element-container-run");
  });

  $(".ty-open-btn").click(function () {
    $(".header").removeClass("active");
    $("#ty-popup.sli-popup_container").addClass("active");
  });

  $(".popup-close").click(function () {
    $(".sli-popup_container").removeClass("active");
    $("#menu-popup .bg-element-container").removeClass(
      "bg-element-container-run"
    );
  });

  window.addEventListener("scroll", function () {
    var element = document.querySelector(".location");
    var position = element.getBoundingClientRect();
    var elementSecond = document.querySelector(".footer");
    var positionSecond = elementSecond.getBoundingClientRect();
    var elementCircleText = document.querySelector(".events");
    var positionCircleText = elementCircleText.getBoundingClientRect();
    var header = document.querySelector(".header");
    var headerPosition = header.getBoundingClientRect();
    var restaurant = document.querySelector(".restaurant");
    var restaurantPosition = restaurant.getBoundingClientRect();

    if (position.top <= 140 && position.top >= -610) {
      $(".location-round").addClass("radius-1");
    }
    if (position.top <= 120 && position.top >= -610) {
      $(".location-round").removeClass("radius-1");
      $(".location-round").addClass("radius-2");
    }
    if (position.top <= 90 && position.top >= -610) {
      $(".location-round").removeClass("radius-2");
      $(".location-round").addClass("radius-3");
    }
    if (position.top <= 60 && position.top >= -610) {
      $(".location-round").removeClass("radius-3");
      $(".location-round").addClass("radius-4");
    }
    if (position.top <= 40 && position.top >= -610) {
      $(".location-round").removeClass("radius-4");
      $(".location-round").addClass("radius-5");
    }

    if (position.top >= 50 && position.top <= 750) {
      $(".location-round").removeClass("radius-5");
      $(".location-round").addClass("radius-4");
    }
    if (position.top >= 70 && position.top <= 750) {
      $(".location-round").removeClass("radius-4");
      $(".location-round").addClass("radius-3");
    }
    if (position.top >= 100 && position.top <= 750) {
      $(".location-round").removeClass("radius-3");
      $(".location-round").addClass("radius-2");
    }
    if (position.top >= 130 && position.top <= 750) {
      $(".location-round").removeClass("radius-2");
      $(".location-round").addClass("radius-1");
    }
    if (position.top >= 160 && position.top <= 750) {
      $(".location-round").removeClass("radius-5");
      $(".location-round").removeClass("radius-4");
      $(".location-round").removeClass("radius-3");
      $(".location-round").removeClass("radius-2");
      $(".location-round").removeClass("radius-1");
    }

    if (positionSecond.top <= 760 && positionSecond.top >= -610) {
      $(".footer-preview-bg").addClass("preview-run");
    }
    if (positionSecond.top >= 920 && positionSecond.top <= 1150) {
      $(".footer-preview-bg").removeClass("preview-run");
    }

    if (positionSecond.top <= 140 && positionSecond.top >= -610) {
      $(".footer-round").addClass("radius-1");
    }
    if (positionSecond.top <= 120 && positionSecond.top >= -610) {
      $(".footer-round").removeClass("radius-1");
      $(".footer-round").addClass("radius-2");
    }
    if (positionSecond.top <= 90 && positionSecond.top >= -610) {
      $(".footer-round").removeClass("radius-2");
      $(".footer-round").addClass("radius-3");
    }
    if (positionSecond.top <= 60 && positionSecond.top >= -610) {
      $(".footer-round").removeClass("radius-3");
      $(".footer-round").addClass("radius-4");
    }
    if (positionSecond.top <= 50 && positionSecond.top >= -610) {
      $(".footer-round").removeClass("radius-4");
      $(".footer-round").addClass("radius-5");
    }

    if (positionSecond.top >= 60 && positionSecond.top <= 550) {
      $(".footer-round").removeClass("radius-5");
      $(".footer-round").addClass("radius-4");
    }
    if (positionSecond.top >= 70 && positionSecond.top <= 550) {
      $(".footer-round").removeClass("radius-4");
      $(".footer-round").addClass("radius-3");
    }
    if (positionSecond.top >= 100 && positionSecond.top <= 550) {
      $(".footer-round").removeClass("radius-3");
      $(".footer-round").addClass("radius-2");
    }
    if (positionSecond.top >= 130 && positionSecond.top <= 550) {
      $(".footer-round").removeClass("radius-2");
      $(".footer-round").addClass("radius-1");
    }
    if (positionSecond.top >= 160 && positionSecond.top <= 550) {
      $(".footer-round").removeClass("radius-5");
      $(".footer-round").removeClass("radius-4");
      $(".footer-round").removeClass("radius-3");
      $(".footer-round").removeClass("radius-2");
      $(".footer-round").removeClass("radius-1");
    }

    var video = document.getElementById("footerVideo");
    if (positionSecond.top <= 500 && positionSecond.top >= -10) {
      if (video.paused) {
        video.play();
      }
    }
    if (positionSecond.top >= 510 && positionSecond.top <= 950) {
      video.pause();
    }

    var logo = document.querySelector(".events-textbg");

    if (positionCircleText.top <= 750 && positionCircleText.top >= -2177) {
      logo.style.transform = "rotate(" + (window.pageYOffset - 2200) / 30 + "deg)";
    }


    if ($(window).width() > 992) {
      if (restaurantPosition.top <= 750 && restaurantPosition.bottom >= 20) {
        $(".restaurant .bg_elements .bgel:nth-child(1)").css(
          "margin-top",
          "" + restaurantPosition.top * 0.12 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(2)").css(
          "margin-top",
          "" + restaurantPosition.top * 0.05 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(3)").css(
          "margin-top",
          "" + restaurantPosition.top * 0.15 + "px"
        );

        $(".restaurant .bg_elements .bgel:nth-child(1) img").css(
          "margin-top",
          "" + restaurantPosition.top * 0.06 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(2) img").css(
          "margin-top",
          "" + restaurantPosition.top * 0.04 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(3) img").css(
          "margin-top",
          "" + restaurantPosition.top * 0.11 + "px"
        );
      }
    } else {
      if (restaurantPosition.top <= 750 && restaurantPosition.bottom >= 20) {
        $(".restaurant .bg_elements .bgel:nth-child(1)").css(
          "margin-top",
          "" + restaurantPosition.top * 0.11 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(2)").css(
          "margin-top",
          "" + restaurantPosition.top * 0.13 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(3)").css(
          "margin-top",
          "" + restaurantPosition.top * 0.03 + "px"
        );

        $(".restaurant .bg_elements .bgel:nth-child(1) img").css(
          "margin-top",
          "" + restaurantPosition.top * 0.02 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(2) img").css(
          "margin-top",
          "" + restaurantPosition.top * 0.01 + "px"
        );
        $(".restaurant .bg_elements .bgel:nth-child(3) img").css(
          "margin-top",
          "" + restaurantPosition.top * 0.08 + "px"
        );
      }
    }

    var scroll = $(window).scrollTop();
    if (scroll >= 130) {
      $(".header").addClass("scroll");
    } else {
      $(".header").removeClass("scroll");
    }
  });

  $('a[href*="#"], button[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      $(".header").removeClass("active");
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        target = target.length
          ? target
          : $("[name=" + this.hash.slice(1) + "]");
        if (target.length) {
          event.preventDefault();
          $("html, body").animate(
            {
              scrollTop: target.offset().top,
            },
            700,
            function () {
              var $target = $(target);
              if ($target.is(":focus")) {
                return false;
              } else {
                $target.attr("tabindex", "-1");
              }
            }
          );
        }
      }
    });

  $(".header-toggler").click(function () {
    $(".header").toggleClass("active");
  });

  $(".pickup_form").submit(function (e) { 
    e.preventDefault();
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "../mail.php",
      data: th.serialize()
    }).done(function () {
      $(".pickup_content_sl-one").addClass("hidden");
      $(".pickup_content_sl-ty").removeClass("hidden");
    });
    return false;
  });

  $("#request-popup .sli-request-popup_form").submit(function (e) { 
    e.preventDefault();
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "../mail.php",
      data: th.serialize()
    }).done(function () {
      $(".sli-popup_container").removeClass("active");
      $("#ty-popup.sli-popup_container").addClass("active")
    });
    return false;
  });

  $("#location-popup .sli-request-popup_form").submit(function (e) { 
    e.preventDefault();
    var th = $(this);
    $.ajax({
      type: "POST",
      url: "../mail.php",
      data: th.serialize()
    }).done(function () {
      $(".sli-popup_container").removeClass("active");
      $("#ty-popup.sli-popup_container").addClass("active")
    });
    return false;
  });

});
