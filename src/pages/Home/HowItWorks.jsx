import { CreditCard, ShoppingBag, Truck } from "lucide-react";
import { motion } from "framer-motion";

const steps = [
  {
    icon: <ShoppingBag className="w-10 h-10 text-yellow-600" />,
    title: "Choose Your Outfit",
    desc: "Browse our latest collections and pick your style.",
  },
  {
    icon: <CreditCard className="w-10 h-10 text-yellow-600" />,
    title: "Place Your Order",
    desc: "Add to cart and order easily in minutes.",
  },
  {
    icon: <Truck className="w-10 h-10 text-yellow-600" />,
    title: "Fast Delivery",
    desc: "Get your products delivered quickly.",
  },
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 my-5">
      <h2 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-gray-100">
        <span className="text-yellow-400">How</span> It Works
      </h2>

      <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: i * 0.2 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 text-center border border-indigo-100 dark:border-gray-700 
                       hover:-translate-y-2 hover:shadow-xl transition transform"
          >
            <div className="mx-auto w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900 flex items-center justify-center mb-4">
              {step.icon}
            </div>

            <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {step.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mt-2">{step.desc}</p>

            <div className="mt-6 text-yellow-600 font-bold text-lg">
              0{i + 1}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
