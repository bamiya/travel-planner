export const getProfileImageUrl = (value) => (value ? `http://localhost:8080/image/view?value=${value}` : "assets/defaultProfile.png");
