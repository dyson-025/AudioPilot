const AuthToggle = ({ isLogin, setIsLogin }) => {
  return (
    <div
      className="
    flex
    rounded-full
    bg-black/40
    p-1
    mb-8
    border
    border-white/10
    "
    >
      <button
        onClick={() => setIsLogin(true)}
        className={`
        flex-1
        py-3
        rounded-full
        text-sm
        font-medium
        transition

        ${isLogin ? "bg-white text-black" : "text-gray-400 hover:text-white"}
        `}
      >
        Login
      </button>

      <button
        onClick={() => setIsLogin(false)}
        className={`
        flex-1
        py-3
        rounded-full
        text-sm
        font-medium
        transition

        ${!isLogin ? "bg-white text-black" : "text-gray-400 hover:text-white"}
        `}
      >
        Signup
      </button>
    </div>
  );
};

export default AuthToggle;
