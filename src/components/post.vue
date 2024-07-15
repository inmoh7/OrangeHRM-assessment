<template>
  <section>
    <div class="post-header">
      <img class="avatar-image" src="https://avatar.iran.liara.run/public/40" alt="" />
      <div>
        <div class="user-name">James Bond</div>
        <div class="posted-time">3 hours ago</div>
      </div>
    </div>
    <div class="post-body">
      <h2 class="post-title">When should I use nuxt instead of vue?</h2>
      <p class="post-content">
        I'm building a car shop and I want to try Nuxt 3 in this new project. I've been using Vue 3
        before. My question is how do I know when I should use Nuxt 3 and when to use Vue? Nuxt
        simplifies the dev process a lot, but I've read it shouldn't be the main reason.
      </p>
    </div>
    <div class="reactions-container">
      <div class="container-upvote">
        <button class="btn-upvote"><upVote /></button>
        <div>10</div>
        <button class="btn-downvote"><downVote /></button>
      </div>
      <div>
        <button class="btn-comment"><comment />23</button>
      </div>
      <div>
        <button class="btn-share"><share />share</button>
      </div>
    </div>
  </section>
</template>

<script setup>
import upVote from './icons/iUpVote.vue'
import downVote from './icons/iDownVote.vue'
import comment from './icons/iComment.vue'
import share from './icons/iShare.vue'
</script>

<style lang="scss" scoped>
section {
  .reactions-container {
    display: flex;
    justify-content: start;
    align-items: center;
    gap: 14px;

    .container-upvote {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      border-radius: 12px;
      background-color: #f0f0f0;

      .btn-upvote {
        padding: 4px;
        border: none;
        border-radius: 50%;
      }

      div {
        font-size: 12px;
      }

      .btn-downvote {
        padding: 4px;
        border: none;
        border-radius: 50%;
      }
    }

    div .btn-comment {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      padding: 6px;
      border: none;
      border-radius: 12px;
    }

    div .btn-share {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 4px;
      padding: 6px;
      border: none;
      border-radius: 12px;
    }
  }

  .post-header {
    display: flex;
    align-items: center;
    gap: 8px;

    .avatar-image {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .user-name {
      font-weight: 500;
    }

    .posted-time {
      font-size: 12px;
      color: #444;
    }
  }

  .post-body {
    .post-title {
      font-weight: 500;
      margin: 10px 0;
    }
    .post-content {
      margin: 10px 0;
      color: #444;
    }
  }
}
</style>
