var bespoke = require('bespoke'),
  bullets = require('bespoke-bullets'),
  classes = require('bespoke-classes'),
  //cursor = require('bespoke-cursor'),
  //forms = require('bespoke-forms'),
  fullscreen = require('bespoke-fullscreen'),
  hash = require('bespoke-hash'),
  nav = require('bespoke-nav'),
  overview = require('bespoke-overview'),
  scale = require('bespoke-scale'),
  title = require('bespoke-title');

// NOTE address small gap above slide in Chrome/WebKit by scaling from top of viewport; only works in landscape
//if ('webkitAppearance' in document.documentElement.style) {
//  var style = document.createElement('style');
//  style.textContent = '.bespoke-scale-parent{transform-origin:50% 0%}\n.bespoke-slide{top:0;margin-top:0}';
//  document.head.appendChild(style); 
//}

(window.bespoke = bespoke).deck = bespoke.from('.deck', [
  classes(),
  nav(),
  fullscreen(),
  scale('transform'), // NOTE zoom-based scaling produces slightly different results than scale transform
  overview({ margin: 300, autostart: true, title: true, numbers: true }),
  bullets('.build,.build-items>*:not(.build-items)'),
  function(deck) { // NOTE only works with hack to bespoke-bullets to expose bullets array
    deck.on('deactivate', function(e) {
      if (e.preview || !e.slide.classList.contains('bespoke-active') || deck.parent.classList.contains('bespoke-overview')) return;
      var bullets = deck.bullets[e.index] || [];
      if (bullets.length > 0) {
        bullets.forEach(function(bullet) {
          ['bespoke-bullet',
           'bespoke-bullet-active',
           'bespoke-bullet-inactive',
           'bespoke-bullet-current'].forEach(function(cl) { bullet.classList.remove(cl); });
        });
        bullets.length = 0;
      }
    });
  },
  title(),
  // enable forms() if you have form elements in your slides
  //forms(),
  // enable cursor() to automatically hide the cursor when presenting
  //cursor(),
  hash()
]);
