$(document).ready(function() {
  
  timer();
  
  /* Youtube fix */
  $("iframe").each(function() {
    var ifr_source=$(this).attr('src');
    var wmode="wmode=transparent";
    if(ifr_source.indexOf('?')!=-1) {
      var getQString=ifr_source.split('?');
      var oldString=getQString[1];
      var newString=getQString[0];
      $(this).attr('src',newString+'?'+wmode+'&'+oldString)
    } else $(this).attr('src',ifr_source+'?'+wmode)
  })
  
  /* Popups */
  $("a.call").leanModal({ closeButton: ".modal_close" });
  $("a.sert").colorbox({rel:'sert'});
  
  /* Prefix for Landing Pages */
  var page = $('input[name="page"]').val().match(/(?:\/)(.{1})(?:\/.*)$/i);
  if(page == 'a')	{ var prefix = ''; }
  else {
    if(page != null) var prefix = '../a/';
    else var prefix = 'a/';
  }
  
  /* Mobile & Animation */
  var Android = navigator.userAgent.search(/Android/i);
	var iPhone = navigator.userAgent.search(/iPhone/i);
	var iPad = navigator.userAgent.search(/iPad/i);
	if(Android != -1 || iPhone != -1 || iPad != -1) { $('html').css('width', window.innerWidth + 'px'); }
  else {
		$(".scroll").each(function () {
			var block = $(this);
			$(window).scroll(function() {
				var top = block.offset().top;
				var bottom = block.height()+top;
				top = top - $(window).height();
				var scroll_top = $(this).scrollTop();
				if ((scroll_top > top) && (scroll_top < bottom)) { if (!block.hasClass("animated")) { block.addClass("animated"); block.trigger('animateIn'); } }
        else { block.removeClass("animated"); block.trigger('animateOut'); }
			});
		});
    /* Time Parser */
    $("#legos em").each(function() {
      $(this).attr("data-number", parseInt($(this).text()));
    });
    $("#legos").on("animateIn", function() {
      var inter = 1;
      $(this).find("em").each(function() {
        var count = parseInt($(this).attr("data-number")),
            block = $(this),
            timeout = null,
            step = 1;
        timeout = setInterval(function() {
          if (step == 25) {
            block.text(count.toString());
            clearInterval(timeout);
          } else {
            block.text((Math.floor(count*step/25)).toString());
            step++;
          }
        }, 40);
      });
    }).on('animateOut', function() {
      $(this).find('.anim').each(function() {
        $(this).css('opacity', 0.01);
        $(this).css({'-webkit-transform': 'scale(0.7, 0.7)', '-moz-transform': 'scale(0.7, 0.7)'});
      });
    });
		$('head').append('<link rel="stylesheet" href="'+prefix+'css/animation.css">');
	}
  
  /* Forms */
  $('.button').click(function() {
		$('body').find('form:not(this)').children('label').removeClass('red');
		var page = $('input[name="page"]').val().match(/(?:\/)(.{1})(?:\/.*)$/i);
		if(page == null) { var url = "send.php"; }
    else { var url = "send.php"; }
		var answer = checkForm($(this).parent().get(0));
		if(answer != false) {
			var formname = $('input[name="formname"]').val();
      var ref = $('input[name="referer"]', $form).val();
			var $form = $(this).parent(),
          name = $('input[name="name"]', $form).val(),
          phone = $('input[name="phone"]', $form).val(),
          email = $('input[name="email"]', $form).val(),
          ques = $('textarea[name="ques"]', $form).val(),
          sbt = $('input[type="button"]', $form).attr("name"),
          submit = $('input[name='+sbt+']', $form).val();
			$.ajax({
				type: "POST",
				url: url,
				data: "name="+name+"&phone="+phone+"&"+sbt+"="+submit+"&email="+email+"&ques="+ques+"&formname="+formname+"&ref="+ref
			}).always(function() {
				if(page == null) { document.location.href = sbt+'.php'; }
        else { document.location.href = '../'+sbt+'.php'; }
			});
		}
	});
   
});

/* Timer */
function timer() {
  var now = new Date();
  var newDate = new Date('2018-05-26');
  var totalRemains = (newDate.getTime()-now.getTime());
  var Days = (parseInt(parseInt(totalRemains/1000)/(24*3600)));
  var Hours = (parseInt((parseInt(totalRemains/1000) - Days*24*3600)/3600));
  var Min = (parseInt(parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600)/60));
  var Sec = parseInt((parseInt(totalRemains/1000) - Days*24*3600) - Hours*3600) - Min*60;
  if (Sec<10) { Sec="0"+Sec }
  if (Min<10) { Min="0"+Min }
  if (Hours<10) { Hours="0"+Hours }
  if (Days<10) { Days="0"+Days }
  $(".day").each(function() { $(this).text(Days); });
  $(".hour").each(function() { $(this).text(Hours); });
  $(".min").each(function() { $(this).text(Min); });
  $(".sec").each(function() { $(this).text(Sec); });
  setTimeout(timer, 1000);
}

// ymaps.ready(init);

function init () {
    // var myMap = new ymaps.Map("map", {
    //         center: [53.5135546, 49.2616323],
    //         zoom: 16
    //     })

    //     myPlacemark2 = new ymaps.Placemark([53.5115546, 49.2616323], {
    //         // Свойства.
    //         hintContent: 'Офис ComfortHouse'
    //     }, {
    //         // Опции.
    //         // Своё изображение иконки метки.
    //         //iconImageHref: 'img/marker.png', 
    //         //iconImageSize: [50, 83],
    //     });

    // // Добавляем все метки на карту.
    // myMap.geoObjects
    //     .add(myPlacemark2);
}
