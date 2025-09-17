import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { HelpCircle, Sparkles } from "lucide-react";

const faqs = [
  {
    question: "How does VoiceLead's voice cloning technology work?",
    answer: "VoiceLead uses advanced AI to clone your voice with just 2 minutes of audio. Our technology analyzes your vocal patterns, tone, and inflection to create a realistic voice model that can generate personalized messages at scale while maintaining authenticity."
  },
  {
    question: "Is it safe to use multiple Facebook accounts?",
    answer: "Yes, VoiceLead includes built-in anti-detection features like smart scheduling, human-like delays, and IP rotation. Our system mimics natural user behavior to keep your accounts safe while maximizing your outreach potential."
  },
  {
    question: "What's the difference between the pricing plans?",
    answer: "The Starter plan is perfect for small agencies with 3 accounts and 900 DMs per account. Professional offers 9 accounts with 1,200 DMs each plus advanced features like CRM and team collaboration. Enterprise provides unlimited accounts with 1,500 DMs each and white-label options."
  },
  {
    question: "How accurate is the AI lead scoring?",
    answer: "Our GPT-4 powered AI analyzes multiple data points including profile quality, engagement patterns, and business indicators to score leads from 1-100. This helps you prioritize high-intent prospects and improve conversion rates by up to 300%."
  },
  {
    question: "Can I integrate VoiceLead with my existing CRM?",
    answer: "Yes! Professional and Enterprise plans include API access and webhooks for seamless integration with popular CRMs like HubSpot, Salesforce, and Pipedrive. We also offer a built-in CRM for complete lead management."
  },
  {
    question: "What happens if my account gets flagged?",
    answer: "VoiceLead's anti-detection system has a 99.9% success rate. In the rare case of an issue, our Enterprise plan includes 24/7 support to help resolve account problems. We also provide guidance on best practices to maintain account health."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes! All plans include a 14-day free trial with no credit card required. You'll have full access to all features in your chosen plan, allowing you to test VoiceLead's effectiveness before committing."
  },
  {
    question: "How many voice tones can I create?",
    answer: "The Starter plan includes basic voice cloning with built-in templates. Professional offers advanced cloning with 10 voice templates. Enterprise provides custom voice training and unlimited premium templates for maximum personalization."
  },
  {
    question: "Is there a setup fee or long-term contract?",
    answer: "No setup fees and no long-term contracts required. You can cancel anytime, and all plans are month-to-month. We believe in earning your business through results, not binding contracts."
  },
  {
    question: "What kind of support do you provide?",
    answer: "Starter includes email support, Professional adds priority chat support, and Enterprise provides 24/7 priority support with a dedicated success manager. All plans include comprehensive documentation and video tutorials."
  },
  {
    question: "Can I scrape leads from specific hashtags and locations?",
    answer: "Absolutely! VoiceLead's advanced lead scraping can extract qualified prospects from hashtags, followers, comments, and specific geographic locations. You can also filter by engagement level, follower count, and other criteria."
  },
  {
    question: "How does the campaign automation work?",
    answer: "Our drag-and-drop campaign builder lets you create multi-step sequences with conditional logic. You can set up A/B testing, follow-up sequences, and automated responses based on prospect behavior, all while maintaining a personal touch with voice messages."
  }
];

export function FAQ() {
  return (
    <section className="section-margin bg-gradient-to-br from-primary-ultralight/10 to-surface/50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="container mx-auto section-padding relative z-10">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-16 animate-fade-up">
          <Badge className="mb-8 glass-premium text-accent border-accent/20 px-6 py-3 text-lg hover-premium">
            <HelpCircle className="h-5 w-5 mr-2" />
            Questions & Answers
          </Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-display mb-8 leading-tight">
            <span className="text-text-primary">Frequently Asked</span>
            <br />
            <span className="text-gradient-primary animate-gradient-x bg-gradient-to-r from-primary via-accent to-primary bg-[length:200%_auto] bg-clip-text">
              Questions
            </span>
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-text-muted leading-relaxed">
            Everything you need to know about VoiceLead's voice automation platform
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass premium-border rounded-xl px-6 transition-all duration-300 hover:border-primary/20 hover-premium animate-fade-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <AccordionTrigger className="text-left hover:no-underline group py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-all hover-float">
                      <Sparkles className="h-4 w-4 text-primary group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-lg font-semibold text-text-primary group-hover:text-primary transition-all">
                      {faq.question}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pt-2 pb-6 text-text-muted leading-relaxed text-base">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-up">
          <div className="inline-block p-8 rounded-2xl glass-premium border border-primary/20 hover-tilt">
            <h3 className="text-2xl font-bold mb-4 text-text-primary">
              Still have questions?
            </h3>
            <p className="text-text-muted mb-6 max-w-lg mx-auto">
              Our team is here to help you get started with VoiceLead's voice automation platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <button className="bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale transition-all duration-300">
                  Contact Support
                </button>
              </Link>
              <Link to="/auth">
                <button className="bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale transition-all duration-300">
                  Book a Demo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}