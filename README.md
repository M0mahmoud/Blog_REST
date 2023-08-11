# Blog REST API Documentation

This is the API documentation for the Blog REST API. The API is built with Node.js, Express.js, and MongoDB (Mongoose).

## Endpoints

### GET /posts

Retrieves a list of posts.

#### Input Parameters

- `page`: Number (optional) - The page number for pagination. Defaults to 1.

#### Expected Output

- `posts`: Array of Objects - The list of posts.
- `totalItems`: Number - The total number of posts.

### GET /post/:postId

Retrieves a single post.

#### Input Parameters

- `postId`: String - The ID of the post.

#### Expected Output

- `msg`: String - A success message.
- `post`: Object - The retrieved post.

### POST /post

Creates a new post.

#### Input Parameters

- `title`: String - The title of the post.
- `content`: String - The content of the post.
- `image`: File - The image for the post.

#### Expected Output

- `msg`: String - A success message.
- `post`: Object - The created post.
- `creator`: Object - The creator of the post.

### PUT /post/:postId

Updates a post.

#### Input Parameters

- `postId`: String - The ID of the post.
- `title`: String - The new title of the post.
- `content`: String - The new content of the post.
- `image`: File (optional) - The new image for the post.

#### Expected Output

- `msg`: String - A success message.
- `post`: Object - The updated post.

### DELETE /post/:postId

Deletes a post.

#### Input Parameters

- `postId`: String - The ID of the post.

#### Expected Output

- `msg`: String - A success message.
