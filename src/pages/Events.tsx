import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, ArrowRight, Code, Trophy, BookOpen, FlaskConical, Plus, CheckCircle } from "lucide-react";
import { useState } from "react";

type EventTab = "hackathons" | "competitions" | "conferences";
type EventType = "hackathon" | "competition" | "conference";

interface Hackathon { id: number; title: string; date: string; location: string; participants: number; status: string; prize: string; description?: string; registered?: boolean; }
interface Competition { id: number; title: string; date: string; location: string; participants: number; status: string; type: string; description?: string; registered?: boolean; }
interface Conference { id: number; title: string; date: string; location: string; speakers: number; status: string; topics: string[]; description?: string; registered?: boolean; }

const initialHackathons: Hackathon[] = [
  { id: 1, title: "CrowdCred Hack 2026", date: "Mar 15-17, 2026", location: "Virtual", participants: 500, status: "Open", prize: "$10,000", description: "Build innovative solutions in 48 hours. Open to all skill levels." },
  { id: 2, title: "Green Tech Hackathon", date: "Apr 20-22, 2026", location: "Berlin", participants: 300, status: "Open", prize: "$5,000", description: "Hack for sustainability and climate tech solutions." },
  { id: 3, title: "AI Innovation Sprint", date: "May 1-3, 2026", location: "Virtual", participants: 800, status: "Coming Soon", prize: "$15,000", description: "Push the boundaries of AI with creative applications." },
];

const initialCompetitions: Competition[] = [
  { id: 4, title: "System Design Championship", date: "Apr 5, 2026", location: "Bangalore", participants: 300, status: "Open", type: "System Design", description: "Design scalable architectures under time pressure." },
  { id: 5, title: "Competitive Programming League", date: "Mar 28, 2026", location: "Virtual", participants: 1200, status: "Open", type: "DSA", description: "Solve algorithmic challenges and climb the ranks." },
  { id: 6, title: "Tech Quiz Masters", date: "Apr 12, 2026", location: "Virtual", participants: 500, status: "Coming Soon", type: "Quiz", description: "Test your knowledge across all tech domains." },
  { id: 7, title: "CTF Cyber Challenge", date: "May 10, 2026", location: "Online", participants: 400, status: "Open", type: "Cybersecurity", description: "Capture the flag in this cybersecurity competition." },
];

const initialConferences: Conference[] = [
  { id: 8, title: "AI & ML Research Summit", date: "Jun 5-7, 2026", location: "MIT, Boston", speakers: 40, status: "Open", topics: ["LLMs", "Computer Vision"], description: "Leading researchers present cutting-edge AI/ML work." },
  { id: 9, title: "Distributed Systems Conf", date: "Jul 15-16, 2026", location: "Virtual", speakers: 25, status: "Coming Soon", topics: ["Consensus", "Scalability"], description: "Deep dive into distributed systems research." },
  { id: 10, title: "HCI & UX Research Forum", date: "Aug 2-3, 2026", location: "London", speakers: 30, status: "Open", topics: ["Accessibility", "AR/VR"], description: "Explore the future of human-computer interaction." },
];

const tabsList: { key: EventTab; label: string; icon: typeof Code }[] = [
  { key: "hackathons", label: "Hackathons", icon: Code },
  { key: "competitions", label: "Competitions", icon: Trophy },
  { key: "conferences", label: "Research Conferences", icon: FlaskConical },
];

const compTypes = ["System Design", "DSA", "Quiz", "Cybersecurity", "Other"];

const Events = () => {
  const [activeTab, setActiveTab] = useState<EventTab>("hackathons");
  const [hackathons, setHackathons] = useState(initialHackathons);
  const [competitions, setCompetitions] = useState(initialCompetitions);
  const [conferences, setConferences] = useState(initialConferences);
  const [createOpen, setCreateOpen] = useState(false);
  const [eventType, setEventType] = useState<EventType>("hackathon");
  const [detailEvent, setDetailEvent] = useState<any>(null);
  const [detailType, setDetailType] = useState<EventType>("hackathon");

  const [form, setForm] = useState({ title: "", date: "", location: "", description: "", prize: "", compType: "DSA", topics: "", speakers: "" });

  const handleCreate = () => {
    if (!form.title) return;
    if (eventType === "hackathon") {
      setHackathons(prev => [{ id: Date.now(), title: form.title, date: form.date || "TBD", location: form.location || "Virtual", participants: 0, status: "Open", prize: form.prize || "TBD", description: form.description }, ...prev]);
    } else if (eventType === "competition") {
      setCompetitions(prev => [{ id: Date.now(), title: form.title, date: form.date || "TBD", location: form.location || "Virtual", participants: 0, status: "Open", type: form.compType, description: form.description }, ...prev]);
    } else {
      setConferences(prev => [{ id: Date.now(), title: form.title, date: form.date || "TBD", location: form.location || "Virtual", speakers: parseInt(form.speakers) || 0, status: "Open", topics: form.topics.split(",").map(t => t.trim()).filter(Boolean), description: form.description }, ...prev]);
    }
    setForm({ title: "", date: "", location: "", description: "", prize: "", compType: "DSA", topics: "", speakers: "" });
    setCreateOpen(false);
  };

  const handleRegister = (id: number, type: EventType) => {
    if (type === "hackathon") setHackathons(prev => prev.map(e => e.id === id ? { ...e, registered: true, participants: e.participants + 1 } : e));
    else if (type === "competition") setCompetitions(prev => prev.map(e => e.id === id ? { ...e, registered: true, participants: e.participants + 1 } : e));
    else setConferences(prev => prev.map(e => e.id === id ? { ...e, registered: true } : e));
    setDetailEvent(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-6">
          <div>
            <h1 className="font-display text-3xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground">Compete, learn, and connect with builders worldwide.</p>
          </div>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="warm" size="sm"><Plus className="w-4 h-4 mr-1" /> Organize Event</Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader><DialogTitle className="font-display text-xl">Organize an Event</DialogTitle></DialogHeader>
              <div className="flex gap-2 mt-4 mb-4">
                {(["hackathon", "competition", "conference"] as EventType[]).map(t => (
                  <button key={t} onClick={() => setEventType(t)} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${eventType === t ? "bg-gradient-primary text-primary-foreground shadow-lg" : "glass-card text-muted-foreground"}`}>
                    {t === "hackathon" ? "Hackathon" : t === "competition" ? "Competition" : "Conference"}
                  </button>
                ))}
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Event Title *</label>
                  <Input placeholder="e.g. CrowdCred Hack 2026" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-muted/50 border-border" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Date</label>
                    <Input placeholder="e.g. Apr 5-7, 2026" value={form.date} onChange={e => setForm(f => ({ ...f, date: e.target.value }))} className="bg-muted/50 border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Location</label>
                    <Input placeholder="Virtual / City" value={form.location} onChange={e => setForm(f => ({ ...f, location: e.target.value }))} className="bg-muted/50 border-border" />
                  </div>
                </div>
                {eventType === "hackathon" && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Prize Pool</label>
                    <Input placeholder="e.g. $5,000" value={form.prize} onChange={e => setForm(f => ({ ...f, prize: e.target.value }))} className="bg-muted/50 border-border" />
                  </div>
                )}
                {eventType === "competition" && (
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Competition Type</label>
                    <select value={form.compType} onChange={e => setForm(f => ({ ...f, compType: e.target.value }))} className="w-full px-3 py-2 rounded-md bg-muted/50 border border-border text-foreground text-sm">
                      {compTypes.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                )}
                {eventType === "conference" && (
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Number of Speakers</label>
                      <Input type="number" placeholder="e.g. 20" value={form.speakers} onChange={e => setForm(f => ({ ...f, speakers: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Topics (comma-separated)</label>
                      <Input placeholder="AI, ML, Web3" value={form.topics} onChange={e => setForm(f => ({ ...f, topics: e.target.value }))} className="bg-muted/50 border-border" />
                    </div>
                  </div>
                )}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                  <Textarea placeholder="Describe your event..." value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="bg-muted/50 border-border" rows={3} />
                </div>
                <Button variant="hero" className="w-full" onClick={handleCreate} disabled={!form.title}>Publish Event</Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Event Detail Dialog */}
        <Dialog open={!!detailEvent} onOpenChange={(open) => !open && setDetailEvent(null)}>
          <DialogContent className="glass-card border-border max-w-lg">
            {detailEvent && (
              <>
                <div className={`h-28 ${detailType === "hackathon" ? "bg-gradient-primary" : detailType === "competition" ? "bg-gradient-warm" : "bg-gradient-surface"} rounded-t-lg -mx-6 -mt-6 mb-4 flex items-center justify-center`}>
                  {detailType === "hackathon" ? <Code className="w-12 h-12 text-primary-foreground/30" /> : detailType === "competition" ? <Trophy className="w-12 h-12 text-primary-foreground/30" /> : <FlaskConical className="w-12 h-12 text-accent/30" />}
                </div>
                <DialogHeader><DialogTitle className="font-display text-xl">{detailEvent.title}</DialogTitle></DialogHeader>
                <div className="space-y-2 mt-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {detailEvent.date}</div>
                  <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {detailEvent.location}</div>
                  <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {detailEvent.participants || detailEvent.speakers || 0} {detailEvent.speakers !== undefined ? "speakers" : "participants"}</div>
                </div>
                {detailEvent.prize && <p className="text-sm font-semibold text-primary mt-2">Prize: {detailEvent.prize}</p>}
                {detailEvent.type && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{detailEvent.type}</span>}
                {detailEvent.topics && (
                  <div className="flex gap-1 flex-wrap mt-2">{detailEvent.topics.map((t: string) => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{t}</span>)}</div>
                )}
                <p className="text-sm text-muted-foreground mt-4">{detailEvent.description || "No description provided."}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  {detailEvent.registered ? (
                    <Button variant="glass" disabled className="w-full"><CheckCircle className="w-4 h-4 mr-1" /> Registered</Button>
                  ) : detailEvent.status !== "Open" ? (
                    <Button variant="glass" disabled className="w-full">{detailEvent.status}</Button>
                  ) : (
                    <Button variant="hero" className="w-full" onClick={() => handleRegister(detailEvent.id, detailType)}>Register Now <ArrowRight className="w-4 h-4 ml-1" /></Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabsList.map(tab => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key)} className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeTab === tab.key ? "bg-gradient-primary text-primary-foreground shadow-lg glow-primary" : "glass-card text-muted-foreground hover:text-foreground"}`}>
              <tab.icon className="w-4 h-4" />{tab.label}
            </button>
          ))}
        </div>

        {/* Hackathons */}
        {activeTab === "hackathons" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hackathons.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="glass-card rounded-xl overflow-hidden cursor-pointer" onClick={() => { setDetailEvent(event); setDetailType("hackathon"); }}>
                <div className="h-28 bg-gradient-primary relative flex items-center justify-center">
                  <Code className="w-12 h-12 text-primary-foreground/30" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-background/80 text-foreground">Hackathon</span>
                  {event.registered && <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary/80 text-primary-foreground">Registered</span>}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                    <div className="flex items-center gap-2"><Users className="w-4 h-4" /> {event.participants} participants</div>
                  </div>
                  <p className="text-sm font-semibold text-primary mb-4">Prize: {event.prize}</p>
                  {event.registered ? (
                    <Button variant="glass" className="w-full" size="sm" disabled><CheckCircle className="w-4 h-4 mr-1" /> Registered</Button>
                  ) : (
                    <Button variant={event.status === "Open" ? "hero" : "glass"} className="w-full" size="sm" disabled={event.status !== "Open"} onClick={e => { e.stopPropagation(); handleRegister(event.id, "hackathon"); }}>
                      {event.status === "Open" ? <>Register <ArrowRight className="w-4 h-4 ml-1" /></> : event.status}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Competitions */}
        {activeTab === "competitions" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {competitions.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="glass-card rounded-xl p-5 cursor-pointer" onClick={() => { setDetailEvent(event); setDetailType("competition"); }}>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-warm flex items-center justify-center shrink-0"><Trophy className="w-6 h-6 text-primary-foreground" /></div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1"><span className="text-xs px-2 py-0.5 rounded-full bg-secondary/10 text-secondary">{event.type}</span></div>
                    <h3 className="font-display font-semibold text-foreground">{event.title}</h3>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                      <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.participants}</span>
                    </div>
                  </div>
                  {event.registered ? (
                    <span className="text-xs text-primary font-medium flex items-center gap-1 shrink-0"><CheckCircle className="w-3 h-3" /> Joined</span>
                  ) : (
                    <Button variant={event.status === "Open" ? "hero" : "glass"} size="sm" disabled={event.status !== "Open"} onClick={e => { e.stopPropagation(); handleRegister(event.id, "competition"); }}>
                      {event.status === "Open" ? "Join" : event.status}
                    </Button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Conferences */}
        {activeTab === "conferences" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {conferences.map((event, i) => (
              <motion.div key={event.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} whileHover={{ y: -4 }} className="glass-card rounded-xl overflow-hidden cursor-pointer" onClick={() => { setDetailEvent(event); setDetailType("conference"); }}>
                <div className="h-24 bg-gradient-surface relative flex items-center justify-center border-b border-border">
                  <FlaskConical className="w-10 h-10 text-accent/40" />
                  <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-accent/10 text-accent">Conference</span>
                  {event.registered && <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary/80 text-primary-foreground">Registered</span>}
                </div>
                <div className="p-5">
                  <h3 className="font-display font-semibold text-lg mb-3">{event.title}</h3>
                  <div className="space-y-2 text-sm text-muted-foreground mb-2">
                    <div className="flex items-center gap-2"><Calendar className="w-4 h-4" /> {event.date}</div>
                    <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {event.location}</div>
                    <div className="flex items-center gap-2"><BookOpen className="w-4 h-4" /> {event.speakers} speakers</div>
                  </div>
                  <div className="flex gap-1 flex-wrap mb-4">{event.topics.map(t => <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-accent/10 text-accent">{t}</span>)}</div>
                  {event.registered ? (
                    <Button variant="glass" className="w-full" size="sm" disabled><CheckCircle className="w-4 h-4 mr-1" /> Registered</Button>
                  ) : (
                    <Button variant={event.status === "Open" ? "hero" : "glass"} className="w-full" size="sm" disabled={event.status !== "Open"} onClick={e => { e.stopPropagation(); handleRegister(event.id, "conference"); }}>
                      {event.status === "Open" ? <>Register <ArrowRight className="w-4 h-4 ml-1" /></> : event.status}
                    </Button>
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

export default Events;
