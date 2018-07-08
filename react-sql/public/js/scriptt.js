$(function() {
	$('.categoryImgWrap').on("mouseenter mouseleave", function(){
	  $('.categoryNameWrap', this).fadeToggle(500);
	});
	});








$(".btn").on('click', function() {
  $(this).next('.er').find('.qwerty').slideToggle();
});


