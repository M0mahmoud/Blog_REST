{
  "posts": [
    {
      "title": "Post Title",
      "content": "Post Content",
      "creator": "User ID",
      "image": "Image URL"
    },
    ...
  ],
  "totalItems": "Total number of posts"
}
```

### POST /feed/post

Creates a new blog post.

Request parameters:

```
{
  "title": "Post Title",
  "content": "Post Content"
}
```

Response format:

```
{
  "msg": "Post successfully Created",
  "post": {
    "title": "Post Title",
    "content": "Post Content",
    "creator": "User ID",
    "image": "Image URL"
  },
  "creator": {
    "_id": "User ID",
    "name": "User Name"
  }
}
