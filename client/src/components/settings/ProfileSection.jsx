import SettingsInput from "./SettingsInput";

const ProfileSection = ({ name, setName, email, setEmail }) => {
  return (
    <div className="grid md:grid-cols-2 gap-4">
      <SettingsInput
        label="Full Name"
        type="text"
        value={name}
        placeholder="John Doe"
        onChange={(e) => setName(e.target.value)}
      />

      <SettingsInput
        label="Email"
        type="email"
        value={email}
        placeholder="you@example.com"
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>
  );
};

export default ProfileSection;
