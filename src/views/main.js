const Vue = require('vue');
let clock = require('./clock.vue');
let weather = require('./weather.vue');
window.addEventListener('load', function() {
  // crock
  new Vue({
    el: '#banner',
    components: {
      clock: clock,
      weather: weather
    }
  });
});
