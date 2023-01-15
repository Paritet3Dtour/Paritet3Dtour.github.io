$(function () {
  // For smooth scrolling to anchors 

  $(document).ready(function () {
    $("#request-form").submit(function () { //Change
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "mail.php", //Change
        data: th.serialize()
      }).done(function () {
        window.location.href = "thanks";
      });
      return false;
    });
  });

  $(document).ready(function () {
    $("#request-form2").submit(function () { //Change
      var th = $(this);
      $.ajax({
        type: "POST",
        url: "mail.php", //Change
        data: th.serialize()
      }).done(function () {
        window.location.href = "thanks";
      });
      return false;
    });
  });

  $(".banner__link").click(function (event) {
    event.preventDefault();
    var destination = $('.request__wrapp').offset().top + 50;
    $('html').animate({
      scrollTop: destination
    }, 800);
    return false;
  });

  $('input.phone').inputmask('+389999999999', {
    "clearIncomplete": true
  });


});