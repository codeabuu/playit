
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { CheckCircle, Heart } from 'lucide-react';
import { faqItems } from '@/lib/data';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const About = () => {
  return (
    <main>
      {/* Header */}
      <section className="bg-primary text-white py-16">
        <div className="container-custom text-center">
          <h1 className="font-heading text-4xl font-bold mb-4">Our Mission</h1>
          <p className="text-xl max-w-3xl mx-auto">
            Empowering youth through sports, building character, and creating opportunities 
            for all children regardless of financial circumstances.
          </p>
        </div>
      </section>
      
      {/* Mission & Vision */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-3xl font-semibold mb-6">Keeping Young People Inspired Through Sport</h2>
              <p className="text-gray-700 mb-4">
                SportsAid was founded with a simple but powerful belief: that sports can transform young lives. 
                We connect generous donors with youth sports teams in need, ensuring that financial barriers 
                never prevent children from experiencing the joy and benefits of team sports.
              </p>
              <p className="text-gray-700 mb-4">
                When young people participate in sports, they gain more than just physical fitness. 
                They develop discipline, teamwork skills, and confidence that serve them throughout life. 
                Sports provide a positive outlet and sense of belonging that helps kids stay focused on 
                healthy goals and away from harmful influences.
              </p>
              <p className="text-gray-700 mb-6">
                Our platform ensures that 100% of your donation (minus payment processing fees) goes directly 
                to the team you choose to support. We verify every campaign and provide updates so you can 
                see the impact of your generosity.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-success mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold">Direct Impact</h3>
                    <p className="text-gray-600">Your donation goes straight to the team you choose to support.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-success mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold">Complete Transparency</h3>
                    <p className="text-gray-600">We verify each campaign and provide updates on how funds are used.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="text-success mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h3 className="font-semibold">Community Focus</h3>
                    <p className="text-gray-600">We strengthen communities by supporting local youth programs.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <img 
                src="https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&q=80&w=800" 
                alt="Kids playing sports" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Our Story */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold mb-4">Our Story</h2>
            <div className="h-1 w-20 bg-primary mx-auto mb-6"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1472396961693-142e6e269027?auto=format&fit=crop&q=80&w=800" 
                alt="Founder with youth sports team" 
                className="rounded-lg shadow-lg"
              />
            </div>
            
            <div>
              <h3 className="font-heading text-2xl font-semibold mb-4">From Local Team to National Mission</h3>
              <p className="text-gray-700 mb-4">
                SportsAid began when our founder, Michael Rivera, noticed that his daughter's school basketball 
                team couldn't afford new uniforms or proper equipment. Many talented players were sitting on 
                the sidelines because their families couldn't cover participation fees.
              </p>
              <p className="text-gray-700 mb-4">
                Michael organized a local fundraiser that not only equipped his daughter's team but revealed a 
                widespread need. Coaches from across the city reached out asking how they could raise funds for 
                their teams too.
              </p>
              <p className="text-gray-700 mb-4">
                Recognizing that this was a national issue, Michael launched SportsAid in 2020 to create a 
                trusted platform connecting youth sports programs with generous donors who want to make a 
                difference in young lives.
              </p>
              <p className="text-gray-700">
                Today, we've helped over 40 teams across 12 communities and impacted the lives of hundreds 
                of young athletes. And we're just getting started.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Values */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="font-heading text-3xl font-semibold mb-4">Our Values</h2>
            <p className="text-gray-600 text-lg">
              These core principles guide everything we do at SportsAid.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <Heart className="text-primary" size={24} />
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Compassion</h3>
              <p className="text-gray-600">
                We believe every child deserves the opportunity to play sports, develop skills, and 
                experience the joy of being part of a team.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20.42 4.58a5.4 5.4 0 0 0-7.65 0l-.77.78-.77-.78a5.4 5.4 0 0 0-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Community</h3>
              <p className="text-gray-600">
                We strengthen local communities by supporting the programs that bring people 
                together and provide safe, positive environments for youth.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 2L4 7l8 5 8-5-8-5z"></path>
                  <path d="M4 12l8 5 8-5"></path>
                  <path d="M4 17l8 5 8-5"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Integrity</h3>
              <p className="text-gray-600">
                We operate with complete transparency, ensuring donations reach their intended 
                recipients and are used for their stated purpose.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="m9 12 2 2 4-4"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We eliminate financial barriers that prevent participation in sports, ensuring 
                all children have access regardless of economic circumstances.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
                  <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Impact</h3>
              <p className="text-gray-600">
                We focus on creating meaningful, lasting change in young lives through the 
                transformative power of sports participation.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg className="text-primary" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="font-heading text-xl font-semibold mb-3">Inclusivity</h3>
              <p className="text-gray-600">
                We embrace diversity and ensure that all youth, regardless of background, 
                ability, or identity, can benefit from sports participation.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="font-heading text-3xl font-semibold mb-4">Frequently Asked Questions</h2>
              <p className="text-gray-600 text-lg">
                Get answers to common questions about donating and supporting youth sports teams.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {faqItems.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
            
            <div className="mt-10 text-center">
              <p className="text-gray-600 mb-6">
                Don't see your question here? Contact us and we'll be happy to help!
              </p>
              <Button asChild>
                <Link to="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA */}
      <section className="py-20 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-6">
            Ready to Support Youth Sports?
          </h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Your donation creates opportunities for young athletes to grow, learn, and thrive.
            Choose a team to support today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="text-primary font-semibold">
              <Link to="/campaigns">Browse Campaigns</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-white border-white hover:bg-white/10">
              <Link to="/contact">Submit a Team</Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default About;
