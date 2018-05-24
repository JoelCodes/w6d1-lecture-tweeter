$(document).ready(function() {

function renderTweets(tweets) {
  $('form').hide();
  for (var i in tweets) {
    $(".tweets").append(createTweetElement(tweets[i]));
  }
};

renderTweets(createTweetElement);

function createTweetElement (tweetData) {
  // console.log(tweetData);

  let tweetBody = tweetData.content.text;
  let tweetUserName = tweetData.user.name;
  let tweetAvatar = tweetData.user.avatars.small;
  let tweetHandle = tweetData.user.handle;
  let tweetFooter = tweetData.created_at;

  let $tweet = $('<article>').addClass('all-tweets');
  let $header = $('<header>').addClass('header');
  let $footer = $('<footer>').addClass('footer');
  let $img = $('<img>').addClass('user-img');
  let $name = $('<h2>').addClass('name');
  let $handle = $('<h4>').addClass('handle');
  let $p = $('<p>').addClass('p');

  $tweet.append($header).append($p).append($footer);
  $header.append($img).append($name).append($handle);

  $img.attr('src', tweetAvatar);
  $name.text(tweetUserName);
  $handle.text(tweetHandle);
  $p.text(tweetBody);
  $footer.text(tweetFooter);

  return $tweet;
  };

function loadTweets () {
  $.ajax('/tweets/', {method: 'GET'}).done(function(tweets) {
  $(".tweets").empty();
  for (var i in tweets) {
    $(".tweets").prepend(createTweetElement(tweets[i]));
  }

  // let html = createTweetElement(tweet);
  // $('.container').append(html);
  $('input[name="text"]').text('');
  })
}

$('.compose').on('click', function(button) {
  $("form").slideToggle('slow', function(){
        $("textarea").focus();
    });
})

$('form').on('submit', function(event) {
  event.preventDefault();
  let data = $(this).serialize();
  let tweetLength = event.currentTarget[0].value.length;
  // console.log();
  // if (tweetLength > 140 || tweetLength === undefined) {

  // }
  $.ajax('/tweets/', {method: 'POST', data: data}).done(function (tweet) {
  loadTweets();
  });
  $('textarea').val('');
  $('.counter').text('140');
})


});

