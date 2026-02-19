function initMap() {
  const address = "вул. Пирогова, буд. 2 / вул. Б. Хмельницького, буд. 37, під'їзд № 1, офіс № 1, м. Київ";
  
  const location = { lat:  50.447010148088675, lng: 30.506703855820302 };


  const centerOffset = { lat: -0.0009, lng: -0.004 };
  const mapCenter = {
    lat: location.lat + centerOffset.lat,
    lng: location.lng + centerOffset.lng
  };
  const centerOffsetMobile = { lat: -0.0009, lng: -0.001 };
  const mapCenterMobile = {
    lat: location.lat + centerOffsetMobile.lat,
    lng: location.lng + centerOffsetMobile.lng
  };

  function getMapCenter() {
    return window.innerWidth <= 992 ? mapCenterMobile : mapCenter;
  }

  function getMapZoom() {
    return window.innerWidth <= 992 ? 16 : 17;
  }
  
  const mapStyles = [
    {
      "featureType": "all",
      "elementType": "labels.text.fill",
      "stylers": [
        {
          "saturation": 36
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 40
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.text.stroke",
      "stylers": [
        {
          "visibility": "on"
        },
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "all",
      "elementType": "labels.icon",
      "stylers": [
        {
          "visibility": "off"
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        },
        {
          "weight": 1.2
        }
      ]
    },
    {
      "featureType": "landscape",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 20
        }
      ]
    },
    {
      "featureType": "poi",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 21
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.fill",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry.stroke",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 29
        },
        {
          "weight": 0.2
        }
      ]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 18
        }
      ]
    },
    {
      "featureType": "road.local",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 16
        }
      ]
    },
    {
      "featureType": "transit",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 19
        }
      ]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [
        {
          "color": "#000000"
        },
        {
          "lightness": 17
        }
      ]
    }
  ];
  
  const mapElement = document.getElementById('google-map');
  if (!mapElement) {
    console.error('Element #google-map not found');
    return;
  }

  const map = new google.maps.Map(mapElement, {
    zoom: getMapZoom(),
    center: getMapCenter(),
    styles: mapStyles,
    disableDefaultUI: false,
    zoomControl: true,
    mapTypeControl: false,
    streetViewControl: false,
    fullscreenControl: true
  });

  google.maps.event.addListenerOnce(map, 'idle', function() {
    map.setOptions({
      styles: mapStyles
    });
  });
  
  setTimeout(function() {
    map.setOptions({
      styles: mapStyles
    });
  }, 500);

  const marker = new google.maps.Marker({
    position: location,
    map: map,
    title: address,
    animation: google.maps.Animation.DROP
  });

  const infoWindow = new google.maps.InfoWindow({
    content: `<div style="padding: 10px;"><strong>${address}</strong></div>`
  });

  marker.addListener('click', () => {
    infoWindow.open(map, marker);
  });

  // Second metro marker
  const locationBelow = { lat:  50.444370, lng: 30.505913 };

  const markerIconSvg = '<svg width="54" height="33" viewBox="0 0 54 33" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M16.0541 0L0 33H10.9459L17.027 20.6866L27 33L36.973 20.6866L43.0541 33H54L37.9459 0L27 15.2687L16.0541 0Z" fill="#FF0000"/></svg>';
  const markerIconUrl = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(markerIconSvg);

  const markerBelow = new google.maps.Marker({
    position: locationBelow,
    map: map,
    icon: {
      url: markerIconUrl,
      scaledSize: new google.maps.Size(28, 28),
      anchor: new google.maps.Point(14, 28)
    },
    animation: google.maps.Animation.DROP
  });
}

$(document).ready(function () {

  $(document).on('click', '.viber-btn', function () {
  const phone = $(this).data('phone');
  if (!phone) return;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

  if (isMobile) {
    window.location.href = `viber://chat?number=%2B${phone}`;
  } else {
    window.open(`https://viber.me/${phone}`, '_blank');
  }
});




  if (typeof google !== 'undefined' && google.maps) {
    initMap();
  } else {
    window.addEventListener('load', function() {
      if (typeof google !== 'undefined' && google.maps) {
        initMap();
      }
    });
  }

  $("a[rel=gallery]").fancybox({});

  let sercivesSwiper = null;
  
  function initServicesSwiper() {
    const windowWidth = $(window).width();
    const sliderElement = document.querySelector(".sercives_slider");
    
    if (windowWidth < 992 && sliderElement) {
      if (!sercivesSwiper) {
        sercivesSwiper = new Swiper(".sercives_slider", {
          loop: false,
          roundLengths: true,
          slidesPerView: "auto",
          spaceBetween: 12,
        });
      }
    } else {
      if (sercivesSwiper) {
        sercivesSwiper.destroy(true, true);
        sercivesSwiper = null;
      }
    }
  }
  
  initServicesSwiper();
  
  let resizeTimeout;
  $(window).on('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
      initServicesSwiper();
    }, 250);
  });

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
    pagination: {
      el: ".about_slider-wrapp .swiper-pagination",
      clickable: true
    },
  });

  const sliderOneEl = document.querySelector('.reviews_slider_one');
  if (sliderOneEl) {
    sliderOneEl.addEventListener('mouseenter', function() {
      sliderOneEl.classList.add('paused');
    });
    sliderOneEl.addEventListener('mouseleave', function() {
      sliderOneEl.classList.remove('paused');
    });
  }

  const sliderTwoEl = document.querySelector('.reviews_slider_two');
  if (sliderTwoEl) {
    sliderTwoEl.addEventListener('mouseenter', function() {
      sliderTwoEl.classList.add('paused');
    });
    sliderTwoEl.addEventListener('mouseleave', function() {
      sliderTwoEl.classList.remove('paused');
    });
  }

  const reviewsCards = document.querySelectorAll('.reviews_card');
  reviewsCards.forEach(card => {
    const slider = card.closest('.reviews_slider');
    if (!slider) return;

    card.addEventListener('touchstart', function(e) {
      slider.classList.add('paused');
    }, { passive: true });

    card.addEventListener('touchend', function(e) {
      slider.classList.remove('paused');
    }, { passive: true });

    card.addEventListener('touchcancel', function(e) {
      slider.classList.remove('paused');
    }, { passive: true });
  });


  $('.services_card').on('click', function() {
    const $card = $(this);
    
    if ($card.find('.services_card_toggler').length === 0) {
      return;
    }
    
    const isActive = $card.hasClass('active');
    
    $('.services_card').removeClass('active');
    
    if (!isActive) {
      $card.addClass('active');
    }
  });

  $('.header_toggler').on('click', function() {
    $('.header').addClass('hidden');
    $('.mobile_menu').addClass('active');
  });

  $('.mobile_menu_close').on('click', function() {
    $('.header').removeClass('hidden');
    $('.mobile_menu').removeClass('active');
  });

  $(document).on('click', function(e) {
    const $mobileMenu = $('.mobile_menu');
    const $mobileMenuWrapp = $('.mobile_menu_wrapp');
    
    if ($mobileMenu.hasClass('active')) {
      if (!$mobileMenuWrapp.is(e.target) && 
          $mobileMenuWrapp.has(e.target).length === 0 &&
          !$(e.target).closest('.header_toggler').length) {
        $('.header').removeClass('hidden');
        $mobileMenu.removeClass('active');
      }
    }
  });

  $('a[href*="#"], button[href*="#"]')
    .not('[href="#"]')
    .not('[href="#0"]')
    .click(function (event) {
      $(".mobile_menu").removeClass("active");
      $(".header").removeClass("hidden");
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
              scrollTop: target.offset().top - 70,
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

  const $header = $('.header');
  let ticking = false;
  
  function handleScroll() {
    const scrollTop = $(window).scrollTop();
    
    if (scrollTop > 0) {
      $header.addClass('scrolled');
    } else {
      $header.removeClass('scrolled');
    }
    
    ticking = false;
  }
  
  function onScroll() {
    if (!ticking) {
      window.requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }
  
  handleScroll();
  
  $(window).on('scroll', onScroll);

  const animateOnScroll = () => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll(
      'section:not(.banner), .blockquote, .services_card, .reviews_card, .contacts_item'
    );

    elementsToAnimate.forEach(el => {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', animateOnScroll);
  } else {
    animateOnScroll();
  }

});
