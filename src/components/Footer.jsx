// import React from "react";
// import logo from "../assets/logo.png";
// import { Link } from "react-router";

// const Footer = () => {
//   return (
//     <div>
//       <footer className="footer sm:footer-horizontal bg-neutral text-neutral-content p-10">
//         <div>
//           <img src={logo} alt="" className="h-20" />
//           <p className="text-2xl font-bold">
//             One Garments <br /> Shop
//           </p>
//         </div>
//         <nav>
//           <h6 className="footer-title">Services</h6>
//           <a className="link link-hover">Branding</a>
//           <a className="link link-hover">Design</a>
//           <a className="link link-hover">Marketing</a>
//           <a className="link link-hover">Advertisement</a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Company</h6>
//           <Link className="link link-hover" to="/">
//             Home
//           </Link>
//           <Link className="link link-hover" to="/Dashboard">
//             Dashboard
//           </Link>
//           <Link className="link link-hover" to="/all-products">
//             All-Products
//           </Link>
//           <a className="link link-hover">Press kit</a>
//         </nav>
//         <nav>
//           <h6 className="footer-title">Legal</h6>
//           <a className="link link-hover">Terms of use</a>
//           <a className="link link-hover">Privacy policy</a>
//           <a className="link link-hover">Cookie policy</a>
//         </nav>
//       </footer>
//     </div>
//   );
// };

// export default Footer;
import React from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import logo from "../assets/logo.png";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const Footer = () => {
  return (
    <footer className="bg-neutral text-neutral-content">
      {/* Main Footer */}
      <motion.div
        className="footer sm:footer-horizontal p-10 max-w-7xl mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Brand */}
        <motion.div variants={fadeUp} custom={1}>
          <img src={logo} alt="One Garments Shop" className="h-20 mb-3" />
          <p className="text-2xl font-bold leading-tight">
            One Garments <br /> Shop
          </p>
          <p className="text-sm text-neutral-400 mt-2">
            Quality garments, trusted production & on-time delivery.
          </p>
        </motion.div>

        {/* Services */}
        <motion.nav variants={fadeUp} custom={2}>
          <h6 className="footer-title">Services</h6>
          <a className="link link-hover">Bulk Garments Supply</a>
          <a className="link link-hover">Custom Design</a>
          <a className="link link-hover">Order Tracking</a>
          <a className="link link-hover">Quality Assurance</a>
        </motion.nav>

        {/* Company */}
        <motion.nav variants={fadeUp} custom={3}>
          <h6 className="footer-title">Company</h6>
          <Link className="link link-hover" to="/">
            Home
          </Link>
          <Link className="link link-hover" to="/dashboard">
            Dashboard
          </Link>
          <Link className="link link-hover" to="/all-products">
            All Products
          </Link>
          <a className="link link-hover">Press Kit</a>
        </motion.nav>

        {/* Legal */}
        <motion.nav variants={fadeUp} custom={4}>
          <h6 className="footer-title">Legal</h6>
          <a className="link link-hover">Terms of Use</a>
          <a className="link link-hover">Privacy Policy</a>
          <a className="link link-hover">Cookie Policy</a>
        </motion.nav>
      </motion.div>

      {/* Divider */}
      <div className="border-t border-neutral-700" />

      {/* Copyright */}
      <motion.div
        className="py-5 text-center text-sm text-neutral-400"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-neutral-content">
          One Garments Shop
        </span>
        . All rights reserved.
      </motion.div>
    </footer>
  );
};

export default Footer;
