import type { Comment } from '@/types/types'
import { v4 as uuid } from 'uuid'
import { ref } from 'vue'

export const uesComments = (initialComments: Comment[]) => {
  const comments = ref<Comment[]>(initialComments)

  // helper functions
  const saveToLocal = (comments: Comment[]) => {
    localStorage.setItem('comments', JSON.stringify(comments))
  }

  const insertNode = (
    commentId: string,
    newComment: Comment,
    commentTree: Comment[]
  ): Comment[] => {
    return commentTree.map((node: Comment) => {
      if (commentId === node.id) {
        return {
          ...node,
          replies: [newComment, ...node.replies]
        }
      } else if (node.replies && node.replies.length > 0) {
        return {
          ...node,
          replies: insertNode(commentId, newComment, node.replies)
        }
      }

      return node
    })
  }

  const upvoteNode = (commentId: string, commentTree: Comment[]): Comment[] => {
    return commentTree.map((node: Comment) => {
      // If the comment ID matches, increment the votes
      if (commentId === node.id) {
        if (node.voteStatus === 'downvoted') {
          return {
            ...node,
            voteStatus: 'upvoted',
            votes: node.votes + 2
          }
        } else if (node.voteStatus === null) {
          return {
            ...node,
            voteStatus: 'upvoted',
            votes: node.votes + 1
          }
        } else {
          return {
            ...node,
            voteStatus: null,
            votes: node.votes - 1
          }
        }
      } else if (node.replies && node.replies.length > 0) {
        // Recursively call upvoteNode on the replies
        return {
          ...node,
          replies: upvoteNode(commentId, node.replies)
        }
      }
      return node
    })
  }

  const downvoteNode = (commentId: string, commentTree: Comment[]): Comment[] => {
    return commentTree.map((node: Comment) => {
      if (commentId === node.id) {
        if (node.voteStatus === 'upvoted') {
          return {
            ...node,
            voteStatus: 'downvoted',
            votes: node.votes - 2
          }
        } else if (node.voteStatus === null) {
          return {
            ...node,
            voteStatus: 'downvoted',
            votes: node.votes - 1
          }
        } else {
          return {
            ...node,
            voteStatus: null,
            votes: node.votes + 1
          }
        }
      } else if (node.replies && node.replies.length > 0) {
        // Recursively call downvoteNode on the replies
        return {
          ...node,
          replies: downvoteNode(commentId, node.replies)
        }
      }
      return node
    })
  }

  const sortNodes = (sortType: string): Comment[] => {
    const sortFn = (a: Comment, b: Comment) => {
      if (sortType === 'newest') {
        return new Date(b.postedDate).getTime() - new Date(a.postedDate).getTime()
      } else if (sortType === 'upvotes') {
        return b.votes - a.votes
      } else {
        return 0
      }
    }

    const sortRecursively = (comments: Comment[]): Comment[] => {
      return comments
        .map((node: Comment) => ({
          ...node,
          replies: sortRecursively(node.replies)
        }))
        .sort(sortFn)
    }
    return sortRecursively(comments.value)
  }

  // commets operations
  const insertComment = (commentId: string | undefined, commentContent: string) => {
    const newComment: Comment = {
      id: uuid(),
      userId: 2,
      content: commentContent,
      votes: 0,
      voteStatus: null,
      postedDate: new Date().toISOString(),
      replies: []
    }

    if (commentId) {
      comments.value = insertNode(commentId, newComment, comments.value)
    } else {
      comments.value = [newComment, ...comments.value]
    }
    saveToLocal(comments.value)
  }

  const commentUpVote = (commentId: string) => {
    comments.value = upvoteNode(commentId, comments.value)
    saveToLocal(comments.value)
  }
  const commentDownVote = (commentId: string) => {
    comments.value = downvoteNode(commentId, comments.value)
    saveToLocal(comments.value)
  }

  const sortComments = (sortType: string) => {
    comments.value = sortNodes(sortType)
    saveToLocal(comments.value)
  }

  return {
    comments,
    insertComment,
    commentUpVote,
    commentDownVote,
    sortComments
  }
}
