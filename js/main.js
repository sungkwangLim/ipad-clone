import ipads from '../data/ipads.js'
import navigations from '../data/navigations.js'
// import 키워드를 사용한다면, index.html에 script태그에 type="module" 을 작성해야 된다.
// 장바구니
const basketStarterEl = document.querySelector('header .basket-starter');
const basketEl = basketStarterEl.querySelector('.basket');

basketStarterEl.addEventListener('click',function(event){
    event.stopPropagation(); //이벤트 버블링을 막기위해 현재 객체 부모요소 전달을 막는다.
    if(basketEl.classList.contains('show')) {
        // hide
        hideBasket();
    } else {
        // show
        showBasket();
    }
});
basketEl.addEventListener('click',function(event){
    event.stopPropagation(); //이벤트 버블링을 막기위해 현재 객체 부모요소 전달을 막는다.
});

window.addEventListener('click',function(){
    hideBasket();
});

function showBasket() { //함수를 만듬으로 기능을 [추상화] 함.
    basketEl.classList.add('show');
}
function hideBasket() {
    basketEl.classList.remove('show');
}



// 검색
const headerEl = document.querySelector('header');
const headerMenuEls = [...headerEl.querySelectorAll('ul.menu > li')];
const searchWrapEl = headerEl.querySelector('.search-wrap');
const searchStarterEl = headerEl.querySelector('.search-starter');
const searchCloserEl = searchWrapEl.querySelector('.search-closer');
const searchShadowEl = searchWrapEl.querySelector('.shadow');
const searchInputEl = searchWrapEl.querySelector('input[type="text"]');
const searchDelayEls = [...searchWrapEl.querySelectorAll('.autocompletes ul li')];

searchStarterEl.addEventListener('click',showSearch);
searchCloserEl.addEventListener('click',hideSearch);
searchShadowEl.addEventListener('click',hideSearch);

function showSearch() {
    headerEl.classList.add('searching');
    document.documentElement.classList.add('fixed');
    headerMenuEls.reverse().forEach(function(el,index){
        el.style.transitionDelay = index*.4 / headerMenuEls.length + 's'
    });
    searchDelayEls.forEach(function(el,index){
        el.style.transitionDelay = index*.4 / searchDelayEls.length + 's'
    });
    setTimeout(function(){
        searchInputEl.focus();
    },600);
}
function hideSearch() {
    headerEl.classList.remove('searching');
    document.documentElement.classList.remove('fixed');
    headerMenuEls.reverse().forEach(function(el,index){
        el.style.transitionDelay = index*.4 / headerMenuEls.length + 's'
    });
    searchDelayEls.reverse().forEach(function(el,index){
        el.style.transitionDelay = index*.4 / searchDelayEls.length + 's'
    });
    searchDelayEls.reverse();
    searchInputEl.value = '';
}


// 요소의 가시성 관찰
const io = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
        if(!entry.isIntersecting){
            return;
        }
        entry.target.classList.add('show');
    })
});
const infoEls = document.querySelectorAll('.info');

infoEls.forEach(function(el){
    io.observe(el);
});

// 비디오 재생
const videoEl = document.querySelector('.stage video');
const playBtn = document.querySelector('.stage .controller--play');
const pauseBtn = document.querySelector('.stage .controller--pause');

playBtn.addEventListener('click',function(){
    videoEl.play(); // 비디오 내장함수
    playBtn.classList.add('hide');
    pauseBtn.classList.remove('hide');
});
pauseBtn.addEventListener('click',function(){
    videoEl.pause(); // 비디오 내장함수
    playBtn.classList.remove('hide');
    pauseBtn.classList.add('hide');
});

// '당신에게 맞는 iPad?' 는 랜더링
const itemsEl = document.querySelector('section.compare .items');
ipads.forEach(function(ipad){
    const itemEl = document.createElement('div');
    itemEl.classList.add('item');

    let colorList = '';
    ipad.colors.forEach(function(color){
        colorList+= `<li style="background-color:${color}"></li>`
    });

    itemEl.innerHTML = /* html */`
        <div class="thumbnail">
            <img src="${ipad.thumbnail}" alt="${ipad.name}" />
        </div>
        <ul class="colors">
            ${colorList}
        </ul>
        <h3 class="name">${ipad.name}</h3>
        <p class="tagline">${ipad.tagline}</p>
        <p class="price">₩${ipad.price.toLocaleString('en-US')}부터</p>
        <button class="btn">구입하기</button>
        <a href="${ipad.url}" class="link">더 알아보기</a>
    `;

    itemsEl.append(itemEl);
});

const navigationsEl = document.querySelector('footer .navigations');
navigations.forEach(function(nav){
    const mapEl = document.createElement('div');
    mapEl.classList.add('map');

    let mapList = '';
    nav.maps.forEach(function(map){
        mapList += /* html */`
        <li>
            <a href="${map.url}">${map.name}</a>
        </li>
        `
    });

    mapEl.innerHTML = /* html */`
        <h3>
            <span class="text">${nav.title}</span>
        </h3>
        <ul>
            ${mapList}
        </ul>
    `;

    navigationsEl.append(mapEl);
});

const thisYearEl = document.querySelector('span.this-year');
thisYearEl.textContent = new Date().getFullYear();