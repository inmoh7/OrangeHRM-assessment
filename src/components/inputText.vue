<template>
  <textarea
    name="comment"
    class="input-comment"
    rows="3"
    placeholder="What you want to say?"
    v-model="inputComment"
  ></textarea>
  <div class="container-validations">
    <div class="character-count">{{ inputComment?.length }}/1000 characters</div>
    <div v-if="errorMessage" class="validation-error">{{ errorMessage }}</div>
  </div>
  <div class="actions">
    <slot></slot>
    <button class="btn-submit" @click="$emit('onSubmit')">
      {{ type.charAt(0).toUpperCase() + type.slice(1) }}
    </button>
  </div>
</template>

<script lang="ts" setup>
import { watch } from 'vue'

const inputComment = defineModel<string>('inputComment')
const errorMessage = defineModel<string>('errorMessage')
const { type } = defineProps<{ type: string }>()
defineEmits(['onSubmit'])

watch(inputComment, (newValue, oldValue) => {
  if ((newValue ?? '').length > 1000) {
    inputComment.value = oldValue
    errorMessage.value = 'Character limit exceeded...'
  } else if ((newValue ?? '').length < 1000) {
    errorMessage.value = ''
  }
})
</script>

<style lang="scss" scoped>
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
  gap: 4px;
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
</style>
