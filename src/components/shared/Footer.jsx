import { Link } from "react-router-dom";
import {
  RiCarLine,
  RiMapPinLine,
  RiPhoneLine,
  RiMailLine,
  RiFacebookCircleLine,
  RiInstagramLine,
  RiYoutubeLine,
  RiLinkedinBoxLine,
} from "react-icons/ri";

// X (Twitter) SVG icon — new logo
const XIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.261 5.632 5.903-5.632Zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const footerLinks = {
  company: [
    { label: "About Us", to: "/" },
    { label: "Our Fleet", to: "/explore" },
    { label: "How It Works", to: "/" },
    { label: "Careers", to: "/" },
    { label: "Contact", to: "/" },
  ],
  support: [
    { label: "Help Center", to: "/" },
    { label: "Booking Policy", to: "/" },
    { label: "Cancellation", to: "/" },
    { label: "Insurance Info", to: "/" },
    { label: "FAQs", to: "/" },
  ],
  account: [
    { label: "Sign In", to: "/login" },
    { label: "Register", to: "/register" },
    { label: "My Bookings", to: "/my-bookings" },
    { label: "Add a Car", to: "/add-car" },
    { label: "My Cars", to: "/my-added-cars" },
  ],
};

const socialLinks = [
  { Icon: RiFacebookCircleLine, label: "Facebook", href: "https://www.facebook.com/share/1AKXLBv3Gv/" },
  { Icon: XIcon, label: "X (Twitter)", href: "#" },
  { Icon: RiInstagramLine, label: "Instagram", href: "https://www.instagram.com/almahmuddev/" },
  { Icon: RiLinkedinBoxLine, label: "LinkedIn", href: "https://www.linkedin.com/in/almahmuddev/" },
  // { Icon: RiYoutubeLine, label: "YouTube", href: "#" },
];

const Footer = () => {
  return (
    <footer className="bg-dark-900 dark:bg-dark-950 text-dark-300 border-t border-dark-800">
      <div className="container-custom py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group w-fit">
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center group-hover:bg-brand-600 transition-colors">
                <RiCarLine className="text-white text-lg" />
              </div>
              <span className="font-display font-bold text-xl text-white tracking-tight">
                Drive<span className="text-brand-500">Fleet</span>
              </span>
            </Link>
            <p className="font-body text-sm text-dark-400 leading-relaxed mb-6 max-w-xs">
              Premium car rental made simple. Find the perfect vehicle for any
              journey — from city commutes to cross-country adventures.
            </p>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm font-body text-dark-400">
                <RiMapPinLine className="text-brand-500 text-base flex-shrink-0" />
                <span>123 Eidgah Square, Sylhet 3100, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-dark-400">
                <RiPhoneLine className="text-brand-500 text-base flex-shrink-0" />
                <a href="tel:+8801700000000" className="hover:text-brand-400 transition-colors">
                  +880 1874-991984
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm font-body text-dark-400">
                <RiMailLine className="text-brand-500 text-base flex-shrink-0" />
                <a href="mailto:hello@drivefleet.io" className="hover:text-brand-400 transition-colors">
                  devalmahmud@gmail.com
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
              Company
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-body text-dark-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
              Support
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-body text-dark-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Account Links */}
          <div>
            <h4 className="font-display font-semibold text-white text-sm mb-4 uppercase tracking-widest">
              Account
            </h4>
            <ul className="space-y-2.5">
              {footerLinks.account.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm font-body text-dark-400 hover:text-brand-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-dark-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-body text-dark-500">
            © {new Date().getFullYear()} DriveFleet. All rights reserved.
          </p>

          {/* Social Icons */}
          <div className="flex items-center gap-3">
            {socialLinks.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                aria-label={label}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 flex items-center justify-center rounded-lg text-dark-500 hover:text-brand-400 hover:bg-dark-800 transition-all"
              >
                <Icon className="text-base w-4 h-4" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Link to="/" className="text-xs font-body text-dark-500 hover:text-dark-400 transition-colors">
              Privacy Policy
            </Link>
            <Link to="/" className="text-xs font-body text-dark-500 hover:text-dark-400 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
