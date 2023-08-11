# Blog_REST

This is a RESTful API for a blog application. It allows users to create, read, update, and delete blog posts.

## Installation and Running

To install the project, clone the repository and run `npm install`. To start the server, run `npm start`.

## API Documentation

### GET /posts

This endpoint retrieves all blog posts.

**Parameters:**
None

**Response:**
An array of blog posts.

### POST /post

This endpoint creates a new blog post.

**Parameters:**
- `title`: The title of the blog post.
- `content`: The content of the blog post.

**Response:**
The created blog post.

### GET /post/:postId

This endpoint retrieves a specific blog post.

**Parameters:**
- `postId`: The ID of the blog post.

**Response:**
The requested blog post.

### PUT /post/:postId

This endpoint updates a specific blog post.

**Parameters:**
- `postId`: The ID of the blog post.
- `title`: The new title of the blog post.
- `content`: The new content of the blog post.

**Response:**
The updated blog post.

### DELETE /post/:postId

This endpoint deletes a specific blog post.

**Parameters:**
- `postId`: The ID of the blog post.

**Response:**
A message indicating that the deletion was successful.

## Contributing

We welcome contributions from other developers. Please feel free to submit a pull request or open an issue.
