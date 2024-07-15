<script lang="ts" setup>
import commentsSection from '@/components/commentsSection.vue'
import samplePost from '@/components/samplePost.vue'
</script>

<template>
  <main class="container-main">
    <div>
      <section class="container-post"><samplePost /></section>
      <section class="container-comments">
        <commentsSection />
      </section>
    </div>
  </main>
</template>

<style lang="scss" scoped>
.container-main {
  min-height: 100vh;
  background-color: whitesmoke;
  max-width: 64vw;
  margin-left: auto;
  margin-right: auto;
  padding-bottom: 20px;

  .container-post {
    padding: 24px;
  }

  .container-comments {
    padding: 0 24px;
  }
}

@media (max-width: 1200px) {
  .container-main {
    max-width: 70vw;
  }
}

@media (max-width: 760px) {
  .container-main {
    max-width: 96vw;
  }
}
</style>
