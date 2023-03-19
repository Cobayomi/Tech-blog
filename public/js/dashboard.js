const newPost = document.getElementById("newPost");

newPost.addEventListener("submit", (event) => {
  event.preventDefault();
  const { title: title, content: content } = event.target.elements;

console.log(newPost)
const blogData = {
    title: title.value,
    content: content.value,

  };
  fetch("/api/blogRoutes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(blogData),
  })
    .then((response) => {
      if (response.status === 200) {
        window.location.href = "/dashboard";
      }
    })
    .catch((err) => console.log(err));
});