import { Link } from "react-router-dom";
import { Zap } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-primary flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-display text-lg font-bold">CrowdCred</span>
          </Link>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link to="/feed" className="hover:text-foreground transition-colors">Feed</Link>
            <Link to="/courses" className="hover:text-foreground transition-colors">Courses</Link>
            <Link to="/jobs" className="hover:text-foreground transition-colors">Jobs</Link>
            <Link to="/events" className="hover:text-foreground transition-colors">Events</Link>
          </div>
          <p className="text-xs text-muted-foreground">© 2026 CrowdCred. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
