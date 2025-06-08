import { useState, useEffect, useRef } from "react";

const Profile = () => {
  const [user, setUser] = useState(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
    setUser(loggedInUser);
  }, []);

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const updatedUser = { ...user, photo: reader.result };
      setUser(updatedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

      const users = JSON.parse(localStorage.getItem("users")) || [];
      const updatedUsers = users.map((u) =>
        u.email === updatedUser.email ? updatedUser : u
      );
      localStorage.setItem("users", JSON.stringify(updatedUsers));
    };
    reader.readAsDataURL(file);
  };

  if (!user) return <p>Loading...</p>;

  const getInitials = (nameOrEmail) => {
    const base = nameOrEmail?.split("@")[0] || "";
    return base
      .split(".")
      .map((part) => part[0]?.toUpperCase())
      .join("")
      .slice(0, 2);
  };

  return (
    <div
      style={{
        maxWidth: 500,
        margin: "30px auto",
        padding: "2rem",
        borderRadius: "1rem",
        background: "linear-gradient(145deg, #f3f3f3, #e0e0e0)",
        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "2rem", position: "relative" }}>
        <div
          style={{
            width: 100,
            height: 100,
            margin: "0 auto 1rem",
            borderRadius: "50%",
            backgroundColor: "#4a90e2",
            overflow: "hidden",
            position: "relative",
            cursor: "pointer",
          }}
          onClick={() => fileInputRef.current.click()}
        >
          {user.photo ? (
            <img
              src={user.photo}
              alt="Profile"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
                fontSize: 28,
                fontWeight: 600,
              }}
            >
              {getInitials(user.name || user.email)}
            </div>
          )}

          {/* Camera Icon */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              right: 0,
              backgroundColor: "#fff",
              borderRadius: "50%",
              padding: 6,
              boxShadow: "0 0 5px rgba(0,0,0,0.2)",
            }}
          >
            <svg
              width="18"
              height="18"
              fill="#4a90e2"
              viewBox="0 0 24 24"
            >
              <path d="M12 5c-3.9 0-7 3.1-7 7 0 3.9 3.1 7 7 7s7-3.1 7-7c0-3.9-3.1-7-7-7zm0 12c-2.8 0-5-2.2-5-5s2.2-5 5-5c2.7 0 5 2.2 5 5s-2.3 5-5 5zm3-5c0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3 3-1.3 3-3zm6.3-6.8l-1.8-1.8c-.4-.4-1-.4-1.4 0l-2.1 2.1 3.2 3.2 2.1-2.1c.4-.4.4-1 0-1.4zM4 20c-1.1 0-2-.9-2-2v-9c0-1.1.9-2 2-2h4l1.3-1.3C9.7 5.5 10.8 5 12 5c1.2 0 2.3.5 3.1 1.4L17 9h4c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H4z"/>
            </svg>
          </div>
        </div>

        <input
          type="file"
          accept="image/*"
          style={{ display: "none" }}
          ref={fileInputRef}
          onChange={handlePhotoChange}
        />

        <h2 style={{ margin: 0, fontSize: "1.5rem", color: "#333" }}>
          {user.name || "Unnamed User"}
        </h2>
        <p style={{ color: "#666", fontSize: "0.9rem" }}>{user.email}</p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "120px 1fr",
          rowGap: "1rem",
          columnGap: "1rem",
          fontSize: "1rem",
          color: "#333",
        }}
      >
        <div style={{ fontWeight: 600 }}>Name:</div>
        <div>{user.name || "—"}</div>

        <div style={{ fontWeight: 600 }}>Email:</div>
        <div>{user.email}</div>

        <div style={{ fontWeight: 600 }}>Role:</div>
        <div style={{ textTransform: "capitalize" }}>{user.role}</div>
      </div>
    </div>
  );
};

export default Profile;
