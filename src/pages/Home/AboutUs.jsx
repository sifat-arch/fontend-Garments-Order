// import React from "react";

// const AboutUs = () => {
//   return (
//     <div>
//       <div className="bg-stone-50 my-5 py-16 md:py-24">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//           <section className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24">
//             <div className="md:w-1/2 lg:w-5/12 order-2 md:order-1 mt-8 md:mt-0">
//               <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-4">
//                 <span className="text-yellow-400">About</span> Us
//               </h2>
//               <p className="text-lg text-gray-600 leading-relaxed max-w-md">
//                 HubSpot's company and culture are a lot like our product.
//                 They're crafted, not cobbled, for a delightful experience.
//               </p>
//             </div>

//             <div className="md:w-1/2 lg:w-5/12 order-1 md:order-2">
//               <div className="overflow-hidden rounded-xl shadow-xl w-full">
//                 <img
//                   className="w-full h-auto object-cover"
//                   src="https://i.ibb.co.com/jkstKDsB/julian-tong-Hl-u7-Tutl-Fw-unsplash.jpg"
//                   alt="A group of people standing together smiling"
//                   loading="lazy"
//                 />
//               </div>
//             </div>
//           </section>

//           <section className="flex flex-col md:flex-row items-center justify-between mt-16 md:mt-24">
//             <div className="md:w-1/2 lg:w-5/12 order-1">
//               <div className="overflow-hidden rounded-xl shadow-xl w-full">
//                 <img
//                   className="w-full h-auto object-cover"
//                   src="https://i.ibb.co.com/YBNQ82KF/collab-media-up-KXvfg-KABY-unsplash.jpg"
//                   alt="People sitting in an office with a 'Grow Better' sign"
//                   loading="lazy"
//                 />
//               </div>
//             </div>

//             <div className="md:w-1/2 lg:w-5/12 order-2 mt-8 md:mt-0">
//               <h3 className="text-3xl font-extrabold text-gray-900 mb-4">
//                 Our Mission: Being a Trusted Partner in Global Apparel
//                 Manufacturing.
//               </h3>
//               <p className="text-lg text-gray-600 leading-relaxed">
//                 We believe not just in growing bigger, but in growing better.
//                 For us, growing better means maintaining quality, ethical
//                 practices, and aligning our success with the trust and
//                 satisfaction of our customers.
//               </p>
//             </div>
//           </section>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AboutUs;
import React from "react";

const AboutUs = () => {
  return (
    <div>
      <div className="bg-stone-50 dark:bg-gray-900 my-5 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section 1 */}
          <section className="flex flex-col md:flex-row items-center justify-between mb-16 md:mb-24">
            <div className="md:w-1/2 lg:w-5/12 order-2 md:order-1 mt-8 md:mt-0">
              <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                <span className="text-yellow-400">About</span> Us
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed max-w-md">
                HubSpot's company and culture are a lot like our product.
                They're crafted, not cobbled, for a delightful experience.
              </p>
            </div>

            <div className="md:w-1/2 lg:w-5/12 order-1 md:order-2">
              <div className="overflow-hidden rounded-xl shadow-xl w-full">
                <img
                  className="w-full h-auto object-cover"
                  src="https://i.ibb.co.com/jkstKDsB/julian-tong-Hl-u7-Tutl-Fw-unsplash.jpg"
                  alt="A group of people standing together smiling"
                  loading="lazy"
                />
              </div>
            </div>
          </section>

          {/* Section 2 */}
          <section className="flex flex-col md:flex-row items-center justify-between mt-16 md:mt-24">
            <div className="md:w-1/2 lg:w-5/12 order-1">
              <div className="overflow-hidden rounded-xl shadow-xl w-full">
                <img
                  className="w-full h-auto object-cover"
                  src="https://i.ibb.co.com/YBNQ82KF/collab-media-up-KXvfg-KABY-unsplash.jpg"
                  alt="People sitting in an office with a 'Grow Better' sign"
                  loading="lazy"
                />
              </div>
            </div>

            <div className="md:w-1/2 lg:w-5/12 order-2 mt-8 md:mt-0">
              <h3 className="text-3xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                Our Mission: Being a Trusted Partner in Global Apparel
                Manufacturing.
              </h3>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                We believe not just in growing bigger, but in growing better.
                For us, growing better means maintaining quality, ethical
                practices, and aligning our success with the trust and
                satisfaction of our customers.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
