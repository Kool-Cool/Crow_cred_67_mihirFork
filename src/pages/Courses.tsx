import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Star, Users, Clock, BookOpen, Plus, ShoppingCart, X, CheckCircle } from "lucide-react";
import { useState } from "react";

interface Course {
  id: number;
  title: string;
  instructor: string;
  price: number;
  rating: number;
  students: number;
  duration: string;
  tag: string;
  color: string;
  description: string;
  category: string;
  modules: string[];
  enrolled?: boolean;
  owned?: boolean;
}

const initialCourses: Course[] = [
  { id: 1, title: "Full-Stack Web Dev Bootcamp", instructor: "Aarav Sharma", price: 49.99, rating: 4.8, students: 1200, duration: "24h", tag: "Bestseller", color: "bg-gradient-primary", description: "Master modern web development from frontend to backend.", category: "Web Dev", modules: ["HTML/CSS", "React", "Node.js", "Databases"] },
  { id: 2, title: "AI & Machine Learning Fundamentals", instructor: "Priya Patel", price: 39.99, rating: 4.7, students: 890, duration: "18h", tag: "New", color: "bg-gradient-warm", description: "Learn the core concepts of AI and ML with hands-on projects.", category: "AI/ML", modules: ["Python Basics", "Neural Networks", "NLP", "Computer Vision"] },
  { id: 3, title: "System Design Masterclass", instructor: "Ravi Kumar", price: 59.99, rating: 4.9, students: 650, duration: "20h", tag: "Top Rated", color: "bg-gradient-primary", description: "Design scalable systems used by millions.", category: "System Design", modules: ["Scalability", "Load Balancing", "Caching", "Databases"] },
  { id: 4, title: "DevOps & Cloud Engineering", instructor: "Neha Gupta", price: 44.99, rating: 4.6, students: 430, duration: "16h", tag: "", color: "bg-gradient-warm", description: "Master CI/CD, containers, and cloud infrastructure.", category: "DevOps", modules: ["Docker", "Kubernetes", "AWS", "CI/CD Pipelines"] },
];

const categories = ["Web Dev", "AI/ML", "System Design", "DevOps", "Mobile Dev", "Cybersecurity", "Data Science", "Other"];

const Courses = () => {
  const [tab, setTab] = useState<"browse" | "my">("browse");
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [createOpen, setCreateOpen] = useState(false);
  const [detailCourse, setDetailCourse] = useState<Course | null>(null);
  const [purchaseSuccess, setPurchaseSuccess] = useState<number | null>(null);

  // Create form state
  const [form, setForm] = useState({ title: "", description: "", price: "", duration: "", category: "Web Dev", modules: "" });

  const handleCreate = () => {
    if (!form.title || !form.price) return;
    const newCourse: Course = {
      id: Date.now(),
      title: form.title,
      instructor: "You",
      price: parseFloat(form.price),
      rating: 0,
      students: 0,
      duration: form.duration || "0h",
      tag: "New",
      color: Math.random() > 0.5 ? "bg-gradient-primary" : "bg-gradient-warm",
      description: form.description,
      category: form.category,
      modules: form.modules.split(",").map(m => m.trim()).filter(Boolean),
      owned: true,
    };
    setCourses(prev => [newCourse, ...prev]);
    setForm({ title: "", description: "", price: "", duration: "", category: "Web Dev", modules: "" });
    setCreateOpen(false);
  };

  const handleEnroll = (courseId: number) => {
    setCourses(prev => prev.map(c => c.id === courseId ? { ...c, enrolled: true, students: c.students + 1 } : c));
    setPurchaseSuccess(courseId);
    setTimeout(() => setPurchaseSuccess(null), 3000);
  };

  const myCourses = courses.filter(c => c.enrolled || c.owned);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="container mx-auto px-4 pt-24 pb-16">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8">
          <h1 className="font-display text-3xl font-bold">Courses</h1>
          <Dialog open={createOpen} onOpenChange={setCreateOpen}>
            <DialogTrigger asChild>
              <Button variant="warm" size="sm"><Plus className="w-4 h-4 mr-1" /> Create Course</Button>
            </DialogTrigger>
            <DialogContent className="glass-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="font-display text-xl">Create Your Course</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 mt-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Course Title *</label>
                  <Input placeholder="e.g. React Mastery" value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="bg-muted/50 border-border" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Description</label>
                  <Textarea placeholder="What will students learn?" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="bg-muted/50 border-border" rows={3} />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Price ($) *</label>
                    <Input type="number" placeholder="29.99" value={form.price} onChange={e => setForm(f => ({ ...f, price: e.target.value }))} className="bg-muted/50 border-border" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Duration</label>
                    <Input placeholder="e.g. 12h" value={form.duration} onChange={e => setForm(f => ({ ...f, duration: e.target.value }))} className="bg-muted/50 border-border" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({ ...f, category: e.target.value }))} className="w-full px-3 py-2 rounded-md bg-muted/50 border border-border text-foreground text-sm">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Modules (comma-separated)</label>
                  <Input placeholder="Intro, Basics, Advanced, Project" value={form.modules} onChange={e => setForm(f => ({ ...f, modules: e.target.value }))} className="bg-muted/50 border-border" />
                </div>
                <Button variant="hero" className="w-full" onClick={handleCreate} disabled={!form.title || !form.price}>
                  Publish Course
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        <div className="flex gap-2 mb-8">
          <Button variant={tab === "browse" ? "default" : "glass"} size="sm" onClick={() => setTab("browse")}>
            <BookOpen className="w-4 h-4 mr-1" /> Browse
          </Button>
          <Button variant={tab === "my" ? "default" : "glass"} size="sm" onClick={() => setTab("my")}>
            My Courses ({myCourses.length})
          </Button>
        </div>

        {/* Purchase Success Toast */}
        <AnimatePresence>
          {purchaseSuccess && (
            <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="fixed top-20 right-4 z-50 glass-card rounded-xl p-4 flex items-center gap-3 shadow-lg border border-primary/20">
              <CheckCircle className="w-5 h-5 text-primary" />
              <span className="font-medium text-sm">Successfully enrolled! Check "My Courses".</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Course Detail Dialog */}
        <Dialog open={!!detailCourse} onOpenChange={(open) => !open && setDetailCourse(null)}>
          <DialogContent className="glass-card border-border max-w-lg max-h-[90vh] overflow-y-auto">
            {detailCourse && (
              <>
                <div className={`h-36 ${detailCourse.color} rounded-t-lg -mx-6 -mt-6 mb-4 flex items-center justify-center`}>
                  <BookOpen className="w-16 h-16 text-primary-foreground/30" />
                </div>
                <DialogHeader>
                  <DialogTitle className="font-display text-xl">{detailCourse.title}</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-muted-foreground">by {detailCourse.instructor}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Star className="w-4 h-4 text-secondary" /> {detailCourse.rating || "No ratings"}</span>
                  <span className="flex items-center gap-1"><Users className="w-4 h-4" /> {detailCourse.students} students</span>
                  <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {detailCourse.duration}</span>
                </div>
                <p className="text-sm text-muted-foreground mt-4">{detailCourse.description || "No description provided."}</p>
                {detailCourse.modules.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">Modules</h4>
                    <div className="space-y-1">
                      {detailCourse.modules.map((m, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span className="w-5 h-5 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center">{i + 1}</span>
                          {m}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                  <span className="font-display font-bold text-2xl">${detailCourse.price}</span>
                  {detailCourse.enrolled ? (
                    <Button variant="glass" disabled><CheckCircle className="w-4 h-4 mr-1" /> Enrolled</Button>
                  ) : detailCourse.owned ? (
                    <Button variant="glass" disabled>Your Course</Button>
                  ) : (
                    <Button variant="hero" onClick={() => { handleEnroll(detailCourse.id); setDetailCourse(null); }}>
                      <ShoppingCart className="w-4 h-4 mr-1" /> Enroll Now
                    </Button>
                  )}
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>

        {tab === "browse" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-xl overflow-hidden group cursor-pointer"
                onClick={() => setDetailCourse(course)}
              >
                <div className={`h-32 ${course.color} relative`}>
                  {course.tag && (
                    <span className="absolute top-3 left-3 text-xs font-semibold px-2 py-1 rounded-full bg-background/80 text-foreground">{course.tag}</span>
                  )}
                  {course.owned && (
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-secondary/80 text-secondary-foreground">Your Course</span>
                  )}
                  {course.enrolled && (
                    <span className="absolute top-3 right-3 text-xs font-semibold px-2 py-1 rounded-full bg-primary/80 text-primary-foreground">Enrolled</span>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="font-display font-semibold text-foreground mb-1 line-clamp-2">{course.title}</h3>
                  <p className="text-xs text-muted-foreground mb-1">{course.instructor}</p>
                  <p className="text-xs text-muted-foreground/70 mb-3">{course.category}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Star className="w-3 h-3 text-secondary" /> {course.rating || "New"}</span>
                    <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {course.students}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> {course.duration}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display font-bold text-lg text-foreground">${course.price}</span>
                    {course.enrolled ? (
                      <span className="text-xs text-primary font-medium flex items-center gap-1"><CheckCircle className="w-3 h-3" /> Enrolled</span>
                    ) : (
                      <Button variant="hero" size="sm" className="text-xs" onClick={(e) => { e.stopPropagation(); handleEnroll(course.id); }}>
                        <ShoppingCart className="w-3 h-3 mr-1" /> Enroll
                      </Button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {tab === "my" && (
          <div>
            {myCourses.length === 0 ? (
              <div className="text-center py-16">
                <BookOpen className="w-12 h-12 mx-auto text-muted-foreground/30 mb-4" />
                <p className="text-muted-foreground">No courses yet. Browse and enroll or create your own!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {myCourses.map((course, i) => (
                  <motion.div
                    key={course.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    className="glass-card rounded-xl overflow-hidden cursor-pointer"
                    onClick={() => setDetailCourse(course)}
                  >
                    <div className={`h-24 ${course.color} relative flex items-center justify-center`}>
                      {course.owned && <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-secondary/80 text-secondary-foreground">Creator</span>}
                      {course.enrolled && !course.owned && <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full bg-primary/80 text-primary-foreground">Student</span>}
                    </div>
                    <div className="p-4">
                      <h3 className="font-display font-semibold text-sm mb-1">{course.title}</h3>
                      <p className="text-xs text-muted-foreground">{course.owned ? `${course.students} students enrolled` : `by ${course.instructor}`}</p>
                      {course.enrolled && !course.owned && (
                        <div className="mt-2">
                          <div className="w-full h-1.5 rounded-full bg-muted overflow-hidden">
                            <div className="h-full bg-gradient-primary rounded-full" style={{ width: "0%" }} />
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">0% complete</p>
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Courses;
