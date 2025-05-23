import { Link } from 'react-router-dom';
import Button from './components/common/Button';
import Card from './components/common/Card';
import { GraduationCap, Briefcase, Users, ChevronRight, Check, Star, ArrowRight } from 'lucide-react';

function App() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation bar */}
      <nav className="bg-white shadow-sm py-4 sticky top-0 z-30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <img 
                src="/logo-placeholder.png" 
                alt="EUJIM Logo" 
                className="h-10 w-auto mr-2"
                onError={(e) => {
                  e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40' fill='none'%3E%3Crect width='40' height='40' rx='4' fill='%233B82F6'/%3E%3Cpath d='M12 12H28M12 20H28M12 28H20' stroke='white' stroke-width='2.5' stroke-linecap='round'/%3E%3C/svg%3E`;
                }}
              />
              <h1 className="text-xl font-bold text-navyblue">EUJIM Solution Portal</h1>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <a href="#features" className="text-gray-600 hover:text-lightblue transition-colors">Features</a>
              <a href="#how-it-works" className="text-gray-600 hover:text-lightblue transition-colors">How It Works</a>
              <a href="#testimonials" className="text-gray-600 hover:text-lightblue transition-colors">Success Stories</a>
              <Link to="/graduate/register">
                <Button variant="outline" size="sm">Register</Button>
              </Link>
              <Link to="/graduate">
                <Button size="sm">Sign In</Button>
              </Link>
            </div>
            <div className="md:hidden">
              <button className="text-gray-500 hover:text-gray-700 focus:outline-none">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero section */}
      <section className="relative bg-gradient-to-r from-navyblue to-lightblue text-white py-16 lg:py-24 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <svg className="absolute right-0 top-0 h-full w-1/2 transform translate-x-1/4 text-white text-opacity-10" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <polygon points="0,0 100,0 50,100 0,100" />
          </svg>
          <svg className="absolute left-0 bottom-0 h-full w-1/3 transform -translate-x-1/4 translate-y-1/4 text-white text-opacity-10" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none">
            <circle cx="50" cy="50" r="50" />
          </svg>
        </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center">
            <div className="w-full lg:w-1/2 mb-10 lg:mb-0">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Connect, Grow, and Succeed with the EUJIM Graduate Platform
              </h2>
              <p className="text-xl mb-8 text-blue-100 max-w-lg">
                Empowering recent graduates to build meaningful careers through connections, resources, and opportunities.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/graduate">
                  <Button size="lg" className="bg-white text-navyblue hover:bg-gray-100">
                    Get Started <ChevronRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Link to="/graduate/register">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                    Learn More
                  </Button>
                </Link>
              </div>
              <div className="mt-8 flex items-center text-sm">
                <span className="flex items-center">
                  <Check size={16} className="mr-2" /> Personalized career support
                </span>
                <span className="mx-4">•</span>
                <span className="flex items-center">
                  <Check size={16} className="mr-2" /> Industry connections
                </span>
              </div>
            </div>
            <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
              <div className="relative">
                <div className="bg-white rounded-lg shadow-xl overflow-hidden max-w-md transform rotate-2 hover:rotate-0 transition-transform duration-300">
                  <img 
                    src="/dashboard-placeholder.jpg" 
                    alt="Graduate Dashboard Preview" 
                    className="w-full"
                    onError={(e) => {
                      e.currentTarget.src = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='400' viewBox='0 0 600 400' fill='none'%3E%3Crect width='600' height='400' fill='%23EBF4FF'/%3E%3Crect x='50' y='50' width='500' height='40' rx='5' fill='white'/%3E%3Crect x='50' y='110' width='240' height='240' rx='5' fill='white'/%3E%3Crect x='310' y='110' width='240' height='115' rx='5' fill='white'/%3E%3Crect x='310' y='235' width='240' height='115' rx='5' fill='white'/%3E%3C/svg%3E`;
                    }} 
                  />
                </div>
                <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-lightblue to-blue-700 rounded-lg p-4 shadow-lg transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="text-white">
                    <p className="font-bold">93% Success Rate</p>
                    <p className="text-sm text-blue-100">Graduate placement</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-navyblue mb-4">Platform Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our comprehensive platform offers all the tools you need to transition from graduate to professional success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-lightblue">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-6">
                <GraduationCap size={28} className="text-lightblue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navyblue">Graduate Profiles</h3>
              <p className="text-gray-600">
                Create a comprehensive profile showcasing your education, skills, and achievements to stand out to employers.
              </p>
              <Link to="/graduate/profile" className="mt-4 inline-flex items-center text-lightblue hover:underline">
                Build Your Profile <ArrowRight size={16} className="ml-1" />
              </Link>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-lightblue">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-6">
                <Briefcase size={28} className="text-lightblue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navyblue">Job Opportunities</h3>
              <p className="text-gray-600">
                Access exclusive job listings from our partner companies looking for fresh graduate talent.
              </p>
              <Link to="/graduate" className="mt-4 inline-flex items-center text-lightblue hover:underline">
                Explore Opportunities <ArrowRight size={16} className="ml-1" />
              </Link>
            </Card>
            
            <Card className="text-center p-8 hover:shadow-lg transition-all duration-300 border-t-4 border-lightblue">
              <div className="bg-blue-100 p-3 rounded-full inline-flex mb-6">
                <Users size={28} className="text-lightblue" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-navyblue">Networking</h3>
              <p className="text-gray-600">
                Connect with fellow graduates, industry professionals, and mentors to build your professional network.
              </p>
              <Link to="/graduate" className="mt-4 inline-flex items-center text-lightblue hover:underline">
                Start Networking <ArrowRight size={16} className="ml-1" />
              </Link>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navyblue mb-4">How It Works</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Get started in just a few simple steps and begin your journey to professional success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { number: "01", title: "Create Your Profile", description: "Sign up and build your graduate profile with your education, skills, and experience." },
              { number: "02", title: "Explore Opportunities", description: "Browse job listings, networking events, and resources tailored to your interests." },
              { number: "03", title: "Connect with Employers", description: "Engage with potential employers and apply for positions through the platform." },
              { number: "04", title: "Track Your Progress", description: "Monitor your applications, interviews, and career development over time." }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="text-5xl font-bold text-gray-100 mb-4">{step.number}</div>
                <h3 className="text-xl font-bold mb-2 text-navyblue">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
                {index < 3 && (
                  <div className="hidden md:block absolute top-8 right-0 transform translate-x-1/2">
                    <svg width="40" height="12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M40 6L30 0.226497V11.7735L40 6ZM0 7H31V5H0V7Z" fill="#E5E7EB"/>
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-navyblue mb-4">Success Stories</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Hear from graduates who have found success through our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Sarah Johnson", role: "Software Developer", company: "Tech Innovations", quote: "The EUJIM platform connected me with my dream job just two months after graduation. The profile tools helped me showcase my projects effectively.", rating: 5 },
              { name: "Michael Chen", role: "Marketing Associate", company: "Global Brands", quote: "The networking features allowed me to connect with industry professionals who provided invaluable advice for starting my career.", rating: 5 },
              { name: "Olivia Martinez", role: "Finance Analyst", company: "Capital Investments", quote: "From resume help to interview preparation, the resources available helped me secure a competitive position in finance.", rating: 4 }
            ].map((testimonial, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-navyblue">{testimonial.name}</h3>
                    <p className="text-sm text-gray-600">{testimonial.role} at {testimonial.company}</p>
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className={i < testimonial.rating ? "text-yellow-400" : "text-gray-300"} fill={i < testimonial.rating ? "currentColor" : "none"} />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.quote}"</p>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Link to="/graduate/register">
              <Button size="lg">
                Join Our Success Stories <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-navyblue to-lightblue text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Launch Your Career?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of graduates who have successfully transitioned to fulfilling careers with our platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/graduate/register">
              <Button size="lg" className="bg-white text-navyblue hover:bg-gray-100">
                Register Now <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/graduate">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:bg-opacity-10">
                Sign In
              </Button>
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold">10,000+</div>
              <div className="text-blue-100">Registered Graduates</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">500+</div>
              <div className="text-blue-100">Partner Companies</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">93%</div>
              <div className="text-blue-100">Success Rate</div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">EUJIM Solution Portal</h3>
              <p className="text-gray-400 mb-4">
                Empowering graduates to connect, grow, and succeed in their professional journeys.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">Twitter</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M4.98 3.5C4.98 4.881 3.87 6 2.5 6S.02 4.881.02 3.5C.02 2.12 1.13 1 2.5 1s2.48 1.12 2.48 2.5zM5 8H0v16h5V8zm7.982 0H8.014v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0V24H24V13.869c0-7.88-8.922-7.593-11.018-3.714V8z" clipRule="evenodd" />
                  </svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link to="/graduate" className="text-gray-400 hover:text-white">Dashboard</Link></li>
                <li><Link to="/graduate/profile" className="text-gray-400 hover:text-white">Profile</Link></li>
                <li><Link to="/graduate/education" className="text-gray-400 hover:text-white">Education</Link></li>
                <li><Link to="/graduate/certificates" className="text-gray-400 hover:text-white">Certificates</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white">Career Guide</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Interview Tips</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Resume Builder</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Professional Development</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>123 University Avenue, Nairobi, Kenya</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span>info@eujim.com</span>
                </li>
                <li className="flex items-start">
                  <svg className="h-6 w-6 mr-2 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span>+254 712 345 678</span>
                </li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} EUJIM Solution Portal. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white text-sm">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
