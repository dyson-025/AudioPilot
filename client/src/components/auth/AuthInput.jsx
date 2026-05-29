const AuthInput = ({ label, type, placeholder, value, onChange }) => {
  return (
    <div className="space-y-2">
      <label className="text-sm text-gray-400">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoComplete="off"
        className="
        w-full
        px-5
        py-4
        rounded-2xl
        bg-black/40
        border
        border-white/10
        outline-none
        transition
        text-sm
        focus:border-white/30
        focus:bg-black/50
        "
      />
    </div>
  );
};

export default AuthInput;
