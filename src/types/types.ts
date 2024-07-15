export interface User {
  id: number
  name: string
  profileImage: string
}

export interface Comment {
  id: string
  userId: number
  content: string
  votes: number
  voteStatus: 'upvoted' | 'downvoted' | null
  postedDate: string
  replies: Comment[]
}

export interface SingleCommentProps {
  comment: Comment
}
