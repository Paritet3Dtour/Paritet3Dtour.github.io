"use strict";

window.onload = function(){

    document.addEventListener('click', clickItemHandler);

    document.addEventListener('click', handlerClickLinks);

    ticker();

    if(window.innerWidth > 768){
        new classMultiplyWrapper(Slider, {
            selector: '.last_slider',
            navigationArrows: true,
            navigationDotters: false,
            //infinity: false,
            //mouseBlock: false,
            multiDisplay: {
                desktop: 2,
                notebook: 2,
                touch: 2,
                mobile: 1,
                marginRight: {
                    desktop: 72,
                    notebook: 72,
                    touch: 24,
                    mobile: 12,
                },
                multiShift: true,
            }
        });
    }

    if(window.innerWidth < 992){
        new classMultiplyWrapper(Slider, {
            selector: '.service_box',
            navigationDotters: true,
            navigationArrows: false,
            multiDisplay: {
                desktop: 1,
                notebook: 1,
                touch: 1,
                mobile: 1,
                multiShift: false,
            }
        });
    }

    new classMultiplyWrapper(Slider, {
        selector: '.pr_slider',
        navigationArrows: true,
        navigationDotters: true,
        multiDisplay: {
            desktop: 3,
            notebook: 3,
            touch: 2,
            mobile: 1,
            marginRight: {
                desktop: 40,
                notebook: 40,
                touch: 24,
                mobile: 12,
            },
            multiShift: true,
        }
    });

    if(window.innerWidth > 992){
        new classMultiplyWrapper(Slider, {
            selector: '.history_slider',
            navigationArrows: true,
            multiDisplay: {
                desktop: 3,
                notebook: 3,
                touch: 2,
                mobile: 1,
                multiShift: false,
            }
        });
    }


    new classMultiplyWrapper(Slider, {
        selector: '.values_slider',
        navigationDotters: true,
        navigationArrows: true,
    });


    emulateSelector('.select_emulator');


    document.addEventListener('mouseover', (e) => {
        if(e.target.closest('.switcher_labels_item')){
            let target = e.target.closest('.switcher_labels_item');
            if(target.classList.contains('active')) return;
            let block = target.closest('.switcher_block');
            block.querySelectorAll('.switcher_labels_item, .switcher_text_item').forEach(item => {
                item.classList.remove('active')
            })
            target.classList.add('active');
            block.querySelector(target.dataset.label).classList.add('active');
        }
    })
};


function classMultiplyWrapper(Cls,parametrs){
    document.querySelectorAll(parametrs.selector).forEach((item) => {
        try{
            parametrs.item = item;
            new Cls(parametrs);
        } catch(err){
            console.log(err);
        }
    })
};

let scroll_content = true;
if(document.querySelector('.cmap_content')){
    window.addEventListener("scroll", function() {
        if(scroll_content){
            var elementTarget = document.querySelector(".cmap_content");
            if (window.scrollY > (elementTarget.offsetTop - 400)) {
                elementTarget.classList.add('animation-map')
                scroll_content = false;
            }
        }
    });
}
if(document.querySelector('.mission_block')){
    window.addEventListener("scroll", function() {
        if(scroll_content){
            var elementTarget = document.querySelector(".mission_block");
            if (window.scrollY > (elementTarget.offsetTop - elementTarget.offsetHeight - 200)) {
                animateCounter();
                scroll_content = false;
            }
        }
    });
}

let brands_partners = [
    {
        label: 'danone',
        logos: ['assets/img/brands/brand-1.png']
    },
    {
        label: 'ferrero',
        logos: ['assets/img/brands/brand-6.png']
    },
    {
        label: 'jde',
        logos: ['assets/img/brands/brand-8.png']
    },
    {
        label: 'chumak',
        logos: ['assets/img/brands/brand-10.png']
    },
    {
        label: 'haribo',
        logos: ['assets/img/brands/brand-15.png']
    },
    {
        label: 'royalcanin',
        logos: ['assets/img/brands/brand-16.png']
    },
    {
        label: 'purina',
        logos: ['assets/img/brands/brand-17.png']
    },
    {
        label: 'yarych',
        logos: ['assets/img/brands/brand-38.svg']
    },
    {
        label: 'komo',
        logos: ['assets/img/brands/brand-18.png', 'assets/img/brands/bchld/kaniv.jpg', 'assets/img/brands/bchld/klubsira.png']
    },
    {
        label: 'mondelez',
        logos: ['assets/img/brands/bchld/korona2.jpg', 'assets/img/brands/bchld/milka.png', 'assets/img/brands/bchld/barny.png', 'assets/img/brands/bchld/oreo.png', 'assets/img/brands/bchld/tuc.png', 'assets/img/brands/bchld/belvita.jpg', 'assets/img/brands/bchld/luks.png', 'assets/img/brands/bchld/dirol.png', 'assets/img/brands/bchld/halls2.png']
    },
    {
        label: 'carlsberg',
        logos: ['assets/img/brands/brand-5.png', 'assets/img/brands/bchld/baltika.jpg', 'assets/img/brands/bchld/taras.png', 'assets/img/brands/bchld/crimb.jpeg', 'assets/img/brands/bchld/kilkenny.png', 'assets/img/brands/bchld/kronenburg.png', 'assets/img/brands/bchld/garage.png', 'assets/img/brands/bchld/warsteiner.png', 'assets/img/brands/bchld/arsenal.jpg', 'assets/img/brands/bchld/vitrachok.jpeg']
    },
]

let map_info = [
    {
        label: 'chernigov',
        name: 'Чернигов',
        clients: '2550',
        space: '1230 м²',
        transport: '2/4 авт.',
        routes: '1 шт',
        teams:'15',
        partners: '22',
        branches: 'Черниговская обл, Чернигов',
    },
    {
        label: 'kiev',
        name: 'Киев',
        clients: '7191',
        space: '6590 м²',
        transport: '5/15 авт.',
        routes: '6 шт',
        teams:'25',
        partners: '167',
        branches: 'Киевская обл, Киев',
    },
    {
        label: 'poltava',
        name: 'Полтава',
        clients: '2260',
        space: '6010 м²',
        transport: '0/2 авт.',
        routes: '3 шт',
        teams:'5',
        partners: '2',
        branches: 'Полтавская обл, Полтава',
    },
    {
        label: 'herson',
        name: 'Херсон',
        clients: '4925',
        space: '2470 м²',
        transport: '1/6 авт.',
        routes: '1 шт',
        teams:'18',
        partners: '12',
        branches: 'Херсонская обл, Херсон',
    },
    {
        label: 'kropivnitskiy',
        name: 'Кропивницкий',
        clients: '7550',
        space: '5230 м²',
        transport: '5/1 авт.',
        routes: '3 шт',
        teams:'55',
        partners: '37',
        branches: 'Кропивницкая обл, Кропивницкий',
    },
    {
        label: 'odessa',
        name: 'Одесса',
        clients: '1573',
        space: '2231 м²',
        transport: '1/14 авт.',
        routes: '5 шт',
        teams:'14',
        partners: '8',
        branches: 'Одесская обл, Одесса',
    },
    {
        label: 'zaporozhye',
        name: 'Запорожье',
        clients: '4193',
        space: '3230 м²',
        transport: '3/8 авт.',
        routes: '4 шт',
        teams:'4',
        partners: '31',
        branches: 'Запорожская обл, Запорожье',
    },
    {
        label: 'vinnitsa',
        name: 'Винница',
        clients: '1193',
        space: '13230 м²',
        transport: '0/8 авт.',
        routes: '1 шт',
        teams:'2',
        partners: '11',
        branches: 'Винницкая обл, Винница',
    },
    {
        label: 'rovno',
        name: 'Ровно',
        clients: '193',
        space: '3230 м²',
        transport: '1/1 авт.',
        routes: '1 шт',
        teams:'2',
        partners: '1',
        branches: 'Ровенская обл, Ровно',
    },
    {
        label: 'zitomir',
        name: 'Житомир',
        clients: '993',
        space: '1230 м²',
        transport: '4/1 авт.',
        routes: '9 шт',
        teams:'2',
        partners: '1',
        branches: 'Митомирская обл, Житомир',
    },
    {
        label: 'lvov',
        name: 'Львов',
        clients: '5993',
        space: '6230 м²',
        transport: '14/21 авт.',
        routes: '19 шт',
        teams:'32',
        partners: '17',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'hmelnitsky',
        name: 'Хмельницкий',
        clients: '2993',
        space: '9310 м²',
        transport: '1/11 авт.',
        routes: '4 шт',
        teams:'32',
        partners: '8',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'ternopol',
        name: 'Тернополь',
        clients: '4300',
        space: '3310 м²',
        transport: '5/5 авт.',
        routes: '2 шт',
        teams:'2',
        partners: '15',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'frankovsk',
        name: 'Ивано-Франковск',
        clients: '1700',
        space: '7310 м²',
        transport: '1/15 авт.',
        routes: '6 шт',
        teams:'22',
        partners: '1',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'chernivchi',
        name: 'Черновцы',
        clients: '5500',
        space: '3810 м²',
        transport: '7/1 авт.',
        routes: '3 шт',
        teams:'12',
        partners: '10',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'uman',
        name: 'Черкассы',
        clients: '7100',
        space: '5110 м²',
        transport: '17/21 авт.',
        routes: '8 шт',
        teams:'1',
        partners: '30',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'mikolaiv',
        name: 'Николаев',
        clients: '1230',
        space: '4110 м²',
        transport: '1/7 авт.',
        routes: '5 шт',
        teams:'2',
        partners: '7',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'lutsk',
        name: 'Луцк',
        clients: '2230',
        space: '4110 м²',
        transport: '1/7 авт.',
        routes: '5 шт',
        teams:'2',
        partners: '7',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'mucachevo',
        name: 'Мукачево',
        clients: '4142',
        space: '9490 м²',
        transport: '3/5 авт.',
        routes: '2 шт',
        teams:'2',
        partners: '9',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'summi',
        name: 'Суммы',
        clients: '4142',
        space: '9490 м²',
        transport: '3/5 авт.',
        routes: '2 шт',
        teams:'2',
        partners: '9',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'dnipro',
        name: 'Днепр',
        clients: '5993',
        space: '6230 м²',
        transport: '14/21 авт.',
        routes: '19 шт',
        teams:'32',
        partners: '17',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'harkiv',
        name: 'Харьков',
        clients: '4300',
        space: '3310 м²',
        transport: '5/5 авт.',
        routes: '2 шт',
        teams:'2',
        partners: '15',
        branches: 'Львовская обл, Львов',
    },
    {
        label: 'donetsk',
        name: 'Мариуполь',
        clients: '4286',
        space: '5924 м²',
        transport: '4/15 авт.',
        routes: '3 шт',
        teams:'1',
        partners: '10',
        branches: 'Львовская обл, Львов',
    }
]


function clickItemHandler(event){
    if(!event.target.closest('.click-item')) return;
    let item = event.target.closest('.click-item');
    let parent;
    if(event.target.closest('.click-obj')) parent = event.target.closest('.click-obj');

    let obj = {
        'toggle': function(target){
            parent.classList.toggle('active');
        },

        'start-video': function(target){
            let video = parent.querySelector('video');
            video.play();
            video.controls = true;
            video.addEventListener('ended', f);
            parent.classList.add('active');

            function f(){
                parent.classList.remove('active');
                video.controls = false;
            }
        },

        'full-menu': function(){
            let menu = document.querySelector('.full-menu');
            let header = document.querySelector('.header');
            let body = document.querySelector('body');

            menu.classList.toggle('active');
            header.classList.toggle('active-menu');
            body.classList.toggle('active-menu');
        },

        'questionPoup': function(){
            let popup = document.querySelector('.question-popup');
            let header = document.querySelector('.header');
            let body = document.querySelector('body');

            popup.classList.toggle('active');
            header.classList.toggle('active-menu');
            body.classList.toggle('active-menu');
        },

        'map-popup-open': function(target){
            let popup = document.querySelector('.map_popup');
            popup.classList.add('active');

            let brand = target.dataset.brand;
            let rend = document.querySelectorAll('.rend-element');

            map_info.filter(x => x.label === brand).map(x =>{
                for (var key in x) {
                    rend.forEach(element =>{
                        element.innerHTML = x[element.dataset.value];
                    });
                  }
                }
            );
        },
        'partner-popup': function(target){
            let section = document.querySelector('.brands_box');
            let name = target.dataset.name;
            let popupList = document.querySelector('.brand_popup_list');

            popupList.innerHTML = '';

            brands_partners.filter(x => x.label === name).map(x =>{
                x.logos.forEach(element =>{
                    let div = document.createElement('div');
                    let img = document.createElement('img');
                    img.setAttribute('src', element);
                    div.classList.add('brand_popup_item');
                    div.append(img);
                    popupList.append(div);
                });
                }
            );

            target.classList.toggle('active');
            section.classList.toggle('active');

            section.setAttribute('data-row', target.dataset.row);
            section.setAttribute('data-row-sm', target.dataset.row_sm);
        },
        'partner-popup-close': function(){
            let section = document.querySelector('.brands_box.active');
            let item = document.querySelector('.brands_item.active');
            section.classList.remove('active');
            item.classList.remove('active');
        },
        'map-popup-close': function(){
            let popup = document.querySelector('.map_popup');
            popup.classList.remove('active');
        },
        'popup-open': function(target){
            if(target.dataset.label){
                document.querySelector(target.dataset.label).classList.add('active');
            } else {
                console.log('укажите селектор требуемого элемента в data-label нажимаемой кнопки')
            }
        },
        'popup-close': function(target){
            if(target.dataset.label){
                document.querySelector(target.dataset.label).classList.remove('active');
            } else {
                console.log('укажите селектор требуемого элемента в data-label нажимаемой кнопки')
            }
        },
        'footerTab': function(target){
            target.closest('.footer_middle_column').classList.toggle('active');
        },
        'form-success': function(target){
            let body = document.querySelector('body');
            let text = 'Сообщение успешно отправлено!'
            if(target.dataset.message){
                text = target.dataset.message;
            }
            if(target.closest('form').classList.contains('question-popup_form')){
                this.questionPoup();
            }
            let message = document.createElement('div');
            message.classList.add('success-message')
            message.innerHTML = text;

            body.append(message);

            target.closest('form').reset();

            setTimeout(() => {
                message.remove();
            }, 400000);
        },
        'scrollTop': function(){
            window.scroll({
                top: 0, 
                left: 0, 
                behavior: 'smooth' 
            });
        },
        'languageToggler': function(target){
            target.classList.toggle('active');
        }
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

    let hh = document.querySelector('.header-main').offsetHeight;

    function calculateHeight(){
        return Math.max(
            document.body.scrollHeight, document.documentElement.scrollHeight,
            document.body.offsetHeight, document.documentElement.offsetHeight,
            document.body.clientHeight, document.documentElement.clientHeight
        );
    }

    let p = pageYOffset;
    let step = 10;
    let direction = false;

    if(pageYOffset > target.getBoundingClientRect().top + pageYOffset){
        direction = true;
    }

    let int = setInterval(()=>{
        if(direction){
            if(p <= step) clearInterval(int);

            if(p>target.getBoundingClientRect().top + pageYOffset - hh){
                p -= step;
            } else {
                clearInterval(int);
            }
        } else {
            if(p >= calculateHeight() - step) clearInterval(int);

            if(p<target.getBoundingClientRect().top + pageYOffset - hh){
                p += step;
            } else {
                clearInterval(int);
            }
        }

        scrollTo(pageXOffset,p)
    }, 1);
};




class Slider{
    constructor(params){
        this.params = params;
        this.container = params.item;
        this.params.moveTime ? (this.moveTime = this.params.moveTime) : (this.moveTime = 0.4);
        if(this.params.sizeWork){
            this.sizeFlag = 0;
            this.checkSize(this.params.sizeWork);
            window.addEventListener('resize', this.checkSize.bind(this,this.params.sizeWork));
        }
        if(!this.sizeFlag) this.create();

        if(!this.params.mouseBlock) this.container.addEventListener('mousedown',this.mouseFlip.bind(this));
        if(!this.params.touchBlock) this.container.addEventListener("touchstart", this.touchFlip.bind(this));

        window.addEventListener('resize', this.prepare.bind(this));
    }

    checkSize(p){
        let trigger = false;
        let w = document.body.offsetWidth;
        if(p.desktop && w > 1100) trigger = true;
        if(p.touch && (w > 768 && w <= 1100)) trigger = true;
        if(p.mobile && w <= 768) trigger = true;

        if(trigger){
            if(this.sizeFlag != 1){
                this.sizeFlag = 1;
                this.create();
            }
        } else {
            this.sizeFlag = 2;

            if(!this.container.querySelector('.slider_box')) return;
            let box = this.container.querySelector('.slider_box');
            while(box.children[0]){
                box.children[0].style.width = '100%';
                box.children[0].style.minWidth = '100%';
                this.container.append(box.children[0]);
            }
            box.remove();
            deleteElem(this.container.querySelector('.slider_block'));
            deleteElem(this.slider_nav);
            deleteElem(this.slider_arrow_right);
            deleteElem(this.slider_arrow_left);
            deleteElem(this.slider_counter);

            function deleteElem(elem){
                if(elem) elem.remove();
            }
        }
    }

    create(){
        this.createSliderBox();
        this.findSlideOnScreen();
        if(this.params.navigationDotters && !(this.params.multiDisplay && this.params.infinity)) this.createSliderNavigationDotters();
        this.prepare();
        if(this.params.navigationArrows) this.createSliderNavigationArrows();
        if(this.params.navigationCounter && !(this.params.multiDisplay && this.params.infinity)) this.createSliderNavigationCounter();
        if(this.params.slideClickRewind) this.prepareSlidesOnclick();
        if(this.params.autoShift) this.changeSlidesAutomaticaly();
    }

    findSlideOnScreen(){
        this.slideOnScreen = 1;
        if(this.params.multiDisplay){
            let w = document.body.offsetWidth;
            if(w>0 && w<=767){
                this.slideOnScreen = this.params.multiDisplay.mobile;
            } else if(w>767 && w<=1199){
                this.slideOnScreen = this.params.multiDisplay.touch;
            } else if(w>1199 && w<=1499){
                this.slideOnScreen = this.params.multiDisplay.notebook;
            } else {
                this.slideOnScreen = this.params.multiDisplay.desktop;
            }
        }
        if(!this.slideOnScreen) this.slideOnScreen = 1;
    }

    prepare(){
        if(this.sizeFlag == 2) return;
        this.activeSlider = 0;

        this.extendSlides();
        this.slideAll();
    }

    createSliderBox(){
        this.block = document.createElement('div');
        this.block.classList = ('slider_block');
        this.box = document.createElement('div');
        this.box.classList = ('slider_box');

        this.sliders = [].slice.call(this.container.children);
        this.sliders.forEach((item,i,arr)=>{
            item.classList.add('slider_slide');
            this.box.append(item);
        });
        this.block.append(this.box);
        this.container.append(this.block);
        this.block.style.width = '100%';
        this.block.style.maxWidth = '100vw';
        this.block.style.overflow = 'hidden';
        this.box.style.display = 'flex';
        this.box.style.transition = `transform ${this.moveTime}s ease-in-out`;
        this.box.style.webkitTransition = `-webkit-transform ${this.moveTime}s ease-in-out`;
        this.box.style.transform = `translateX(0)`;
        this.box.style.webkitTransform = `translateX(0)`;
    }

    createSliderNavigationArrows(){
        this.slider_arrow_right = document.createElement('div');
        this.slider_arrow_right.classList = 'slider_arrow slider_arrow-right';
        if(this.params.navigationArrows.right){
            this.slider_arrow_right.innerHTML = `${this.params.navigationArrows.right}`;
        } else {
            this.slider_arrow_right.innerHTML = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle cx="28" cy="28" r="28" fill="white"/>
                                                    <path class="slider_arrow_line" d="M36.5303 28.5303C36.8232 28.2374 36.8232 27.7626 36.5303 27.4697L31.7574 22.6967C31.4645 22.4038 30.9896 22.4038 30.6967 22.6967C30.4038 22.9896 30.4038 23.4645 30.6967 23.7574L34.9393 28L30.6967 32.2426C30.4038 32.5355 30.4038 33.0104 30.6967 33.3033C30.9896 33.5962 31.4645 33.5962 31.7574 33.3033L36.5303 28.5303ZM20 28.75H36V27.25H20V28.75Z" fill="#1C4587"/>
                                                </svg>`;            
        }
        this.slider_arrow_right.onclick = ()=> this.slideMove({direction: 'right'});
        this.container.append(this.slider_arrow_right);

        this.slider_arrow_left = document.createElement('div');
        this.slider_arrow_left.classList = 'slider_arrow slider_arrow-left';
        if(this.params.navigationArrows.left){
            this.slider_arrow_left.innerHTML = `${this.params.navigationArrows.left}`;
        } else {
            this.slider_arrow_left.innerHTML = `<svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <circle r="28" transform="matrix(-1 0 0 1 28 28)" fill="white"/>
                                                    <path class="slider_arrow_line" d="M19.4697 28.5303C19.1768 28.2374 19.1768 27.7626 19.4697 27.4697L24.2426 22.6967C24.5355 22.4038 25.0104 22.4038 25.3033 22.6967C25.5962 22.9896 25.5962 23.4645 25.3033 23.7574L21.0607 28L25.3033 32.2426C25.5962 32.5355 25.5962 33.0104 25.3033 33.3033C25.0104 33.5962 24.5355 33.5962 24.2426 33.3033L19.4697 28.5303ZM36 28.75H20V27.25H36V28.75Z" fill="#1C4587"/>
                                                </svg>`;            
        }
        this.slider_arrow_left.onclick = ()=> this.slideMove({direction: 'left'});
        this.container.append(this.slider_arrow_left);

        this.findSliderLimits();
    }

    createSliderNavigationCounter(){
        this.slider_counter = document.createElement('div');
        this.slider_counter.classList = 'slider_counter';

        let numberStart = `01`;
        let numberEnd = Math.ceil(this.sliders.length / this.slideOnScreen);
        numberEnd = (numberEnd<10) ? `0${numberEnd}` : numberEnd;

        this.slider_counter.innerHTML = `<span class="slider_counter_number slider_counter_number-start">${numberStart}</span><span class="slider_counter_line"></span><span class="slider_counter_number slider_counter_number-end">${numberEnd}</span>`;
        this.container.append(this.slider_counter);
    }

    changeSliderNavigationCounter(){
        let numberStart = Math.ceil(this.activeSlider/this.slideOnScreen) + 1;
        if(numberStart < 1) numberStart = 1;
        numberStart = (numberStart<10) ? `0${numberStart}` : numberStart;

        this.container.querySelectorAll('.slider_counter_number-start')[0].textContent = numberStart;
    }

    createSliderNavigationDotters(){
        this.slider_nav = document.createElement('ul');
        this.slider_nav.classList = 'slider_nav';

        this.butts = [];
        let m = this.sliders.length / this.slideOnScreen;
        if(m - parseInt(m)) m = parseInt(m) + 1;
        for(let i=0; i<m; i++){
            let slider_nav_butt = document.createElement('li');
            slider_nav_butt.classList = 'slider_nav_butt';
            slider_nav_butt.style.transition = `all ${this.moveTime} ease-in-out`;
            slider_nav_butt.dataset.number = i;
            this.butts.push(slider_nav_butt);
            this.slider_nav.append(slider_nav_butt);
        }

        this.container.addEventListener('click',func.bind(this));

        function func(event){
            if(!event.target.closest('.slider_nav_butt')) return;
            let butt = event.target.closest('.slider_nav_butt');

            clearInterval(this.autoShift);
            let n = (butt.dataset.number * this.slideOnScreen);
            return this.slideMove({counter: n});
        }

        this.container.append(this.slider_nav);
    }

    changeSlidesAutomaticaly(){
        this.autoShift = setInterval(()=>{
            this.slideMove({direction: 'right'});
        }, this.moveTime * 20000);
    }

    extendSlides(){
        this.boxWidth = this.box.offsetWidth/this.slideOnScreen;
        let d = this.boxWidth;
        let marginRight = 0;

        if(this.params.multiDisplay){
            if(this.params.multiDisplay.marginRight){
                let w = document.body.offsetWidth
                if(w>0 && w<=700){
                    marginRight = this.params.multiDisplay.marginRight.mobile;
                } else if(w>700 && w<=1100){
                    marginRight = this.params.multiDisplay.marginRight.touch;
                } else {
                    marginRight = this.params.multiDisplay.marginRight.desktop;
                }
            }

            d = this.boxWidth - (marginRight * (this.slideOnScreen - 1)) / this.slideOnScreen;
        }

        d = d + 'px';
        if(d == '0px') d = '100%';

        this.sliders.forEach((slide,i,arr)=>{
            slide.style.width = `${d}`;
            slide.style.minWidth = `${d}`;
            slide.dataset.number = i;
            if((i + 1) % this.slideOnScreen) slide.style.marginRight = `${marginRight}px`;
            //if(this.params.infinity) slide.style.marginRight = `${marginRight}px`;
        });
    }

    slideAll(callback){
        if(this.flagBlock) return;
        this.flagBlock = true;
        let n = 0;

        this.sliders.forEach((slide,i,arr)=>{
            if(slide.classList.contains('active')){
                this.boxShift = -(i * this.boxWidth);
                this.box.style.transform = `translateX(${this.boxShift}px)`;
                this.box.style.webkiteTransform = `translateX(${this.boxShift}px)`;
                n = slide.dataset.number;
            }
        });

        if(!this.sliders.length) return;
        if(n == 0){
            this.sliders[0].classList.add('active');
        } 
        if(n >= this.sliders.length) n = this.sliders.length - 1;

        if(this.params.navigationDotters){
            let m = n;
            if(this.params.multiDisplay && this.params.multiDisplay.multiShift){
                m = n / this.slideOnScreen;
                if(m - parseInt(m)) m = parseInt(m) + 1;
            }

            this.butts.forEach((butt,i,arr)=>{
                butt.classList.remove('active');
                if(i==m) butt.classList.add('active');
            });
        };

        if(this.params.emulateDotters){
            this.emulSlides = [].slice.call(document.querySelector(this.params.emulateDotters).children);
            this.emulSlides.forEach((item,i)=>{
                item.classList.remove('active');
            })
            this.emulSlides[n].classList.add('active');
        }

        setTimeout(() => {
            this.flagBlock = false;
            if(callback) callback();
            this.flagBlockSlide = false
        }, this.moveTime * 1000);
    }

    slideMove(params){
        if(this.flagBlockSlide) return;
        this.flagBlockSlide = true;
        this.installActiveSlider();

        if(this.params.multiDisplay && this.params.multiDisplay.multiShift){
            let m = this.sliders.length - (this.sliders.length % this.slideOnScreen);
            if(m == this.sliders.length) m = this.sliders.length - this.slideOnScreen;

            if(params.direction == 'right') this.activeSlider += this.slideOnScreen;
            if(params.direction == 'left') this.activeSlider -= this.slideOnScreen;
            if(params.counter != undefined) this.activeSlider = params.counter;

            if(this.params.infinity){
                this.infinitySlideWork.call(this);
            } else {
                if(this.activeSlider >= m) this.activeSlider = m;
                if(this.activeSlider < 0) this.activeSlider = 0;
            }

            this.installActiveSlider(this.activeSlider);
            this.slideAll();
        } else {
            if(params.direction == 'right') this.activeSlider++;
            if(params.direction == 'left') this.activeSlider--;
            if(params.counter != undefined) {
                this.sliders.forEach((slide,i) => {
                    if(+slide.dataset.number == params.counter) this.activeSlider = i
                });
            }

            if(this.params.infinity){
                this.infinitySlideWork.call(this);
            } else {
                if(this.activeSlider > this.sliders.length - 1) this.activeSlider = this.sliders.length - 1;
                if(this.activeSlider < 0) this.activeSlider = 0;

                this.sliders[this.activeSlider].classList.add('active');
                this.slideAll();
            }
        }

        if(this.params.navigationCounter) this.changeSliderNavigationCounter();
    }

    installActiveSlider(n){
        this.sliders = [].slice.call(this.box.children);

        if(n || n === 0){
            this.sliders.forEach((slide,i,arr)=>{
                slide.classList.remove('active');
            })

            this.activeSlider = n;
            this.sliders[n].classList.add('active');
        } else {
            this.sliders.forEach((slide,i,arr)=>{
                if(slide.classList.contains('active')) this.activeSlider = i;
                slide.classList.remove('active');
            })
        }

        this.findSliderLimits();
    }

    infinitySlideWork(){
        if(this.flagBlockInfinity) return;
        this.flagBlockInfinity = true;
        if(this.activeSlider > this.sliders.length - this.slideOnScreen){
            let sr = this.slideOnScreen - this.sliders.length + this.activeSlider;

            for(let i=0; i<sr; i++){
                let s = this.sliders[i].cloneNode(true);
                this.box.append(s);
            }
            this.sliders = [].slice.call(this.box.children);

            this.installActiveSlider(this.activeSlider);
            this.slideAll(func0.bind(this));

            function func0(){
                this.box.style.transition = ``;
                for(let i=0; i<sr; i++){
                    this.sliders[0].remove();
                    this.sliders.shift();
                }
                this.installActiveSlider(this.activeSlider - sr);
                this.slideAll(func2.bind(this));

                function func2(){
                    this.box.style.transition = `transform ${this.moveTime}s ease-in-out`;
                    this.box.style.webkiteTransition = `-webkite-transform ${this.moveTime}s ease-in-out`;
                    this.flagBlockInfinity = false;
                }
            }

        } else if(this.activeSlider < 0){
            let sr = this.slideOnScreen;
            if(!this.params.multiShift) sr = 1;
            this.box.style.transition = ``;
            for(let i=0; i<sr; i++){
                let s = this.sliders[this.sliders.length - i - 1].cloneNode(true);
                this.box.prepend(s);
            }
            this.sliders = [].slice.call(this.box.children);
            this.installActiveSlider(sr);
            this.slideAll(func0.bind(this));

            function func0(){
                this.box.style.transition = `transform ${this.moveTime}s ease-in-out`;
                this.box.style.webkiteTransition = `-webkite-transform ${this.moveTime}s ease-in-out`;
                this.installActiveSlider(0);
                this.slideAll(func2.bind(this));

                function func2(){
                    for(let i=0; i<sr; i++){
                        let s = this.sliders[this.sliders.length - 1].remove();
                        this.sliders.pop();
                    }
                    this.installActiveSlider(0);
                    this.flagBlockInfinity = false;
                }
            }
        } else {
            this.installActiveSlider(this.activeSlider);
            this.slideAll(() => this.flagBlockInfinity = false);
        }
    }

    findSliderLimits(){
        if(this.params.infinity) return;
        if(!this.params.navigationArrows) return;
        this.sliders = [].slice.call(this.box.children);

        if(!this.activeSlider){
            this.slider_arrow_left.classList.add('disabled')
        } else {
            this.slider_arrow_left.classList.remove('disabled')
        }

        if(this.activeSlider>=this.sliders.length - 1 - this.slideOnScreen){
            this.slider_arrow_right.classList.add('disabled')
        } else {
            this.slider_arrow_right.classList.remove('disabled')
        }
    }

    prepareSlidesOnclick(){
        this.container.addEventListener('click', func.bind(this));
        function func(event){
            if(!event.target.closest('.slider_slide')) return;
            let slide = event.target.closest('.slider_slide');
            let number = +slide.dataset.number
            this.sliders.forEach(slide => slide.classList.remove('active'));
            if(this.params.infinity){
                this.sliders.forEach((item,i) => {
                    item.classList.remove('active');
                    if(item == slide){
                        item.classList.add('active');
                        this.installActiveSlider(i);
                    }
                });

                this.infinitySlideWork();
            } else {
                this.installActiveSlider(slide.dataset.number)
                this.slideAll();
            }
        }
    }

    mouseFlip(event){
        event.preventDefault();
        let mousePointStart = event.clientX;
        let mousePointCurrent = 0;

        let mouseMoveBinded = mouseMove.bind(this);
        function mouseMove(event){
            event.preventDefault();
            clearInterval(this.autoShift);
            mousePointCurrent = event.clientX;
            let m = (mousePointCurrent - mousePointStart);

            if(m < -this.container.offsetWidth/4){
                this.slideMove({direction: 'right'});
                mousePointStart = mousePointCurrent;
                mouseUp.call(this,event);
            } else if(m > this.container.offsetWidth/4){
                this.slideMove({direction: 'left'});
                mousePointStart = mousePointCurrent;
                mouseUp.call(this,event);
            }
        }

        function mouseUp(event){
            event.preventDefault();
            this.container.removeEventListener('mousemove', mouseMoveBinded);
            mousePointStart = 0;
            mousePointCurrent = 0;
        }

        this.container.addEventListener('mousemove', mouseMoveBinded);
        this.container.addEventListener('mouseup', mouseUp.bind(this));
    }

    touchFlip(event){
        let touchPointStart = event.changedTouches['0'].screenX;
        let touchPointStartY = event.changedTouches['0'].screenY;
        let touchPointCurrent = 0;
        let touchPointCurrentY = 0;
        let m = 0;
        let n = 0;

        let touchMoveBinded = touchMove.bind(this);
        let touchEndBinded = touchEnd.bind(this);

        this.touchTimeStart = +new Date();

        function touchMove(event){
            touchPointCurrent = event.changedTouches['0'].screenX;
            touchPointCurrentY = event.changedTouches['0'].screenY;
            m = touchPointCurrent - touchPointStart;
            n = touchPointCurrentY - touchPointStartY;

            if(m >= this.container.offsetWidth/4){
                event.preventDefault();
                clearInterval(this.autoShift);
                this.slideMove({direction: 'left'});
                touchPointStart = touchPointCurrent;
                touchEndBinded(event);
            } else if(m <= -this.container.offsetWidth/4){
                event.preventDefault();
                clearInterval(this.autoShift);
                this.slideMove({direction: 'right'});
                touchPointStart = touchPointCurrent;
                touchEndBinded(event);
            }

        }


        function touchEnd(event){
            this.container.removeEventListener('touchmove', touchMoveBinded);
            this.container.removeEventListener('touchend', touchEndBinded);
            touchPointStart = 0;
            touchPointStartY = 0;
            touchPointCurrent = 0;
            touchPointCurrentY = 0;

            if((m <= 20 && m >= -20) && (n <= 20 && n >= -20)){
                event.target.click();
            }

            event.preventDefault();
        }

        this.container.addEventListener('touchmove', touchMoveBinded);
        this.container.addEventListener('touchend', touchEndBinded);
        this.container.addEventListener('touchcancel', touchEndBinded);
    }
};


function ticker(){
    document.querySelectorAll('.partners_stroke').forEach(parent => {
        let line = parent.querySelector('.partners_stroke_line');
        let items = [];
        let item = parent.querySelector('.partners_stroke_box');
        let parentWidth = parent.offsetWidth;
        let itemWidth = item.clientWidth + 1;

        let c = Math.floor(parentWidth / itemWidth) * 3;
        if(parentWidth < itemWidth) c = 3;
        for(let i = 0; i<c; i++){
            items.push(item.cloneNode(true));
        }

        line.innerHTML = '';
        items.forEach(item => {
            item.style.minWidth = `${itemWidth}px`;
            line.append(item);
        });
        line.style.minWidth = `${itemWidth * items.length}px`;
    })
};


function mapSelector(){
    let select = document.querySelectorAll('.map-mobile .select_option.hover-item');
    let popup = document.querySelector('.map_popup');
    let rend = document.querySelectorAll('.rend-element');

    select.forEach(item => {
        if(item.dataset.value != 'выберите регион')
        item.addEventListener('click', () => {
            popup.classList.add('active');
            map_info.filter(x => x.label === item.dataset.value).map(x =>{
                setTimeout(() => {
                    document.querySelector('.select_option.chosen').innerHTML = x.name;
                }, 10);
                for (var key in x) {
                    rend.forEach(element =>{
                        element.innerHTML = x[element.dataset.value];
                    });
                    }
                }
            );
        })
    });
}
if(document.querySelector('.map-mobile')){
    setTimeout(() => {
        mapSelector()
    }, 1000);
}

function emulateSelector(select){
    let selects = document.querySelectorAll(select);

    selects.forEach((select, z) =>{
        select.hidden = true;

        let emul = document.createElement('div');
        emul.classList.add("select");
        emul.style.zIndex = `${z}0`;
        //emul.onclick = ()=>emul.classList.toggle('active');
        emul.setAttribute('tabindex','1');
        emul.onblur = function(){
            this.classList.remove('active');
        };

        let tit = document.createElement('div');
        tit.classList.add("select_option", "select_tit");
        tit.onclick = () => select.classList.toggle('active');
        emul.append(tit);

        let emulListOuter = document.createElement('div');
        emulListOuter.classList.add("select_list_outer");
        emul.append(emulListOuter);

        let emulList = document.createElement('div');
        emulList.classList.add("select_list","hover-parent");
        emulListOuter.append(emulList);

        select.querySelectorAll('option').forEach((item)=>{
            let option = document.createElement('div');
            option.classList.add("select_option","hover-item");
            option.innerHTML = item.innerHTML;
            option.dataset.value = item.value;

            /*option.onclick = ()=>{
                if(!emul.classList.contains('active')) return;
                select.value=option.dataset.value;
                tit.textContent = option.textContent;
                tit.classList.add('chosen');

                let evt = document.createEvent('HTMLEvents');
                evt.initEvent('change', true, true);
                select.dispatchEvent(evt);

                option.parentNode.querySelectorAll('.select_option').forEach((option)=>{
                    option.classList.remove('selected')
                });
                option.classList.add('selected');
            };*/

            if(item.selected){
                option.classList.add('selected');
                tit.textContent = item.textContent;
            } 
            if(item.dataset.default == 'true') option.classList.add('default');
            if(item.disabled) option.classList.add('disabled');
            emulList.append(option);
        });

        select.parentNode.append(emul);

        let heightStart = emul.querySelector('.select_option').offsetHeight;
        let heightEnd = 0;
        emul.querySelectorAll('.select_option').forEach((option)=>{
            heightEnd += option.offsetHeight;
        });
        //emul.style.height = heightStart + 'px';
        //emul.querySelector('.select_list').style.maxHeight = heightStart + 'px';
    })

    let z = 1;
    for(let i=selects.length - 1; i>=0; i--){
        selects[i].parentNode.querySelector('.select').style.zIndex = `${z}0`;
        z++;
    }

    document.addEventListener('click', (event) => {
        if(event.target.closest('.select_option')){
            let target = event.target.closest('.select_option');
            let emul = target.closest('.select');
            let select;
            if(emul.previousElementSibling && emul.previousElementSibling.classList.contains('.select_emulator')) select = emul.previousElementSibling.classList.contains('.select_emulator');
            let tit = emul.querySelector('.select_tit')
            let list = emul.querySelector('.select_list_outer');

            if(target.classList.contains('select_tit')){
                emul.classList.toggle('active');
            } else {
                if(select){
                    select.value=option.dataset.value;

                    let evt = document.createEvent('HTMLEvents');
                    evt.initEvent('change', true, true);
                    select.dispatchEvent(evt);
                } 

                let value;
                if(target.querySelector('.select_option_radio')) value = target.querySelector('.select_option_radio').value;
                if(target.dataset.value) value = target.dataset.value;
                tit.textContent = value;
                tit.classList.add('chosen');

                list.querySelectorAll('.select_option').forEach((option)=>{
                    option.classList.remove('selected')
                });
                target.classList.add('selected');
                emul.classList.remove('active');
            }
        }
    });
};

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
            setTimeout(animate, 1);
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