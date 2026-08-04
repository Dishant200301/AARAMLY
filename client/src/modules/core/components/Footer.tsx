import { useState } from "react";
import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterestP } from "react-icons/fa";
import { FiMail, FiX, FiCheckCircle } from "react-icons/fi";
import { AaramlyLogo } from "./Navbar";
import NewsletterCTA from "./NewsletterCTA";
import { MOCK_CONTACT_MESSAGES } from "../../../../../admin/src/data/mockAdminData";

export default function Footer() {
  const [showContactModal, setShowContactModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim() || '+91 98000 00000',
      subject: subject.trim() || 'General Inquiry',
      message: message.trim(),
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'New' as const
    };

    // Push to mock admin dataset for real-time synchronization
    MOCK_CONTACT_MESSAGES.unshift(newMsg);

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setShowContactModal(false);
      setName('');
      setEmail('');
      setPhone('');
      setSubject('');
      setMessage('');
    }, 2000);
  };

  return (
    <footer className="mt-8 bg-white font-sans selection:bg-[#80a17d] selection:text-white">
      <NewsletterCTA />
      <div className="mx-auto grid max-w-[1400px] gap-10 px-5 py-16 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 md:px-8">
        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-2 sm:row-start-1 lg:row-start-1 xl:row-start-1">
          <div className="mb-4">
            <Link to="/" className="inline-block cursor-pointer">
              <AaramlyLogo />
            </Link>
          </div>
          <p className="mt-4 max-w-xs text-sm text-aaramly-ink-2">Premium seamless innerwear crafted for skin-friendly, breathable comfort — every single day.</p>
          <div className="mt-6 flex items-center gap-3">
            {[FaInstagram, FaFacebookF, FaPinterestP, FaYoutube].map((I, i) => (
              <a key={i} href="#" aria-label="social" className="grid h-9 w-9 place-items-center rounded-full border border-aaramly-line hover:bg-black hover:text-white transition-colors"><I size={13} /></a>
            ))}
          </div>
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 sm:row-start-2 lg:row-start-2 xl:row-start-1">
          <ul className="mt-4 space-y-3 text-sm text-aaramly-ink-2">
            <li><Link to="/shop" className="hover:text-black">Shop</Link></li>
            <li><Link to="/shop?category=Bralettes" className="hover:text-black">Seamless Padded Bralette</Link></li>
            <li><Link to="/shop?category=Accessories" className="hover:text-black">Silicone Nipple Covers</Link></li>
            <li><Link to="/shop?category=Everyday Bras" className="hover:text-black">Women's Seamless Bra</Link></li>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-1 lg:col-span-2 xl:col-span-1 sm:row-start-2 lg:row-start-2 xl:row-start-1">
          <ul className="mt-4 space-y-3 text-sm text-aaramly-ink-2">
            <li>
              <Link
                to="/contact"
                className="flex items-center gap-1.5 cursor-pointer text-zinc-900"
              >
                {/* <FiMail className="text-[#80a17d]" /> */}
                <span>Contact Us</span>
              </Link>
            </li>
            <li><a href="#" className="hover:text-black">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-black">Shipping &amp; Delivery</a></li>
            <li><a href="#" className="hover:text-black">Returns &amp; Exchanges</a></li>
            <li><a href="#" className="hover:text-black">FAQ</a></li>
          </ul>
        </div>

        <div className="col-span-1 sm:col-span-2 lg:col-span-2 xl:col-span-1 sm:row-start-3 lg:row-start-1 xl:row-start-1">
          <p className="text-sm font-700 tracking-wide">Newsletter</p>
          <p className="mt-4 text-sm text-aaramly-ink-2">Soft launches &amp; subscriber-only offers.</p>
          <form onSubmit={(e) => e.preventDefault()} className="mt-4 flex border border-aaramly-line">
            <input type="email" required placeholder="Your email" className="flex-1 bg-transparent px-3 py-3 text-sm outline-none" />
            <button className="bg-black px-4 text-white text-[10px] font-600 tracking-[0.25em] uppercase">Join</button>
          </form>
        </div>
      </div>

      <div className="border-t border-aaramly-line py-5 text-center text-xs text-aaramly-ink-2">
        © {new Date().getFullYear()} AARAMLY. All rights reserved.
      </div>

      {/* CONTACT FORM MODAL */}
      {showContactModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden border border-stone-200 animate-in fade-in zoom-in-95 duration-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <div>
                <h3 className="text-lg font-black text-stone-900">Contact AARAMLY Support</h3>
                <p className="text-xs text-stone-500">Send us a inquiry — our team syncs directly with the Admin Panel.</p>
              </div>
              <button
                onClick={() => setShowContactModal(false)}
                className="p-2 text-stone-400 hover:text-stone-900 rounded-full hover:bg-stone-100 cursor-pointer"
              >
                <FiX className="w-5 h-5" />
              </button>
            </div>

            {submitted ? (
              <div className="p-8 text-center space-y-2">
                <FiCheckCircle className="w-12 h-12 text-emerald-500 mx-auto" />
                <h4 className="text-base font-black text-stone-900">Message Sent Successfully!</h4>
                <p className="text-xs text-stone-500">
                  Thank you! Your message has been stored in the database and forwarded to the Admin Panel.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-3.5 text-xs">
                <div>
                  <label className="font-extrabold text-stone-900 uppercase tracking-wider block mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Meera Kapoor"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-50 p-3 rounded-2xl border border-stone-200 focus:outline-none focus:border-stone-900 font-medium"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-extrabold text-stone-900 uppercase tracking-wider block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="meera@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-stone-50 p-3 rounded-2xl border border-stone-200 focus:outline-none focus:border-stone-900 font-medium"
                    />
                  </div>

                  <div>
                    <label className="font-extrabold text-stone-900 uppercase tracking-wider block mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+91 98765 43210"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-stone-50 p-3 rounded-2xl border border-stone-200 focus:outline-none focus:border-stone-900 font-medium"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-extrabold text-stone-900 uppercase tracking-wider block mb-1">Subject</label>
                  <input
                    type="text"
                    placeholder="e.g. Sizing Advice / Exchange Request"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full bg-stone-50 p-3 rounded-2xl border border-stone-200 focus:outline-none focus:border-stone-900 font-medium"
                  />
                </div>

                <div>
                  <label className="font-extrabold text-stone-900 uppercase tracking-wider block mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Write your question or feedback..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full bg-stone-50 p-3 rounded-2xl border border-stone-200 focus:outline-none focus:border-stone-900 font-medium"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-stone-900 hover:bg-black text-white font-bold py-3 rounded-2xl text-xs shadow-md transition-all cursor-pointer"
                >
                  Send Inquiry to Admin
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </footer>
  );
}
