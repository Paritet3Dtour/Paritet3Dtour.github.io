"use strict";

window.onload = function(){

    document.addEventListener('click', clickItemHandler);
    document.addEventListener('click', handlerClickLinks);

};


function clickItemHandler(event){
    if(!event.target.closest('.click-item')) return;
    let item = event.target.closest('.click-item');
    let parent;
    if(event.target.closest('.click-obj')) parent = event.target.closest('.click-obj');

    let obj = {
        'toggle': function(target){
            target.parentElement.classList.toggle('active');
        },
        'languageToggler': function(target){
            target.classList.toggle('active');
        },
        'passToggler': function(target){
            if(target.classList.contains('active')){
                target.classList.remove('active');
                target.closest('.form-group').querySelector('input').setAttribute('type', 'password');
            }else{
                target.classList.add('active');
                target.closest('.form-group').querySelector('input').setAttribute('type', 'text');
            }
        },
        'headerToggler': function(target){
            document.querySelector('header').classList.toggle('active');
        },
        'toggleFilters': function(target){
            document.querySelector('.catalog__filters').classList.toggle('show');
        },
        'popup-open': function (target) {
            if (!document.querySelector(target.dataset.label)) return;
            document.querySelector(target.dataset.label).classList.add('active');
        },
        'popup-close': function (target) {
            if (target.dataset.label) {
              document.querySelector(target.dataset.label).classList.remove('active')
            } else {
              target.closest('.popup_container').classList.remove('active');
            }
        },
    }

    if(item.dataset.action){
        let actions = item.dataset.action.split(' ');
        actions.forEach(action => obj[action](item));
    } else {
        obj['toggle'](item);
    }
};

function handlerClickLinks(event){
    if(!(event.target.closest('a') && event.target.closest('a').href.split('#')[1])) return;
    let a = event.target.closest('a');
    event.preventDefault();
    let target = document.getElementById(`${a.href.split('#')[1]}`);
    if(!target) return;

    //let hh = document.querySelector('header').offsetHeight;

    function calculateHeight(){
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    let p = pageYOffset;
    let step = 15;
    let direction = false;

    if(pageYOffset > target.getBoundingClientRect().top + pageYOffset){
        direction = true;
    }

    let int = setInterval(()=>{
        if(direction){
            if(p <= step) clearInterval(int);

            if(p>target.getBoundingClientRect().top + pageYOffset - 90){
                p -= step;
            } else {
                clearInterval(int);
            }
        } else {
            if(p >= calculateHeight() - step) clearInterval(int);

            if(p<target.getBoundingClientRect().top + pageYOffset - 90){
                p += step;
            } else {
                clearInterval(int);
            }
        }

        scrollTo(pageXOffset,p)
    }, 1);
};

let scroll_content = true;
if(document.querySelector('.statistics-section')){
    window.addEventListener("scroll", function() {
        if(scroll_content){
            var elementTarget = document.querySelector(".statistics-section");
            if (window.scrollY > (elementTarget.offsetTop - elementTarget.offsetHeight)) {
                animateCounter();
                scroll_content = false;
            }
        }
    });
}
let scroll_content_map = true;
if(document.querySelector('.map-section__container')){
    window.addEventListener("scroll", function() {
        if(scroll_content_map){
            var elementTarget = document.querySelector(".map-section__container");
            if (window.scrollY > (elementTarget.offsetTop - 350)) {
                elementTarget.classList.add('map-focus')
                scroll_content_map = false;
            }
        }
    });
}

function animateCounter(){
    const counters = document.querySelectorAll('.counter-animate');
    const speed = 300;

    counters.forEach( counter => {
    const animate = () => {
        const value = +counter.getAttribute('number');
        const data = +counter.innerText;
        
        const time = value / speed;
        if(data < value) {
            counter.innerText = Math.ceil(data + time);
            setTimeout(animate, 15);
            }else{
            counter.innerText = value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
            }
        
    }
    
    animate();
    });
};

const tab = function () {
    let tabNav = document.querySelectorAll('.tabs-nav__item'),
        tabContent = document.querySelectorAll('.tabs-content__item'),
        tabName;

    tabNav.forEach((item) => {
        item.addEventListener('click', selectTabNav)
    });

    function selectTabNav() {
        tabNav.forEach((item) => {
            item.classList.remove('is-active');
        });
        this.classList.add('is-active');
        tabName = this.getAttribute('data-tab-name');
        selectTabContent(tabName);
    }

    function selectTabContent(tab) {
        tabContent.forEach((item) => {
            let classList = item.classList;
            classList.contains(tab) ? classList.add('is-active') : classList.remove('is-active');
        });
    }
};

if('.tabs-nav'){
    tab();
}


function bannerToggler(target){
    document.querySelector('.home-banner__item.active').classList.remove('active');
    target.classList.add('active');
};

if('#map-country-select'){
    document.querySelector('#map-country-select').onchange = function(){
        selectMapCountry(this.value);
    };
}

function selectMapCountry(target){
    if(target !== 'default'){
        let targetCountry = document.querySelector('.map-section__item[data-country="'+target+'"]');
        let targetName = targetCountry.querySelector('.map-section__item__name').innerHTML;
        let targetApplications = targetCountry.getAttribute('data-applications');
        let targetLink = targetCountry.querySelector('.map-section__item__content').getAttribute('href');
        let infoContainer = document.querySelector('.map-section__info');

        infoContainer.classList.add('active');
        document.querySelector('.map-section__info__country').innerHTML = targetName;
        document.querySelector('.map-section__info__count span').innerHTML = targetApplications;
        document.querySelector('.map-section__info__link').setAttribute('href', targetLink);

        let mapItems = document.querySelectorAll('.map-section__item');
        
        mapItems.forEach((item) => {
            if(item.getAttribute('data-country') === target){
                item.classList.add('active');
            }else{
                item.classList.remove('active');
            }
        });
    }else{   
        document.querySelectorAll('.map-section__item').forEach((item) => {
            item.classList.remove('active');
        });
        document.querySelector('.map-section__info').classList.remove('active');
    }
}