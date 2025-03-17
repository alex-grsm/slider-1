
const carousel = document.querySelector('.carousel');
const nextBtn = document.querySelector('.carousel .next');
const prevBtn = document.querySelector('.carousel .prev');
const listDom = document.querySelector('.carousel .list');
const thumbnailDom = document.querySelector('.carousel .thumbnail');
const timeDom = document.querySelector('.carousel .time');

const timeRunning = 3000; // Время для анимации переходов (мс)
const timeAutoNext = 7000; // Время для автоматического переключения слайдов (мс)

// Обработчики для кнопок
nextBtn.addEventListener('click', () => {
    console.log('next btn clicked');
    showSlider('next');
});

prevBtn.addEventListener('click', () => {
    console.log('prev btn clicked');
    showSlider('prev');
});

// Переменные для таймеров
let runTimeOut;
let runNextAuto = setTimeout(() => {
    nextBtn.click();
}, timeAutoNext);

/**
 * Функция для перемещения слайдов в карусели
 * @param {string} type - Направление перемещения ('next' или 'prev')
 */
function showSlider(type) {
    const listItems = listDom.querySelectorAll('.item');
    const thumbnailItems = thumbnailDom.querySelectorAll('.item');

    if (type === 'next') {
        listDom.appendChild(listItems[0]);
        thumbnailDom.appendChild(thumbnailItems[0]);
        carousel.classList.add('next');
    } else if (type === 'prev') {
        listDom.prepend(listItems[listItems.length - 1]);
        thumbnailDom.prepend(thumbnailItems[thumbnailItems.length - 1]);
        carousel.classList.add('prev');
    }

    // Очищаем предыдущий таймер и устанавливаем новый для удаления классов анимации
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carousel.classList.remove('next');
        carousel.classList.remove('prev');
    }, timeRunning);

    // Сбрасываем таймер автоматического переключения и устанавливаем новый
    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
}


carousel.addEventListener('mouseenter', () => {
    clearTimeout(runNextAuto);
});

carousel.addEventListener('mouseleave', () => {
    runNextAuto = setTimeout(() => {
        nextBtn.click();
    }, timeAutoNext);
});