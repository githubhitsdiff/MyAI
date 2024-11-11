async function fetchProfile() {
  const username = document.getElementById("username").value;
  const errorMessage = document.getElementById("error-message");
  const profileUsername = document.getElementById("profile-username");
  const lastOnline = document.getElementById("last-online");
  const profileImage = document.getElementById("profile-image");

  // Clear previous content
  errorMessage.textContent = "";
  profileUsername.textContent = "";
  lastOnline.textContent = "";
  profileImage.src = "";

  if (!username) {
    errorMessage.textContent = "Please enter a Roblox username.";
    return;
  }

  try {
    // First, search for the user by username
    const userResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}`);
    if (!userResponse.ok) {
      throw new Error(`User search request failed with status: ${userResponse.status}`);
    }

    const userData = await userResponse.json();

    // Check if the user exists in the data array
    if (userData.data.length === 0) {
      errorMessage.textContent = "User not found!";
      return;
    }

    const userId = userData.data[0].id;

    // Now, fetch the user profile details using the user ID
    const profileResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`);
    if (!profileResponse.ok) {
      throw new Error(`Profile request failed with status: ${profileResponse.status}`);
    }

    const profileData = await profileResponse.json();

    // Update the webpage with profile details
    profileUsername.textContent = profileData.name || "Unknown";
    lastOnline.textContent = profileData.lastOnline ? new Date(profileData.lastOnline).toLocaleString() : "Unknown";
    profileImage.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=180&height=180&format=png`;

  } catch (error) {
    console.error("Error fetching data:", error);
    errorMessage.textContent = `An error occurred: ${error.message}`;
  }
}
