import Link from "next/link";

const Footer: React.FC = () => {
  const renderList = (place: string, text: string) => (
    <Link
      className="hover:decoration-Lightblue-50 transition-all duration-150 hover:scale-105"
      href={place}
    >
      {" "}
      <p>{text}</p>
    </Link>
  );

  return (
    <footer className="bg-[#00080a] font-titilium  mt-5 underline decoration-[#00080a] text-Lightblue-50 p-8">
      <div className="container mx-auto">
        {/* Store Information */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold">Drake Threads</h2>
          <p>Paraná, Entre Ríos, Argentina</p>
          <p className="mt-2">
            "We’re bringing back the magic of Y2K and the futuristic style of
            the 2000s. Our clothing combines nostalgia with modernity, inspired
            by Frutiger Aero and Vector aesthetics, so you can stand out with
            every look."
          </p>
        </div>

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Quick Links</h3>
           
              {renderList("/", "Home")}
              {renderList("/products", "Products")}
              {renderList("/", "About Us")}
        
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-lg">Help & Support</h3>
           
            {renderList("/faq", "FAQ")}
            {renderList("/", "Size Guide")}
            {renderList("/", "Shipping and return policy")}
        
          </div>
          <div>
            <h3 className="font-semibold text-lg">Contact Us</h3>
            <ul>
              <li>Email: info@retrofuturethreads.com</li>
              <li>Phone/WhatsApp: +54 341 555 1234</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg">Follow Us</h3>
            <p className="mb-2">"Follow us and relive the Y2K style."</p>
            <ul className="flex gap-4">
              <li>
                <a href="#" className="hover:underline">
                  Instagram
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  TikTok
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Pinterest
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Payment Methods & Legal */}
        <div className="border-t border-gray-700 ">
          <div className="flex justify-between items-center flex-wrap">
            <p>© 2025 RetroFuture Threads. All rights reserved.</p>
            <div className="flex gap-2">
              <span className="text-sm">Privacy Policy</span>
              <span>|</span>
              <span className="text-sm">Terms of Service</span>
            </div>
          </div>
          <div className="mt-4">
            <p>Accepted Payments:</p>
            <div className="flex gap-4 mt-2">
              <img src="/visa.png" alt="Visa" className="w-8" />
              <img src="/mastercard.png" alt="MasterCard" className="w-8" />
              <img src="/paypal.png" alt="PayPal" className="w-8" />
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
