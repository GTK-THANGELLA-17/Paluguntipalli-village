import { Users } from "lucide-react";

const members = [
  {
    name: "Village Elder",
    position: "Community Leader", 
    avatar: "/smile.jpg"
  },
  {
    name: "Temple Priest",
    position: "Religious Guide",
    avatar: "/smile.jpg"
  },
  {
    name: "Youth Leader", 
    position: "Community Organizer",
    avatar: "/smile.jpg"
  },
  {
    name: "School Principal",
    position: "Education Leader",
    avatar: "/smile.jpg"
  }
];

const Members = () => {
  return (
    <section id="members" className="py-12 sm:py-16 lg:py-20 bg-white dark:bg-[#000000]">
      <div className="container mx-auto px-4">
        <h2 className="section-title text-[#000000] dark:text-white" data-aos="fade-up">Village Members</h2>
        
        <div className="max-w-4xl mx-auto text-center mb-8 sm:mb-12" data-aos="fade-up" data-aos-delay="100">
          <p className="text-base sm:text-lg text-[#000000] dark:text-white">
            Paluguntipalli is home to a close-knit community with generations of heritage. 
            The residents are known for their warm hospitality and welcoming nature.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Background decoration */}
          <div className="absolute -top-8 -left-8 w-16 sm:w-24 h-16 sm:h-24 rounded-full border-2 sm:border-4 border-heritage dark:border-white opacity-20"></div>
          <div className="absolute -bottom-8 -right-8 w-12 sm:w-16 h-12 sm:h-16 rounded-full border-2 border-heritage dark:border-white opacity-20"></div>
          
          {/* Main content */}
          <div className="relative z-10 bg-white dark:bg-[#1a1a1a] rounded-xl shadow-xl p-6 sm:p-8 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-center mb-6 sm:mb-8">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-heritage-bg dark:bg-white/10 flex items-center justify-center mr-3 sm:mr-4">
                <Users size={20} className="sm:w-7 sm:h-7 text-heritage dark:text-white" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold font-playfair text-[#000000] dark:text-white">Community Leaders</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
              {members.map((member, index) => (
                <div 
                  key={index} 
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden mx-auto mb-3 sm:mb-4 border-2 sm:border-4 border-heritage dark:border-white">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h4 className="font-bold text-sm sm:text-base mb-1 text-[#000000] dark:text-white">{member.name}</h4>
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">{member.position}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-8 sm:mt-12 text-center">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                These representatives work together to preserve our village traditions and guide community activities.
                Each member brings unique skills and perspectives to help Paluguntipalli thrive.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Members;
