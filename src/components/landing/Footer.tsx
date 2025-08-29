import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Mic, Zap, Facebook, Twitter, Linkedin, Youtube } from 'lucide-react';

const footerLinks = {
  product: [
    { name: 'Features', href: '#features' },
    { name: 'Pricing', href: '#pricing' },
    { name: 'Demo', href: '#demo' },
    { name: 'API', href: '/api' },
    { name: 'Integrations', href: '/integrations' }
  ],
  company: [
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'Careers', href: '/careers' },
    { name: 'Blog', href: '/blog' },
    { name: 'Press', href: '/press' }
  ],
  resources: [
    { name: 'Documentation', href: '/docs' },
    { name: 'Tutorials', href: '/tutorials' },
    { name: 'Support', href: '/support' },
    { name: 'Status', href: '/status' },
    { name: 'Changelog', href: '/changelog' }
  ],
  legal: [
    { name: 'Privacy Policy', href: '/privacy' },
    { name: 'Terms of Service', href: '/terms' },
    { name: 'Cookie Policy', href: '/cookies' },
    { name: 'GDPR', href: '/gdpr' },
    { name: 'Affiliate Program', href: '/affiliate' }
  ]
};

const socialLinks = [
  { icon: Facebook, href: 'https://facebook.com/voicelead', label: 'Facebook' },
  { icon: Twitter, href: 'https://twitter.com/voicelead', label: 'Twitter' },
  { icon: Linkedin, href: 'https://linkedin.com/company/voicelead', label: 'LinkedIn' },
  { icon: Youtube, href: 'https://youtube.com/voicelead', label: 'YouTube' }
];

export function Footer() {
  return (
    <footer className="bg-surface/50 border-t border-border/50">
      <div className="container mx-auto section-padding">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8 py-16">
          {/* Brand Column */}
          <div className="col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="relative">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center shadow-glow">
                  <Mic className="h-4 w-4 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent rounded-full">
                  <Zap className="h-2 w-2 text-white ml-0.5 mt-0.5" />
                </div>
              </div>
              <span className="text-xl font-bold font-display text-gradient-primary">
                VoiceLead
              </span>
            </div>
            
            <p className="text-text-muted mb-6 max-w-sm">
              The world's most advanced Facebook voice automation platform. 
              Turn your voice into your most powerful sales asset.
            </p>
            
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-secondary hover:bg-primary/10 flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-text-muted group-hover:text-primary transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Product</h4>
            <ul className="space-y-3">
              {footerLinks.product.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Resources</h4>
            <ul className="space-y-3">
              {footerLinks.resources.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h4 className="font-semibold text-text-primary mb-4">Legal</h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.href}
                    className="text-text-muted hover:text-primary transition-colors"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border/50 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0">
              <h4 className="font-semibold text-text-primary mb-2">
                Stay updated with VoiceLead
              </h4>
              <p className="text-text-muted">
                Get the latest features, tips, and agency growth strategies.
              </p>
            </div>
            
            <div className="flex w-full md:w-auto space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-64 px-4 py-2 rounded-lg border border-input-border bg-input text-text-primary placeholder:text-text-placeholder focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <Link to="/auth">
                <Button className="bg-gradient-primary hover:shadow-premium text-white text-lg font-bold px-8 py-4 h-auto hover-premium group rounded-2xl border-0 shadow-xl uppercase tracking-wide hover-scale transition-all duration-300">
                  Subscribe
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border/50 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between text-sm text-text-muted">
            <p>© 2024 VoiceLead. All rights reserved.</p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <span>🇺🇸 Made in USA</span>
              <span>•</span>
              <span>🔒 SOC 2 Compliant</span>
              <span>•</span>
              <span>⚡ 99.9% Uptime</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}