import { motion } from "framer-motion";

import { Link } from "react-router-dom";

const waveformBars = [40, 90, 60, 120, 80, 100, 70, 130, 90, 60, 110, 75];

const HeroSection = () => {
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden px-6">
      
      <div className="absolute top-[-120px] left-1/2 -translate-x-1/2 w-[550px] h-[550px] bg-white/10 blur-3xl rounded-full" />

      <div className="relative z-10 max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
        
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
            duration: 0.7,
          }}
        >
          <div className="inline-flex items-center my-3 px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.25em] text-gray-300 mb-8">
            AI Powered Audio Intelligence
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05]">
            Understand
            <br />
            <span className="text-gray-400">Your Audio Better</span>
          </h1>

          <p className="mt-8 text-lg text-gray-400 max-w-xl leading-relaxed">
            Upload podcasts, interviews, meetings or voice recordings and
            receive AI powered insights about clarity, background noise, pacing,
            energy and overall listening quality.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/auth"
              className="
              px-7
              py-3.5
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

            <a
              href="#features"
              className="
              px-7
              py-3.5
              rounded-full
              border
              border-white/10
              hover:bg-white/5
              transition
              "
            >
              Explore Features
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{
            opacity: 0,
            scale: 0.92,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          transition={{
            duration: 0.7,
          }}
          className="relative"
        >

          <div
            className="
          rounded-[32px]
          border
          border-white/10
          bg-white/[0.04]
          backdrop-blur-xl
          p-8
          shadow-2xl
          "
          >
            
            <div className="flex items-center justify-between mb-8">
              <div>
                <p className="text-sm text-gray-400">AI Analysis Report</p>

                <h3 className="text-2xl font-semibold mt-1">
                  Podcast_Intro.wav
                </h3>
              </div>

              <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
            </div>

            <div className="flex items-end gap-2 h-40">
              {waveformBars.map((height, index) => (
                <motion.div
                  key={index}
                  initial={{
                    height: 20,
                  }}
                  animate={{
                    height,
                  }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.04,
                  }}
                  className="flex-1 rounded-full bg-white/80"
                />
              ))}
            </div>

            <div className="grid grid-cols-3 gap-4 mt-8">
              <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Clarity</p>

                <h4 className="text-2xl font-bold mt-2">92%</h4>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Noise</p>

                <h4 className="text-2xl font-bold mt-2">Low</h4>
              </div>

              <div className="rounded-2xl bg-black/40 border border-white/10 p-4">
                <p className="text-sm text-gray-400">Energy</p>

                <h4 className="text-2xl font-bold mt-2">High</h4>
              </div>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs uppercase tracking-widest text-gray-500">
                AI Insight
              </p>

              <p className="text-sm text-gray-300 mt-3 leading-6">
                Audio quality is clean with minimal background noise. Vocal
                delivery sounds confident and balanced with strong overall
                clarity.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
