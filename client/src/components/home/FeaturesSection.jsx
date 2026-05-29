import { motion } from "framer-motion";

import { AudioWaveform, Brain, Sparkles } from "lucide-react";

const features = [
  {
    title: "AI Audio Analysis",

    description:
      "Analyze clarity, pacing, background noise, silence levels and overall listening quality using advanced AI audio intelligence.",

    icon: AudioWaveform,
  },

  {
    title: "Smart AI Feedback",

    description:
      "Ask AudioPilot specific questions about your recordings and receive professional AI powered insights tailored to your audio.",

    icon: Brain,
  },

  {
    title: "Analysis History",

    description:
      "Access previous reports, review audio performance, download summaries and track improvements over time.",

    icon: Sparkles,
  },
];

const FeaturesSection = () => {
  return (
    <section id="features" className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs uppercase tracking-[0.25em] text-gray-300">
            Features
          </div>

          <h2 className="text-4xl md:text-5xl font-bold mt-6 leading-tight">
            AI Powered
            <br />
            Audio Intelligence
          </h2>

          <p className="text-gray-400 mt-6 max-w-2xl mx-auto text-lg leading-relaxed">
            AudioPilot helps creators, professionals, podcasters and interview
            candidates improve audio quality with AI powered analysis and
            actionable insights.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.div
                key={index}
                whileHover={{
                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
                className="
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
                
                <div className="w-14 h-14 rounded-2xl bg-white/10 flex items-center justify-center mb-6">
                  <Icon size={28} />
                </div>

                <h3 className="text-2xl font-semibold">{feature.title}</h3>

                <p className="text-gray-400 mt-4 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
