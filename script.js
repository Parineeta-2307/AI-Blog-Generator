document.getElementById("generateBlogBtn").addEventListener("click", async () => {
    const topic = document.getElementById("blogTopic").value.trim();
    const blogContent = document.getElementById("blogContent");

    if (!topic) {
        alert("Please enter a topic!");
        return;
    }

    // Preserve heading & UI, show a loading message inside `#blogContent`
    blogContent.innerHTML = "<p>📝 Generating blog, please wait...</p>";

    try {
        const response = await fetch("http://localhost:5000/api/blogs/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ topic })
        });

        if (response.ok) {
            const result = await response.json();
            
            // Ensure content is displayed without affecting other elements
            blogContent.innerHTML = `<h3>${topic}</h3>${formatBlogContent(result.content || "No content received.")}`;
        } else {
            blogContent.innerHTML = "<p>🚨 Error: Unable to generate blog.</p>";
        }
    } catch (error) {
        console.error("Error fetching blog:", error);
        blogContent.innerHTML = "<p>❌ Error connecting to the server.</p>";
    }
});

// Function to format the blog content correctly
function formatBlogContent(content) {
    return content
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // Convert **bold** to <strong>bold</strong>
        .replace(/\n/g, "<br>"); // Preserve line breaks
}
