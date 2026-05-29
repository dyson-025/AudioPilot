const SettingsInput = ({ label, type, value, onChange, placeholder }) => {
  return (
    <div className="space-y-2">
      <label className="text-xs text-gray-400">{label}</label>

      <input
        type={type}
        value={value || ""}
        onChange={onChange}
        placeholder={placeholder}
        autoComplete="off"
        className="
        w-full
        px-4
        py-3
        rounded-xl
        bg-black/40
        border
        border-white/10
        text-sm
        outline-none
        transition
        focus:border-white/30
        focus:bg-black/50
        "
      />
    </div>
  );
};

export default SettingsInput;
