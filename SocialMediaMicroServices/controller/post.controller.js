
//  Api to get post based on popularity
 const popular = async (req, res) => {
  try {
    const { type } = req.query;
    
    // Fetch all posts
    const postsRes = await axios.get('http://20.244.56.144/evaluation-service/posts', {
      headers: {
        'Content-Type': 'application/json',
        Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU0MzQ4LCJpYXQiOjE3NDQ5NTQwNDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ5MzQ3YmFhLTcwMDktNDIyZS1hY2VlLWI3YmZmZDZhMjhmOSIsInN1YiI6Im1hZGhhdi5iYW5zYWxfY3MyMkBnbGEuYWMuaW4ifSwiZW1haWwiOiJtYWRoYXYuYmFuc2FsX2NzMjJAZ2xhLmFjLmluIiwibmFtZSI6Im1hZGhhdiBiYW5zYWwiLCJyb2xsTm8iOiIyMjE1MDAxMDEyIiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiNDkzNDdiYWEtNzAwOS00MjJlLWFjZWUtYjdiZmZkNmEyOGY5IiwiY2xpZW50U2VjcmV0IjoiRFZNc0t6eVphUGVKWnN1SyJ9.Eaj8YWRFewYYXvDUXRDNimSQzrFyFWIHbAg-9Jgj1aY"
      }
    });
    const posts = postsRes.data.posts || [];

    if (type === 'popular') {
  
      const postCommentCounts = [];
      await Promise.all(
        posts.map(async (post) => {
          try {
            const commentsRes = await axios.get(`http://20.244.56.144/evaluation-service/posts/${post.id}/comments`, {
              headers: {
                'Content-Type': 'application/json',
                Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzQ0OTU0MzQ4LCJpYXQiOjE3NDQ5NTQwNDgsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6IjQ5MzQ3YmFhLTcwMDktNDIyZS1hY2VlLWI3YmZmZDZhMjhmOSIsInN1YiI6Im1hZGhhdi5iYW5zYWxfY3MyMkBnbGEuYWMuaW4ifSwiZW1haWwiOiJtYWRoYXYuYmFuc2FsX2NzMjJAZ2xhLmFjLmluIiwibmFtZSI6Im1hZGhhdiBiYW5zYWwiLCJyb2xsTm8iOiIyMjE1MDAxMDEyIiwiYWNjZXNzQ29kZSI6IkNObmVHVCIsImNsaWVudElEIjoiNDkzNDdiYWEtNzAwOS00MjJlLWFjZWUtYjdiZmZkNmEyOGY5IiwiY2xpZW50U2VjcmV0IjoiRFZNc0t6eVphUGVKWnN1SyJ9.Eaj8YWRFewYYXvDUXRDNimSQzrFyFWIHbAg-9Jgj1aY"
            }});
            postCommentCounts.push({
              postId: post.id,
              commentCount: commentsRes.data.length
            });
          } catch (err) {
            console.error(`Error fetching comments for post ID: ${post.id}`);
          }
        })
      );

      // algorithm to sort the posts according to the comment on it
      const sortedPosts = postCommentCounts
        .sort((a, b) => b.commentCount - a.commentCount)
        .map((item) => posts.find(post => post.id === item.postId));
      
      // Send response with the top posts
      res.json({ posts: sortedPosts });
    }

    else if (type === 'latest') {
      // Sort posts by creation date (latest first)
      const sortedPosts = posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // Fetch the latest 5 posts
      const latestPosts = sortedPosts.slice(0, 5);
      res.json({ posts: latestPosts });
    }

    else {
      // Invalid type query
      res.status(400).json({ message: 'Invalid query parameter. Accepted values: "popular" or "latest".' });
    }

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

