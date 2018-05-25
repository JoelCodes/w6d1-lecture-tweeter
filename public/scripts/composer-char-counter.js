$(document).ready(function() {
  var counter = $('.counter');
  var tweet = $("textarea[name=text]");
  tweet.on('input', function(event) {
    const remainingLength = 140 - event.target.value.length;
    counter.text(remainingLength);
    if (remainingLength < 10) {
      $(counter).css({color: 'red'});
    } else {
      $(counter).css({color: 'black'});
    }
  });
});