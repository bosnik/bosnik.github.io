$(document).ready(function () {
    var slider = tns({
        container: '.carousel__wrapper',
        continer: ".",
        controls: false,
        nav: false,

    });

    var slider2 = tns({
        container: '.review__wrapper_carousel-1',
        controls: false,
        nav: false,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayHoverPause: true,
        autoplayResetOnVisibility: true,
        items: 1,
        gutter: 860
        // autoHeight: true


    });
    var slider3 = tns({
        container: '.review__wrapper_carousel-2',
        controls: false,
        nav: false,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 6000,
        autoplayHoverPause: true,
        autoplayResetOnVisibility: true,
        items: 1
        // autoHeight: true

    });
    var slider4 = tns({
        container: '.review__wrapper_carousel-3',
        controls: false,
        nav: false,
        autoplay: true,
        autoplayButtonOutput: false,
        autoplayTimeout: 7000,
        autoplayHoverPause: true,
        autoplayResetOnVisibility: true,
        items: 1
        // autoHeight: true

    });

    document.querySelector('.prev').onclick = function () {
        slider.goTo('prev');
    };


    document.querySelector('.next').onclick = function () {
        slider.goTo('next');
    };

    $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
        $(this)
            .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
            .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');

    });

    function toggleSlide(item) {
        $(item).each(function (i) {
            $(this).on("click", function (e) {
                e.preventDefault();
                $(".catalog-item__content").eq(i).toggleClass("catalog-item__content_active");
                $(".catalog-item__list").eq(i).toggleClass("catalog-item__list_active");
            })
        });
    };


    toggleSlide(".catalog-item__link");
    toggleSlide(".catalog-item__back");

    //Modal
    $('[data-modal=consultation]').on('click', function () {
        $('.overlay, #consultation').fadeIn('slow');
    });

    $('.modal__close').on('click', function () {
        $('.overlay, #consultation, #thanks, #order').fadeOut('slow');
    });

    $('.button_mini').each(function (i) {
        $(this).on('click', function () {
            $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
            $('.overlay, #order').fadeIn('slow');
        });
    });


    var modal = document.getElementById('overlay');
    // When the user clicks anywhere outside of the modal, close it
    window.on("tap"function (event) {
        if ((window.matchMedia('(max-width: 875px)').matches && event.target == modal)) {
            modal.style.display = "none";
            
        }
    });

    function validateForm(form) {
        $(form).validate({
            rules: {
                name: {
                    required: true,
                    minlength: 2,

                },
                phone: {
                    required: true,
                    minlength: 3,
                    maxlength: 19
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                name: {
                    required: "Пожайлуста введите имя",
                    minlength: jQuery.validator.format("Введите больше {0} символов!")
                },
                phone: {
                    required: "Пожайлуста введите номер телефона",
                    minlength: jQuery.validator.format("Введите больше {0} символов!")
                },
                email: {
                    required: "Пожайлуста введите почтовый адрес",
                    email: "Ваш почтовый адрес дожен быть формата имя@домен.com"
                }
            },


        });

    };

    $("input[name=phone]").mask("+380 (99) 99-99-999");

    validateForm("#consultation-form");
    validateForm("#consultation form");
    validateForm("#order form");

    $('form').submit(function (e) {
        e.preventDefault();
        if (!$(this).valid()) {
            return;
        }
        $.ajax({
            type: "POST",
            url: "smart.php",
            data: $(this).serialize()
        }).done(function () {
            $(this).find("input").val("");
            $('#consultation, #order').fadeOut();
            $('.overlay, #thanks').fadeIn('slow');

            $('form').trigger('reset');
        });
        return false;
    });

    //page up

    $(window).scroll(function() {
        if ($(this).scrollTop() > 1200) {
            $(".pageup").fadeIn();
        } else {
            $(".pageup").fadeOut();
        }
    });

    $("a").on('click', function (event) {

        // Make sure this.hash has a value before overriding default behavior
        if (this.hash !== "") {
            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 1000, function () {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
            });
        } // End if
    });

    new WOW().init();




});



