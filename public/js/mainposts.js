const viewCommButton = document.getElementsByClassName("viewComments")
const hideCommButton = document.getElementsByClassName("hideComments")
const addCommButton = document.getElementsByClassName("addComment")

// Add Comments Button (Main '/')
for (i=0; i < addCommButton.length; i++) {
    console.log("You're trying to add a button")
    addCommButton[i].addEventListener("click", function(event) {
        const wholeDiv = event.target.parentElement.parentElement
        console.log(wholeDiv)
        const dataID = wholeDiv.getAttribute("data-blogid")
        console.log(dataID)
    
        const addCommentSection = document.getElementById(`addcommentsection${dataID}`)
        addCommentSection.style.display = "inline"

        const submitCommentButt = document.getElementById(`submit-comment-${dataID}`)
        // console.log(submitCommentButt)

        submitCommentButt.addEventListener("click", function() {
            // console.log("You clicked me!")

            var textArea = document.getElementById(`comment-text-${dataID}`).value
            console.log(textArea)

            const dataPackage = {
                comment: textArea,
                post_id: dataID,
            }

            fetch('/api/comments', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataPackage),
              })
              .then((response) => {
                textArea = ""
                location.reload()
                return response
              })
        });
    });
};

// View Comments Button (Main '/')
for (i=0; i < viewCommButton.length; i++) {
    viewCommButton[i].addEventListener("click", function(event) {
        const wholeDiv = event.target.parentElement.parentElement
        const dataID = wholeDiv.getAttribute("data-blogid")

        // Makes comment section visible (was once display: none)
        const commentSection = document.getElementById(`commentsection${dataID}`)
        commentSection.innerHTML = ""
        commentSection.style.display = "inline"

        const hideCommButton = document.getElementById(`hideComments${dataID}`)
        hideCommButton.style.display = "inline"

        const thisViewComm = document.getElementById(`viewComments${dataID}`)
        thisViewComm.style.display = "none"
        // hideCommButton[i].style.display = "inline"

        const getComments = function() {
            fetch(`/api/comments/blog/${dataID}`, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
              })
                .then((response) => {
                  return response.json()
                })
                .then((data) => {
                    const commentList = data
                    console.log(commentList)

                    for (let i = 0; i < commentList.length; i++) {
                        var comment = document.createElement("div");
                        comment.className = `comment`
                        comment.id = `comment${commentList[i].id}`                        
                        const thisComment = commentList[i]

                        // Convert time to toLocaleDateString()
                        var localTime = new Date (thisComment.createdAt)
                        localTime.toLocaleDateString()

                        // Creates the individual comments sections 
                        // The comment's username
                        var username = document.createElement("p");
                        username.style.fontWeight = "bold"
                        username.textContent = thisComment.username
                        
                        // The comment's content
                        var commentContent = document.createElement("p");
                        commentContent.textContent = thisComment.comment

                        // The comment's creation date
                        var commentCreation = document.createElement("p");
                        commentCreation.textContent = localTime

                        // Attach elements to div, then attach div to comment's section
                        comment.appendChild(username)
                        comment.appendChild(commentContent)
                        comment.appendChild(commentCreation)
                        comment.style.padding = "5px"
                        commentSection.appendChild(comment)   
                    }

                })
                .catch((error) => {
                  console.error('Error:', error);
                });
        }
        getComments()
    })
}

// Hide Comments (Main '/')

for (i=0; i < viewCommButton.length; i++) {
    hideCommButton[i].addEventListener("click", function(event) {
        console.log("You clicked me")
        const wholeDiv = event.target.parentElement.parentElement
        const dataID = wholeDiv.getAttribute("data-blogid")
        console.log(dataID)

        // Makes comment section visible (was once display: none)
        const commentSection = document.getElementById(`commentsection${dataID}`)
        commentSection.innerHTML = ""
        commentSection.style.display = "none"

        const viewCommButton = document.getElementById(`viewComments${dataID}`)
        viewCommButton.style.display = "inline"

        const thisHideButt = document.getElementById(`hideComments${dataID}`)
        thisHideButt.style.display = "none"
    })
};