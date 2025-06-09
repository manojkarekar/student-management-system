const Navbar = () => {
  return (
    <header className="bg-gray-900 text-white p-4 flex flex-wrap justify-between items-center">
      <h1 className="text-lg font-semibold">HR Management System</h1>
      <button className="bg-blue-500 px-4 py-2 rounded mt-2 md:mt-0">Logout</button>
    </header>
  );
};

export default Navbar;