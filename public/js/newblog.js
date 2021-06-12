const blogTitleInput = document.getElementById("blog-title-input")
const blogContentInput = document.getElementById("blog-content-input")
const publishPost = document.getElementById("publishPost")

// Publish New Blog (/addblog)
publishPost.addEventListener("click", function(event) {
    console.log("You clicked to publish a new blog")
    const bti = blogTitleInput.value
    const bci = blogContentInput.value

    event.preventDefault();
    if (bti.length < 1) return alert("Failed to add new blog post. 'Blog Title' empty!")
    if (bci.length < 1) return alert("Failed to add new blog post. 'Blog Content' empty!")
    
    const newDataPackage = {
        title: bti,
        content: bci
    }
    console.log(newDataPackage)
    fetch('/api/blogs', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newDataPackage),
    })
        .then((response) => {
            console.log(response)
        return response.json()
        })
        .then((data) => {
        if (data) {
            alert('Yay! Your blog has been submitted!');
        } else {
            alert('Sorry, your blog has not been submitted');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    window.location.replace(`/dashboard`)
})