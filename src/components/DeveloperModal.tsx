import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Instagram, Linkedin } from "lucide-react";

interface DeveloperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeveloperModal = ({ isOpen, onClose }: DeveloperModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-gradient-to-br from-gray-900 to-gray-800 text-white transform perspective-1000 rounded-2xl overflow-hidden p-6">
        <DialogHeader>
          <DialogTitle className="text-xl font-playfair text-center bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 animate__animated animate__zoomIn">
            Developed By
          </DialogTitle>
        </DialogHeader>

        {/* Scrollable Content */}
        <div className="flex flex-col md:flex-row items-center justify-between w-full space-y-8 md:space-y-0 md:space-x-8 overflow-y-auto max-h-[70vh]">
          {/* Profile Picture Section */}
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden border-4 border-heritage relative transform hover:scale-105 transition-transform duration-300 shadow-xl flex-shrink-0">
            <img
              src="/gtk 2.jpg"
              alt="Developer"
              className="w-full h-full object-cover transform hover:rotate-6 transition-transform"
            />
          </div>

          {/* Developer Info Section */}
          <div className="flex flex-col space-y-4 w-full max-w-md">
            <h3 className="text-lg font-semibold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 text-center">
              GADIDAMALLA THANGELLA
            </h3>

            {/* Developer Description */}
            <p className="text-sm text-center text-gray-300">
              I created this website to showcase my beautiful village, Paluguntipalli, to the world. As a passionate developer, I strive to combine my love for technology and my heritage to bring people closer to the rich culture of my village. I believe in the power of technology to connect people and share meaningful stories.
            </p>

            {/* Contact Links */}
            <div className="w-full space-y-4">
              <a
                href="mailto:thangellagadidamalla@gmail.com"
                className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors transform hover:translate-x-1"
              >
                <Mail className="text-heritage" size={18} />
                <span className="text-sm">thangellagadidamalla@gmail.com</span>
              </a>

              {/* Instagram Link */}
              <a
                href="https://www.instagram.com/g_thangella_k/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors transform hover:translate-x-1"
              >
                <Instagram className="text-heritage" size={18} />
                <span className="text-sm">@g_thangella_k</span>
              </a>

              {/* LinkedIn Link */}
              <a
                href="https://www.linkedin.com/in/gthangella/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 p-3 rounded-lg bg-black/30 hover:bg-black/50 transition-colors transform hover:translate-x-1"
              >
                <Linkedin className="text-heritage" size={18} />
                <span className="text-sm">LinkedIn</span>
              </a>
            </div>

            {/* Cancel Button */}
            <div className="w-full text-center">
              <button
                onClick={onClose}
                className="bg-red-500 text-white p-3 rounded-lg hover:bg-red-600 transition-colors transform hover:scale-105"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DeveloperModal;
