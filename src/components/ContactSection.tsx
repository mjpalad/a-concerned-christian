const ContactSection = () => {

  return (
    <section id="contact" className="py-20 bg-card">
      <div className="container mx-auto px-4">
        <div className="max-w-xl mx-auto text-center mb-10">
          <h2
            className="text-3xl md:text-4xl font-bold text-primary mb-4"
            style={{ fontFamily: "'Lora', serif" }}
          >
            Get in Touch
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            Have a question, topic suggestion, or just want to say hello? Drop Eric a message at <a href="mailto:AConcernedChristianInAR@gmail.com">AConcernedChristianInAR@gmail.com</a>.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
