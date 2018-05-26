$(document).ready(function() {
  var counter = $('.counter');
  var tweet = $("textarea[name=text]");
  tweet.on('input', function(event) {
    const remainingLength = 140 - event.target.value.length;
    counter.text(remainingLength + ' characters left.');
    if (remainingLength < 10) {
      $(counter).text(remainingLength + ' characters left.');
        if (remainingLength === 1) {
          $(counter).text(remainingLength + ' character left.');
        }
        if(remainingLength <= 0) {
          $(counter).text('You\'ve said too much!');
          $('form').on('keydown').effect("shake");
        }
      $(counter).css({color: 'red'});
    } else {
      $(counter).css({color: 'black'});
    }
  });
});