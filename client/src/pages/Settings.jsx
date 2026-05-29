import { useEffect, useState } from "react";

import Navbar from "../components/common/Navbar";

import API from "../services/api";

import toast from "react-hot-toast";

import ProfileSection from "../components/settings/ProfileSection";

import SecuritySection from "../components/settings/SecuritySection";

import { User, ShieldCheck, Sparkles } from "lucide-react";

const Settings = () => {
  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const fetchUser = async () => {
    try {
      const response = await API.get("/auth/me");

      setName(response.data.name || "");

      setEmail(response.data.email || "");
    } catch (error) {
      toast.error("Failed to load profile");
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !email.trim()) {
      toast.error("Name and email cannot be empty");

      return;
    }

    try {
      setLoading(true);

      const profileResponse = await API.put(
        "/auth/update-profile",

        {
          name: name.trim(),

          email: email.trim(),
        },
      );

      const updatedUser = profileResponse.data.user || profileResponse.data;

      localStorage.setItem(
        "user",

        JSON.stringify(updatedUser),
      );

      if (password.trim()) {
        await API.put(
          "/auth/change-password",

          {
            password,
          },
        );
      }

      toast.success("Settings updated successfully");

      setPassword("");
    } catch (error) {
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.message ||
        "Something went wrong";

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      <div className="max-w-3xl mx-auto px-4 py-8">
        
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs text-gray-300 mb-5">
            <Sparkles size={14} />
            Account Preferences
          </div>

          <h1 className="text-4xl font-bold">Settings</h1>

          <p className="text-gray-400 mt-4 max-w-xl leading-7">
            Manage your AudioPilot account, update profile information and keep
            your account secure.
          </p>
        </div>

        <div className="space-y-5">
          
          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
            
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <User size={18} />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Profile Information</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Update your personal account details
                </p>
              </div>
            </div>

            <div className="p-6">
              <ProfileSection
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
              />
            </div>
          </div>

          <div className="rounded-[28px] border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden">
            
            <div className="flex items-center gap-3 px-6 py-5 border-b border-white/10">
              <div className="w-11 h-11 rounded-2xl bg-white/10 flex items-center justify-center">
                <ShieldCheck size={18} />
              </div>

              <div>
                <h2 className="font-semibold text-lg">Security</h2>

                <p className="text-sm text-gray-500 mt-1">
                  Change and protect your account password
                </p>
              </div>
            </div>

            <div className="p-6">
              <SecuritySection password={password} setPassword={setPassword} />
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={handleSave}
              disabled={loading}
              className="
              px-7
              py-3
              rounded-full
              bg-white
              text-black
              text-sm
              font-semibold
              hover:scale-105
              transition
              disabled:opacity-50
              disabled:cursor-not-allowed
              disabled:hover:scale-100
              "
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
