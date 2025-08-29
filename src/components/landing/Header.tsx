import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Menu, X, Mic, Zap, ArrowRight, Globe } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState('en');

  const languages = [
    { code: 'en', name: 'English' },
    { code: 'fr-FR', name: 'Français' },
    { code: 'pt', name: 'Português' },
    { code: 'es', name: 'Español' },
    { code: 'de', name: 'Deutsch' },
    { code: 'ja', name: '日本語' }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass-mobile border-b border-border/30 safe-area-top">
      <div className="container mx-auto section-padding">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                <Mic className="h-4 w-4 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full animate-glow">
                <Zap className="h-2 w-2 text-white ml-0.5 mt-0.5" />
              </div>
            </div>
            <span className="text-xl font-bold font-display text-gradient-primary">
              VoiceLead
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-text-secondary hover:text-primary transition-colors">
              Features
            </a>
            <a href="#pricing" className="text-text-secondary hover:text-primary transition-colors">
              Pricing
            </a>
            <a href="#demo" className="text-text-secondary hover:text-primary transition-colors">
              Demo
            </a>
            <a href="/about" className="text-text-secondary hover:text-primary transition-colors">
              About
            </a>
          </nav>

          {/* Language Selector & CTA Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Select value={language} onValueChange={setLanguage}>
              <SelectTrigger className="w-auto border-0 bg-transparent text-text-secondary hover:text-primary">
                <Globe className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.code} value={lang.code}>
                    {lang.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Link to="/auth">
              <Button variant="ghost" className="text-text-secondary hover:text-primary">
                Sign In
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary hover:shadow-primary transition-all hover-lift group">
                Start Free Trial
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-text-secondary hover:text-primary transition-all duration-300 rounded-xl hover:bg-surface/50 mobile-touch mobile-friendly min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle mobile menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-6 border-t border-border/30 animate-slide-down glass-mobile backdrop-blur-xl">
            <nav className="flex flex-col space-y-3">
              <a 
                href="#features" 
                className="text-text-secondary hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl hover:bg-surface/50 mobile-touch mobile-friendly"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </a>
              <a 
                href="#pricing" 
                className="text-text-secondary hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl hover:bg-surface/50 mobile-touch mobile-friendly"
                onClick={() => setIsMenuOpen(false)}
              >
                Pricing
              </a>
              <a 
                href="#demo" 
                className="text-text-secondary hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl hover:bg-surface/50 mobile-touch mobile-friendly"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </a>
              <a 
                href="/about" 
                className="text-text-secondary hover:text-primary transition-all duration-300 py-3 px-4 rounded-xl hover:bg-surface/50 mobile-touch mobile-friendly"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </a>
              
              {/* Mobile Language Selector */}
              <div className="pt-2">
                <Select value={language} onValueChange={setLanguage}>
                  <SelectTrigger className="w-full border border-border/50 bg-surface/50">
                    <Globe className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {languages.map((lang) => (
                      <SelectItem key={lang.code} value={lang.code}>
                        {lang.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex flex-col space-y-3 pt-4">
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" className="justify-start w-full mobile-touch min-h-[48px] rounded-xl">
                    Sign In
                  </Button>
                </Link>
                <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                  <Button className="bg-gradient-primary justify-start w-full mobile-touch min-h-[48px] rounded-xl hover:shadow-premium transition-all duration-300">
                    Start Free Trial
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}