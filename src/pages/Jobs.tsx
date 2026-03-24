import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MapPin, DollarSign, Clock, Briefcase, Plus, ExternalLink, User, Building2, CheckCircle, Send } from "lucide-react";
import { useState } from "react";

type JobTab = "jobs" | "internships" | "freelancing";
type PostType = "job" | "internship" | "freelance";

interface Job { id: number; title: string; company: string; location: string; salary: string; posted: string; tags: string[]; type: "job" | "internship"; duration?: string; description?: string; applied?: boolean; }
interface Gig { id: number; client: string; title: string; budget: string; deadline: string; tags: string[]; proposals: number; description: string; proposalSent?: boolean; }

const initialJobs: Job[] = [
  { id: 1, title: "Senior Frontend Engineer", company: "TechNova", location: "Remote", salary: "$120K-$160K", posted: "2d ago", tags: ["React", "TypeScript"], type: "job", description: "We're looking for an experienced frontend engineer to lead our UI team." },
  { id: 2, title: "ML Engineer", company: "DataForge AI", location: "Bangalore", salary: "$90K-$130K", posted: "1d ago", tags: ["Python", "PyTorch"], type: "job", description: "Build and deploy machine learning models at scale." },
  { id: 3, title: "DevOps Lead", company: "CloudScale", location: "Remote", salary: "$110K-$150K", posted: "3d ago", tags: ["AWS", "Kubernetes"], type: "job", description: "Lead our infrastructure and DevOps team." },
  { id: 4, title: "Product Designer", company: "DesignLab", location: "San Francisco", salary: "$100K-$140K", posted: "5h ago", tags: ["Figma", "UX"], type: "job", description: "Design beautiful, intuitive product experiences." },
];

const initialInternships: Job[] = [
  { id: 5, title: "Backend Intern", company: "StartupXYZ", location: "Remote", salary: "$30/hr", posted: "1d ago", tags: ["Node.js", "PostgreSQL"], type: "internship", duration: "3 months", description: "Work on real backend features with mentorship." },
  { id: 6, title: "Frontend Intern", company: "WebFlow Inc", location: "Remote", salary: "$25/hr", posted: "3d ago", tags: ["React", "CSS"], type: "internship", duration: "6 months", description: "Build responsive UIs using React." },
  { id: 7, title: "Data Science Intern", company: "AnalyticsCo", location: "New York", salary: "$35/hr", posted: "12h ago", tags: ["Python", "SQL"], type: "internship", duration: "4 months", description: "Analyze data and build dashboards." },
];

const initialGigs: Gig[] = [
  { id: 8, client: "Sarah M.", title: "Build an E-commerce Dashboard", budget: "$2,000 - $4,000", deadline: "2 weeks", tags: ["React", "Node.js"], proposals: 12, description: "Need a full-stack dev to build a sales analytics dashboard." },
  { id: 9, client: "James K.", title: "Mobile App UI Redesign", budget: "$1,500 - $3,000", deadline: "1 week", tags: ["Figma", "React Native"], proposals: 8, description: "Looking for a designer to revamp our iOS app interface." },
  { id: 10, client: "TechCorp Ltd.", title: "API Integration & Testing", budget: "$800 - $1,500", deadline: "5 days", tags: ["REST", "Python"], proposals: 5, description: "Integrate 3 third-party APIs and write automated tests." },
  { id: 11, client: "Maria L.", title: "WordPress to React Migration", budget: "$3,000 - $6,000", deadline: "1 month", tags: ["WordPress", "React"], proposals: 18, description: "Migrate our blog from WordPress to a custom React site." },
];

const tabs: { key: JobTab; label: string; icon: typeof Briefcase }[] = [
  { key: "jobs", label: "Full-time Jobs", icon: Briefcase },
  { key: "internships", label: "Internships", icon: Building2 },
  { key: "freelancing", label: "Freelancing", icon: User },
];

const Jobs = () => {
  const [activeTab, setActiveTab] = useState<JobTab>("jobs");
  const [jobs, setJobs] = useState<Job[]>(initialJobs);
  const [internships, setInternships] = useState<Job[]>(initialInternships);
  const [gigs, setGigs] = useState<Gig[]>(initialGigs);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailJob, setDetailJob] = useState<Job | null>(null);
  const [detailGig, setDetailGig] = useState<Gig | null>(null);
  const [postType, setPostType] = useState<PostType>("job");

  const [form, setForm] = useState({ title: "", company: "", location: "", salary: "", description: "", tags: "", duration: "", budget: "", deadline: "" });

  const handlePost = () => {
    if (!form.title) return;
    if (postType === "freelance") {
      const newGig: Gig = { id: Date.now(), client: "You", title: form.title, budget: form.budget || "Negotiable", deadline: form.deadline || "TBD", tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), proposals: 0, description: form.description };
      setGigs(prev => [newGig, ...prev]);
    } else {
      const newJob: Job = { id: Date.now(), title: form.title, company: form.company || "Your Company", location: form.location || "Remote", salary: form.salary || "Negotiable", posted: "Just now", tags: form.tags.split(",").map(t => t.trim()).filter(Boolean), type: postType === "internship" ? "internship" : "job", duration: form.duration, description: form.description };
      if (postType === "internship") setInternships(prev => [newJob, ...prev]);
      else setJobs(prev => [newJob, ...prev]);
    }
    setForm({ title: "", company: "", location: "", salary: "", description: "", tags: "", duration: "", budget: "", deadline: "" });
    setCreateOpen(false);
  };

  const handleApply = (id: number, type: "job" | "internship") => {
    const setter = type === "job" ? setJobs : setInternships;
    setter(prev => prev.map(j => j.id === id ? { ...j, applied: true } : j));
    setDetailJob(null);
  };

  const handleProposal = (id: number) => {
    setGigs(prev => prev.map(g => g.id === id ? { ...g, proposalSent: true, proposals: g.proposals + 1 } : g));
    setDetailGig(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <h1 className="font-display text-3xl font-bold">Job Board</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="warm" size="sm"><Plus className="w-4 h-4 mr-1" /> Post Listing</Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Post a Listing</DialogTitle>
              </DialogHeader>
              <div className="flex gap-2 mt-4 mb-4">
                {(["job", "internship", "freelance"] as PostType[]).map(t => (
                  <button key={t} onClick={() => setPostType(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${postType === t ? "bg-gradient-primary text-primary-foreground shadow-lg" : "glass-card text-muted-foreground"}`}>
                    {t === "job" ? "Full-time Job" : t === "internship" ? "Internship" : "Freelance Gig"}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">{postType === "freelance" ? "Project Title *" : "Job Title *"}</label>
                  <Input placeholder={postType === "freelance" ? "e.g. Build a Dashboard" : "e.g. Senior Developer"} value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-muted/50 border-border" />
                </div>
                {postType !== "freelance" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Company</label>
                      <Input placeholder="Company name" value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Location</label>
                      <Input placeholder="Remote / City" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                  </div>
                )}
                {postType !== "freelance" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Salary</label>
                      <Input placeholder="e.g. $80K-$120K" value={form.salary} onChange={e => setForm(f => ({ ...f, salary: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                    {postType === "internship" && (
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Duration</label>
                        <Input placeholder="e.g. 3 months" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="bg-muted/50 border-border" />
                      </div>
                    )}
                  </div>
                )}
                {postType === "freelance" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Budget</label>
                      <Input placeholder="e.g. $1,000 - $3,000" value={form.budget} onChange={e => setForm(f => ({ ...f, budget: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Deadline</label>
                      <Input placeholder="e.g. 2 weeks" value={form.deadline} onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                  <Textarea placeholder="Describe the role or project..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="bg-muted/50 border-border" rows={3} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Tags (comma-separated)</label>
                  <Input placeholder="React, TypeScript, AWS" value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} className="bg-muted/50 border-border" />
                </div>
                <Button variant="hero" className="w-full" onClick={handlePost} disabled={!form.title}>
                  Publish Listing
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.key ? "bg-gradient-primary text-primary-foreground shadow-lg glow-primary" : "glass-card text-muted-foreground hover:text-foreground"}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {/* Job Detail Dialog */}
        <Dialog open={!!detailJob} onOpenChange={(open) => !open && setDetailJob(null)}>
          <DialogContent className="glass-card border-border max-w-lg">
            {detailJob && (
              <>
                <DialogHeader><DialogTitle className="font-display text-xl">{detailJob.title}</DialogTitle></DialogHeader>
                <p className="text-sm text-muted-foreground">{detailJob.company}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {detailJob.location}</span>
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {detailJob.salary}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {detailJob.posted}</span>
                  {detailJob.duration && <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {detailJob.duration}</span>}
                </div>
                <div className="flex gap-2 mt-3">{detailJob.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>)}</div>
                <p className="text-sm text-muted-foreground mt-4">{detailJob.description || "No description provided."}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  {detailJob.applied ? (
                    <Button variant="glass" disabled className="w-full"><CheckCircle className="w-4 h-4 mr-1" /> Applied</Button>
                  ) : (
                    <Button variant="hero" className="w-full" onClick={() => handleApply(detailJob.id, detailJob.type)}>Apply Now <ExternalLink className="w-4 h-4 ml-1" /></Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Gig Detail Dialog */}
        <Dialog open={!!detailGig} onOpenChange={(open) => !open && setDetailGig(null)}>
          <DialogContent className="glass-card border-border max-w-lg">
            {detailGig && (
              <>
                <DialogHeader><DialogTitle className="font-display text-xl">{detailGig.title}</DialogTitle></DialogHeader>
                <p className="text-sm text-muted-foreground">Client: {detailGig.client}</p>
                <div className="flex flex-wrap gap-3 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><DollarSign className="w-4 h-4" /> {detailGig.budget}</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {detailGig.deadline}</span>
                  <span className="flex items-center gap-1"><User className="w-4 h-4" /> {detailGig.proposals} proposals</span>
                </div>
                <div className="flex gap-2 mt-3">{detailGig.tags.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{t}</span>)}</div>
                <p className="text-sm text-muted-foreground mt-4">{detailGig.description}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  {detailGig.proposalSent ? (
                    <Button variant="glass" disabled className="w-full"><CheckCircle className="w-4 h-4 mr-1" /> Proposal Sent</Button>
                  ) : (
                    <Button variant="warm" className="w-full" onClick={() => handleProposal(detailGig.id)}><Send className="w-4 h-4 mr-1" /> Send Proposal</Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Full-time Jobs */}
        {activeTab === "jobs" && (
          <div className="space-y-3">
            {jobs.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/20 transition-all duration-300 cursor-pointer" onClick={() => setDetailJob(job)}>
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0"><Briefcase className="w-5 h-5 text-primary" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.posted}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {job.tags.map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">Full-time</span>
                  </div>
                </div>
                {job.applied ? (
                  <span className="text-xs text-primary font-medium flex items-center gap-1 shrink-0"><CheckCircle className="w-3 h-3" /> Applied</span>
                ) : (
                  <Button variant="hero" size="sm" className="shrink-0" onClick={e => { e.stopPropagation(); handleApply(job.id, "job"); }}>Apply <ExternalLink className="w-3 h-3 ml-1" /></Button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Internships */}
        {activeTab === "internships" && (
          <div className="space-y-3">
            {internships.map((job, i) => (
              <motion.div key={job.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-primary/20 transition-all duration-300 cursor-pointer" onClick={() => setDetailJob(job)}>
                <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center shrink-0"><Building2 className="w-5 h-5 text-secondary" /></div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display font-semibold text-foreground">{job.title}</h3>
                  <p className="text-sm text-muted-foreground">{job.company}</p>
                  <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {job.salary}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {job.duration}</span>
                  </div>
                  <div className="flex gap-2 mt-2">
                    {job.tags.map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>)}
                    <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">Internship</span>
                  </div>
                </div>
                {job.applied ? (
                  <span className="text-xs text-primary font-medium flex items-center gap-1 shrink-0"><CheckCircle className="w-3 h-3" /> Applied</span>
                ) : (
                  <Button variant="hero" size="sm" className="shrink-0" onClick={e => { e.stopPropagation(); handleApply(job.id, "internship"); }}>Apply <ExternalLink className="w-3 h-3 ml-1" /></Button>
                )}
              </motion.div>
            ))}
          </div>
        )}

        {/* Freelancing */}
        {activeTab === "freelancing" && (
          <div className="space-y-3">
            <p className="text-muted-foreground text-sm mb-4">Clients looking to hire freelancers for their projects.</p>
            {gigs.map((gig, i) => (
              <motion.div key={gig.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} className="glass-card rounded-xl p-5 hover:border-primary/20 transition-all duration-300 cursor-pointer" onClick={() => setDetailGig(gig)}>
                <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center shrink-0"><User className="w-5 h-5 text-accent" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-muted-foreground">Posted by</span>
                      <span className="text-xs font-semibold text-foreground">{gig.client}</span>
                    </div>
                    <h3 className="font-display font-semibold text-foreground text-lg">{gig.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{gig.description}</p>
                    <div className="flex flex-wrap gap-3 mt-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><DollarSign className="w-3 h-3" /> {gig.budget}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {gig.deadline}</span>
                      <span className="flex items-center gap-1"><User className="w-3 h-3" /> {gig.proposals} proposals</span>
                    </div>
                    <div className="flex gap-2 mt-2">{gig.tags.map(tag => <span key={tag} className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{tag}</span>)}</div>
                  </div>
                  {gig.proposalSent ? (
                    <span className="text-xs text-primary font-medium flex items-center gap-1 shrink-0"><CheckCircle className="w-3 h-3" /> Sent</span>
                  ) : (
                    <Button variant="warm" size="sm" className="shrink-0" onClick={e => { e.stopPropagation(); handleProposal(gig.id); }}>Send Proposal</Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Jobs;
