Date.prototype.daysInMonth = function() {
        return 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
};
    
Date.prototype.lastDayInMonth = function() { 
            var t = 33 - new Date(this.getFullYear(), this.getMonth(), 33).getDate();
            return new Date(this.getFullYear(), this.getMonth(), t);
};

function GetDotDate(targetDay='', type='') {
    //console.log(targetDay);
    var today = new Date();
    if (targetDay !== '' && targetDay.length > 0) {
        today = new Date(targetDay);
    }
    //console.log(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var del = '.';
    
    var response = yyyy+del+mm+del+dd;
    
    switch (type){
        case 'year': {
           response = yyyy;
           break;
        }
        case 'month': {
           response = yyyy+del+mm;
           break;     
        }
    }
    return response;
}
function GetDate(params={
    date: '',
    type: '', // year, month
    delimeter: '-'
}) {    
    //console.log(targetDay);
    targetDay = params.date;
    var today = new Date();
    if (typeof targetDay !== 'undefined' && targetDay !== '' && targetDay.length > 0) {
        today = new Date(targetDay);
    }
    //console.log(today);
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    var del = params.delimeter;
    
    var response = yyyy+del+mm+del+dd;
    
    switch (params.type){
        case 'year': {
           response = yyyy;
           break;
        }
        case 'month': {
           response = yyyy+del+mm;
           break;     
        }
    }
    
    return response;
}

function GetCleanLink(url=null) {
    /*
     * Возвращает чистую относительную ссылку текущей страницы либо конкретной
     */
    var url_js_arr = url;
    if (url_js_arr === null) { url_js_arr = location.href; }
	url_js_arr = url_js_arr.split('?')[0];
        url_js_arr = url_js_arr.split('#')[0];
	url_js_arr = url_js_arr.replace('https://','');
	url_js_arr = url_js_arr.replace('http://','');
	url_js_arr = url_js_arr.replace('dev.makintour.com/','/');  
	url_js_arr = url_js_arr.replace('dev.makintour.com','/');
	url_js_arr = url_js_arr.replace('makintour.com/','/');
	url_js_arr = url_js_arr.replace('makintour.com/','/');
    return url_js_arr;
}
function GetCleanLinkArray(url=null) {
    /*
     * Возвращает чистую относительную ссылку массивом текущей страницы либо конкретной 
     */    
    url_js_arr = GetCleanLink(url).split('/');    
    return url_js_arr;
}
function GetUrlParams (url=null) {
    var url_js_arr = url;
    if (url_js_arr === null) { url_js_arr = location.href; }
    url_js_arr = url_js_arr.split('?');
    if (url_js_arr.length > 1) {
        url_js_arr = url_js_arr[1].split('&');
        var tempArr = {};
        url_js_arr.forEach(function(el){
            if (el.split('=').length === 2) {
                tempArr[el.split('=')[0]] = el.split('=')[1];
            } else if (el.split('=').length === 1) {
                tempArr[el.split('=')[0]] = true;
            } else {
                
            }
        });
        url_js_arr = tempArr;
    } else return false;
    return url_js_arr;
}
function DetectPageType() {
    var pageType = 'null';
    var url_js_arr = GetCleanLink().split('/');
    console.log(url_js_arr);
    switch (url_js_arr.length) {
        case 2:            
            if (url_js_arr[0]==='' && url_js_arr[1]==='') { pageType = 'main'; }
            break;
        case 4:
            if (url_js_arr[2]==='tours' || url_js_arr[2]==='hotels') { pageType = 'country'; }
            if (url_js_arr[2]==='hotels') {
                SendGAEvent('page-visit', 'page-type: '+pageType, 'Каталог отелей - Страна');                
            }
            break;
        case 5:
            if (url_js_arr[2]==='tours' && (url_js_arr[4]==='search' || url_js_arr[4]==='resorts')) { pageType = 'country'; }
            break;
        case 6:
            if (url_js_arr[2]==='tours' && url_js_arr[4]==='resorts') { pageType = 'resort'; }
            break;
        case 7:
            if (url_js_arr[2]==='tours' && url_js_arr[4]==='resorts' && (url_js_arr[6]==='search' || url_js_arr[6] === 'hotels')) { pageType = 'resort'; }
            if (url_js_arr[2]==='tours' && url_js_arr[4]==='resorts' && url_js_arr[6] === 'hotels') { 
                SendGAEvent('page-visit', 'page-type: '+pageType, 'Каталог отелей - Курорт');
            }
            break;
        default:
            //Здесь находятся инструкции, которые выполняются при отсутствии соответствующего значения
            
            break;
    }
    console.log('pageType: '+pageType);
    if (pageType !== 'null') { 
        SendGAEvent_pageType(pageType, url_js_arr); 
    }
    return pageType;
}

function SendGAEvent_pageType (type, url_array) {
    switch (type) {
        case 'country':
            SendGAEvent('page-visit', type, url_array[3]);
            break;
        case 'resort':
            SendGAEvent('page-visit', type, url_array[3]+', '+url_array[5]);
            break;
        default:            
            break;            
    }
}
function SendGAEvent (category, action, label, value='0') {
    if (value === '0') {
        dataLayer.push({'event': category, 'request_url': action, 'label': label});
    } else {
        dataLayer.push({'event': category, 'request_url': action, 'label': label, 'value': value});
    }
}

function setFBPixelEvent (event=[], type='hotel', indate, outdate, ids, city='', region='', country, adults, childs=0) {
    var payment = false;
    event[1] = parseFloat(event[1]);
    if (event[1] !== 0) {
        payment = true;
    }
    if (event[0] === 'HotelLead') {
        if (payment) {
            setFBPixelLead("Lead","hotel",country, city, GetCleanLinkArray()[7], event[1], event[2]);
        } else {
            setFBPixelLead("Lead","hotel",country, city, GetCleanLinkArray()[7]);
        }
    } else 
    if (event[0] === 'TourLead') {
        var hotel_name = '';
        if (event[3]) { hotel_name = event[3]; }
        if (payment) {
            setFBPixelLead("Lead","tour",country, city, hotel_name, event[1], event[2]);
        } else {
            setFBPixelLead("Lead","tour",country, city, hotel_name);
        }
    } else
    if (event[0] === 'SearchLead'){
        var hotel_name = '';
        if (event[3]) { hotel_name = event[3]; }
        if (payment) {
            setFBPixelLead("Lead","search",country, city, hotel_name, event[1], event[2]);
        } else {
            setFBPixelLead("Lead","search",country, city, hotel_name);
        }
    } else
    if (payment) {
        fbq('track', event[0], {
            // Fire the 'ViewContent' event on the hotel details page
            // IF YOU CHOOSE NOT TO USE A RECOMMENDED PARAM, THEN REMOVE IT, DON'T LEAVE IT EMPTY
            // REQUIRED: DO NOT change this, must be set to 'hotel'
            content_type: type,

            // HIGHLY RECOMMENDED: checkin date
            // Allows you to target people based on their travel dates (using a booking window)
            // Improves the landing experience with travel dates filled in (using template tags)
            // use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
            checkin_date: indate,

            // HIGHLY RECOMMENDED: checkout date
            // use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
            checkout_date: outdate,

            // REQUIRED: content id of hotel that is shown                
            content_ids: ids,

            // RECOMMENDED: city, don't use abbreviations
            city: city,

            // RECOMMENDED: region, don't use abbreviations
            region: region,

            // RECOMMENDED: country, don't use abbreviations
            country: country,

            // RECOMMENDED: number of adults
            num_adults: adults,

            // RECOMMENDED: number of children
            num_children: childs,           

            value: event[1],
            currency: event[2]
        });
        return true;
    } else
    if (!payment) {
        fbq('track', event[0], {
        // Fire the 'ViewContent' event on the hotel details page
        // IF YOU CHOOSE NOT TO USE A RECOMMENDED PARAM, THEN REMOVE IT, DON'T LEAVE IT EMPTY
        // REQUIRED: DO NOT change this, must be set to 'hotel'
        content_type: type,

        // HIGHLY RECOMMENDED: checkin date
        // Allows you to target people based on their travel dates (using a booking window)
        // Improves the landing experience with travel dates filled in (using template tags)
        // use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
        checkin_date: indate,

        // HIGHLY RECOMMENDED: checkout date
        // use YYYYMMDD, YYYY-MM-DD, YYYY-MM-DDThh:mmTZD or YYYY-MM-DDThh:mm:ssTZD
        checkout_date: outdate,

        // REQUIRED: content id of hotel that is shown           
        content_ids: ids,

        // RECOMMENDED: city, don't use abbreviations
        city: city,

        // RECOMMENDED: region, don't use abbreviations
        region: region,

        // RECOMMENDED: country, don't use abbreviations
        country: country,

        // RECOMMENDED: number of adults
        num_adults: adults,

        // RECOMMENDED: number of children
        num_children: childs
        });
    }
}

function setFBPixelLead (event, type, country, resort, hotel, value=0, currency="USD") {
    var evparams = {
        type: type,
        country: country,
        resort: resort,
        hotel: hotel                    
    };
    if (parseFloat(value) !== 0) {
        evparams.value = value;
        evparams.currency = currency;
    }
    fbq('track', event, evparams);
}

function setFBPixelPageViewCustom(json_params) {
    var event = "PageViewCustom";
    fbq('track', event, json_params);
}

function num10lessPlussZeroToString (datenum){
    if (datenum < 10) {
        return '0'+datenum;
    } else {
        return datenum;
    }
}

// Для отправки данных на visitor_action

function send_data_to_visitor_action(event,action,label,label2,value){

    $.post( "/ua/ajaxlnd/get_data_for_visitor_action/list", {
        event: event,
        action: action,
        label : label,
        label2: label2,
        value:value
    });


}

// Для блокировки кнопки enter на формах

function disableEnterForms(){   
  $('form').on('keyup keypress', function(e) {       
  var keyCode = e.keyCode || e.which;
  if (keyCode === 13) { 
    e.preventDefault();          
    return false;
  }
}); 
}      


// Присваиваем класс блоку, при изменении экрана (для адаптива)    
function WindowResizeAddClass(parentelement, classelement){ 
$(window).resize(function() {   
  windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
  if (windowWidth > 1000) {
    $(parentelement).removeClass(classelement);
  }else{
    $(parentelement).addClass(classelement);      
  }
});
$(document).ready(function(){
  windowWidth = window.innerWidth ? window.innerWidth : $(window).width();
  if (windowWidth > 1000) {
    $(parentelement).removeClass(classelement);
  }else{
    $(parentelement).addClass(classelement); 
  }
});
}

//Проверяем корректность ввода номера телефона с формы
function checkPhone(val){
    pnum = val;
    pnum=pnum.split('-').join('');
    pnum=pnum.split(' ').join('');
    pnum=pnum.split('(').join('');
    pnum=pnum.split(')').join('');
    pnum=pnum.split('.').join('');
    pnum=pnum.split(',').join('');
    //console.log('start checking phone ...');
    //console.log('Первый символ значения: '+pnum[0]);
    if (pnum[0] === '+' && pnum.split('+')[1]){        
        pnum = pnum.split('+')[1];        
        //console.log('tel length '+pnum+'= '+pnum.length);
        if (pnum.length !== 12) {
            //alert('Проверьте корректность ввода номера телефона');
            return false;
        }
    } else {
        if (pnum.length !== 12 || pnum.length !== 11 || pnum.length !== 10) {
            return false;
        }
    }
    return true;
}
function getCookie(name) {
    var mas = document.cookie.match(name + "=[^;]*");
    if (mas) {
        var cook = mas[0].split(/=/); 
        return decodeURIComponent(cook[1]);
    };
    return '';   
}
function getFormData($form){
    var unindexed_array = $form.serializeArray();
    var indexed_array = {};

    $.map(unindexed_array, function(n, i){
        indexed_array[n['name']] = n['value'];
    });

    return indexed_array;
}

/*function md5(s) {
    D:\makintour.com-github\dev\files\public\js\md5_lib.js
}*/