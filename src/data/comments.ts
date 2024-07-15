import type { Comment } from '@/types/types'

export const comments: Comment[] = [
  {
    id: 'f4a23b80-1b2b-4d6c-b6de-8e1a59e9c3e9',
    userId: 1,
    content: 'This is the first comment.',
    votes: 10,
    voteStatus: null,
    postedDate: '2023-10-05T14:00:00.000Z',
    replies: [
      {
        id: '4dbe1e85-c56d-48af-bfc0-2fca68fdd453',
        userId: 2,
        content: 'This is a reply to the first comment.',
        votes: 5,
        voteStatus: 'upvoted',
        postedDate: '2023-10-05T14:15:00.000Z',
        replies: []
      },
      {
        id: '5ab12798-83c3-4b82-b917-4ecff68d3e61',
        userId: 3,
        content: 'This is another reply to the first comment.',
        votes: 3,
        voteStatus: null,
        postedDate: '2023-10-05T14:30:00.000Z',
        replies: [
          {
            id: '6f3d1de3-8456-4b1d-8a5a-31e407e8a4c7',
            userId: 1,
            content: 'This is a nested reply.',
            votes: 2,
            voteStatus: 'downvoted',
            postedDate: '2023-10-05T14:45:00.000Z',
            replies: []
          },
          {
            id: '6f3d1de3-8456-4b1d-8a5a-31e407e8a4b8',
            userId: 2,
            content: 'This is a nested reply 2.',
            votes: 4,
            voteStatus: 'upvoted',
            postedDate: '2023-10-05T14:52:00.000Z',
            replies: []
          }
        ]
      }
    ]
  },
  {
    id: 'c3a27b9e-5b24-4a6c-a5d4-4e6c4e9e9c6b',
    userId: 2,
    content: 'This is another top-level comment.',
    votes: 7,
    voteStatus: null,
    postedDate: '2023-10-05T15:00:00.000Z',
    replies: []
  },
  {
    id: 'd2a17a1c-9c12-4bfb-8a8c-ef7c2f24b7f2',
    userId: 3,
    content: 'Yet another top-level comment.',
    votes: 1,
    voteStatus: null,
    postedDate: '2023-10-05T15:15:00.000Z',
    replies: [
      {
        id: 'e4a18c7b-2c1d-4e4b-92f9-d4a4d1e8b8a9',
        userId: 1,
        content: 'Reply to yet another top-level comment.',
        votes: 0,
        voteStatus: null,
        postedDate: '2023-10-05T15:30:00.000Z',
        replies: []
      }
    ]
  }
]
