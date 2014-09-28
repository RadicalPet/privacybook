(function($) {
  // $.event.dispatch was undocumented and was deprecated in jQuery 1.7[1]. It
  // was replaced by $.event.handle in jQuery 1.9.
  //
  // Use the first of the available functions to support jQuery <1.8.
  //
  // [1] https://github.com/jquery/jquery-migrate/blob/master/src/event.js#L25
  var dispatch = $.event.dispatch || $.event.handle;

  var special = $.event.special,
      uid1 = 'D' + (+new Date()),
      uid2 = 'D' + (+new Date() + 1);

  special.scrollstart = {
    setup: function(data) {
      var _data = $.extend({
        latency: special.scrollstop.latency
      }, data);

      var timer,
          handler = function(evt) {
            var _self = this,
                _args = arguments;

            if (timer) {
              clearTimeout(timer);
            } else {
              evt.type = 'scrollstart';
              dispatch.apply(_self, _args);
            }

            timer = setTimeout(function() {
              timer = null;
            }, _data.latency);
          };

      $(this).bind('scroll', handler).data(uid1, handler);
    },
    teardown: function() {
      $(this).unbind('scroll', $(this).data(uid1));
    }
  };

  special.scrollstop = {
    latency: 250,
    setup: function(data) {
      var _data = $.extend({
        latency: special.scrollstop.latency
      }, data);

      var timer,
          handler = function(evt) {
            var _self = this,
                _args = arguments;

            if (timer) {
              clearTimeout(timer);
            }

            timer = setTimeout(function() {
              timer = null;
              evt.type = 'scrollstop';
              dispatch.apply(_self, _args);
            }, _data.latency);
          };

      $(this).bind('scroll', handler).data(uid2, handler);
    },
    teardown: function() {
      $(this).unbind('scroll', $(this).data(uid2));
    }
  };

})(jQuery);

////MY STUFF////

var activeElement = true;

$.fn.active = function() {
  $('.navbar-fixed-top li').each(function() {

    var href = "http://localhost" + window.location.pathname + $(this).find('a').attr('href');
    var activeHref = $(location).attr('href');
    if (href === activeHref) {
      $(this).addClass('active');
    }
    else{
      $(this).removeClass('active');
    }
  });
};
function isElementInViewport (el) {

    //special bonus for those using jQuery
    if (el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && /*or $(window).height() */
        rect.right <= (window.innerWidth || document.documentElement.clientWidth) /*or $(window).width() */
    );
}
$.fn.isActiveElementCorrect = function() {
  $('.navbar-nav li').each(function() {
    var activeHref = $(location).attr('href');
    if ($(this).attr('class') == 'active'){

      var thisDiv = $(this).find('a').attr('href');
      var thisDivPos = $(thisDiv).parents()[2].getBoundingClientRect().top;
      var windowPos = $(window).scrollTop();
      if (thisDivPos != 0){
        activeElement = false;
      }
      else {
        activeElement = true;
      }
    }
  });
}
$.fn.correctActiveElement = function() {
  $.fn.isActiveElementCorrect();
  if (activeElement == false){
    $('.navbar-nav li').each(function() {
      var thisDiv = $(this).find('a').attr('href');
      var thisDivPos =  $(thisDiv).parents()[2].getBoundingClientRect().top;
      var thisDivHeight = $(thisDiv).height();
      var windowPos = $(window).scrollTop();
      if (thisDivPos <= 0 && thisDivPos >= 0 - thisDivHeight -50){
        $(this).addClass('active');
      }
      else{
        $(this).removeClass('active');
      }

    });
  }
}
var throttled = _.throttle($.fn.active, 100);
var throttled2 = _.throttle($.fn.correctActiveElement, 1000);

$('.navbar-nav li').on("click", throttled);
$(document).on("scrollstop", throttled2);