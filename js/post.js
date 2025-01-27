// Function to get URL parameters
function getUrlParameter(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

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

// Function to load and render blog post content
async function loadBlogPost() {
  const postId = parseInt(getUrlParameter("id"));
  const post = blogPosts.find((p) => p.id === postId);

  if (!post) {
    document.getElementById("blog-content").innerHTML =
      "<h1>Post not found</h1>";
    return;
  }

  try {
    const response = await fetch(post.content);
    const markdown = await response.text();
    const content = marked.parse(markdown);

    document.getElementById("blog-content").innerHTML = `
            <h1>${post.title}</h1>
            <div class="blog-post-meta">${post.date}</div>
            ${content}
        `;

    // Add copy buttons to code blocks
    document.querySelectorAll("pre").forEach((pre) => {
      const copyButton = document.createElement("button");
      copyButton.className = "copy-button";
      copyButton.textContent = "content_copy";

      copyButton.addEventListener("click", async () => {
        const code = pre.querySelector("code")?.textContent || pre.textContent;
        await navigator.clipboard.writeText(code);

        copyButton.textContent = "check";
        copyButton.classList.add("copied");

        setTimeout(() => {
          copyButton.textContent = "content_copy";
          copyButton.classList.remove("copied");
        }, 2000);
      });

      pre.appendChild(copyButton);
    });
  } catch (error) {
    console.error("Error loading blog post:", error);
    document.getElementById("blog-content").innerHTML =
      "<h1>Error loading post</h1>";
  }
}

// Initialize blog post when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  loadBlogPost();
});
