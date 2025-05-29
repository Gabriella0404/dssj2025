//javascript redo//
const postsContainer = document.getElementById("posts");
const range = document.getElementById("age-range");
const output = document.getElementById(age - value);
const categoryButtons = document.querySelectorAll(".filter__category");

let selectedCategory = null;
let selectedAge = parseInt(range.value);

const ageGroups = [
  { label: "småbørn", min: 0, max: 5 },
  { label: "børn", min: 6, max: 12 },
  { label: "teenager", min: 13, max: 19 },
  { label: "ung voksen", min: 20, max: 34 },
  { label: "voksen", min: 35, max: 49 },
  { label: "ældre voksen", min: 50, max: 64 },
  { label: "senior", min: 65, max: 80 },
];

function getAgeGroup(age) {
  return (
    ageGroups.find((group) => age >= group.min && age <= group.max)?.label || ""
  );
}
function fetchPosts() {
  const ageGroup = getAgeGroup(selectedAge);
  let url = "https://dssj.mortenholst.dk/wp-json/wp/v2/posts?_embed";
  const filters = [];

  if (selectedCategory) filters.push(`categories=${selectedCategory}`);
  if (ageGroup) filters.push(`age_group=${ageGroup}`);

  if (filters.length) url += "&" + filters.join("&");
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      postsContainer.innerHTML = data
        .map(
          (post) => `<article class="post"
            <h2>${post.title.rendered}</h2>
            <div>${post.excerpt.rendered}</div>
            </article>`
        )
        .join("");
    });
}

range.addEventListener("input", updateOutput);
window.addEventListener("resize", updateOutput);
updateOutput();
