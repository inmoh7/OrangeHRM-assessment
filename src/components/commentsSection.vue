<template>
  <main>
    <!-- comment input -->
    <section class="container-input">
      <textarea
        name="comment"
        class="input-comment"
        rows="3"
        placeholder="What you want to say?"
        v-model="inputComment"
        @input="handleInputChange"
      ></textarea>
      <div class="container-validations">
        <div class="character-count">{{ inputComment.length }}/1000 characters</div>
        <div v-if="errorMessage" class="validation-error">{{ errorMessage }}</div>
      </div>
      <div class="actions">
        <button class="btn-submit" @click="handleCommentSubmit">Comment</button>
      </div>
    </section>

    <!-- sorting options -->
    <section class="container-sort">
      <label for="sort-ops">Sort By: </label>
      <select
        class="sort-options"
        name="sort"
        id="sort-ops"
        v-model="selectedSort"
        @change="handleSort"
      >
        <option value="newest">Newest</option>
        <option value="upvotes">Upvotes</option>
      </select>
    </section>

    <!-- all nested comments -->
    <section class="container-comments">
      <div v-for="comment in allComments" :key="comment.id">
        <singleComment
          :comment="comment"
          @up-voted="handleUpVote"
          @down-voted="handleDownVote"
          @reply-submitted="handleReplySubmit"
        />
      </div>
    </section>
  </main>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue'
import singleComment from '@/components/singleComment.vue'
import { uesComments } from '@/composables/useComments'
import { comments } from '@/data/comments'

const inputComment = ref('')
const errorMessage = ref('')
const selectedSort = ref('newest')
let initComments = comments
const {
  comments: allComments,
  insertComment,
  commentUpVote,
  commentDownVote,
  sortComments
} = uesComments(initComments)

onMounted(() => {
  const savedCommentsJSON = localStorage.getItem('comments')
  if (savedCommentsJSON) {
    allComments.value = JSON.parse(savedCommentsJSON)
  }
})

const trimmedInput = computed({
  get() {
    return inputComment.value
  },
  set(value) {
    if (value.length > 1000) {
      inputComment.value = value.slice(0, 1000)
    } else {
      inputComment.value = value
    }
  }
})

const handleInputChange = (e: Event) => {
  const target = e.target as HTMLTextAreaElement
  trimmedInput.value = target.value
}

const handleCommentSubmit = () => {
  errorMessage.value = ''
  if (!inputComment.value) {
    errorMessage.value = 'Please enter something to add...'
    return
  }

  insertComment(undefined, inputComment.value)
}

const handleReplySubmit = (commenId: string, commentContent: string) => {
  insertComment(commenId, commentContent)
}

const handleUpVote = (commenId: string) => {
  commentUpVote(commenId)
}

const handleDownVote = (commenId: string) => {
  commentDownVote(commenId)
}

const handleSort = () => {
  sortComments(selectedSort.value)
}
</script>

<style lang="scss" scoped>
.container-input {
  .input-comment {
    width: 100%;
    max-width: 100%;
    min-width: 100%;
    border-radius: 6px;
    padding: 4px 8px;
    border: solid 0.5px #666;
    font-size: small;
  }

  .input-comment:hover {
    box-shadow: 0 0 5pt 0.5pt #d3d3d3;
  }
  .input-comment:focus {
    box-shadow: 0 0 5pt 2pt #d3d3d3;
    outline-width: 0px;
  }

  .container-validations {
    margin-top: 4px;
    display: flex;
    justify-content: space-between;
    font-size: 12px;

    .validation-error {
      color: red;
    }
  }

  .actions {
    display: flex;
    justify-content: end;
    margin: 8px 0;
    .btn-submit {
      background-color: tomato;
      color: white;
      font-weight: 600;
      border: none;
      padding: 6px 8px;
      border-radius: 4px;
      cursor: pointer;
    }

    .btn-submit:hover {
      opacity: 0.9;
    }
  }
}
.container-sort {
  label {
    font-size: 14px;
  }
  .sort-options {
    padding: 6px 8px;
    border: none;
    font-size: 14px;
    border-radius: 4px;

    option {
      font-size: small;
    }
  }
}

.container-comments {
  margin: 10px 0;
}
</style>
