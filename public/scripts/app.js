$(document).ready(function() {

  ///////////display tweets///////////
  function renderTweets(tweets) {
    for (var i in tweets.reverse()) {
      $(".tweets").append(createTweetElement(tweets[i]));
    }
  }

  ///////hide form on refresh////////
  $('form').hide();

  ////creates html for tweet body////
  function createTweetElement (tweetData) {

    let tweetBody     = tweetData.content.text;
    let tweetUserName = tweetData.user.name;
    let tweetAvatar   = tweetData.user.avatars.small;
    let tweetHandle   = tweetData.user.handle;
    let tweetFooter   = moment(tweetData.created_at).fromNow();

    let $tweet        = $('<article>').addClass('all-tweets');
    let $header       = $('<header>').addClass('header');
    let $footer       = $('<footer>').addClass('footer');
    let $img          = $('<img>').addClass('user-img');
    let $name         = $('<h2>').addClass('name');
    let $handle       = $('<h4>').addClass('handle');
    let $p            = $('<p>');
    let $timeSpan     = $('<span>').text(tweetFooter);
    let $flag         = $('<img>').addClass('button').attr('src', '/images/flag.svg').attr('href', '#');
    let $retweet      = $('<img>').addClass('button').attr('src', '/images/retweet.svg').attr('href', '#');
    let $heart        = $('<img>').addClass('button').attr('src', '/images/heart.svg').attr('href', '#');

    $tweet.append($header).append($p).append($footer);
    $header.append($img).append($name).append($handle);
    $footer.append($timeSpan).append($flag).append($retweet).append($heart);

    $img.attr('src', tweetAvatar);
    $name.text(tweetUserName);
    $handle.text(tweetHandle);
    $p.text(tweetBody);

    return $tweet;

  }

  ////////////load tweets////////////
  function loadTweets () {
    $.ajax('/tweets/', {method: 'GET'}).done(function(tweets) {
    $(".tweets").empty();
    renderTweets(tweets);
    $('input[name="text"]').text('');
    });
  }

  ///////toggle compose tweet///////
  $('.compose').on('click', function(button) {
    $("form").slideToggle('slow', function(){
      $("textarea").focus();
    });
  });

  ///focus on text box upon toggle///
  $('h2').on('click', function(button) {
    $("form").slideToggle('slow', function(){
      $("textarea").focus();
    });
  });

  ////////////post tweet/////////////
  $('form').on('submit', function(event) {
    event.preventDefault();
    let data = $(this).serialize();
    /////empty string scenario///
    if ($('#tweetcreate').val() === '') {
      $('textarea').attr('placeholder', 'Tweet can\'t be empty!');
      $('form').effect("shake", "slow");
    } //////load tweets//////
    $.ajax('/tweets/', {method: 'POST', data: data}).done(function (tweet) {
      loadTweets();
      });//////reset//////
    $('textarea').val('');
    $('.counter').text('140');
    $('.counter').css({color: 'black'});
    });

    loadTweets();

});