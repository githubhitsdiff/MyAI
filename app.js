async function fetchProfile() {
    const username = document.getElementById("username").value;
    const errorMessage = document.getElementById("error-message");
    const profileUsername = document.getElementById("profile-username");
    const lastOnline = document.getElementById("last-online");
    const profileImage = document.getElementById("profile-image");
  
    // Clear previous results
    errorMessage.textContent = "";
    profileUsername.textContent = "";
    lastOnline.textContent = "";
    profileImage.src = "";
  
    if (!username) {
      errorMessage.textContent = "Please enter a Roblox username.";
      return;
    }
  
    try {
      // Fetch the user's ID using their username
      const userResponse = await fetch(`https://users.roblox.com/v1/users/search?keyword=${username}`);
      const userData = await userResponse.json();
  
      if (userData.data.length === 0) {
        errorMessage.textContent = "User not found!";
        return;
      }
  
      const userId = userData.data[0].id;
  
      // Fetch detailed user information
      const profileResponse = await fetch(`https://users.roblox.com/v1/users/${userId}`);
      const profileData = await profileResponse.json();
  
      // Update the profile data on the page
      profileUsername.textContent = profileData.username;
      lastOnline.textContent = new Date(profileData.lastOnline).toLocaleString();
      profileImage.src = `https://www.roblox.com/headshot-thumbnail/image?userId=${userId}&width=180&height=180&format=png`;
  
    } catch (error) {
      console.error("Error fetching data:", error);
      errorMessage.textContent = "An error occurred. Please try again later.";
    }
  }
  