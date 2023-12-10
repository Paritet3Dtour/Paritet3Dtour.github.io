"use strict";

window.onload = function () {

   let allItems = [];
   let selectedItems = [];
   let paginationPage = 1;
   let countItems = 16;

    if (screen.width > 700) {
        countItems = 18;
    }

    function getAllItems() {
        $.ajax({
            type: "GET",
            url: "../api/",
        }).done(function (data) {
            allItems = data.data;
            allItems.sort(function(a, b) {
            return parseFloat(a.price) - parseFloat(b.price);
            });
            selectedItems = allItems.slice(0, countItems);
            setTimeout(() => {
            setCatalogItems();
            getCategories();
            }, 200);
        });
    };

    function setCatalogItems() {
        $('.catalog_wrapp').html('');
        selectedItems.forEach((element) => {
            $(".catalog_wrapp").append(
            '<div class="catalog_item" data-sku="'+element.sku+'" data-price="'+element.price+'" data-oldPrice="'+element.oldPrice+'" data-category="'+element.categoryName+'"> <div class="catalog_item_preview" style="background-image: url(' +
            element.image + ');"></div><span class="sale">-' +
            Math.round(element.discount) + '%</span><span class="favorite"></span><div class="old-price">' + element.oldPrice + ' ₴</div><div class="price">' + element.price + ' ₴</div><div class="descr">' + element.title + '</div><div class="catalog_item_nav"><button class="submit" type="button">Замовити</button><button class="request" type="button">Записатися на примірку</button></div></div>'
            );
        });
        setTimeout(() => {
            openSubmitPopup();
            openConsultationPopup();
        }, 100);
    }

    function getCategories() {
        $('.header_menu_list').html('');
        let categoryes = [];
        allItems.forEach((element) => {
            categoryes.push(element.categoryName);
        });
        let filteredArray = categoryes.filter((item, index) => {
        return categoryes.indexOf(item) === index;
    });

    filteredArray.forEach((element) => {
        $('.header_menu_list').append('<div class="header_menu_item" data-category="'+element+'">'+element+'</div>');
        });

        setTimeout(() => {
        selectCategory();
        }, 100);
    }

    function selectCategory() {
        $('.header_menu_item').click(function(){
            let selectedCategory = $(this).attr('data-category');
            selectedItems = [];
            allItems.forEach((element) => {
                if(element.categoryName === selectedCategory){
                    selectedItems.push(element);
                }
            });

            $('.header').removeClass('active');
            paginationPage = 1;
            $('.catalog_more').addClass('hidden');
            $('.filter-btn').addClass('hidden');
            $('.filter-wrapp .category').html(selectedCategory);
            $('.filter-wrapp .count span').html(selectedItems.length);
            $('.filter-wrapp_nav').removeClass('hidden');

            setCatalogItems();
        });
    }

    $('.catalog_more').click(function(){
        paginationPage +=1;
        selectedItems = allItems.slice(0, paginationPage*countItems);

        setTimeout(() => {
            setCatalogItems();
        }, 200);

        if(selectedItems >= allItems){
            $('.catalog_more').addClass('hidden');
        }
    });

    $('.filter-wrapp_nav').click(function(){
        selectedItems = allItems.slice(0, countItems);
        $('.catalog_more').removeClass('hidden');
        $('.filter-btn').removeClass('hidden');
        $('.filter-wrapp_nav').addClass('hidden');
        setCatalogItems();
    });

    function sortPrice(){
        let sort = $('#price-select').val();
        if(sort === 'max'){
            allItems.sort(function(a, b) {
                return parseFloat(b.price) - parseFloat(a.price);
            });
            selectedItems.sort(function(a, b) {
                return parseFloat(b.price) - parseFloat(a.price);
            });
        }else if(sort === 'min'){
            allItems.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
            selectedItems.sort(function(a, b) {
                return parseFloat(a.price) - parseFloat(b.price);
            });
        }
        if($('.filter-wrapp_nav').hasClass('hidden')){
            selectedItems = allItems.slice(0, paginationPage*countItems);
        }
        setCatalogItems();
    }

    $('#price-select').change(function(){
        sortPrice();
    });

   function openSubmitPopup() {
        $('.catalog_item_nav .submit').click(function(){
            $('#request-popup').addClass('active');
            $('#request-popup .sku').val($(this).closest('.catalog_item').attr('data-sku'));
            $('#request-popup .price').val($(this).closest('.catalog_item').attr('data-price'));
            $('#request-popup .ol_price').val($(this).closest('.catalog_item').attr('data-oldPrice'));
        });
    }

    function openConsultationPopup() {
        $('.catalog_item_nav .request').click(function(){
            $('#consultation-popup').addClass('active');
            $('#consultation-popup .sku').val($(this).closest('.catalog_item').attr('data-sku'));
            $('#consultation-popup .price').val($(this).closest('.catalog_item').attr('data-price'));
            $('#consultation-popup .ol_price').val($(this).closest('.catalog_item').attr('data-oldPrice'));
        });
    }

    $('input.phone').inputmask('+389999999999', {
        "clearIncomplete": false
    });

    $('#headerToggler').click(function(){
    $('.header').toggleClass('active');
    });
    
    $('.filter-btn').click(function(){
        $('.header').addClass('active');
    });

    $('.popup-close').click(function(){
        $('.sli-popup_container').removeClass('active');

        setTimeout(() => {
            $('.sli-request-popup__content').removeClass('load-content');
            $('#request-popup .sli-request_content-main').removeClass('hidden');
            $('#request-popup .sli-request_content-ty').addClass('hidden');

            $('.sli-request-popup__content').removeClass('load-content');
            $('#consultation-popup .sli-request_content-main').removeClass('hidden');
            $('#consultation-popup .sli-request_content-ty').addClass('hidden');

            $('#request-popup .manager_form input').val('');
            $('#consultation-popup .manager_form input').val('');
        }, 500);
    });

    $("#request-popup .manager_form").submit(function () {
        let params = {
            typeLead: 'order',
            phone: $(this).find('.phone').val(),
            sku: $(this).find('.sku').val(),
            price: $(this).find('.price').val(),
            ol_price: $(this).find('.ol_price').val(),
        }
        $('.sli-request-popup__content').addClass('load-content');
        $.ajax({
          type: "POST",
          url: "../api/lead.php",
          headers: {
                'Content-Type':'application/json'
            },
            data: JSON.stringify(params),
        }).done(function (data) {
          if(data.status === true){
            $('#request-popup .sli-request_content-main').addClass('hidden');
            $('#request-popup .sli-request_content-ty').removeClass('hidden');
          }else{
            alert('Щось пішло не так, спробуйте ще!')
          }
          $('.sli-request-popup__content').removeClass('load-content');
        });
        return false;
    });

    $("#consultation-popup .manager_form").submit(function () {
        let params = {
            typeLead: 'fitting',
            phone: $(this).find('.phone').val(),
            sku: $(this).find('.sku').val(),
            price: $(this).find('.price').val(),
            ol_price: $(this).find('.ol_price').val(),
        }
        $('.sli-request-popup__content').addClass('load-content');
        $.ajax({
          type: "POST",
          url: "../api/lead.php",
          headers: {
            'Content-Type':'application/json'
            },
          data: JSON.stringify(params),
        }).done(function (data) {
          if(data.status === true){
            $('#consultation-popup .sli-request_content-main').addClass('hidden');
            $('#consultation-popup .sli-request_content-ty').removeClass('hidden');
          }else{
            alert('Щось пішло не так, спробуйте ще!')
          }
          $('.sli-request-popup__content').removeClass('load-content');
        });
        return false;
    });

    $(".manager .manager_form").submit(function () {
        let params = {
            typeLead: 'feedback',
            phone: $(this).find('.phone').val(),
        }
        $('.manager .manager_wrapp').addClass('load-content');
        $.ajax({
          type: "POST",
          url: "../api/lead.php",
          headers: {
            'Content-Type':'application/json'
            },
          data: JSON.stringify(params),
        }).done(function (data) {
          if(data.status === true){
            $('.manager .manager_main').addClass('hidden');
            $('.manager .manager_ty').removeClass('hidden');
          }else{
            alert('Щось пішло не так, спробуйте ще!')
          }
          $('.manager .manager_wrapp').removeClass('load-content');
        });
        return false;
    });

    getAllItems();
};