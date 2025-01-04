import Link from "next/link";

const Footer: React.FC = () => {
  const renderList = (place: string, text: string) => (
    <Link
      className="hover:decoration-Lightblue-50 underline text-lg font-medium decoration-[#00080a] transition-all duration-150 hover:scale-105"
      href={place}
    >
      {" "}
      <p>{text}</p>
    </Link>
  );

  return (
    <footer className="bg-[#00080a] font-titilium  mt-5  text-Lightblue-50 p-8">
      <div className="container mx-auto">
        {/* Store Information */}

        {/* Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="flex justify-self-center flex-col">
            <h3 className="font-semibold text-Lightblue-100 text-xl">Quick Links</h3>
           
              {renderList("/", "Home")}
              {renderList("/products", "Products")}
              {renderList("/info/about_us", "About Us")}
        
          </div>
          <div className="flex justify-self-center flex-col">
            <h3 className="font-semibold text-Lightblue-100 text-xl">Help & Support</h3>
           
            {renderList("/info/faq", "FAQ")}
            {renderList("/info/shipping", "Shipping and return policy")}
            {renderList("/", "Size Guide")}
        
        
          </div>
          <div className="flex flex-col  justify-self-center">
            <h3 className="font-semibold text-Lightblue-100 text-xl">Contact Us</h3>
            <ul className="text-lg">
              <li>Email: info@drakethreads.com</li>
              <li>Phone/WhatsApp: +54 341 555 1234</li>
            </ul>
            <ul className="flex text-lg  gap-4">
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
            <p>© 2025 Drake Threads. All rights reserved.</p>
            <div className="flex gap-2">
              <span className="text-sm">Privacy Policy</span>
              <span>|</span>
              <span className="text-sm">Terms of Service</span>
            </div>
          </div>
          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
