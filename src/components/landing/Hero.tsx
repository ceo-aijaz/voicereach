import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Mic2, MessageSquare, TrendingUp, Users, Star, Sparkles } from 'lucide-react';

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-28 sm:pt-32 md:pt-36">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-hero opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto section-padding relative z-10">
        <div className="max-w-5xl mx-auto text-center animate-fade-up">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black font-display leading-[0.9] mb-10 sm:mb-12 tracking-tight px-2 sm:px-4 md:px-0 animate-fade-in">
            <div className="animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <span className="text-text-primary">Find, Connect &</span>
              <br />
              <span className="text-text-primary">Convert </span>
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.3s' }}>
                Your Ideal
              </span>
              <br />
              <span className="bg-gradient-hero bg-clip-text text-transparent animate-scale-in" style={{ animationDelay: '0.5s' }}>
                Prospects
              </span>
            </div>
          </h1>

          {/* Subheadline */}
          <div className="animate-fade-up max-w-3xl mx-auto mb-12 sm:mb-16 px-4 sm:px-6 md:px-0" style={{ animationDelay: '0.7s' }}>
            <p className="text-lg sm:text-xl md:text-2xl text-text-secondary leading-relaxed font-medium animate-fade-in" style={{ animationDelay: '0.9s' }}>
              Transform cold outreach with personalized voice messages that convert. Scale your sales, boost response rates, and <span className="text-primary font-semibold">close deals faster than ever before.</span>
            </p>
          </div>

          {/* CTA Button */}
          <div className="animate-fade-up mb-14 sm:mb-18 px-4 sm:px-0" style={{ animationDelay: '1.1s' }}>
            <Link to="/auth">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:shadow-premium text-white text-lg sm:text-xl font-bold px-8 sm:px-16 py-4 sm:py-6 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide w-full sm:w-auto hover-scale transition-all duration-300"
              >
                START FOR FREE
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
          
          {/* Trust Indicators */}
          <div className="animate-fade-up space-y-6 mb-16 sm:mb-20 px-4 sm:px-0" style={{ animationDelay: '0.6s' }}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 text-text-secondary">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-medium">No credit card required</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center">
                  <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-sm sm:text-base font-medium">Voice templates included</span>
              </div>
            </div>
          </div>
          
          {/* Trust Indicators */}
          <div className="mb-16 sm:mb-20 px-4 sm:px-0">
            <p className="text-sm sm:text-base text-text-muted mb-6">Trusted by leading agencies worldwide</p>
            <div className="flex justify-center items-center gap-3">
              <div className="flex -space-x-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-primary rounded-full border-2 border-white shadow-sm" />
                ))}
              </div>
              <span className="text-text-secondary ml-3 text-sm sm:text-base">+295 more</span>
            </div>
          </div>

          {/* Social Proof Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 max-w-4xl mx-auto px-4 sm:px-0">
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center mb-2 sm:mb-3">
                <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-0 sm:mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-text-primary">22.5K+</span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm">Voice DMs Sent</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center mb-2 sm:mb-3">
                <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 text-accent mb-1 sm:mb-0 sm:mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-text-primary">300%+</span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm">Response Rate</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.3s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center mb-2 sm:mb-3">
                <Users className="h-5 w-5 sm:h-6 sm:w-6 text-warning mb-1 sm:mb-0 sm:mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-text-primary">300+</span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm">Beta Users</p>
            </div>
            <div className="text-center animate-scale-in" style={{ animationDelay: '0.4s' }}>
              <div className="flex flex-col sm:flex-row items-center justify-center mb-2 sm:mb-3">
                <Mic2 className="h-5 w-5 sm:h-6 sm:w-6 text-primary mb-1 sm:mb-0 sm:mr-2" />
                <span className="text-2xl sm:text-3xl font-bold text-text-primary">95%+</span>
              </div>
              <p className="text-text-muted text-xs sm:text-sm">Voice Accuracy</p>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}