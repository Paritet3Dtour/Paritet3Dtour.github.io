function initMap() {
  const address = "вул. Пирогова, буд. 2 / вул. Б. Хмельницького, буд. 37, під'їзд № 1, офіс № 1, м. Київ";
  
  const location = { lat: 50.4501, lng: 30.5234 }; 
  
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
    console.error('Элемент #google-map не найден');
    return;
  }

  const map = new google.maps.Map(mapElement, {
    zoom: 17,
    center: location,
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
}

$(document).ready(function () {

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

});
