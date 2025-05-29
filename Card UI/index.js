document.addEventListener("DOMContentLoaded", () => {
  const card = document.querySelector(".card");
  const postId = card.dataset.postId;

  const apiURL = `https://dssj.mortenholst.dk/wp-json/wp/v2/posts/${postId}?_embed`;

  fetch(apiURL)
    .then((response) => response.json())
    .then((post) => {
      document.getElementById("post-title").innerHTML = post.title.rendered;
      document.getElementById("post-excerpt").innerHTML = post.excerpt.rendered;
      document.getElementById("post-link").href = post.link;

      const img = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
      if (img) {
        document.getElementById("post-image").src = img;
      } else {
        document.getElementById("post-image").src = "fallback.jpg";
      }
    })
    .catch((error) => {
      console.error("Error fetching post:", error);
    });
});
