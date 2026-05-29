import { motion } from "framer-motion";

import { Upload, BrainCircuit, BarChart3 } from "lucide-react";

const steps = [
  {
    title: "Upload Audio",

    description:
      "Upload podcasts, meetings, interviews or voice recordings securely for AI powered analysis.",

    icon: Upload,
  },

  {
    title: "AI Audio Processing",

    description:
      "AudioPilot analyzes clarity, pacing, silence levels, background noise and overall listening quality using advanced AI.",

    icon: BrainCircuit,
  },

  {
    title: "Receive Smart Insights",

    description:
      "Get detailed reports, audio metrics and actionable AI suggestions to improve your recordings.",

    icon: BarChart3,
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.25em] text-gray-300">
            Workflow
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
            How AudioPilot Works
          </h2>

          <p className="text-lg text-gray-400 max-w-2xl mx-auto mt-6 leading-relaxed">
            A simple AI powered workflow that transforms raw audio into
            meaningful insights within seconds.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.div
                key={index}
                initial={{
                  opacity: 0,
                  y: 40,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.15,
                }}
                viewport={{
                  once: true,
                }}
                whileHover={{
                  y: -8,
                }}
                className="
                  relative
                  rounded-3xl
                  border
                  border-white/10
                  bg-white/[0.04]
                  backdrop-blur-xl
                  p-8
                  hover:bg-white/[0.06]
                  transition
                  "
              >
                
                <div className="absolute top-5 right-5 text-gray-700 text-5xl font-bold">
                  0{index + 1}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-8">
                  <Icon size={30} />
                </div>

                <h3 className="text-2xl font-semibold">{step.title}</h3>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
