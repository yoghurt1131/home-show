const Vue = require('vue');
const clock = require('./clock.vue');
const weather = require('./weather.vue');
window.addEventListener('load', function() {
  // crock
  new Vue({
    el: '#banner',
    components: {
      clock: clock,
      weather: weather,
    },
  });
});
