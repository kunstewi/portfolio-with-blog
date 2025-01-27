// Blog posts data structure
const blogPosts = [
  {
    id: 1,
    title: "Getting Started with Web Development",
    date: "2024-01-15",
    excerpt:
      "Learn the fundamentals of web development and start your journey as a developer.",
    content: "posts/getting-started.md",
  },
  {
    id: 2,
    title: "Modern JavaScript Features",
    date: "2024-01-20",
    excerpt:
      "Explore the latest features in JavaScript and how to use them effectively.",
    content: "posts/modern-javascript.md",
  },
];

// Function to create a blog post card
function createBlogPostCard(post) {
  const article = document.createElement("article");
  article.className = "blog-post";
  article.innerHTML = `
        <div class="blog-post-content">
            <h2>${post.title}</h2>
            <div class="blog-post-meta">${post.date}</div>
        </div>
        <a href="post.html?id=${post.id}" class="read-more">
            Read More
            <i class="fas fa-arrow-right"></i>
        </a>
    `;
  return article;
}

// Function to load blog posts
function loadBlogPosts() {
  const blogPostsContainer = document.getElementById("blog-posts");
  blogPosts.forEach((post) => {
    const postCard = createBlogPostCard(post);
    blogPostsContainer.appendChild(postCard);
  });
}

// Initialize blog posts when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadBlogPosts();
});
