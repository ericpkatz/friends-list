# Friends List

- Friend model
  - name (unique not empty string)
  - rating ( integer defaults to 5)

- Routes
  - / returns index.html page
  - GET /api/friends
  - PUT /api/friends/:id
  - POST /api/friends
  - DELETE /api/friends/:id

- Front End
  - ability to display friends
  - friends are sorted by rating DESC
  - ability to increment or decrment rating
  - ability to delete a friend
  - ability to create a friend (with error handling)
