<template>
    {{ now }}
</template>

<script>
  export default {
    name: "clock",
    data: function() {
      return {
        now: (new Date).toFormat('MM/DD(DDD) HH:MI'),
      }
    },
    created: function() {
      setInterval(() => this.now =
        (new Date).toFormat('MM/DD(DDD) HH:MI'), 1000 * 15
      );
    }
  }
</script>

<style scoped>

</style>