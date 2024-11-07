const Event_swiper = new Swiper(".mySwiper-event", {
    effect: "coverflow",
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: "auto",
    coverflowEffect: {
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
    },
    pagination: {
        el: ".swiper-pagination-event",
    },
    loop: true, // Hace que las diapositivas giren en bucle
    autoplay: {
        delay: 4000, // Retraso de la reproducción automática en milisegundos
        disableOnInteraction: false,
    },
});

const swiper = new Swiper(".mySwiper", {
    effect: "cards",
    grabCursor: true,
    pagination: {
        el: ".swiper-pagination",
        clickable: true, // Permite que la paginación sea clicable
    },
    navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
    },
    // Configuraciones adicionales
    loop: true, // Hace que las diapositivas giren en bucle
    autoplay: {
        delay: 2500, // Retraso de la reproducción automática en milisegundos
        disableOnInteraction: false,
    },
});

