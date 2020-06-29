const defaultOptions = {
    slides: 2,
    slidesWidth: 600,
    slidesHeight: 400,
    nav: true,
    autoplay: false,
    autoplaySpeed: 2500,    
    loop: true,
    dots: true,
}

let shift = 0;

let divs = document.querySelectorAll('div');
divs.forEach((el) => el.kinderSlider = kinderSlider);

function kinderSlider(settings = {}) {
    const slidesWidth = settings.slidesWidth || defaultOptions.slidesWidth;
    const slides = settings.slides || defaultOptions.slides;
    const slidesHeight = settings.slidesHeight || defaultOptions.slidesHeight;
    const autoplaySpeed = settings.autoplaySpeed || defaultOptions.autoplaySpeed;
    const nav = settings.nav !== undefined ? settings.nav : defaultOptions.nav;
    const dots = settings.dots !== undefined ? settings.dots : defaultOptions.dots;
    const loop = settings.loop !== undefined ? settings.loop : defaultOptions.loop;
    const autoplay = settings.autoplay !== undefined
        ? settings.autoplay : defaultOptions.autoplay;

    transformHtmlSlider(this, slidesWidth, slidesHeight, slides, nav, loop, dots, autoplay);
    setStyle(slidesWidth, slides, slidesHeight, loop);

    if (autoplay) { 
        setInterval(nextSlide, autoplaySpeed, slidesWidth, slides);
        loop(true);                
    }
};

function addNav(slidesWidth, slidesHeight, slides, loop, ) {

    let prevBtn = document.createElement('button');
    prevBtn.className = 'btn_prev';
    prevBtn.innerHTML = '<';
    prevBtn.style.position = 'absolute';
    prevBtn.style.right = `${(slidesWidth / 2 * slides) + 15}px`;
    prevBtn.addEventListener('click', () => prevSlide(slidesWidth, slides, loop));

    let nextBtn = document.createElement('button');
    nextBtn.className = 'btn_next';
    nextBtn.innerHTML = '>';
    nextBtn.style.position = 'absolute';
    nextBtn.style.left = `${(slidesWidth / 2 * slides) + 15}px`;
    nextBtn.addEventListener('click', () => nextSlide(slidesWidth, slides, loop));

    let navBlock = document.createElement('div');
    navBlock.className = 'nav_block';
    navBlock.style.top = `${(slidesHeight / 2 )}px`;

    navBlock.append(prevBtn);
    navBlock.append(nextBtn);
    mainSlider.append(navBlock);
};

function addDots(slides, slidesWidth) {
    let dotBlock = document.createElement('div');
    dotBlock.className = 'dot_block';

    let slidesArr = document.querySelectorAll('.kinder_slider .sliders_wrapper>div');
    let dotQuantity = slides === 1 ? Math.ceil(slidesArr.length - 2) : Math.ceil((slidesArr.length - (slides - 1) * 2) / slides);

    for (let i = 0; i < dotQuantity; i++) {
        let dot = document.createElement('button');
        dot.className = 'dot';
        dot.dataset.shift = slides === 1 ? `${(i * slidesWidth * slides) + slidesWidth}` : `${(i * slidesWidth * slides) + slidesWidth * (slides -1)}`;
        dot.addEventListener('click', transformWithDots);
        if (i === 0) {
            dot.classList.add('active');
        }
        dotBlock.append(dot);
    }

    mainSlider.append(dotBlock);
}

function transformWithDots() {
    let activeDot = document.querySelector('.dot_block .active');
    activeDot.classList.remove('active');
    this.classList.add('active');
    let slidersWrapper =
        document.querySelector('.kinder_slider .sliders_wrapper');
    slidersWrapper.style.transform = `translateX(${-this.dataset.shift}px)`
}

function dotsClassChange(focus) {
    let dotsArr = document.querySelectorAll('.dot');
    let activeDot = Array.from(dotsArr).indexOf(document.querySelector('.dot.active'));

    if (focus) {
        if (!dotsArr[dotsArr.length - 1].classList.contains('active')) {
        dotsArr[activeDot].classList.remove('active');
        dotsArr[activeDot + 1].classList.add('active');
        }
        else {
        dotsArr[activeDot].classList.remove('active');
        dotsArr[0].classList.add('active');
        }
    }
    else {
        if (!dotsArr[0].classList.contains('active')) {
        dotsArr[activeDot].classList.remove('active');
        dotsArr[activeDot - 1].classList.add('active');
        }
        else {
        dotsArr[activeDot].classList.remove('active');
        dotsArr[dotsArr.length - 1].classList.add('active');
        }
    }
}

function manualDotChange(position) {
    let dotsArr = document.querySelectorAll('.dot');

    dotsArr.forEach((dot, _index) => {
        dot.classList.remove('active');
    });

    if (position === 'first') {
        dotsArr[0].classList.add('active')
    } else {
        Array.from(dotsArr).slice(-1)[0].classList.add('active')
    }
}

function nextSlide(slidesWidth, slides, loop) {
    let slidersWrapper = document.querySelector('.kinder_slider .sliders_wrapper');
    slidersWrapper.style.transition = '0.5s';
    let slidersWrapperWidth = slidersWrapper.offsetWidth;
    let slidesArr = slidersWrapper.querySelectorAll('.one_slide');

    let activeIndex;
    slidesArr.forEach((el, index) => {
        if (el.classList.contains('active')) {
            activeIndex = index;
            el.classList.remove('active');
        }
    });
    
    if ((activeIndex - (slides - 2)) % slides === 0) {
        dotsClassChange(true);
    }

    if (shift >= -(slidersWrapperWidth - slidesWidth * slides)) {
        shift -= slidesWidth;
        slidesArr[activeIndex].classList.remove('active');
        slidesArr[activeIndex+1].classList.add('active');

        slidersWrapper.style.transform = `translateX(${shift}px)`;
    }

    if (loop && slides > 1 && slidesArr[slidesArr.length - (slides - 1)].classList.contains('active')) {    
        function displacement() {
            slidersWrapper.style.transition = 'none';
            slidersWrapper.style.transform = `translateX(${-slidesWidth * (slides - 1)}px)`;
            slidesArr[slides - 1].classList.add('active');
            slidesArr[slidesArr.length - (slides - 1)].classList.remove('active');
            shift = -slidesWidth * (slides - 1);
            manualDotChange('first');
        }
        setTimeout(displacement, 500);        
    } else if (loop && slides === 1 && slidesArr[slidesArr.length-1].classList.contains('active')) {
        function displacement() {
            slidersWrapper.style.transition = 'none';
            slidersWrapper.style.transform = `translateX(${-slidesWidth}px)`;
            slidesArr[1].classList.add('active');
            slidesArr[slidesArr.length-1].classList.remove('active');
            shift = -slidesWidth;
            manualDotChange('first');
        }
        setTimeout(displacement, 500);
    } else {
        slidersWrapper.style.transform = `translateX(${shift}px)`;
    }
}

function prevSlide(slidesWidth, slides, loop) {
    let slidersWrapper =
    document.querySelector('.kinder_slider .sliders_wrapper');
    slidersWrapper.style.transition = '0.5s';
    let slidesArr = slidersWrapper.querySelectorAll('.one_slide');

    let activeIndex;
    slidesArr.forEach((el, index) => {
        if (el.classList.contains('active')) {
            activeIndex = index;
            el.classList.remove('active');
        }
    });


    if ((activeIndex + 1) % slides === 0) {
        dotsClassChange(false);
    }

    if ( shift <= 0 ) {
            shift += slidesWidth;
            shift
            slidesArr[activeIndex].classList.remove('active');
            slidesArr[activeIndex-1].classList.add('active');
    }

    if (loop && slides > 1 && slidesArr[0].classList.contains('active')) {
        slidersWrapper.style.transform = `translateX(${shift}px)`;
        function displacement() {
            slidersWrapper.style.transition = 'none';
            slidersWrapper.style.transform = `translateX(${-(slidesArr.length - (slides - 1) * 2) * slidesWidth}px)`;
            slidesArr[slidesArr.length - (slides - 1) * 2].classList.add('active');
            slidesArr[0].classList.remove('active');
            shift = -slidesWidth*(slidesArr.length - (slides -1)*2);
            manualDotChange('last');
        }
        setTimeout(displacement, 500);

    } else if (loop && slides === 1 && slidesArr[0].classList.contains('active')) {
        slidersWrapper.style.transform = `translateX(${shift}px)`;
        function displacement() {
            slidersWrapper.style.transition = 'none';
            slidersWrapper.style.transform = `translateX(${-(slidesArr.length - 2)
                * slidesWidth}px)`;
            slidesArr[slidesArr.length-2].classList.add('active');
            slidesArr[0].classList.remove('active');
            shift = -slidesWidth*(slidesArr.length - 2);
        }
        setTimeout(displacement, 500);
    } else {
        slidersWrapper.style.transform = `translateX(${shift}px)`;
    }
}

function transformHtmlSlider(mainSlider, slidesWidth, slidesHeight, slides, nav, loop, dots, autoplay) {
    mainSlider.classList.add('kinder_slider');

    let slidesHtml = mainSlider.innerHTML;

    if (loop && slides > 1) {
        const children = mainSlider.querySelectorAll('div');
        let startHtml = '';    
        for (let i = 0; i < slides - 1; i++) {
            let startClone = children[i].outerHTML;
            startHtml += startClone

            let endClone = children[children.length - 1 - i].outerHTML;
            slidesHtml = endClone + slidesHtml;
        }

        slidesHtml += startHtml;
    } else if (loop && slides === 1) {
        let firstClone = mainSlider.querySelector('div:first-child').outerHTML;
        slidesHtml += firstClone;

        let lastClone = mainSlider.querySelector('div:last-child').outerHTML;
        slidesHtml = lastClone + slidesHtml;
    }

    mainSlider.innerHTML = `<div class="sliders_window">
        <div class="sliders_wrapper">${slidesHtml}</div>
    </div>`;

    if (nav) {
        addNav(slidesWidth, slidesHeight, slides, loop);
    };

    if (dots) {
        addDots(slides, slidesWidth);
    };

}

function setStyle(slidesWidth, slides, slidesHeight, loop, mainSlider) {
    let slidersWindow = document
    .querySelector('.kinder_slider .sliders_window');

    slidersWindow.style.width = `${slidesWidth * slides}px`;
    slidersWindow.style.height = `${slidesHeight}px`;

    let slidesArr = document.querySelectorAll('.kinder_slider .sliders_wrapper>div');
    let sliders_wrapper = document.querySelector('.kinder_slider .sliders_wrapper');

    sliders_wrapper.style.width = `${slidesArr.length * slidesWidth}px`;
    if (loop && slides > 1) {
        sliders_wrapper.style.transform = `translateX(${-slidesWidth * (slides - 1)}px)`;
        shift = -slidesWidth * (slides - 1);
    } else if (loop && slides === 1) {
        sliders_wrapper.style.transform = `translateX(${-slidesWidth}px)`;
        shift = -slidesWidth;
    }

    slidesArr.forEach((el, index) => {
        el.classList.add('one_slide');

        if (loop && slides > 1 && index === slides - 1) {
            el.classList.add('active');
        } else if (loop && slides === 1 && ((index === 1 || index <= slides) && index != 0)) {
            el.classList.add('active');
        }

        else if (!loop && index < slides) el.classList.add('active');

        if (slides > 1 && index < (slides - 1) || slides > 1 && index > (slidesArr.length - slides)) {
            el.classList.add('cloned');
        } else if (slides === 1 && index === (slidesArr.length - 1) || slides === 1 && index === 0) {
            el.classList.add('cloned');
        }

        el.style.width = `${slidesWidth}px`;
        el.style.height = `${slidesHeight}px`;
    });
}