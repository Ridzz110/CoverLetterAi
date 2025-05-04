import { SignedIn, SignedOut, SignInButton, UserButton } from '@clerk/clerk-react';
import { Button } from "./components/ui/button";
import { AnimatedShinyText } from "./components/magicui/animated-shiny-text";
import { DotPattern } from './components/magicui/dot-pattern';
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { cn } from "./lib/utils";
import { TypewriterEffectSmooth } from './components/ui/typewriter-effect';
import { Briefcase, FileText, Settings, Download, HelpCircle, Check } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./components/ui/accordion";
import { BrowserRouter , Routes, Route, Link} from 'react-router-dom';
import Dashboard from './Pages/Dashboard';
import { JSX } from 'react/jsx-runtime';
import SignInPage from './Pages/Signin';

interface HomeProps {
  words: { text: string; className?: string }[];
  features: { icon: JSX.Element; title: string; description: string }[];
  faqs: { question: string; answer: string }[];
  pricingPlans: {
    name: string;
    price: string;
    period: string;
    description: string;
    features: string[];
    cta: string;
    highlighted: boolean;
  }[];
  footerLinks: {
    social: { name: string; href: string }[];
  };
}

const Home = ({ words, features, faqs, pricingPlans, footerLinks }: HomeProps) => {
  return (
    <>
      <main className='flex-1 flex flex-col relative z-10'>
        {/* Hero Section */}
        <div className='flex flex-col items-center justify-center min-h-[80vh] w-full px-4'>
          <div className="flex mb-8 items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-zinc-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>👋 Try for free</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          <TypewriterEffectSmooth words={words} />
          <h3 className='text-neutral-400 text-lg'>Get a tailored Resume in seconds with no hustle.</h3>
          <h3 className='text-neutral-400 text-lg'>it increases 50% chance of you landing your dream job.</h3>
          <Link to='/dashboard'>
            <Button className='bg-black mt-6' color='black'>Try Now</Button>
          </Link>
        </div>
        
        {/* Features Section */}
        <div className='flex flex-col items-center justify-center w-full px-4 py-16'>
          <div className="z-10 flex h-16 items-center justify-center">
            <div
              className={cn(
                "group rounded-full border border-black/5 bg-zinc-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>Features</span>
                <ArrowRightIcon className="ml-1 size-3 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
              </AnimatedShinyText>
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 sm:p-6 w-full max-w-7xl mx-auto mt-10">
            {features.map((feature, index) => (
              <div
                key={index}
                className="hover:scale-105 bg-transparent border border-neutral-300 rounded-2xl p-6 shadow-md hover:shadow-xl transition"
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Plans Section */}
        <div className="flex flex-col items-center justify-center w-full px-4 py-16 bg-black/20">
          <div className="z-10 flex items-center justify-center mb-12">
            <div className={cn(
              "group rounded-full border border-black/5 bg-zinc-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}>
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>Choose Your Plan</span>
                <ArrowRightIcon className="ml-2 size-4" />
              </AnimatedShinyText>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl mx-auto">
            {pricingPlans.map((plan, index) => (
              <div 
                key={index} 
                className={cn(
                  "relative rounded-2xl p-6 backdrop-blur-sm transition-all duration-300 hover:translate-y-[-4px]",
                  plan.highlighted 
                    ? "border-2 border-blue- bg-blue-900/20" 
                    : "border border-neutral-700 bg-black/30"
                )}
              >
                {plan.highlighted && (
                  <span className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-blue-950 text-white text-xs font-bold py-1 px-3 rounded-full">
                    MOST POPULAR
                  </span>
                )}
                <h3 className="text-2xl font-bold">{plan.name}</h3>
                <div className="mt-4 mb-2">
                  <span className="text-3xl font-bold">{plan.price}</span>
                  <span className="text-neutral-400">/{plan.period}</span>
                </div>
                <p className="text-neutral-400 mb-6">{plan.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  className={cn(
                    "w-full py-6",
                    plan.highlighted 
                      ? "bg-blue-600 hover:bg-blue-700" 
                      : "bg-transparent border border-neutral-600 hover:bg-neutral-800"
                  )}
                >
                  {plan.cta}
                </Button>
              </div>
            ))}
          </div>
        </div>
                
        {/* FAQ Accordion Section */}
        <div className="flex flex-col items-center justify-center w-full px-4 py-16">
          <div className="z-10 flex items-center justify-center mb-12">
            <div className={cn(
              "group rounded-full border border-black/5 bg-zinc-950 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800",
            )}>
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>Frequently Asked Questions</span>
                <HelpCircle className="ml-2 size-4" />
              </AnimatedShinyText>
            </div>
          </div>
          
          <div className="w-full max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="w-full bg-transparent">
              {faqs.map((faq, index) => (
                <AccordionItem key={index} value={`item-${index}`} className="border-b border-neutral-700 bg-transparent">
                  <AccordionTrigger className="text-lg font-medium text-white hover:text-neutral-300 py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-neutral-300 mt-2 pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </main>
      
      {/* Enhanced Footer Section */}
      <footer className="relative z-10 w-full bg-black/40 backdrop-blur-sm pt-16 pb-8 border-t border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            <div className="col-span-2">
              <h3 className="text-xl font-bold mb-4">CoverLetter AI</h3>
              <p className="text-neutral-400 mb-6 max-w-md">
                Revolutionizing your job application process with AI-powered cover letters tailored to your skills and experiences.
              </p>
              <div className="flex space-x-4">
                {footerLinks.social.map((link, i) => (
                  <a key={i} href={link.href} className="text-white hover:text-white transition">
                    {link.name}
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="mt-12 pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-neutral-400">
              &copy; {new Date().getFullYear()} CoverLetter AI. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};



export default function App() {
  const words = [
    {
      text: "Build",
    },
    {
      text: "AI",
    },
    {
      text: "tailored",
    },
    {
      text: "cover",
    },
    {
      text: "letters.",
      className: "text-blue-950 dark:text-white",
    },
  ];
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-neutral-300" />,
      title: "Resume & JD Parsing",
      description:
        "Our AI intelligently extracts key skills and experiences from your resume and matches them with job description requirements.",
    },
    {
      icon: <Briefcase className="h-8 w-8 text-neutral-300" />,
      title: "Tailored Cover Letters",
      description:
        "Each cover letter is custom-written to align with the specific job role and employer expectations.",
    },
    {
      icon: <Settings className="h-8 w-8 text-neutral-300" />,
      title: "Tone & Role Customization",
      description:
        "Choose formal or friendly tone, and customize for internships, junior, or senior roles effortlessly.",
    },
    {
      icon: <Download className="h-8 w-8 text-neutral-300" />,
      title: "One-Click Export & Download",
      description:
        "Export your AI-generated cover letter as PDF or DOCX instantly and apply faster.",
    },
  ];

  const faqs = [
    {
      question: "How does the AI generate tailored cover letters?",
      answer: "Our AI analyzes your resume and the job description to identify matching skills and experiences. It then creates a personalized cover letter that highlights your relevant qualifications and aligns with the specific requirements of the position.",
    },
    {
      question: "Can I edit the AI-generated cover letter?",
      answer: "Absolutely! After the AI generates your cover letter, you have full control to edit, refine, or customize any part of it to better reflect your personal voice and style.",
    },
    {
      question: "How many cover letters can I generate?",
      answer: "Our free plan allows you to generate up to 3 cover letters per month. Premium subscribers enjoy unlimited cover letter generation and additional customization options.",
    },
    {
      question: "Is my data secure?",
      answer: "Yes, we take data security very seriously. Your resume and personal information are encrypted and never shared with third parties. We only use your data to generate your cover letters and improve our service.",
    },
    {
      question: "What file formats are supported for uploading resumes?",
      answer: "We support PDF, DOCX, and plain text formats for resume uploads. For best results, we recommend using PDF or DOCX formats to ensure proper parsing of your information.",
    },
  ];
  
  const pricingPlans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for occasional job seekers",
      features: [
        "3 cover letters per month",
        "Basic customization options",
        "PDF export",
        "Email support"
      ],
      cta: "Get Started",
      highlighted: false
    },
    {
      name: "Pro",
      price: "$9.99",
      period: "every 3 months",
      description: "Ideal for active job hunters",
      features: [
        "Unlimited cover letters",
        "Advanced tone customization",
        "PDF & DOCX export",
        "Priority support",
        "AI interview prep guides"
      ],
      cta: "Go Pro",
      highlighted: true
    },
    {
      name: "Team",
      price: "$24.99",
      period: "every 3 months",
      description: "For career coaches & teams",
      features: [
        "Everything in Pro",
        "5 user accounts",
        "Collaboration tools",
        "Team analytics",
        "Dedicated account manager"
      ],
      cta: "Contact Sales",
      highlighted: false
    }
  ];
  
  const footerLinks = {

    social: [
      { name: "Twitter", href: "#" },
      { name: "LinkedIn", href: "#" },
      { name: "Instagram", href: "#" }
    ]
  };
  
  return (
    <BrowserRouter>
    <div className='text-white bg-gradient-to-tl from-black via-zinc-950 to-blue-950 min-h-screen w-screen flex flex-col overflow-x-hidden'>
      <DotPattern className='fixed top-0 left-0 w-full h-full opacity-10' />
      
      <header className='relative z-10 w-full h-14 flex items-center justify-end px-4 sm:px-6'>
      <>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
        </>

        <Link to="/dashboard">
          <Button className="ml-4 py-6 hover:text-white border-neutral-200"> Try it </Button>
        </Link>
      </header>
      
      <Routes>
        <Route path="/" element={<Home 
          words={words}
          features={features}
          faqs={faqs}
          pricingPlans={pricingPlans}
          footerLinks={footerLinks}
        />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/sign-in" element={<SignInPage />} />
      </Routes>
    </div>
  </BrowserRouter>
  );
}