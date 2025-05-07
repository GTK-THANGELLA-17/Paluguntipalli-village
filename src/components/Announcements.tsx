
import { Bell, Calendar } from "lucide-react";

interface Announcement {
  title: string;
  date: string;
  description?: string;
  important?: boolean;
}

const announcements: Announcement[] = [
  {
    title: "Peerla Panduga",
    date: "July 2024",
    description: "Annual celebration with cultural performances and traditional rituals.",
    important: true
  },
  {
    title: "Pedda Sarigesu",
    date: "July 17, 2024",
    description: "Special ceremony at the village temple with community gathering.",
    important: true
  }
];

const Announcements = () => {
  return (
    <section id="important" className="py-20 bg-heritage-bg dark:bg-[#252525]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-[#403E43] dark:text-white" data-aos="fade-up">Important Announcements</h2>
        
        <div className="max-w-4xl mx-auto" data-aos="fade-up" data-aos-delay="100">
          <div className="bg-white dark:bg-charcoal rounded-xl shadow-xl overflow-hidden">
            {announcements.map((announcement, index) => (
              <div 
                key={index}
                className={`p-6 border-b border-gray-100 dark:border-gray-700 flex items-start ${
                  announcement.important ? 'bg-heritage-bg dark:bg-slate/10' : ''
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${
                  announcement.important ? 'bg-heritage text-white' : 'bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-white'
                } flex items-center justify-center mr-4 shrink-0`}>
                  {announcement.important ? <Bell size={20} /> : <Calendar size={20} />}
                </div>
                
                <div>
                  <div className="flex items-center flex-wrap gap-3">
                    <h4 className="font-bold text-lg text-[#403E43] dark:text-white">{announcement.title}</h4>
                    {announcement.important && (
                      <span className="bg-heritage text-white text-xs py-1 px-2 rounded-full">
                        Important
                      </span>
                    )}
                  </div>
                  <p className="text-heritage font-medium mt-1 dark:text-heritage-light">{announcement.date}</p>
                  {announcement.description && (
                    <p className="mt-2 text-gray-600 dark:text-gray-300">{announcement.description}</p>
                  )}
                </div>
              </div>
            ))}
            
            <div className="p-6 bg-gray-50 dark:bg-gray-800 text-center">
              <p className="text-gray-600 dark:text-gray-300">
                Stay tuned for more upcoming events and announcements!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Announcements;
