import { motion } from "framer-motion";
import { BookOpen, Briefcase, Trophy, MessageSquare, Flame, Award, Code, Users } from "lucide-react";

const features = [
  {
    icon: Award,
    title: "Post Achievements",
    description: "Showcase your projects, certifications, and wins with a rich public profile.",
    color: "text-primary",
    glow: "glow-primary",
  },
  {
    icon: BookOpen,
    title: "Courses & Learning",
    description: "Create, sell, or subscribe to courses. Rate and review to help others.",
    color: "text-secondary",
    glow: "glow-warm",
  },
  {
    icon: Briefcase,
    title: "Job Board",
    description: "Find jobs or post opportunities. Connect talent with companies.",
    color: "text-accent",
    glow: "glow-accent",
  },
  {
    icon: Trophy,
    title: "Leaderboard",
    description: "Compete for the top. Most liked posts and top creators ranked.",
    color: "text-primary",
    glow: "glow-primary",
  },
  {
    icon: Code,
    title: "Hackathons & Events",
    description: "Host and join competitions, workshops, and community events.",
    color: "text-secondary",
    glow: "glow-warm",
  },
  {
    icon: MessageSquare,
    title: "AI Career Coach",
    description: "Get AI-powered career guidance, roadmaps, and interview prep.",
    color: "text-accent",
    glow: "glow-accent",
  },
  {
    icon: Flame,
    title: "Streaks & Rewards",
    description: "Stay consistent. Build login and activity streaks for badges and discounts.",
    color: "text-secondary",
    glow: "glow-warm",
  },
  {
    icon: Users,
    title: "Community",
    description: "Connect with builders, creators, and professionals worldwide.",
    color: "text-primary",
    glow: "glow-primary",
  },
];

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const FeaturesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl sm:text-4xl font-bold mb-4">
            Everything You Need to{" "}
            <span className="text-gradient-primary">Level Up</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            One platform for building credibility, learning, competing, and getting hired.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {features.map((feature, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="glass-card rounded-xl p-6 group cursor-default hover:border-primary/30 transition-all duration-300"
            >
              <div className={`w-10 h-10 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:${feature.glow} transition-shadow`}>
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;
