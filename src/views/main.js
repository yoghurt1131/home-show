const Vue = require('vue');
window.addEventListener('load', function() {
    let crock = new Vue({
        el: '#datetime',
        data: {
            now: (new Date).toFormat('MM/DD(DDD) HH:MI'),
        },
        created: function () {
            setInterval(() => this.now = (new Date).toFormat('MM/DD(DDD) HH:MI'), 1000 * 15)
        }
    });
    let icon = new Vue({
        el: '#weather-icon',
        data: {
            src: 'images/undefined.png' //default
        }
    });
    let temperature = new Vue({
        el: '#temperature',
        data: {
            value: '-' //default
        }
    });

    var socket = io.connect(socketHost);
    socket.on('subscribe', function (data) {
        icon.src = data['icon'];
        temperature.value = data['temperature'];
    });
});
