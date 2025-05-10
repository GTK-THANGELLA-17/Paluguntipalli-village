import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Github, Linkedin, Mail, Globe, Twitter, Instagram } from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: (open: boolean) => void;
}

const DeveloperModal = ({ isOpen, onClose }: DeveloperModalProps) => {
  const developerLinks = [
    { icon: <Github className="h-4 w-4" />, label: "GitHub", url: "https://github.com/GTK-THANGELLA-17" },
    { icon: <Linkedin className="h-4 w-4 text-blue-600" />, label: "LinkedIn", url: "https://www.linkedin.com/in/gthangella/" },
    { icon: <Twitter className="h-4 w-4 text-blue-400" />, label: "Twitter", url: "https://twitter.com/g_thangella" },
    { icon: <Instagram className="h-4 w-4 text-pink-500" />, label: "Instagram", url: "https://www.instagram.com/g_thangella_k?igsh=aWczdnVtaDR1N280" },
    { icon: <Mail className="h-4 w-4 text-red-500" />, label: "Email", url: "mailto:imgtk17@gmail.com" },
    { icon: <Globe className="h-4 w-4 text-green-500" />, label: "Portfolio", url: "https://thangella-creaftech-solutions.vercel.app/" },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full max-w-[95vw] sm:max-w-3xl bg-gradient-to-br from-gray-900 to-gray-800 text-white rounded-2xl overflow-hidden p-4 sm:p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 animate__animated animate__zoomIn">
            Meet the Developer
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 pt-4">
          {/* Avatar & Info */}
          <div className="flex flex-col items-center sm:items-start text-center sm:text-left w-full sm:w-auto">
            <Avatar className="h-24 w-24 border border-white mb-3 hover:scale-105 transition-transform">
              <AvatarImage src="/GTK.JPG" alt="G. Thangella" />
              <AvatarFallback>GT</AvatarFallback>
            </Avatar>
            <h3 className="text-lg font-semibold">GADIDAMALLA THANGELLA</h3>
            <p className="text-xs text-gray-400">thangellagadidamalla@gmail.com</p>
            <p className="text-xs text-gray-400 mt-1 whitespace-pre-line leading-snug">
              💼 Entrepreneur{"\n"}
              🧠 Tech Explorer{"\n"}
              🎨 Creative Thinker{"\n"}
              🔭 Visionary
            </p>
            <div className="flex gap-2 mt-3 flex-wrap justify-center sm:justify-start">
              {developerLinks.map((link, i) => (
                <Button
                  key={i}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="rounded-full hover:bg-white/10"
                >
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                  >
                    {link.icon}
                  </a>
                </Button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4 text-sm w-full">
            <p className="text-gray-300">
              I created this website to showcase my beautiful village, Paluguntipalli, to the world. As a passionate developer, I strive to combine my love for technology and my heritage to bring people closer to the rich culture of my village. I believe in the power of technology to connect people and share meaningful stories. I build impactful digital tools to simplify complex systems. The Lifespan Estimator reflects my passion for health-tech innovation and accessible design.
            </p>

            <div>
              <h4 className="font-semibold text-white">Tech Stack</h4>
              <p className="text-gray-400">
                React, TypeScript, TailwindCSS, shadcn/ui, Recharts, Git, Vercel
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-white">Mission</h4>
              <p className="text-gray-400">
                I’m driven to create meaningful digital products that solve real-world problems through impactful design and technology.
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-gray-700" />

        <DialogFooter className="flex flex-col sm:flex-row gap-2 justify-end">
          <Button variant="destructive" onClick={() => onClose(false)}>
            Close
          </Button>
          <Button variant="default" asChild>
            <a href="mailto:imgtk17@gmail.com" target="_blank" rel="noopener noreferrer">
              Get in Touch
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperModal;
