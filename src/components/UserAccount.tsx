const UserAccount = ({ user }: { user?: User }) => {
  return (
    <>
      <h2>User Profile</h2>
      {user?.isAdmin && <button>Edit</button>}
      <div>Name: {user?.name}</div>
    </>
  );
};

export default UserAccount;
