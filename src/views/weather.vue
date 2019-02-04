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
      let module = this;
      const socket = io.connect(socketHost);
      socket.on('subscribe', function(socket) {
        module.src = socket['icon'];
        module.temp = socket['temperature'];
      });
    }
  }
</script>

<style scoped>

</style>