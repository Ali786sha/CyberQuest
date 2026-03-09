
export const logoutUser = async () => {
  try {
    const token = localStorage.getItem("token");

    await fetch("http://localhost:5000/api/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: token ? `Bearer ${token}` : "",
      },
    });

    // localStorage.removeItem("token");
    localStorage.removeItem("adminToken");


    window.location.href = "/admin/login";
  } catch (error) {
    console.error("Logout failed", error);
  }
};
