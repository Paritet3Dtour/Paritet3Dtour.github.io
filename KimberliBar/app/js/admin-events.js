$(document).ready(function () {
  function readURL(input) {
    if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
        $(input)
          .closest(".events_item")
          .find(".events_item_bg")
          .css("background-image", "url(" + e.target.result + ")");
        $(input).closest(".events_item").attr("img-name", input.files[0].name);
      };

      reader.readAsDataURL(input.files[0]);
    }
  }

  function changeEvent(event) {
    if ($(event).closest(".events_item").hasClass("active")) {
      if ($(event).closest(".events_item").find("textarea").val().length >= 1) {
        $(event)
          .closest(".events_item")
          .find(".events_item_heading")
          .text($(event).closest(".events_item").find("textarea").val());
      }
      $(event).text("Змінити");
      $(event).closest(".events_item").removeClass("active");
    } else {
      $(event).closest(".events_item").addClass("active");
      $(event).text("Зберегти");
    }
  }

  fetch("../events.json")
    .then((response) => response.json())
    .then(function (json) {
      json.forEach((element) => {
        $("#events-list").append(
          '<div class="events_item" img-name="' +
            element.img +
            '"> <div class="events_item_bg" style="background-image: url(img/' +
            element.img +
            ')" ><button class="events_item-close"><img src="img/close-icon.svg"></button></div> <div class="events_item_heading">' +
            element.descr +
            '</div> <div class="item-change"><div class="item-change-heading">Зображення</div><input name="img" type=' +
            "file" +
            ' /><div class="item-change-heading">Текст</div><textarea name="text" type="text"></textarea></div> <button class="item-change-btn">Змінити</button></div>'
        );
      });
      $(".item-change-btn").click(function () {
        changeEvent($(this));
      });
      $("input[type='file']").change(function () {
        readURL(this);
      });
      $(".events_item-close").click(function () {
        $(this).closest(".events_item").remove();
      });
    });

  $("#admin-events-add").click(function () {
    $("#events-list").append(
      '<div class="events_item" img-name=""> <div class="events_item_bg" ><button class="events_item-close"><img src="img/close-icon.svg" /></button></div> <div class="events_item_heading">Назва заходу</div> <div class="item-change"><div class="item-change-heading">Зображення</div><input name="img" type=' +
        "file" +
        ' /><div class="item-change-heading">Текст</div><textarea name="text" type="text"></textarea></div> <button class="item-change-btn">Змінити</button></div>'
    );
    $(".item-change-btn").click(function () {
      changeEvent($(this));
    });
    $("input[type='file']").change(function () {
      readURL(this);
    });
    $(".events_item-close").click(function () {
      $(this).closest(".events_item").remove();
    });
  });

  $("#admin-events-save").click(function () {
    let form_data = new FormData();
    let events = [];
    let images = [];
    $(".events_item").each(function (index, element) {
      events.push({
        img: $(element).attr("img-name"),
        descr: $(element).find(".events_item_heading").text(),
      });
      if ($(element).find("input[name='img']").val()) {
        form_data.append(
          "files[]",
          $(element).find("input[name='img']")[0].files[0]
        );
        images.push($(element).find("input[name='img']")[0].files[0]);
      }
    });

    function saveEvents() {
      $.ajax({
        type: "POST",
        url: "changeevents.php",
        data: { events: events },
        success: function (data, textStatus, xhr) {
          if (xhr.status === 200) {
            alert("Зміни успішно застосовані!");
          } else {
            alert("Щось пішло не так, спробуйте пізніше!");
          }
        },
      });
    }

    if (images.length) {
      $.ajax({
        url: "saveimages.php",
        type: "post",
        data: form_data,
        dataType: "json",
        contentType: false,
        processData: false,
        success: function (data, textStatus, xhr) {
          if (xhr.status === 200) {
            saveEvents();
          } else {
            alert("Щось пішло не так, спробуйте пізніше!");
          }
        },
      });
    } else {
      saveEvents();
    }
  });
});