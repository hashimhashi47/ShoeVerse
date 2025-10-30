import React from "react";
import { FaFacebook, FaGithub, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

function Footer() {
  return (
    <footer className="bg-black text-white">
      <div>
        <div>
          <img src="shoeVerse.png" alt="Logo" className="h-20 mx-auto" />
         
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold mb-4">Solutions</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Marketing
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Analytics
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Automation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Commerce
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Insights
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Submit ticket
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Documentation
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Guides
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Jobs
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Press
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold mb-4">Legal</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <a href="#" className="hover:text-white">
                  Terms of service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  Privacy policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-white">
                  License
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6">
          <p className="text-sm font-semibold mb-2">
            Subscribe to our newsletter
          </p>
          <p className="text-gray-400 mb-4">
            Get the latest news, articles, and resources, sent to your inbox
            weekly.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 bg-gray-900 border border-gray-600 rounded-md focus:outline-none focus:border-white text-white"
            />
            <button className="bg-white text-black px-4 py-2 rounded-md font-medium hover:bg-gray-200">
              Subscribe
            </button>
          </form>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2025 ShoeVerse, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
