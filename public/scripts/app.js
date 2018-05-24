$(document).ready(function() {

const tweetArray = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];

function renderTweets(tweets) {
  for (var i in tweets) {
    $(".tweets").append(createTweetElement(tweets[i]));
  }
};

renderTweets(tweetArray);

function createTweetElement (tweetData) {
  console.log(tweetData);

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

$('form').on('submit', function(event) {
  event.preventDefault();
  let data = $(this).serialize();
  $.ajax('/tweets/', {method: 'POST', data: data}).done(function (tweet) {
    // console.log('post was successful');
  loadTweets();
  });
})

function loadTweets () {
  $.ajax('/tweets/', {method: 'GET'}).done(function(tweets) {
  $(".tweets").empty();
  for (var i in tweets) {
    $(".tweets").prepend(createTweetElement(tweets[i]));
  }

  // let html = createTweetElement(tweet);
  // $('.container').append(html);
  $('input[name="text"]').val('');
  })
}



});

