import facebookIcon from '../assets/facebook.png';
import twitterIcon from '../assets/twitter.png';
import instagramIcon from '../assets/instagram.png';

const Footer = () => {
  return (
    <footer className="bg-emerald-800 text-white mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-col items-center text-center">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center">
              <span className="text-emerald-800 font-bold text-xl">K</span>
            </div>
            <span className="font-semibold text-3xl tracking-tight">
              KeenKeeper
            </span>
          </div>

          <p className="text-emerald-100 pt-4 max-w-md mb-8">
            Your personal shelf of meaningful connections. Browse, tend, and
            nurture the relationships that matter most.
          </p>

          {/* Social Links */}
          <p className="text-emerald-300 font-medium mb-4">Social Links</p>
          <div className="flex gap-6 mb-8">
            <a href="#" className="hover:text-emerald-300 transition-colors">
              <img
                src={instagramIcon}
                alt="Instagram"
                className="w-8 h-8"
              />
            </a>
            <a href="#" className="hover:text-emerald-300 transition-colors">
              <img
                src={facebookIcon}
                alt="Facebook"
                className="w-8 h-8"
              />
            </a>
            <a href="#" className="hover:text-emerald-300 transition-colors">
              <img
                src={twitterIcon}
                alt="Twitter"
                className="w-8 h-8"
              />
            </a>
          </div>

          <div className="text-emerald-300 text-sm border-t border-emerald-700 pt-6 w-full flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2026 KeenKeeper. All rights reserved.</p>
            <div className="flex gap-6 text-xs">
              <a href="#" className="hover:text-white">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-white">
                Terms of Service
              </a>
              <a href="#" className="hover:text-white">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
