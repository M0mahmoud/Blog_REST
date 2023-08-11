# Blog_REST API Documentation

This section contains the API documentation for the Blog_REST application. It includes details about each endpoint, such as the HTTP method, route path, input parameters, and expected output.

## Endpoints

### GET /posts

This endpoint retrieves all the posts.

- HTTP Method: GET
- Route Path: /posts
- Input Parameters: None
- Expected Output: An array of posts.

### GET /post/:postId

This endpoint retrieves a specific post by its ID.

- HTTP Method: GET
- Route Path: /post/:postId
- Input Parameters: postId (string)
- Expected Output: The post object.

### POST /post

This endpoint creates a new post.

- HTTP Method: POST
- Route Path: /post
- Input Parameters: title (string), content (string), image (file)
- Expected Output: The created post object.

### PUT /post/:postId

This endpoint updates a specific post by its ID.

- HTTP Method: PUT
- Route Path: /post/:postId
- Input Parameters: postId (string), title (string), content (string), image (file)
- Expected Output: The updated post object.

### DELETE /post/:postId

This endpoint deletes a specific post by its ID.

- HTTP Method: DELETE
- Route Path: /post/:postId
- Input Parameters: postId (string)
- Expected Output: A success message.
