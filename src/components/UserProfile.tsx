import { useEffect, useState } from "react";

const url = "https://jsonplaceholder.typicode.com/users";
const UserProfile = ({ userId = 1 }: { userId?: number }) => {
  const [user, setUser] = useState<UserServer | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${url}/${userId}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await res.json();
        setUser(data);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };
    fetchUser();
  }, [userId]);

  if (!user) return <div>Loading...</div>;
  return (
    <div>
      <h2>{user.name}</h2>
      <p>Email: {user.email}</p>
    </div>
  );
};

export default UserProfile;
