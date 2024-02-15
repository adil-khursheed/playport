const Loader = ({ className = "" }) => {
  return (
    <div className={`${className}`}>
      <span className="loader"></span>
    </div>
  );
};

export default Loader;
