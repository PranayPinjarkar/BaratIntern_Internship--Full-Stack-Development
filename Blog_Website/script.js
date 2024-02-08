document.addEventListener('DOMContentLoaded', () => {
    const addForm = document.getElementById('addForm');
    const postsSection = document.getElementById('posts');

    // Function to fetch and display all posts
    const fetchPosts = async () => {
        try {
            const response = await axios.get('/posts');
            const posts = response.data;
            postsSection.innerHTML = '';
            posts.forEach(post => {
                const postDiv = document.createElement('div');
                postDiv.innerHTML = `
                    <h2>${post.title}</h2>
                    <p>${post.content}</p>
                    <button onclick="deletePost('${post._id}')">Delete</button>
                `;
                postsSection.appendChild(postDiv);
            });
        } catch (err) {
            console.error(err);
        }
    };

    // Function to submit a new post
    addForm.addEventListener('submit', async (event) => {
        event.preventDefault();
        const title = document.getElementById('title').value;
        const content = document.getElementById('content').value;
        try {
            await axios.post('/posts', { title, content });
            addForm.reset();
            fetchPosts();
        } catch (err) {
            console.error(err);
        }
    });

    // Function to delete a post
    window.deletePost = async (id) => {
        try {
            await axios.delete(`/posts/${id}`);
            fetchPosts();
        } catch (err) {
            console.error(err);
        }
    };

    // Fetch and display posts when the page loads
    fetchPosts();
});
