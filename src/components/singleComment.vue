<template>
  <!-- main container -->
  <main>
    <!-- comment container -->
    <section class="comment-header-container">
      <div class="comment-header">
        <img class="avatar-image" :src="user.profileImage" :alt="`profile image of ${user.name}`" />
        <div class="user-name">{{ user.name }}</div>
        <div class="posted-time">{{ moment(comment.postedDate).fromNow() }}</div>
      </div>
    </section>

    <div class="shifted-container">
      <section class="comment-content">
        {{ comment.content }}
      </section>
      <!-- reactions container -->
      <section class="reactions-container">
        <div class="container-upvote">
          <button
            v-if="comment.voteStatus === 'upvoted'"
            class="btn-upvote"
            @click="$emit('upVoted', comment.id)"
          >
            <iUpVoteFilled />
          </button>
          <button v-else class="btn-upvote" @click="$emit('upVoted', comment.id)">
            <iUpVote />
          </button>
          <div>{{ comment.votes }}</div>
          <button
            v-if="comment.voteStatus === 'downvoted'"
            class="btn-downvote"
            @click="$emit('downVoted', comment.id)"
          >
            <iDownVoteFilled />
          </button>
          <button v-else class="btn-downvote" @click="$emit('downVoted', comment.id)">
            <iDownVote />
          </button>
        </div>
        <div>
          <button class="btn-reply" @click="toggleReply = !toggleReply"><iComment />Reply</button>
        </div>
        <div v-if="comment.replies.length > 0">
          <button class="btn-show-replies" @click="showReplies = !showReplies">
            {{ showReplies ? 'Hide Replies' : 'Show Replies' }}
          </button>
        </div>
      </section>

      <!-- reply container -->
      <section v-if="toggleReply" class="reply-input-container">
        <inputText
          v-model:input-comment="inputComment"
          v-model:error-message="errorMessage"
          @on-submit="handleReplySubmit(comment.id)"
          type="reply"
        >
          <button class="btn-cancel" @click="toggleReply = !toggleReply">Cancel</button>
        </inputText>
      </section>
      <!-- all nested comments -->
      <section v-if="comment.replies && showReplies" class="nested-comments">
        <div v-for="(reply, i) in comment.replies" :key="i">
          <singleComment
            :comment="reply"
            @reply-submitted="emitReplySubmitted"
            @up-voted="emitUpVoted"
            @down-voted="emitDownVoted"
          />
        </div>
      </section>
    </div>
  </main>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import moment from 'moment'

//data imports
import type { SingleCommentProps } from '@/types/types'
import { users } from '@/data/users'

// icon imports
import iUpVote from './icons/iUpVote.vue'
import iUpVoteFilled from './icons/iUpVoteFilled.vue'
import iDownVote from './icons/iDownVote.vue'
import iDownVoteFilled from './icons/iDownVoteFilled.vue'
import iComment from './icons/iComment.vue'
import inputText from './inputText.vue'

const { comment } = defineProps<SingleCommentProps>()
const emit = defineEmits(['upVoted', 'downVoted', 'replySubmitted'])

const user = users[comment.userId - 1]

const inputComment = ref('')
const errorMessage = ref('')
const toggleReply = ref(false)
const showReplies = ref(true)

onMounted(() => {
  // check if the replies should be initially loaded or not
  if (comment.replies.length > 10) {
    showReplies.value = false
  }
})

const handleReplySubmit = (commentId: string) => {
  errorMessage.value = ''
  if (!inputComment.value) {
    errorMessage.value = 'Please enter something to add...'
    return
  }
  emit('replySubmitted', commentId, inputComment.value)
  inputComment.value = ''
  showReplies.value = true
}

// --- Emit events propagatations for nested comments -----
const emitReplySubmitted = (commentId: string, replyContent: string) => {
  emit('replySubmitted', commentId, replyContent)
}

const emitUpVoted = (commentId: string) => {
  emit('upVoted', commentId)
}

const emitDownVoted = (commentId: string) => {
  emit('downVoted', commentId)
}
</script>

<style lang="scss" scoped>
main {
  padding-top: 10px;
  overflow-x: auto;

  .comment-header-container {
    .comment-header {
      margin-top: 6px;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;
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
  }

  .shifted-container {
    margin-left: 18px;
    padding-left: 18px;
    border-left: 1px solid black;
    .comment-content {
      margin-bottom: 10px;
      color: #444;
      overflow-wrap: break-word;
    }
    .reactions-container {
      margin-top: 6px;
      display: flex;
      justify-content: start;
      align-items: center;
      gap: 10px;

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

      div .btn-reply {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        padding: 6px;
        border: none;
        border-radius: 12px;
      }

      div .btn-show-replies {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 4px;
        padding: 6px;
        border: none;
        border-radius: 12px;
      }
    }

    .reply-input-container {
      margin: 10px 0;

      .btn-cancel {
        background-color: white;
        color: tomato;
        font-weight: 500;
        border: 1px solid tomato;
        padding: 6px 8px;
        border-radius: 4px;
        cursor: pointer;
      }

      .btn-cancel:hover {
        background-color: tomato;
        color: white;
        border-color: white;
        opacity: 0.8;
      }
    }

    .nested-comments {
      margin-left: 36px;
    }
  }

  @media (max-width: 500px) {
    .shifted-container {
      margin-left: 18px;
      padding-left: 10px;
    }
  }
}
</style>
