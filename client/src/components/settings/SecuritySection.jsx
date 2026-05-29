import SettingsInput from "./SettingsInput";

const SecuritySection = ({ password, setPassword }) => {
  return (
    <SettingsInput
      label="New Password"
      type="password"
      value={password}
      placeholder="Enter new password"
      onChange={(e) => setPassword(e.target.value)}
    />
  );
};

export default SecuritySection;
