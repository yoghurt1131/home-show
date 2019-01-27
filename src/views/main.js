const Vue = require('vue');
window.addEventListener('load', function() {
  // crock
  new Vue({
    el: '#datetime',
    data: {
      now: (new Date).toFormat('MM/DD(DDD) HH:MI'),
    },
    created: function() {
      setInterval(() => this.now =
        (new Date).toFormat('MM/DD(DDD) HH:MI'), 1000 * 15
      );
    },
  });
  const icon = new Vue({
    el: '#weather-icon',
    data: {
      src: 'images/undefined.png', // default
    },
  });
  const temperature = new Vue({
    el: '#temperature',
    data: {
      value: '-', // default
    },
  });

  const socket = io.connect(socketHost);
  socket.on('subscribe', function(data) {
    icon.src = data['icon'];
    temperature.value = data['temperature'];
  });
});
