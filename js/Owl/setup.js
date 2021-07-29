$('.owl-carousel').owlCarousel({
    stagePadding: 50,
    loop:true,
    margin:10,
    nav:true,
    touchDrag: true,
    mouseDrag: true,
    responsiveClass:true,
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    navText: [
        '<i class="fa fa-angle-left" aria-hidden="true"></i>',
        '<i class="fa fa-angle-right" aria-hidden="true"></i>'
    ],
    navContainer: '.custom-nav',
    responsive:{
        0:{
            items:1
        },
        500:{
            items:2
        },
        768:{
            items:3
        },
        1000:{
            items:5
        }
    }
})