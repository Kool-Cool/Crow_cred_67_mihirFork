import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-primary opacity-5" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-primary/15 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="container mx-auto px-4 text-center relative z-10"
      >
        <h2 className="font-display text-4xl sm:text-5xl font-bold mb-6">
          Ready to Build Your{" "}
          <span className="text-gradient-warm">Credibility</span>?
        </h2>
        <p className="text-muted-foreground text-lg max-w-lg mx-auto mb-10">
          Join thousands of builders showcasing achievements, learning new skills, and landing opportunities.
        </p>
        <Link to="/signup">
          <Button variant="hero" size="lg" className="text-base px-10 py-6">
            Join CrowdCred Now
            <ArrowRight className="w-5 h-5 ml-1" />
          </Button>
        </Link>
      </motion.div>
    </section>
  );
};

export default CTASection;
