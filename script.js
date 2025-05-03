document.addEventListener("DOMContentLoaded", () => {
    const video = document.getElementById("background-video");
    const navLinks = document.querySelectorAll("nav a");
    const sections = document.querySelectorAll("main > section");
    const homeSection = document.getElementById("home");
    const logoLink = document.querySelector("header a");

    // Ensure video plays
    if (video) {
        video.play().catch(error => {
            console.error("Video autoplay failed:", error);
            // Optional: Show poster or fallback content if video fails
        });
    }

    // Function to show a specific section and hide others
    function showSection(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.remove("hidden");
                section.classList.add("active"); // Add active class for potential animations
            } else {
                section.classList.add("hidden");
                section.classList.remove("active");
            }
        });
        // Ensure home section (video background) is hidden if another section is active
        if (targetId !== "home" && homeSection) {
            homeSection.classList.add("hidden");
        } else if (homeSection) {
            homeSection.classList.remove("hidden");
        }
    }

    // Initial setup: Show home section (video) by default
    // showSection("home"); // Assuming initial view is just the video/tagline
    // Let's adjust: Initially, only the home content (tagline over video) is visible.
    // Sections are hidden by default via Tailwind's 'hidden' class in the HTML.

    // Navigation link event listeners
    navLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetId = link.getAttribute("href").substring(1); // Get section ID from href
            showSection(targetId);
        });
    });

    // Logo click event listener - return to home view
    if (logoLink) {
        logoLink.addEventListener("click", (event) => {
            event.preventDefault();
            showSection("home"); // Show the initial home view (video/tagline)
            // Hide all other main sections
            sections.forEach(section => {
                if (section.id !== 'home') { // Keep the home section potentially visible
                    section.classList.add("hidden");
                    section.classList.remove("active");
                }
            });
             if (homeSection) {
                 homeSection.classList.remove("hidden"); // Make sure home is visible
             }
        });
    }

    // Contact Form Handling (Basic Mailto)
    const contactForm = document.getElementById("contact-form");
    if (contactForm) {
        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            const name = contactForm.querySelector("input[name='name']").value;
            const email = contactForm.querySelector("input[name='email']").value;
            const message = contactForm.querySelector("textarea[name='message']").value;
            
            const subject = `Contact Form Submission from ${name}`;
            const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
            
            window.location.href = `mailto:info@artlandtr.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Optionally clear the form or show a success message
            // contactForm.reset();
            // alert("Thank you! Your message has been prepared in your email client.");
        });
    }

});

