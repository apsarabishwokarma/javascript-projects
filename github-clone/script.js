const form = document.querySelector("form");
const input = document.querySelector("input");
const reposContainer = document.querySelector(".repos");
const mainContainer = document.querySelector(".main-container");

const API = "https://api.github.com/users/";

async function fetchData(username) {
  try {
    const response = await fetch(`${API}${username}`);
    if (!response.ok) throw new Error("User not found");

    const {
      avatar_url,
      bio,
      blog,
      company,
      followers,
      following,
      location,
      login,
      twitter_username,
    } = await response.json();

    const html = `
   
    <div
      class="user-avatar"
      style="background: url(${avatar_url}) no-repeat center/cover"
    ></div>
    <p class="user-name">${login}</p>
    <button class="follow">Follow</button>
    <p class="user-bio">${bio || "No bio available"}</p>
    <div class="followers-info">
      <a href="#"><i class="fa-solid fa-person"></i> <span class="followers">${followers}</span> followers</a>
      <a href="#"><span class="following">${following}</span> following</a>
      <div class="icon-container">
        <i class="fa-regular fa-building"></i> <span>${company || "N/A"}</span>
      </div>
      <div class="icon-container">
        <i class="fa-sharp fa-solid fa-location-dot"></i> <span>${
          location || "N/A"
        }</span>
      </div>
      <div class="icon-container">
        <i class="fa-solid fa-link"></i> <a href="${blog}" target="_blank">${
      blog || "N/A"
    }</a>
     </div>
      <div class="icon-container">
        <i class="fa-brands fa-twitter"></i> <a href="https://twitter.com/${twitter_username}" target="_blank">@${
      twitter_username || "N/A"
    }</a>
      </div>
    </div>
    `;

    const section = document.createElement("section");
    section.classList.add("about-user");
    section.innerHTML = html;
    mainContainer.innerHTML = ""; // Clear previous data
    mainContainer.appendChild(section);
  } catch (error) {
    console.error(error.message);
    alert("Failed to fetch user data. Please try again.");
  }
}

async function fetchRepos(username) {
  try {
    const response = await fetch(`${API}${username}/repos`);
    if (!response.ok) throw new Error("Repositories not found");
    const data = await response.json();

    reposContainer.innerHTML = ""; // Clear previous repositories
    data.forEach(
      ({
        name,
        description,
        forks_count,
        language,
        watchers_count,
        html_url,
      }) => {
        const singleElement = document.createElement("div");
        singleElement.classList.add("repo-card");
        const html = `
        <a href="${html_url}" class="repo-title" target="_blank">${name}</a>
        <p class="repo-subtitle">${
          description || "No description available"
        }</p>
        <div class="popularity">
            <p class="technology-used">${language || "N/A"}</p>
            <p class="stars"><i class="fa-regular fa-star"></i>${watchers_count}</p>
            <span class="forked">${forks_count}</span>
        </div>
        <p class="pill">Public</p>
        `;
        singleElement.innerHTML = html;
        reposContainer.append(singleElement);
      }
    );
  } catch (error) {
    console.error(error.message);
    alert("Failed to fetch repositories. Please try again.");
  }
}

// Fetch data for "apsarabishwokarma" when the page loads
document.addEventListener("DOMContentLoaded", async () => {
  const defaultUser = "apsarabishwokarma";
  await fetchData(defaultUser);
  await fetchRepos(defaultUser);
});

// Add functionality for form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const val = input.value.trim();

  if (val) {
    try {
      await fetchData(val);
      await fetchRepos(val);
    } catch (error) {
      console.error(error);
    } finally {
      input.value = "";
    }
  }
});
