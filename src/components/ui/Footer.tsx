import React, { useState, useEffect } from "react";

const navigation = {
  social: [
    {
      name: "Facebook",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "Pinterest",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24.02 23.61" {...props}>
          <g id="Layer_1-2" data-name="Layer 1">
            <path d="M11.94,0C5.29,0,0,5.29,0,11.94s2.99,9.09,7.06,10.86c0-.81,0-1.76.27-2.71s1.49-6.51,1.49-6.51c0,0-.41-.81-.41-1.9,0-1.76,1.09-3.12,2.31-3.12s1.63.81,1.63,1.76-.68,2.71-1.09,4.21c-.27,1.22.68,2.31,1.9,2.31,2.31,0,3.8-2.85,3.8-6.38s-1.76-4.61-4.89-4.61-5.84,2.71-5.84,5.7.27,1.76.81,2.31c.27.27.27.41.14.68,0,.27-.14.68-.27.95,0,.27-.27.41-.54.27-1.63-.68-2.44-2.44-2.44-4.48,0-3.39,2.85-7.46,8.55-7.46s7.46,3.26,7.46,6.79-2.58,8.14-6.38,8.14-2.44-.68-2.85-1.49l-.81,3.26c-.27.95-.68,1.9-1.22,2.58,1.09.27,2.17.54,3.39.54,6.51,0,11.94-5.29,11.94-11.94S18.46,0,11.94,0Z" />
          </g>
        </svg>
      ),
    },
    {
      name: "Instagram",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
    {
      name: "X",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path d="M13.6823 10.6218L20.2391 3H18.6854L12.9921 9.61788L8.44486 3H3.2002L10.0765 13.0074L3.2002 21H4.75404L10.7663 14.0113L15.5685 21H20.8131L13.6819 10.6218H13.6823ZM11.5541 13.0956L10.8574 12.0991L5.31391 4.16971H7.70053L12.1742 10.5689L12.8709 11.5655L18.6861 19.8835H16.2995L11.5541 13.096V13.0956Z" />
        </svg>
      ),
    },
    {
      name: "YouTube",
      href: "#",
      icon: (props) => (
        <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
          <path
            fillRule="evenodd"
            d="M19.812 5.418c.861.23 1.538.907 1.768 1.768C21.998 8.746 22 12 22 12s0 3.255-.418 4.814a2.504 2.504 0 0 1-1.768 1.768c-1.56.419-7.814.419-7.814.419s-6.255 0-7.814-.419a2.505 2.505 0 0 1-1.768-1.768C2 15.255 2 12 2 12s0-3.255.417-4.814a2.507 2.507 0 0 1 1.768-1.768C5.744 5 11.998 5 11.998 5s6.255 0 7.814.418ZM15.194 12 10 15V9l5.194 3Z"
            clipRule="evenodd"
          />
        </svg>
      ),
    },
  ],
};

export default function Footer() {
  return (
    <div className="flex flex-col w-full h-full bg-[#000]">
      <div className="max-w-[1280px] mx-auto w-full">
        <div className="mt-10 border-t border-white/10 pt-8 ">
          <div className="flex justify-between mobile:flex-col mobile:items-center mobile:gap-y-24">
            <div id="newsletter" className="flex-col ml-[8px] max-w-[400px]">
              <div>
                <h3 className="text-xl font-semibold text-white">
                  Join my mailing list
                </h3>
                <p className="mt-2 text-sm/6 text-gray-300">
                  Enter your email to receive news on newly available artwork
                  and special promotions
                </p>
              </div>
              <form className="mt-6">
                <label htmlFor="email-address" className="sr-only">
                  Email address
                </label>
                <input
                  id="email-address"
                  name="email-address"
                  type="email"
                  required
                  placeholder="Enter your email"
                  autoComplete="email"
                  className="w-full min-w-0 rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:w-56 sm:text-sm/6"
                />
                <div className="mt-4 sm:ml-4 sm:mt-0 sm:shrink-0">
                  <button
                    type="submit"
                    className="flex w-full items-center justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                  >
                    Subscribe
                  </button>
                </div>
              </form>
            </div>
            <div
              id="legal"
              className="flex font-sans flex-col max-w-[250px] mobile:max-w-[370px] mobile:ml-0 ml-[40px]"
            >
              <h1 className="text-white font-bold text-[14px] mb-[10px]">
                PLEASE NOTE:
              </h1>
              <p className="text-[10pt] text-gray-400">
                All artwork sales are final. Purchases are not returnable and
                nonrefundable. If you have further questions about this policy
                please send me a message through the contact section. Thank you
                for supporting an independent artist.
              </p>
            </div>
          </div>
        </div>
        <div className="ml-[8px] mt-8 border-t border-white/10 pt-8 mb-5 flex-col">
          <div
            id="socialLinks"
            className="flex gap-x-6 mobile:items-center mobile:justify-center"
          >
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-400 hover:text-gray-300"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon aria-hidden="true" className="size-6" />
              </a>
            ))}
          </div>
          <div
            id="copyright"
            className="flex mobile:justify-center mobile:items-center"
          >
            <p className="mt-8 bottom-8 text-[8pt] text-gray-400 ">
              &copy; 2010 - 2024 Benjamin Black. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
