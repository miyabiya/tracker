<template>
  <panel title="Youtube Video">
    {{youtubeId}}
    <youtube
      :video-id="youtubeId"
      :player-width="600"
      :player-height="220">
    </youtube>
  </panel>
</template>

<script>
// import Youtube from 'vue-youtube-embed'
export default {
  props: [
    'youtubeId'
  ]
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
