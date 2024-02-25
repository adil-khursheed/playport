const TabNavItem = ({ id, title, activeTab, setActiveTab }) => {
  const handleTabClick = () => {
    setActiveTab(id);
  };

  return (
    <li
      onClick={handleTabClick}
      className={`text-center cursor-pointer py-2 px-3 text-dark-2 dark:text-light-2 ${
        activeTab === id ? "bg-light-2 dark:bg-dark-2" : ""
      }`}>
      {title}
    </li>
  );
};

export default TabNavItem;
