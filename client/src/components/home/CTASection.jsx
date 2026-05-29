import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const CTASection = () => {
  return (
    <section className="px-6 py-28">
      <motion.div
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 0.6,
        }}
        viewport={{
          once: true,
        }}
        className="
        relative
        overflow-hidden
        max-w-6xl
        mx-auto
        rounded-[40px]
        border
        border-white/10
        bg-white/[0.04]
        backdrop-blur-xl
        px-6
        py-16
        md:px-14
        md:py-24
        text-center
        "
      >
        <div className="absolute w-[420px] h-[420px] bg-white/10 blur-3xl rounded-full top-[-220px] left-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.25em] text-gray-300">
            Start Today
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mt-8 leading-tight">
            Turn Raw Audio
            <br />
            Into Actionable Insights
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto mt-8 leading-relaxed">
            Upload podcasts, interviews, meetings or voice recordings and
            receive AI powered audio analysis, clarity metrics and smart
            improvement suggestions in seconds.
          </p>

          <div className="flex justify-center mt-10">
            <Link
              to="/auth"
              className="
              px-8
              py-4
              rounded-full
              bg-white
              text-black
              font-medium
              hover:scale-105
              transition
              "
            >
              Start Analyzing
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default CTASection;
