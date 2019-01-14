var socket = io.connect(socketHost);
let crockComponent = new Vue({
    el: '#datetime',
    data: {
        now: (new Date).toFormat('MM/DD(DDD) HH:MI'),
    },
    created: function() {
        setInterval(() => this.now = (new Date).toFormat('MM/DD(DDD) HH:MI'), 1000 * 15)
    }
});
let iconComponent = new Vue({
    el: '#weather-icon',
    data: {
        src: icon
    }
});
let temperatureComponent = new Vue({
    el: '#temperature',
    data: {
        value: temperature,
    }
});
socket.on('subscribe', function (data) {
    console.log('get message.');
    iconComponent.src = data['icon'];
    temperatureComponent.value = data['temperature'];
});
