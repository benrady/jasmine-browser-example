modit('example.ui', function() {
});

modit('example.handlers', ['example.ui'], function(ui) {
  function sanitize(emailAddress) {
    return emailAddress.split("@")[0];
  }

  function url() {
    return "/email/" + sanitize(swurl.username());
  }

  function username (newName) {
    $.getJSON(url(), function(data) {
      swurl.ragList(data.rag || []);
      swurl.thresholdList(data.threshold || []);
    });
  }

  this.exports(username);
});

modit('example', ['example.ui', 'example.handlers'], function(ui, handlers) {
  function start() {
  }

  this.exports(start);
});

