let btnRegistrar = document.querySelector("#registrar");
let camera_button = document.querySelector("#start-camera");
let try_again = document.querySelector("#try_again");
let video = document.querySelector("#video");
let click_button = document.querySelector("#click-photo");
let canvas = document.querySelector("#canvas");
let nameInput = document.querySelector("#name");
let curpInput = document.querySelector("#curp");
let contrasenaInput = document.querySelector("#contrasena");
let contrasenaVerifyInput = document.querySelector("#contrasenaVerify");
let image_data_url
let stream
nameInput.disabled = true
curpInput.disabled = true
contrasenaInput.disabled = true
contrasenaVerifyInput.disabled = true

camera_button.addEventListener('click', async function() {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
	video.srcObject = stream;
    camera_button.classList.add('d-none');
    video.classList.remove('d-none');
    click_button.classList.remove('d-none');
    try_again.classList.add('d-none');
    nameInput.disabled = true
    curpInput.disabled = true
    contrasenaInput.disabled = true
    contrasenaVerifyInput.disabled = true
});
try_again.addEventListener('click', async function() {
    stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
    video.srcObject = stream;
    try_again.classList.add('d-none');
    canvas.classList.add('d-none');
    video.classList.remove('d-none');
    click_button.classList.remove('d-none');
    nameInput.disabled = true
    curpInput.disabled = true
    contrasenaInput.disabled = true
    contrasenaVerifyInput.disabled = true
    image_data_url = null
});

click_button.addEventListener('click', function() {
   	canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
   	image_data_url = canvas.toDataURL();
   	// data url of the image
   	console.log(image_data_url);
    video.pause();
    stream.getTracks().forEach(function(track) {
        track.stop();
    });
    video.classList.add('d-none');
    canvas.classList.remove('d-none');
    click_button.classList.add('d-none');
    try_again.classList.remove('d-none');
    nameInput.disabled = false
    curpInput.disabled = false
    contrasenaInput.disabled = false
    contrasenaVerifyInput.disabled = false
});

btnRegistrar.addEventListener('click', function(){
    console.log(image_data_url)
    let name = $("#name").val().trim();
    let curp = $("#curp").val().trim();
    let pass = $("#contrasena").val().trim();
    let passConfirm = $("#contrasenaVerify").val().trim();

    if(image_data_url){
        if (name && curp && pass && passConfirm) {
            if (pass === passConfirm) {
                const formData = new FormData();
                formData.append("Nombre", name);
                formData.append("Password", pass);
                formData.append("Curp", curp);
                formData.append("Foto", image_data_url);
                Promise.resolve($.ajax({
                    type: 'POST',
                    url: URLAPI + "usuarios/register",
                    data: formData,
                    processData: false,
                    contentType: false,
                    dataType: "json",
                    success: function(response) {},
                    error: function(err) {}
                }).then((response) => {
                    console.log(response)
                    if (response.success) {
                        swal.fire({
                            title: 'Registro Exitoso',
                            icon: 'success'
                        }).then(() => {
                            window.location.href = URL;
                        });
                    } else {
                        swal.fire({
                            title: 'Ha ocurrido un error',
                            icon: 'error',
                            text: response.message
                        });
                    }
                }).catch((err) => {
                    console.error(err);
                }));
            } else {
                swal.fire({
                    title: 'Ha ocurrido un error',
                    icon: 'error',
                    text: 'Las contraseñas no coinciden'
                });
            }
        } else {
            swal.fire({
                title: 'Faltan datos',
                icon: 'error',
                text: 'Rellene todos los campos'
            });
        }
    } else {
        swal.fire({
            title: 'Sin foto',
            icon: 'error',
            text: 'Por favor tómese una foto de frente'
        });
    }


});

(function ($) {
    "use strict";
    
    // Initiate the wowjs
    new WOW().init();
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 200) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });
    
    
    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $('.navbar').addClass('nav-sticky');
        } else {
            $('.navbar').removeClass('nav-sticky');
        }
    });
    
    
    // Dropdown on mouse hover
    $(document).ready(function () {
        function toggleNavbarMethod() {
            if ($(window).width() > 992) {
                $('.navbar .dropdown').on('mouseover', function () {
                    $('.dropdown-toggle', this).trigger('click');
                }).on('mouseout', function () {
                    $('.dropdown-toggle', this).trigger('click').blur();
                });
            } else {
                $('.navbar .dropdown').off('mouseover').off('mouseout');
            }
        }
        toggleNavbarMethod();
        $(window).resize(toggleNavbarMethod);
    });


    // Testimonials carousel
    $(".testimonials-carousel").owlCarousel({
        center: true,
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Blogs carousel
    $(".blog-carousel").owlCarousel({
        autoplay: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="fa fa-angle-left" aria-hidden="true"></i>',
            '<i class="fa fa-angle-right" aria-hidden="true"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    
    
    // Class filter
    var classIsotope = $('.class-container').isotope({
        itemSelector: '.class-item',
        layoutMode: 'fitRows'
    });

    $('#class-filter li').on('click', function () {
        $("#class-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        classIsotope.isotope({filter: $(this).data('filter')});
    });
    
    
    // Portfolio filter
    var portfolioIsotope = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
    });

    $('#portfolio-filter li').on('click', function () {
        $("#portfolio-filter li").removeClass('filter-active');
        $(this).addClass('filter-active');
        portfolioIsotope.isotope({filter: $(this).data('filter')});
    });
    
})(jQuery);

