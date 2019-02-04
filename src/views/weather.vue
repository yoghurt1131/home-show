<template>
    <span class='label'>
        Tokyo {{ temp }}℃
        <img :src=src class='no-responsive no-border weather-icon' />
    </span>
</template>

<script>
  export default {
    name: "weather",
    data: function() {
      return {
        src: 'images/undefined.png', // default
        temp: '-', // default
      }
    },
    created: function() {
      let temp = '-';
      let src ='images/undefined.png';
      const socket = io.connect(socketHost);
      socket.on('subscribe', function(data) {
        src = data['icon'];
        temp = data['temperature'];
      });
      setInterval(() => this.temp = temp, 1000);
      setInterval(() => this.src = src, 1000);
    }
  }
</script>

<style scoped>

</style>