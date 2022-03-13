function num2str(n, text_forms) {
  n = Math.abs(n) % 100; var n1 = n % 10;
  if (n > 10 && n < 20) { return text_forms[2]; }
  if (n1 > 1 && n1 < 5) { return text_forms[1]; }
  if (n1 == 1) { return text_forms[0]; }
  return text_forms[2];
}

var formatNumber = (val) => (val + "").replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, "$1 ");

function scrollTo(selector) {
  $("html, body").animate({
    scrollTop: $(selector).offset().top + 'px'
  }, 500);
}

$(function() {

  $('a[href^="http"]').click(function(e) {
    var utm = window.location.search;
    window.open(this.href + utm, this.target)
  });

  $('a[href^="#"]').click(function(e) {
    e.preventDefault();
    scrollTo($(this).attr("href"));
  });

  // Метрики
  $(".js-logo-top").click(function() {
    ga('send', 'event', 'button', 'click', 'logo-top'); 
  });
  
  $(".js-logo-footer").click(function() {
    ga('send', 'event', 'button', 'click', 'logo-footer');
  });
  
  $(".js-rsussloto-buy-tickets").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', 'rsussloto-buy-tickets-mob');
    }
    else {
      ga('send', 'event', 'button', 'click', 'rsussloto-buy-tickets');
    }
  });
  
  $(".js-4x20-buy-tickets").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', '4x20-buy-tickets-mob');
    }
    else {
      ga('send', 'event', 'button', 'click', '4x20-buy-tickets'); 
    }
  });
  
  $(".js-rapido-buy-tickets").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', 'rapido-buy-tickets-mob');
    }
    else {
      ga('send', 'event', 'button', 'click', 'rapido-buy-tickets'); 
    }
  });
  
  $(".js-6x45-buy-tickets").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', '6x45-buy-tickets-mob');
    }
    else {
      ga('send', 'event', 'button', 'click', '6x45-buy-tickets'); 
    }
  });
  
  $(".js-rapido-buy-tickets-2").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', 'rapido-buy-tickets-mob-2');
    }
    else {
      ga('send', 'event', 'button', 'click', 'rapido-buy-tickets-2'); 
    }
  });
  
  $(".js-rsussloto-buy-tickets-2").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', 'rsussloto-buy-tickets-mob-2');
    }
    else {
      ga('send', 'event', 'button', 'click', 'rsussloto-buy-tickets-2'); 
    }
  });
  
  $(".js-4x20-buy-tickets-2").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', '4x20-buy-tickets-mob-2');
    }
    else {
      ga('send', 'event', 'button', 'click', '4x20-buy-tickets-2'); 
    }
  });
 
  $(".js-6x45-buy-tickets-2").click(function() {
    if (window.innerWidth < 768) {
      ga('send', 'event', 'button', 'click', '6x45-buy-tickets-mob-2');
    }
    else {
      ga('send', 'event', 'button', 'click', '6x45-buy-tickets-2'); 
    }
  });

  $(".js-social-vk").click(function() {
    ga('send', 'event', 'button', 'click', 'social-vk');
  });
  
  $(".js-social-tw").click(function() {
    ga('send', 'event', 'button', 'click', 'social-tw');
  });
  
  $(".js-social-fb").click(function() {
    ga('send', 'event', 'button', 'click', 'social-fb');
  });
  
  $(".js-social-ok").click(function() {
    ga('send', 'event', 'button', 'click', 'social-ok');
  });
  

  var $slider = $(".js-slider"); 
  function updateSlider(event) {
    if (event.page.index > 0) {
      $slider.addClass("slider--black");
    }
    else {
      $slider.removeClass("slider--black");
    }
  }

  $(".slider")
    .addClass("enabled")
    .addClass("owl-carousel")
    .owlCarousel({
      items:     1,
      margin:    1,
      loop:      true,
      mouseDrag: false,
      dots:      true,
      nav:       true,
      navText: [
        "<img src='img/arrow.png' aria-label='Вперед'>",
        "<img src='img/arrow.png' aria-label='Назад'>"
      ],
      autoHeight: true,
      responsive: {
        0: {
        },
        768: {
        }
      }
    })
    .on('initialized.owl.carousel', function (event) {
      updateSlider(event);
    })
    .on('changed.owl.carousel', function (event) {
      updateSlider(event);
    });

  $(".js-show-info").click(function (e) {
    var to = $(this).attr("data-slide-i").match(/(\d+)/)[0] - 1;
    
    $slider.trigger('to.owl.carousel', to);
  });

  
  // Столото API
  $.get({
    url: "https://api.stoloto.ru/mobile/api/v27/service/games/info-new",
    // headers: {
    //   "Gosloto-Partner": "ZGlnYXBlI2R1RWxjPklHbFdAVXdFaXR1REVt"
    // },
    success: function(content) {

      function convertUnixTime(time) {
        let unix_timestamp = time;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

        return formattedTime;
      }

      function num2text(num) {
        var text = formatNumber(num).split(" ");
        var result = "";

        for (var i = text.length; i--;) {
          var endings = [];

          if (text.length - 1 - i == 1) {
            endings = ["тысяча", "тысячи", "тысяч"];
          }
          else if (text.length - 1 - i == 2) {
            endings = ["миллион", "миллиона", "миллионов"];
          }
          else if (text.length - 1 - i == 3) {
            endings = ["миллиард", "миллиарда", "миллиардов"];
          }

          var realNum = +text[i];
          if (realNum != 0) {
            var suffix = "";
            if (i == text.length - 1) {
              result += realNum + result;
            }
            else {
              var suffix = " " + num2str(realNum, endings) + " ";
              result = (realNum + suffix) + result;
            }
          }
        }

        return result;
      }

      function updateLottery(selector, data) {

        $(selector).each(function(i, el) {
          
          var specialDraw = data.draw;

          $(el).find(".js-super-prize")
            .text(formatNumber(specialDraw.superPrize))
            .attr("aria-label", num2text(specialDraw.superPrize))
            .next()
            .attr("aria-label", num2str(specialDraw.superPrize, ["рубль", "рубля", "рублей"]))
            .attr("title", num2str(specialDraw.superPrize, ["рубль", "рубля", "рублей"]));

          var betCost = specialDraw.betCost;
          $(el).find(".js-bet-cost").each(function (_i, _el) {
            $(_el).text(betCost);
          });

          var start = specialDraw.date;
          var delay = convertMS(new Date(start * 1000) - new Date());

          function convertMS(milliseconds) {
            var day, hour, minute, seconds;
            seconds = Math.floor(milliseconds / 1000);
            minute = Math.floor(seconds / 60);
            seconds = seconds % 60;
            hour = Math.floor(minute / 60);
            minute = minute % 60;
            day = Math.floor(hour / 24);
            hour = hour % 24;
            return {
              day:     day,
              hour:    hour,
              minute:  minute,
              seconds: seconds
            };
          }

          var _s = [delay.hour, delay.minute];
          var text = "";
          if (_s[0] > 0) {
            text += `${_s[0]} ч. `;
          }
          if (_s[1] > 0) {
            text += `${_s[1]} мин. `;
          }

          if (text == "") {
            text = "минуту";
          }

          $(el).find(".js-time").text(text);
        });
      }

      updateLottery(".js-ruslotto", content.games[5]);
      updateLottery(".js-4x20",     content.games[16]);
      updateLottery(".js-rapido",   content.games[2]);
      updateLottery(".js-6x45",     content.games[0]);
    },
  })
});
