$(document).ready(function() {

///////////display tweets///////////
function renderTweets(tweets) {
  for (var i in tweets.reverse()) {
    $(".tweets").append(createTweetElement(tweets[i]));
  };
};

///////hide form on refresh////////
$('form').hide();

////creates html for tweet body////
function createTweetElement (tweetData) {

  let tweetBody     = tweetData.content.text;
  let tweetUserName = tweetData.user.name;
  let tweetAvatar   = tweetData.user.avatars.small;
  let tweetHandle   = tweetData.user.handle;
  let tweetFooter   = tweetData.created_at;

  let $tweet        = $('<article>').addClass('all-tweets');
  let $header       = $('<header>').addClass('header');
  let $footer       = $('<footer>').addClass('footer');
  let $img          = $('<img>').addClass('user-img');
  let $name         = $('<h2>').addClass('name');
  let $handle       = $('<h4>').addClass('handle');
  let $p            = $('<p>').addClass('p');

  $tweet.append($header).append($p).append($footer);
  $header.append($img).append($name).append($handle);

  $img.attr('src', tweetAvatar);
  $name.text(tweetUserName);
  $handle.text(tweetHandle);
  $p.text(tweetBody);
  $footer.text(tweetFooter);
  $footer.attr('src', '/images/flag.png');

  return $tweet;

};

////////////load tweets////////////
function loadTweets () {
  $.ajax('/tweets/', {method: 'GET'}).done(function(tweets) {
  $(".tweets").empty();
  renderTweets(tweets);
  $('input[name="text"]').text('');
  });
};

///////toggle compose button///////
$('.compose').on('click', function(button) {
  $("form").slideToggle('slow', function(){
    $("textarea").focus();
  });
});

////////////post tweet////////////
$('form').on('submit', function(event) {
  event.preventDefault();
  let data = $(this).serialize();
  $.ajax('/tweets/', {method: 'POST', data: data}).done(function (tweet) {
    loadTweets();
    });
  $('textarea').val('');
  $('.counter').text('140');
  });

loadTweets();

});

