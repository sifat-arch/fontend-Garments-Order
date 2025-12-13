import React from "react";

const Services = () => {
  const services = [
    {
      title: "Manufacturing & Production",
      description:
        "We manage end-to-end garment production, ensuring high-quality output, timely delivery, and adherence to international standards. Focus on bulk order efficiency.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M7 7h10m0 0v10m0-10L7 17"
          ></path>
        </svg>
      ),
      link: "#",
    },
    {
      title: "Supply Chain Optimization",
      description:
        "From raw material sourcing to final logistics, our solutions streamline your supply chain, reducing lead times and cutting operational costs significantly.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 17L15 7"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 12H20"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 6l4-2m10 8l4-2m-8 6l4-2"
          ></path>
        </svg>
      ),
      link: "#",
    },
    {
      title: "Quality Control & Audits",
      description:
        "Comprehensive quality assurance checks at every stage (fabric inspection, cutting, stitching) to ensure zero defect garments meet client specifications globally.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      ),
      link: "#",
    },
    {
      title: "Custom Design & Sampling",
      description:
        "We offer professional fashion design consultation and rapid sampling services. Bring your vision to life with precise pattern making and prototyping.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 8c1.657 0 3 .895 3 2s-1.343 2-3 2-3-.895-3-2 1.343-2 3-2z"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          ></path>
        </svg>
      ),
      link: "#",
    },
    {
      title: "Compliance & Ethical Sourcing",
      description:
        "Ensure your supply chain meets all local and international labor laws (e.g., BSCI, SEDEX). We specialize in ethical sourcing and sustainable practice implementation.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.832 18 7.5 18s3 .477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5s3 .477 4.5 1.253v13C19.832 18.477 18.168 18 16.5 18s-3 .477-4.5 1.253"
          ></path>
        </svg>
      ),
      link: "#",
    },
    {
      title: "Technology Integration (ERP/MES)",
      description:
        "Integrating modern Enterprise Resource Planning (ERP) and Manufacturing Execution Systems (MES) to digitize factory floors and enhance real-time visibility.",
      icon: (
        <svg
          className="w-10 h-10 text-yellow-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9.75 17L9 20l-4-4m8-10L15 4l4 4m-4-4h.01M10 21V3"
          ></path>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 10a2 2 0 100-4 2 2 0 000 4z"
          ></path>
        </svg>
      ),
      link: "#",
    },
  ];

  return (
    <div className="bg-white py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 md:mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 text-center md:text-left">
            <span className="text-yellow-400">We</span> Offer Comprehensive
            Garment Solutions
          </h1>
          <p className="mt-4 text-xl text-gray-500 text-center md:text-left max-w-2xl mx-auto md:mx-0">
            Driving efficiency and ethical standards in modern textile
            manufacturing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-12">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 p-4"
            >
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-50">
                  {service.icon}
                </div>
              </div>

              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-base text-gray-600">{service.description}</p>
                <a
                  href={service.link}
                  className="mt-3 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 transition duration-150"
                >
                  LEARN MORE
                  <svg
                    className="ml-1 w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
