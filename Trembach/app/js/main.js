$(document).ready(function () {

  $("a[rel=gallery]").fancybox({});

  let aboutSwiper = new Swiper(".about_slider", {
    loop: false,
    roundLengths: true,
    slidesPerView: 1,
    /*effect: "fade",*/
    spaceBetween: 0,
    navigation: {
      nextEl: ".about_slider-wrapp .about_slider_nav .next",
      prevEl: ".about_slider-wrapp .about_slider_nav .prev",
    },
  });

  let reviewsOneSwiper = new Swiper(".reviews_slider_one", {
    loop: true,
    roundLengths: true,
    slidesPerView: 2,
    /*effect: "fade",*/
    spaceBetween: 24,
  });

  let reviewsTwoSwiper = new Swiper(".reviews_slider_two", {
    loop: true,
    roundLengths: true,
    slidesPerView: 2,
    /*effect: "fade",*/
    spaceBetween: 24,
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

});
