var mySwiper = new Swiper('.swiper-container', {
  prevButton: '.swiper-button-prev',
  nextButton: '.swiper-button-next',

  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }, //这样写小圆点就有了

})
var mySwiper = new Swiper('.swiper-container2', {


  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }, //这样写小圆点就有了

})
var mySwiper = new Swiper('.swiper-container3', {


  prevButton: '.swiper-button-prev',
  nextButton: '.swiper-button-next',


})

$('._right').click(function () {
  // $('.cars').css('transform:transition(X)', '-85px')

  $('.cars').css({
    'transform': 'translateX(-85px)'
  })

})