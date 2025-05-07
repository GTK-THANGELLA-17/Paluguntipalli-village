
import { Users } from "lucide-react";

const members = [
  {
    name: "Village Elder",
    position: "Community Leader",
    avatar: "" // Add your local or custom image path here
  },
  {
    name: "Temple Priest",
    position: "Religious Guide",
    avatar: ""
  },
  {
    name: "Youth Leader",
    position: "Community Organizer",
    avatar: ""
  },
  {
    name: "School Principal",
    position: "Education Leader",
    avatar: ""
  }
];

const Members = () => {
  return (
    <section id="members" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="section-title" data-aos="fade-up">Village Members</h2>
        
        <div className="max-w-4xl mx-auto text-center mb-12" data-aos="fade-up" data-aos-delay="100">
          <p className="text-lg">
            Paluguntipalli is home to a close-knit community with generations of heritage. 
            The residents are known for their warm hospitality and welcoming nature.
          </p>
        </div>
        
        <div className="relative max-w-5xl mx-auto">
          {/* Background decoration */}
          <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full border-4 border-heritage opacity-20"></div>
          <div className="absolute -bottom-8 -right-8 w-16 h-16 rounded-full border-2 border-heritage opacity-20"></div>
          
          {/* Main content */}
          <div className="relative z-10 bg-white rounded-xl shadow-xl p-8 border border-gray-100">
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-heritage-bg flex items-center justify-center mr-4">
                <Users size={28} className="text-heritage" />
              </div>
              <h3 className="text-2xl font-bold font-playfair">Community Leaders</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {members.map((member, index) => (
                <div 
                  key={index} 
                  className="text-center"
                  data-aos="fade-up"
                  data-aos-delay={100 * index}
                >
                  <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-heritage">
                    <img 
                      src={member.avatar} 
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h4 className="font-bold mb-1">{member.name}</h4>
                  <p className="text-sm text-gray-600">{member.position}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-gray-600">
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
