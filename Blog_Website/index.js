<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Blog</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Blog</h1>
    <form id="addForm">
        <input type="text" id="title" placeholder="Title" required>
        <textarea id="content" placeholder="Content" required></textarea>
        <button type="submit">Add Post</button>
    </form>
    <div id="posts"></div>

    <script src="https://unpkg.com/axios/dist/axios.min.js"></script>
    <script src="scripts.js"></script>
</body>
</html>
