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

// Function to add copy buttons to code blocks
function addCopyButtons() {
  const codeBlocks = document.querySelectorAll("pre code");
  codeBlocks.forEach((codeBlock) => {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.innerHTML = "<i class='fas fa-clipboard'></i>";

    button.addEventListener("click", async () => {
      try {
        await navigator.clipboard.writeText(codeBlock.textContent);
        button.innerHTML = "<i class='fas fa-check'></i>";
        button.classList.add("copied");

        setTimeout(() => {
          button.innerHTML = "<i class='fas fa-clipboard'></i>";
          button.classList.remove("copied");
        }, 2000);
      } catch (err) {
        console.error("Failed to copy code:", err);
      }
    });

    codeBlock.parentElement.insertBefore(button, codeBlock);
  });
}

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

    // Configure marked to add language class to code blocks
    marked.setOptions({
      highlight: function (code, lang) {
        return `<pre><code class="language-${lang}">${code}</code></pre>`;
      },
    });

    const content = marked.parse(markdown);

    document.getElementById("blog-content").innerHTML = `
            <h1>${post.title}</h1>
            <div class="blog-post-meta">${post.date}</div>
            ${content}
        `;

    // Add copy buttons after content is loaded
    addCopyButtons();
  } catch (error) {
    console.error("Error loading blog post:", error);
    document.getElementById("blog-content").innerHTML =
      "<h1>Error loading post</h1>";
  }
}

// Initialize blog post when DOM is loaded
document.addEventListener("DOMContentLoaded", loadBlogPost);
