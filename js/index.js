const wrapper = document.querySelector('.wrapper');
const carousel = document.querySelector('.carousel');
const arrowBtn = document.querySelectorAll('.wrapper i');
const firstCradWidth = document.querySelector('.card').offsetWidth;
const carouselChildrens = [...carousel.children];

let isDragging = false, startX, startScrollLeft, timeoutId; 
let cardPerView = Math.round(carousel.offsetWidth / firstCradWidth);

carouselChildrens.slice(-cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML('afterbegin',card.outerHTML);
});

carouselChildrens.slice(0, cardPerView).reverse().forEach(card =>{
    carousel.insertAdjacentHTML('beforeend',card.outerHTML);
});

//arrow btn
arrowBtn.forEach(btn => {
    btn.addEventListener('click',()=>{
        carousel.scrollLeft += btn.id == 'left' ?-firstCradWidth: firstCradWidth;
    })
});

//drag events
const dragStart = (e)=>{
    isDragging = true;
    carousel.classList.add('dragging');
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
//dragging
const daragging = (e)=>{
    if(!isDragging) return;
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
//stop dragging
const dragStop = ()=>{
    isDragging = false;
    carousel.classList.remove('dragging');
}

//auto play
const autoPlay = ()=>{
    if(window.innerWidth < 800) return;
    timeoutId = setTimeout(()=> carousel.scrollLeft += firstCradWidth, 2500)
}
autoPlay();

//infinite loop
const infiniteScroll = ()=>{
    if(carousel.scrollLeft === 0){
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove('no-transition');
    }else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
        carousel.classList.add('no-transition');
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove('no-transition');
    }
    clearTimeout(timeoutId);
    if(!wrapper.matches(':hover')) autoPlay();
}

carousel.addEventListener('mousedown',dragStart);
carousel.addEventListener('mousemove',daragging);
document.addEventListener('mouseup',dragStop);
carousel.addEventListener('scroll',infiniteScroll);
wrapper.addEventListener('mouseenter',()=> clearTimeout(timeoutId));
wrapper.addEventListener('mouseleave',autoPlay);