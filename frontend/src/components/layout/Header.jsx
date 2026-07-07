const Header = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <header className="bg-white shadow-md h-16 flex justify-between items-center px-8">

      <h1 className="text-2xl font-bold text-blue-700">
        USKFI Examination System
      </h1>

      <div className="font-semibold">
        Welcome, {user?.fullName}
      </div>

    </header>
  );
};

export default Header;