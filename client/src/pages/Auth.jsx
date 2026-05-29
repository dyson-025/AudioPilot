import { useState } from "react";

import { motion } from "framer-motion";

import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import API from "../services/api";

import toast from "react-hot-toast";

import AuthToggle from "../components/auth/AuthToggle";

import AuthInput from "../components/auth/AuthInput";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Email and password are required");

      return;
    }

    if (!isLogin && !name.trim()) {
      toast.error("Name is required");

      return;
    }

    try {
      setLoading(true);

      if (!isLogin) {
        await API.post(
          "/auth/register",

          {
            name: name.trim(),

            email: email.trim(),

            password,
          },
        );

        toast.success("Account created successfully");

        setName("");

        setEmail("");

        setPassword("");

        setIsLogin(true);

        return;
      }

      const response = await API.post(
        "/auth/login",

        {
          email: email.trim(),

          password,
        },
      );

      const token = response.data.access_token;

      const userData = {
        email: email.trim(),
      };

      login(userData, token);

      toast.success("Login successful");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.detail ||
          error.response?.data?.message ||
          "Something went wrong",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-10">
      
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        animate={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.5,
        }}
        className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/5 backdrop-blur-xl p-8"
      >
        
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold">AudioPilot</h1>

          <p className="text-gray-400 mt-3">AI Powered Audio Intelligence</p>
        </div>

        <AuthToggle isLogin={isLogin} setIsLogin={setIsLogin} />

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {!isLogin && (
            <AuthInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}

          <AuthInput
            label="Email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <AuthInput
            label="Password"
            type="password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="submit"
            disabled={loading}
            className="
            w-full
            py-4
            rounded-2xl
            bg-white
            text-black
            font-semibold
            hover:scale-[1.02]
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
            "
          >
            {loading ? "Please wait..." : isLogin ? "Login" : "Create Account"}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default Auth;
