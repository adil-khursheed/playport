const ToggleSwitch = ({ checked, onChange }) => {
  return (
    <label className="switch cursor-pointer">
      <input type="checkbox" checked={checked} onChange={onChange} />
      <span className="slider"></span>
    </label>
  );
};

export default ToggleSwitch;
