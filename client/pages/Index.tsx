import { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useToast } from "../hooks/use-toast";
import emailjs from "@emailjs/browser";
import {
  Mail,
  Phone,
  MapPin,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Send,
  Star,
  Quote,
  Menu,
  X,
  Loader2,
  ArrowRight,
  Code,
  Palette,
  TrendingUp,
  Zap,
  Eye,
  Heart,
  Coffee,
  Sparkles,
} from "lucide-react";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export default function Index() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    message: "",
  });
  const { toast } = useToast();

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (!serviceId || !templateId || !publicKey) {
        throw new Error("EmailJS configuration is missing");
      }

      await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: "Aryan Rathore",
        },
        publicKey,
      );

      toast({
        title: "Message Sent!",
        description: "Thank you for your message! I'll get back to you soon.",
      });

      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      const sections = [
        "hero",
        "about",
        "services",
        "projects",
        "tools",
        "testimonials",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    document.documentElement.style.scrollBehavior = "smooth";

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      document.documentElement.style.scrollBehavior = "auto";
    };
  }, []);

  return (
    <div className="min-h-screen bg-aryan-black text-aryan-black-foreground overflow-x-hidden">
      {/* Custom Cursor */}
      <div
        className="fixed w-4 h-4 border-2 border-aryan-gold rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: mousePosition.x - 8,
          top: mousePosition.y - 8,
          transition: "all 0.1s ease",
        }}
      />

      {/* Ambient Background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-aryan-black via-aryan-black to-gray-900"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-aryan-gold/3 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-80 h-80 bg-aryan-lavender/3 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 right-1/4 w-64 h-64 bg-aryan-sage/3 rounded-full blur-3xl animate-pulse delay-2000"></div>
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-aryan-black/70 backdrop-blur-xl border-b border-aryan-gold/10">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo with Creative Typography */}
            <div className="font-playfair text-3xl font-bold">
              <span className="bg-gradient-to-r from-aryan-gold via-aryan-lavender to-aryan-sage bg-clip-text text-transparent">
                Sam
              </span>
              <span className="text-aryan-gold">Verse</span>
              <div className="w-12 h-px bg-gradient-to-r from-aryan-gold to-aryan-lavender mt-1"></div>
            </div>

            {/* Desktop Navigation with Creative Indicators */}
            <div className="hidden lg:flex items-center space-x-12">
              {[
                { name: "About", id: "about", icon: Eye },
                { name: "Services", id: "services", icon: Zap },
                { name: "Projects", id: "projects", icon: Code },
                { name: "Tools", id: "tools", icon: Palette },
                { name: "Reviews", id: "testimonials", icon: Heart },
                { name: "Contact", id: "contact", icon: Coffee },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className={`group flex items-center space-x-2 font-inter transition-all duration-300 ${
                      activeSection === item.id
                        ? "text-aryan-gold"
                        : "text-aryan-black-foreground/70 hover:text-aryan-gold"
                    }`}
                  >
                    <Icon
                      size={16}
                      className="group-hover:scale-110 transition-transform"
                    />
                    <span>{item.name}</span>
                    {activeSection === item.id && (
                      <div className="w-1 h-1 bg-aryan-gold rounded-full animate-pulse"></div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-aryan-gold p-2"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden absolute top-20 left-0 w-full bg-aryan-black/95 backdrop-blur-xl border-b border-aryan-gold/10">
              <div className="px-6 py-8 space-y-6">
                {[
                  { name: "About", id: "about" },
                  { name: "Services", id: "services" },
                  { name: "Projects", id: "projects" },
                  { name: "Tools", id: "tools" },
                  { name: "Reviews", id: "testimonials" },
                  { name: "Contact", id: "contact" },
                ].map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => scrollToSection(item.id)}
                    className="block w-full text-left text-aryan-black-foreground hover:text-aryan-gold transition-colors font-inter text-lg"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section - Creative Asymmetric Layout */}
      <section
        id="hero"
        className="min-h-screen flex items-center px-6 lg:px-8 pt-20 relative"
      >
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Side - Typography Art */}
            <div className="space-y-8">
              {/* Creative Badge */}
              <div className="flex items-center space-x-4">
                <div className="w-12 h-px bg-aryan-gold"></div>
                <div className="px-4 py-2 border border-aryan-gold/30 rounded-full bg-aryan-gold/5">
                  <span className="text-aryan-gold text-sm font-inter uppercase tracking-wider">
                    ⚡ Available for Projects
                  </span>
                </div>
              </div>

              {/* Main Heading with Creative Layout */}
              <div className="space-y-4">
                <h1 className="text-6xl lg:text-8xl font-playfair font-bold leading-none">
                  <span className="block text-aryan-gold">Samruddhi</span>
                  <span className="block text-aryan-lavender">Vispute</span>
                </h1>
                <div className="w-24 h-1 bg-gradient-to-r from-aryan-gold via-aryan-lavender to-aryan-sage rounded-full"></div>
              </div>

              {/* Role with Creative Animation */}
              <div className="space-y-3">
                <div className="text-2xl lg:text-3xl font-space font-medium text-aryan-black-foreground/90">
                  <div className="flex items-center space-x-3 mb-2">
                    <TrendingUp className="text-aryan-gold" size={28} />
                    <span>Digital Marketing Expert</span>
                  </div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Code className="text-aryan-lavender" size={28} />
                    <span>Full-Stack Developer</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Palette className="text-aryan-sage" size={28} />
                    <span>Creative Designer</span>
                  </div>
                </div>
              </div>

              {/* Description */}
              <p className="text-xl text-aryan-black-foreground/70 font-inter leading-relaxed max-w-xl">
                Crafting digital experiences that bridge creativity and
                technology, delivering scalable solutions that drive growth and
                captivate audiences.
              </p>

              {/* CTA Buttons */}
              <div className="flex items-center space-x-6 pt-4">
                <Button
                  onClick={() => scrollToSection("contact")}
                  className="bg-aryan-gold text-aryan-gold-foreground hover:bg-aryan-gold/90 px-8 py-4 text-lg font-inter font-semibold rounded-xl transition-all duration-300 hover:scale-105 glow-effect group"
                >
                  <span>Let's Collaborate</span>
                  <ArrowRight
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                    size={20}
                  />
                </Button>
                <Button
                  onClick={() => scrollToSection("projects")}
                  variant="outline"
                  className="border-aryan-lavender/30 text-aryan-lavender hover:bg-aryan-lavender/10 px-8 py-4 text-lg font-inter rounded-xl transition-all duration-300"
                >
                  View Work
                </Button>
              </div>
            </div>

            {/* Right Side - Creative Visual */}
            <div className="relative">
              {/* Geometric Art */}
              <div className="relative w-full h-[600px] flex items-center justify-center">
                {/* Central Circle with Stats */}
                <div className="w-80 h-80 rounded-full border-2 border-aryan-gold/20 relative flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-5xl font-playfair font-bold text-aryan-gold mb-2">
                      5+
                    </div>
                    <div className="text-aryan-black-foreground/60 font-inter">
                      Years Experience
                    </div>
                  </div>

                  {/* Orbiting Elements */}
                  <div className="absolute inset-0 animate-spin-slow">
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-aryan-lavender/10 rounded-full flex items-center justify-center">
                      <Code className="text-aryan-lavender" size={24} />
                    </div>
                    <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-aryan-sage/10 rounded-full flex items-center justify-center">
                      <Palette className="text-aryan-sage" size={24} />
                    </div>
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 w-16 h-16 bg-aryan-gold/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="text-aryan-gold" size={24} />
                    </div>
                    <div className="absolute left-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-aryan-lavender/10 rounded-full flex items-center justify-center">
                      <Sparkles className="text-aryan-lavender" size={24} />
                    </div>
                  </div>
                </div>

                {/* Corner Elements */}
                <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-aryan-gold/30 rounded-tr-3xl"></div>
                <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-aryan-sage/30 rounded-bl-3xl"></div>

                {/* Floating Stats */}
                <div className="absolute top-16 left-8 bg-aryan-black/80 backdrop-blur-xl border border-aryan-gold/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-playfair font-bold text-aryan-gold mb-1">
                    50+
                  </div>
                  <div className="text-sm text-aryan-black-foreground/60 font-inter">
                    Projects
                  </div>
                </div>

                <div className="absolute bottom-16 right-8 bg-aryan-black/80 backdrop-blur-xl border border-aryan-lavender/20 rounded-2xl p-6 text-center">
                  <div className="text-3xl font-playfair font-bold text-aryan-lavender mb-1">
                    98%
                  </div>
                  <div className="text-sm text-aryan-black-foreground/60 font-inter">
                    Satisfaction
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center space-y-2">
          <div className="text-aryan-black-foreground/40 text-sm font-inter">
            Scroll to explore
          </div>
          <div className="w-px h-12 bg-gradient-to-b from-aryan-gold to-transparent animate-pulse"></div>
        </div>
      </section>

      {/* Creative Section Divider */}
      <div className="relative py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="relative">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-aryan-gold/30 to-transparent"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-aryan-black px-8">
              <div className="flex items-center space-x-4">
                <div className="w-3 h-3 bg-aryan-gold rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-aryan-lavender rounded-full animate-pulse delay-300"></div>
                <div className="w-2 h-2 bg-aryan-sage rounded-full animate-pulse delay-700"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section - Creative Grid Layout */}
      <section id="about" className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-16 h-px bg-aryan-lavender"></div>
              <div className="px-6 py-3 border border-aryan-lavender/20 rounded-full bg-aryan-lavender/5">
                <span className="text-aryan-lavender text-sm font-inter uppercase tracking-wider">
                  About Me
                </span>
              </div>
              <div className="w-16 h-px bg-aryan-lavender"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-playfair font-bold text-aryan-gold mb-6">
              The Creative Mind Behind
              <span className="block text-aryan-lavender">SamVerse</span>
            </h2>
          </div>

          {/* Creative Grid */}
          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Main Content */}
            <div className="lg:col-span-7 space-y-8">
              <div className="prose prose-lg prose-invert max-w-none">
                <p className="text-xl text-aryan-black-foreground/80 font-inter leading-relaxed mb-6">
                  Welcome to SamVerse, where digital innovation meets creative
                  excellence. I'm a multidisciplinary professional passionate
                  about creating impactful digital experiences that resonate
                  with audiences and drive meaningful results.
                </p>

                <p className="text-lg text-aryan-black-foreground/70 font-inter leading-relaxed mb-6">
                  My expertise spans across digital marketing strategy,
                  full-stack web development, and advanced graphic design. This
                  unique combination allows me to approach projects
                  holistically, ensuring that every element works in harmony to
                  achieve your goals.
                </p>

                <p className="text-lg text-aryan-black-foreground/70 font-inter leading-relaxed">
                  From building scalable web applications to crafting compelling
                  visual narratives, I help businesses and individuals tell
                  their stories through digital excellence.
                </p>
              </div>

              {/* Philosophy Cards */}
              <div className="grid md:grid-cols-2 gap-6 mt-12">
                <Card className="bg-gradient-to-br from-aryan-gold/5 to-aryan-gold/10 border-aryan-gold/20 p-8 group hover:border-aryan-gold/40 transition-all duration-300">
                  <Eye className="text-aryan-gold mb-4" size={32} />
                  <h3 className="text-xl font-playfair font-semibold text-aryan-gold mb-3">
                    Vision-Driven Design
                  </h3>
                  <p className="text-aryan-black-foreground/70 font-inter leading-relaxed">
                    Every project begins with understanding your unique vision
                    and translating it into compelling digital experiences.
                  </p>
                </Card>

                <Card className="bg-gradient-to-br from-aryan-sage/5 to-aryan-sage/10 border-aryan-sage/20 p-8 group hover:border-aryan-sage/40 transition-all duration-300">
                  <Zap className="text-aryan-sage mb-4" size={32} />
                  <h3 className="text-xl font-playfair font-semibold text-aryan-sage mb-3">
                    Performance Focused
                  </h3>
                  <p className="text-aryan-black-foreground/70 font-inter leading-relaxed">
                    Technical excellence and optimization are at the core of
                    every solution I deliver.
                  </p>
                </Card>
              </div>
            </div>

            {/* Sidebar with Creative Elements */}
            <div className="lg:col-span-5 space-y-8">
              {/* Skills Visualization */}
              <Card className="bg-aryan-black/50 border-aryan-lavender/20 p-8">
                <h3 className="text-2xl font-playfair font-bold text-aryan-lavender mb-8">
                  Expertise
                </h3>
                <div className="space-y-6">
                  {[
                    {
                      skill: "Digital Marketing",
                      level: 95,
                      color: "aryan-gold",
                    },
                    {
                      skill: "Web Development",
                      level: 92,
                      color: "aryan-lavender",
                    },
                    { skill: "UI/UX Design", level: 88, color: "aryan-sage" },
                    { skill: "Brand Strategy", level: 90, color: "aryan-gold" },
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-inter text-aryan-black-foreground/80">
                          {item.skill}
                        </span>
                        <span className={`text-${item.color} font-semibold`}>
                          {item.level}%
                        </span>
                      </div>
                      <div className="w-full bg-aryan-black-foreground/10 rounded-full h-2">
                        <div
                          className={`h-2 bg-gradient-to-r from-${item.color} to-${item.color}/70 rounded-full transition-all duration-1000`}
                          style={{ width: `${item.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Creative Achievement */}
              <Card className="bg-gradient-to-br from-aryan-black to-aryan-black/80 border-aryan-gold/20 p-8 text-center">
                <div className="w-16 h-16 bg-aryan-gold/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-aryan-gold" size={32} />
                </div>
                <h3 className="text-xl font-playfair font-bold text-aryan-gold mb-2">
                  5 Years Strong
                </h3>
                <p className="text-aryan-black-foreground/70 font-inter">
                  Delivering exceptional results with a 98% client satisfaction
                  rate
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section - Creative Asymmetric Cards */}
      <section
        id="services"
        className="py-24 px-6 lg:px-8 bg-gradient-to-b from-aryan-black to-aryan-black/95 relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-20 h-px bg-aryan-gold"></div>
              <div className="px-8 py-3 border border-aryan-gold/20 rounded-full bg-aryan-gold/5">
                <span className="text-aryan-gold text-sm font-inter uppercase tracking-wider">
                  ⚡ Services
                </span>
              </div>
              <div className="w-20 h-px bg-aryan-gold"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-playfair font-bold">
              <span className="text-aryan-gold">Creative</span>
              <span className="text-aryan-lavender"> Solutions</span>
            </h2>
            <p className="text-xl text-aryan-black-foreground/60 font-inter mt-6 max-w-2xl mx-auto">
              Transforming ideas into digital reality through strategic thinking
              and innovative execution
            </p>
          </div>

          {/* Creative Service Grid */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Digital Marketing */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-aryan-gold/10 to-aryan-gold/5 border-aryan-gold/20 hover:border-aryan-gold/40 transition-all duration-500 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-aryan-gold/5 rounded-full blur-2xl group-hover:bg-aryan-gold/10 transition-colors"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-aryan-gold/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <TrendingUp className="text-aryan-gold" size={32} />
                </div>
                <div className="absolute top-6 right-6 text-6xl font-playfair font-bold text-aryan-gold/10">
                  01
                </div>
                <h3 className="text-2xl font-playfair font-bold text-aryan-gold mb-4">
                  Digital Marketing
                </h3>
                <div className="w-12 h-px bg-aryan-gold/40 mb-6"></div>
                <p className="text-aryan-black-foreground/70 font-inter leading-relaxed mb-6">
                  Strategic campaigns that drive engagement, boost conversions,
                  and build lasting brand connections across all digital
                  channels.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["SEO", "PPC", "Social Media", "Analytics"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-aryan-gold/10 text-aryan-gold border-aryan-gold/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Full-Stack Development */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-aryan-lavender/10 to-aryan-lavender/5 border-aryan-lavender/20 hover:border-aryan-lavender/40 transition-all duration-500 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-aryan-lavender/5 rounded-full blur-2xl group-hover:bg-aryan-lavender/10 transition-colors"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-aryan-lavender/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <Code className="text-aryan-lavender" size={32} />
                </div>
                <div className="absolute top-6 right-6 text-6xl font-playfair font-bold text-aryan-lavender/10">
                  02
                </div>
                <h3 className="text-2xl font-playfair font-bold text-aryan-lavender mb-4">
                  Full-Stack Development
                </h3>
                <div className="w-12 h-px bg-aryan-lavender/40 mb-6"></div>
                <p className="text-aryan-black-foreground/70 font-inter leading-relaxed mb-6">
                  End-to-end web solutions using modern frameworks, ensuring
                  scalability, performance, and exceptional user experiences.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["React", "Node.js", "TypeScript", "Next.js"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-aryan-lavender/10 text-aryan-lavender border-aryan-lavender/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>

            {/* Graphic Design */}
            <Card className="group relative overflow-hidden bg-gradient-to-br from-aryan-sage/10 to-aryan-sage/5 border-aryan-sage/20 hover:border-aryan-sage/40 transition-all duration-500 hover:scale-105">
              <div className="absolute top-0 right-0 w-32 h-32 bg-aryan-sage/5 rounded-full blur-2xl group-hover:bg-aryan-sage/10 transition-colors"></div>
              <div className="relative p-8">
                <div className="w-16 h-16 bg-aryan-sage/10 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform duration-500">
                  <Palette className="text-aryan-sage" size={32} />
                </div>
                <div className="absolute top-6 right-6 text-6xl font-playfair font-bold text-aryan-sage/10">
                  03
                </div>
                <h3 className="text-2xl font-playfair font-bold text-aryan-sage mb-4">
                  Creative Design
                </h3>
                <div className="w-12 h-px bg-aryan-sage/40 mb-6"></div>
                <p className="text-aryan-black-foreground/70 font-inter leading-relaxed mb-6">
                  Visual storytelling through compelling designs, from brand
                  identity to motion graphics that captivate and communicate.
                </p>
                <div className="flex flex-wrap gap-2">
                  {["UI/UX", "Branding", "Motion", "Print"].map((tag) => (
                    <Badge
                      key={tag}
                      variant="secondary"
                      className="bg-aryan-sage/10 text-aryan-sage border-aryan-sage/20"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          {/* Process Visualization */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-playfair font-bold text-aryan-gold mb-12">
              My Creative Process
            </h3>
            <div className="flex justify-center items-center space-x-8 max-w-4xl mx-auto">
              {[
                { step: "Discover", icon: Eye, color: "aryan-gold" },
                { step: "Strategize", icon: Zap, color: "aryan-lavender" },
                { step: "Create", icon: Palette, color: "aryan-sage" },
                { step: "Deliver", icon: Sparkles, color: "aryan-gold" },
              ].map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className="flex items-center">
                    <div className="text-center">
                      <div
                        className={`w-16 h-16 bg-${item.color}/10 rounded-full flex items-center justify-center mb-3 border border-${item.color}/20`}
                      >
                        <Icon className={`text-${item.color}`} size={24} />
                      </div>
                      <div
                        className={`text-${item.color} font-inter font-medium`}
                      >
                        {item.step}
                      </div>
                    </div>
                    {index < 3 && (
                      <div className="w-12 h-px bg-gradient-to-r from-aryan-gold/40 to-aryan-lavender/40 mx-4"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section - Creative Masonry Layout */}
      <section id="projects" className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-20 h-px bg-aryan-sage"></div>
              <div className="px-8 py-3 border border-aryan-sage/20 rounded-full bg-aryan-sage/5">
                <span className="text-aryan-sage text-sm font-inter uppercase tracking-wider">
                  🚀 Portfolio
                </span>
              </div>
              <div className="w-20 h-px bg-aryan-sage"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-playfair font-bold">
              <span className="text-aryan-sage">Featured</span>
              <span className="text-aryan-gold"> Projects</span>
            </h2>
            <p className="text-xl text-aryan-black-foreground/60 font-inter mt-6 max-w-2xl mx-auto">
              A curated selection of projects showcasing innovation, creativity,
              and technical excellence
            </p>
          </div>

          {/* Creative Project Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "E-Commerce Platform",
                category: "Full-Stack Development",
                tech: ["React", "Node.js", "MongoDB", "Stripe"],
                color: "aryan-lavender",
                size: "large",
                description:
                  "Complete e-commerce solution with advanced analytics and payment integration.",
              },
              {
                title: "Brand Identity Suite",
                category: "Creative Design",
                tech: ["Adobe Suite", "Figma", "After Effects"],
                color: "aryan-sage",
                size: "medium",
                description:
                  "Comprehensive brand identity including logo, guidelines, and marketing materials.",
              },
              {
                title: "Marketing Campaign",
                category: "Digital Marketing",
                tech: ["Analytics", "SEO", "Social Media", "PPC"],
                color: "aryan-gold",
                size: "medium",
                description:
                  "Multi-channel marketing campaign resulting in 300% ROI increase.",
              },
              {
                title: "SaaS Dashboard",
                category: "UI/UX Design",
                tech: ["Next.js", "Tailwind", "TypeScript"],
                color: "aryan-lavender",
                size: "large",
                description:
                  "Intuitive dashboard design for complex data visualization and management.",
              },
              {
                title: "Mobile App Design",
                category: "Product Design",
                tech: ["React Native", "Expo", "Firebase"],
                color: "aryan-sage",
                size: "medium",
                description:
                  "Mobile-first design approach with seamless user experience.",
              },
              {
                title: "Motion Graphics",
                category: "Creative Design",
                tech: ["Blender", "After Effects", "Cinema 4D"],
                color: "aryan-gold",
                size: "medium",
                description:
                  "3D motion graphics for promotional videos and brand campaigns.",
              },
            ].map((project, index) => (
              <Card
                key={index}
                className={`group relative overflow-hidden bg-gradient-to-br from-${project.color}/10 to-${project.color}/5 border-${project.color}/20 hover:border-${project.color}/40 transition-all duration-500 hover:scale-105 cursor-pointer ${
                  project.size === "large" ? "md:col-span-2 lg:col-span-1" : ""
                }`}
              >
                {/* Project Image Placeholder */}
                <div
                  className={`h-48 ${project.size === "large" ? "lg:h-64" : ""} bg-gradient-to-br from-${project.color}/20 to-${project.color}/10 relative overflow-hidden`}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`text-6xl text-${project.color}/30`}>
                      {project.category.includes("Design")
                        ? "🎨"
                        : project.category.includes("Development")
                          ? "💻"
                          : "📈"}
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink
                      className={`text-${project.color}`}
                      size={20}
                    />
                  </div>
                </div>

                <div className="p-6">
                  <div
                    className={`text-${project.color} text-sm font-inter uppercase tracking-wider mb-2`}
                  >
                    {project.category}
                  </div>
                  <h3
                    className={`text-xl font-playfair font-bold text-${project.color} mb-3`}
                  >
                    {project.title}
                  </h3>
                  <p className="text-aryan-black-foreground/70 font-inter text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className={`bg-${project.color}/10 text-${project.color} border-${project.color}/20 text-xs`}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16">
            <Button
              onClick={() => scrollToSection("contact")}
              className="bg-aryan-sage text-aryan-sage-foreground hover:bg-aryan-sage/90 px-8 py-4 text-lg font-inter font-semibold rounded-xl transition-all duration-300 hover:scale-105 group"
            >
              <span>View All Projects</span>
              <ArrowRight
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </Button>
          </div>
        </div>
      </section>

      {/* Tools Section - Creative Circular Layout */}
      <section
        id="tools"
        className="py-24 px-6 lg:px-8 bg-gradient-to-b from-aryan-black/95 to-aryan-black relative"
      >
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-20 h-px bg-aryan-lavender"></div>
              <div className="px-8 py-3 border border-aryan-lavender/20 rounded-full bg-aryan-lavender/5">
                <span className="text-aryan-lavender text-sm font-inter uppercase tracking-wider">
                  🛠️ Tech Stack
                </span>
              </div>
              <div className="w-20 h-px bg-aryan-lavender"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-playfair font-bold">
              <span className="text-aryan-lavender">Tools &</span>
              <span className="text-aryan-sage"> Technologies</span>
            </h2>
          </div>

          {/* Creative Tool Categories */}
          <div className="grid lg:grid-cols-4 gap-8">
            {[
              {
                category: "Frontend",
                icon: Code,
                color: "aryan-gold",
                tools: [
                  "React",
                  "Next.js",
                  "TypeScript",
                  "Tailwind CSS",
                  "Three.js",
                  "Framer Motion",
                ],
              },
              {
                category: "Backend",
                icon: Zap,
                color: "aryan-lavender",
                tools: [
                  "Node.js",
                  "Express",
                  "Firebase",
                  "MongoDB",
                  "PostgreSQL",
                  "GraphQL",
                ],
              },
              {
                category: "Design",
                icon: Palette,
                color: "aryan-sage",
                tools: [
                  "Adobe Suite",
                  "Figma",
                  "Blender",
                  "After Effects",
                  "Sketch",
                  "Principle",
                ],
              },
              {
                category: "Marketing",
                icon: TrendingUp,
                color: "aryan-gold",
                tools: [
                  "Google Analytics",
                  "SEO Tools",
                  "Social Media",
                  "Email Marketing",
                  "A/B Testing",
                  "Heat Maps",
                ],
              },
            ].map((category, index) => {
              const Icon = category.icon;
              return (
                <Card
                  key={index}
                  className={`bg-gradient-to-br from-${category.color}/10 to-${category.color}/5 border-${category.color}/20 p-8 text-center group hover:border-${category.color}/40 transition-all duration-300`}
                >
                  <div
                    className={`w-16 h-16 bg-${category.color}/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <Icon className={`text-${category.color}`} size={32} />
                  </div>
                  <h3
                    className={`text-2xl font-playfair font-bold text-${category.color} mb-6`}
                  >
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.tools.map((tool) => (
                      <div
                        key={tool}
                        className={`bg-aryan-black/50 border border-${category.color}/20 rounded-lg py-3 px-4 text-aryan-black-foreground/80 font-inter text-sm hover:border-${category.color}/40 transition-colors`}
                      >
                        {tool}
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Creative Quote Layout */}
      <section id="testimonials" className="py-24 px-6 lg:px-8 relative">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-20 h-px bg-aryan-gold"></div>
              <div className="px-8 py-3 border border-aryan-gold/20 rounded-full bg-aryan-gold/5">
                <span className="text-aryan-gold text-sm font-inter uppercase tracking-wider">
                  💬 Testimonials
                </span>
              </div>
              <div className="w-20 h-px bg-aryan-gold"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-playfair font-bold">
              <span className="text-aryan-gold">Client</span>
              <span className="text-aryan-lavender"> Stories</span>
            </h2>
          </div>

          {/* Creative Testimonial Grid */}
          <div className="grid lg:grid-cols-2 gap-12">
            {[
              {
                quote:
                  "Samruddhi's expertise in both design and development made our project seamless. The results exceeded our expectations, and the attention to detail was remarkable.",
                author: "Sarah Johnson",
                role: "CEO, TechStart",
                company: "TechStart Inc.",
                rating: 5,
                color: "aryan-gold",
              },
              {
                quote:
                  "Outstanding work on our marketing campaign. The ROI was phenomenal, and the creative approach was exactly what we needed to stand out in the market.",
                author: "Michael Chen",
                role: "Marketing Director",
                company: "GrowthCo",
                rating: 5,
                color: "aryan-lavender",
              },
            ].map((testimonial, index) => (
              <Card
                key={index}
                className={`bg-gradient-to-br from-${testimonial.color}/10 to-${testimonial.color}/5 border-${testimonial.color}/20 p-10 relative group hover:border-${testimonial.color}/40 transition-all duration-300`}
              >
                {/* Quote Mark */}
                <Quote
                  className={`text-${testimonial.color} absolute top-6 right-6 opacity-20`}
                  size={48}
                />

                <div className="relative">
                  <p className="text-lg text-aryan-black-foreground/80 font-inter leading-relaxed mb-8 italic">
                    "{testimonial.quote}"
                  </p>

                  <div className="flex items-center justify-between">
                    <div>
                      <h4
                        className={`font-playfair font-bold text-xl text-${testimonial.color} mb-1`}
                      >
                        {testimonial.author}
                      </h4>
                      <p className="text-aryan-black-foreground/60 font-inter">
                        {testimonial.role}
                      </p>
                      <p
                        className={`text-${testimonial.color}/80 font-inter text-sm`}
                      >
                        {testimonial.company}
                      </p>
                    </div>

                    <div className="flex">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star
                          key={i}
                          className={`text-${testimonial.color} w-5 h-5 fill-current`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="mt-20 text-center">
            <h3 className="text-2xl font-playfair font-bold text-aryan-gold mb-8">
              Trusted by Amazing Clients
            </h3>
            <div className="flex justify-center items-center space-x-12 opacity-50">
              {["TechStart", "GrowthCo", "DesignHub", "InnovateLab"].map(
                (company, index) => (
                  <div
                    key={index}
                    className="text-xl font-space font-medium text-aryan-black-foreground/60"
                  >
                    {company}
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section - Creative Form Layout */}
      <section
        id="contact"
        className="py-24 px-6 lg:px-8 bg-gradient-to-b from-aryan-black to-aryan-black/95 relative"
      >
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center space-x-4 mb-8">
              <div className="w-24 h-px bg-aryan-sage"></div>
              <div className="px-8 py-3 border border-aryan-sage/20 rounded-full bg-aryan-sage/5 relative">
                <span className="text-aryan-sage text-sm font-inter uppercase tracking-wider">
                  ☕ Let's Connect
                </span>
                <div className="absolute inset-0 border border-aryan-sage/10 rounded-full animate-ping"></div>
              </div>
              <div className="w-24 h-px bg-aryan-sage"></div>
            </div>
            <h2 className="text-5xl lg:text-6xl font-playfair font-bold">
              <span className="text-aryan-sage">Ready to Create</span>
              <span className="text-aryan-gold"> Something Amazing?</span>
            </h2>
            <p className="text-xl text-aryan-black-foreground/60 font-inter mt-6 max-w-2xl mx-auto">
              Let's discuss your project and bring your vision to life with
              innovative solutions
            </p>
          </div>

          {/* Creative Contact Layout */}
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="text-3xl font-playfair font-bold text-aryan-gold mb-8">
                  Let's Start a Conversation
                </h3>
                <p className="text-lg text-aryan-black-foreground/70 font-inter leading-relaxed mb-8">
                  Whether you have a specific project in mind or just want to
                  explore possibilities, I'm here to help turn your ideas into
                  digital reality.
                </p>
              </div>

              {/* Contact Methods */}
              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    label: "Email",
                    value: "aryan4meu@gmail.com",
                    color: "aryan-gold",
                  },
                  {
                    icon: Phone,
                    label: "Phone",
                    value: "91+ 9893 477 356",
                    color: "aryan-lavender",
                  },
                  {
                    icon: MapPin,
                    label: "Location",
                    value: "Available Worldwide",
                    color: "aryan-sage",
                  },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={index}
                      className="flex items-center space-x-4 group"
                    >
                      <div
                        className={`w-12 h-12 bg-${item.color}/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon className={`text-${item.color}`} size={20} />
                      </div>
                      <div>
                        <div
                          className={`text-${item.color} font-inter font-medium`}
                        >
                          {item.label}
                        </div>
                        <div className="text-aryan-black-foreground/80 font-inter">
                          {item.value}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Social Links */}
              <div className="pt-8">
                <h4 className="text-aryan-gold font-playfair font-semibold mb-4">
                  Follow the Journey
                </h4>
                <div className="flex space-x-4">
                  {[
                    { icon: Linkedin, color: "aryan-gold" },
                    { icon: Github, color: "aryan-lavender" },
                    { icon: Twitter, color: "aryan-sage" },
                  ].map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <Button
                        key={index}
                        variant="outline"
                        size="icon"
                        className={`border-${social.color}/20 text-${social.color} hover:bg-${social.color}/10 hover:border-${social.color}/40 hover:scale-110 transition-all duration-300`}
                        
                      >
                        <Icon size={20} />
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <Card className="bg-gradient-to-br from-aryan-black/80 to-aryan-black/60 border-aryan-gold/20 p-8 backdrop-blur-xl">
              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-aryan-gold font-inter font-medium mb-3">
                      Your Name
                    </label>
                    <Input
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="bg-aryan-black/50 border-aryan-gold/20 text-aryan-black-foreground focus:border-aryan-gold rounded-xl"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-aryan-gold font-inter font-medium mb-3">
                      Email Address
                    </label>
                    <Input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="bg-aryan-black/50 border-aryan-gold/20 text-aryan-black-foreground focus:border-aryan-gold rounded-xl"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-aryan-gold font-inter font-medium mb-3">
                    Project Details
                  </label>
                  <Textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows={6}
                    className="bg-aryan-black/50 border-aryan-gold/20 text-aryan-black-foreground focus:border-aryan-gold rounded-xl"
                    placeholder="Tell me about your project, goals, and how I can help..."
                    required
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-aryan-gold text-aryan-gold-foreground hover:bg-aryan-gold/90 font-inter font-semibold py-4 rounded-xl transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Sending Message...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2 group-hover:translate-x-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-20 px-6 lg:px-8 border-t border-aryan-gold/20 bg-gradient-to-b from-aryan-black to-gray-900 mt-16">
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center">
            {/* Logo */}
            <div className="font-playfair text-4xl font-bold mb-8">
              <span className="bg-gradient-to-r from-aryan-gold via-aryan-lavender to-aryan-sage bg-clip-text text-transparent">
                AryanVerse
              </span>
            </div>

            {/* Tagline */}
            <p className="text-aryan-black-foreground/80 font-inter text-lg mb-8 max-w-lg mx-auto">
              Crafting digital experiences that bridge creativity and technology
            </p>

            {/* Quick Links */}
            <div className="flex justify-center items-center space-x-8 mb-8">
              {[
                { name: "About", id: "about" },
                { name: "Services", id: "services" },
                { name: "Projects", id: "projects" },
                { name: "Contact", id: "contact" },
              ].map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-aryan-black-foreground/60 hover:text-aryan-gold transition-colors font-inter"
                >
                  {link.name}
                </button>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-6 mb-8">
              {[
                { icon: Linkedin, color: "aryan-gold", href: "#" },
                { icon: Github, color: "aryan-lavender", href: "#" },
                { icon: Twitter, color: "aryan-sage", href: "#" },
                { icon: Mail, color: "aryan-gold", href: "mailto:hello@aryanverse.com" },
              ].map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`w-12 h-12 bg-${social.color}/10 border border-${social.color}/20 rounded-full flex items-center justify-center text-${social.color} hover:bg-${social.color}/20 hover:scale-110 transition-all duration-300`}
                  >
                    <Icon size={20} />
                  </a>
                );
              })}
            </div>

            {/* Decorative Line */}
            <div className="w-48 h-px bg-gradient-to-r from-transparent via-aryan-gold via-aryan-lavender via-aryan-sage to-transparent mx-auto mb-8"></div>

            {/* Copyright */}
            <p className="text-aryan-black-foreground/50 font-inter text-sm">
              © 2024 Aryan Rathore. Crafted with ❤️ and lots of ☕
            </p>
             <p className="text-aryan-black-foreground/30 font-inter text-xs mt-2">
              All rights reserved. Made with passion for digital excellence.
            </p>
          </div>
        </div>
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/4 w-64 h-64 bg-aryan-gold/5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-aryan-lavender/5 rounded-full blur-3xl"></div>
        </div>
      </footer>
    </div>
  );
}
