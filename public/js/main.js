/* -------------------------------------------

Name: 		Studway
Author:		Nazar Miller (millerDigitalDesign)
Portfolio:  https://themeforest.net/user/millerdigitaldesign/portfolio?ref=MillerDigitalDesign

p.s. I am available for Freelance hire (UI design, web development). mail: miller.themes@gmail.com

------------------------------------------- */

$(function() {

  "use strict";

  //animsition
  $('a').addClass('animsition-link');
  $(document).ready(function() {
    $(".sw-page-wrapper").animsition({
      inClass: 'fade-in-up-sm',
      outClass: 'fade-out',
      inDuration: 600,
      outDuration: 500,
      linkElement: '.animsition-link',
      linkElement: 'a:not([target="_blank"]):not([href^="#."]):not([href^="#sw-book-popup-1"]):not([href^="#sw-book-popup-2"]):not([href^="#sw-content"])',
      loading: true,
      loadingParentElement: 'body', //animsition wrapper element
      loadingClass: 'load',
      loadingInner: '', // e.g '<img src="loading.svg" />'
      timeout: false,
      timeoutCountdown: 5000,
      onLoadEvent: true,
      browser: ['animation-duration', '-webkit-animation-duration'],
      // "browser" option allows you to disable the "animsition" in case the css property in the array is not supported by your browser.
      // The default setting is to disable the "animsition" in a browser that does not support "animation-duration".
      overlay: false,
      overlayClass: 'animsition-overlay-slide',
      overlayParentElement: 'body',
      transition: function(url) {
        window.location.href = url;
      }
    });
  });

  // Create a timeline with default parameters
  var tl = anime.timeline({
    easing: 'easeOutExpo',
    duration: 1200,
  });

  var targetElm = document.querySelector('.sw-banner-image')

  $(document).ready(function() {
    // Add children
    tl
      .add({
        targets: '.sw-banner-image',
        scale: [1.6, 1],
        duration: 2000,
        update: function(anim) {
          targetElm.style.filter = 'blur(' + 2000 * anim.progress / 0 + 'px)'
        }
      })
      .add({
        targets: '.sw-logo, .sw-menu-social-links',
        opacity: [0, 1],
        duration: 1800,
        delay: function(el, i, l) {
          return i * 100;
        },
      }, '-=1400')
      .add({
        targets: '.sw-main-title',
        translateX: [-90, 0],
        opacity: [0, 1],
      }, '-=1800')
      .add({
        targets: '.menu-item',
        translateX: [-30, 0],
        opacity: [0, 1],
        delay: function(el, i, l) {
          return i * 30;
        },
      }, '-=1600')

  });

  // menu
  $('.sw-open-menu').on('click', function() {
    $('.sw-burger').toggleClass('sw-on-menu');
    $('.sw-menu-content').toggleClass('sw-active-menu');
  });

  $('.menu-item-has-children').on('click', function(event) {
    $(this).children('.sub-menu').toggleClass('sw-mobile-active');
  });

  // scroll main title opacity
  $(window).on('scroll', function() {
    $('.sw-animation-opas').css("opacity", 1 - $(window).scrollTop() / 300);
  });

  // anchor scroll
  $(document).on('click', 'a[href^="#"]', function(event) {
    $('html, body').stop().animate({
      scrollTop: $($(this).attr('href')).offset().top - 120
    }, 1000);
    return false;
  });

  $('.sw-video-frame').waypoint(function() {
    //counter up
    $('.sw-counter').each(function() {
      $(this).prop('Counter', 0).animate({
        Counter: $(this).text()
      }, {
        duration: 2000,
        easing: 'swing',
        step: function(now) {
          $(this).text(Math.ceil(now));
        }
      });
    });
  }, {
    triggerOnce: true,
    offset: 350
  });

  // scroll hint
  $('.sw-scroll-hint').on('mouseover', function() {
    $('.sw-over-frame').addClass('sw-active');
    $(this).addClass('sw-active');
  });
  $('.sw-scroll-hint').on('mouseout', function() {
    $('.sw-over-frame').removeClass('sw-active');
    $(this).removeClass('sw-active');
  });

  // slider services
  var swiper = new Swiper('.sw-services-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 800,
    navigation: {
      nextEl: '.sw-services-swiper-next',
      prevEl: '.sw-services-swiper-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      }
    },
  });

  // slider testimonials
  var swiper = new Swiper('.sw-testimonials-slider', {
    slidesPerView: 2,
    spaceBetween: 30,
    speed: 800,
    navigation: {
      nextEl: '.sw-testi-swiper-next',
      prevEl: '.sw-testi-swiper-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      }
    },
  });

  // slider brands
  var swiper = new Swiper('.sw-brand-slider', {
    slidesPerView: 4,
    spaceBetween: 30,
    autoplay: {
      delay: 4000,
    },
    loop: true,
    speed: 800,
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
    },
  });

  // slider blog
  var swiper = new Swiper('.sw-blog-slider', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 800,
    navigation: {
      nextEl: '.sw-blog-swiper-next',
      prevEl: '.sw-blog-swiper-prev',
    },
    breakpoints: {
      992: {
        slidesPerView: 2,
      },
      768: {
        slidesPerView: 1,
      }
    },
  });

  // instagram slider
  var swiper = new Swiper('.sw-instagram-slider', {
    slidesPerView: 6,
    spaceBetween: 0,
    autoplay: {
      delay: 6000,
    },
    loop: true,
    speed: 800,
    breakpoints: {
      992: {
        slidesPerView: 4,
      },
    },
    breakpoints: {
      768: {
        slidesPerView: 3,
      },
    },
  });

  // face slider
  var swiper = new Swiper('.sw-face-slider', {
    slidesPerView: 1,
    spaceBetween: 30,
    speed: 900,
    navigation: {
      nextEl: '.sw-fece-swiper-next',
      prevEl: '.sw-face-swiper-prev',
    },
  });

});
