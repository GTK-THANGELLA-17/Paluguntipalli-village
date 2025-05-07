
/**
 * Utility to apply heading animations to all section titles on the page
 */
export const initializeHeadingAnimations = () => {
  // Target all section titles
  const sectionTitles = document.querySelectorAll('.section-title');
  
  // Apply animation class to each title
  sectionTitles.forEach(title => {
    if (title instanceof HTMLElement) {
      // Convert to span with animation if it's not already
      if (!title.classList.contains('processed-heading')) {
        const text = title.innerText;
        title.innerHTML = `<span class="animate-heading">${text}</span>`;
        title.classList.add('processed-heading');
        
        // Add hover animation event listeners
        const headingSpan = title.querySelector('.animate-heading');
        if (headingSpan) {
          title.addEventListener('mouseenter', () => {
            headingSpan.classList.add('hover-animation');
          });
          
          title.addEventListener('mouseleave', () => {
            headingSpan.classList.remove('hover-animation');
            // Add a small delay before allowing the animation to be triggered again
            setTimeout(() => {
              headingSpan.classList.remove('animation-cooldown');
            }, 300);
          });
        }
      }
    }
  });

  // Add necessary CSS for hover animations
  if (!document.getElementById('heading-animation-styles')) {
    const style = document.createElement('style');
    style.id = 'heading-animation-styles';
    style.textContent = `
      .animate-heading {
        display: inline-block;
        transition: transform 0.3s ease, text-shadow 0.3s ease;
      }
      
      .animate-heading.hover-animation {
        transform: scale(1.05);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }
      
      .animate-heading:not(.animation-cooldown):hover {
        transform: scale(1.05);
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
      }
    `;
    document.head.appendChild(style);
  }

  // Target all h1, h2, h3 inside sections (not already processed)
  const headings = document.querySelectorAll('section h1:not(.processed-heading), section h2:not(.processed-heading), section h3:not(.processed-heading)');
  
  headings.forEach(heading => {
    if (heading instanceof HTMLElement && !heading.classList.contains('section-title')) {
      const text = heading.innerText;
      heading.innerHTML = `<span class="animate-heading">${text}</span>`;
      heading.classList.add('processed-heading');
    }
  });
};
