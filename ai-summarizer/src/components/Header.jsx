const Header = ({ title }) => {
  return (
    <header className="bg-[#C2A77C] dark:bg-[#A07856] text-white py-4">
      <h1 className="text-3xl font-bold">{title}</h1>
    </header>
  );
};

export default Header;