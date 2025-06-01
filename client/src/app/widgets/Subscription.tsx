'use client'
import { motion } from 'framer-motion'
import { Check } from 'lucide-react'

// Global window type declaration
declare global {
  interface Window {
    openPocketsflowCheckout: (options: PocketsflowCheckoutOptions) => void;
  }
}

// Product checkout options
interface PocketsflowCheckoutOptionsProduct {
  type: "product";
  productId: string;
  subdomain: string;
  embedDivId?: string;
  isDarkMode?: boolean;
  metadata?: unknown, // webhook metadata
  onSuccess?: (data: {
    email: string;
    firstName: string;
    lastName: string;
    paymentIntentId: string;
    data: any;
  }) => void;
}

// Subscription checkout options
interface PocketsflowCheckoutOptionsSubscription {
  type: "subscription";
  subscriptionId: string;
  subdomain: string;
  embedDivId?: string;
  isDarkMode?: boolean;
  metadata?: unknown, // webhook metadata
  onSuccess?: (data: {
    type: "success";
    setupIntentId: string;
    data: any;
    isSubscription: true;
    firstName: string;
    lastName: string;
    email: string;
  }) => void;
}

// Union type for all checkout options
type PocketsflowCheckoutOptions =
  | PocketsflowCheckoutOptionsProduct
  | PocketsflowCheckoutOptionsSubscription;

const plans = [
  {
    name: 'Free',
    price: '$0/month',
    features: [
      'Access to all basic features',
      'YouTube playlist integration',
      'Topic segmentation',
      'Progress tracking',
      'Ad-supported experience'
    ],
    cta: 'Get Started',
    ctaLink: '/signup',
    highlight: false
  },
  {
    name: 'Premium',
    price: '$1/month',
    features: [
      'All Free plan features',
      'Ad-free experience',
      'Priority customer support',
      'Early access to new features',
      'Unlimited playlist imports'
    ],
    cta: 'Go Premium',
    ctaLink: '/premium',
    highlight: true
  }
]

export default function Subscription() {
  return (
    <section className="py-20 px-6 bg-gray-900">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Choose Your Plan</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className={`bg-black p-8 rounded-lg shadow-lg ${plan.highlight ? 'border-2 border-purple-500' : ''
                }`}
            >
              <h3 className="text-2xl font-bold mb-4 text-purple-300">{plan.name}</h3>
              <p className="text-4xl font-bold mb-6 text-white">{plan.price}</p>
              <ul className="mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-center mb-2 text-gray-300">
                    <Check className="mr-2 text-purple-500" size={20} />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  window.openPocketsflowCheckout({
                    type: "subscription",
                    subscriptionId: "683c20e88a91a4ea38847650",
                    subdomain: "serverend",
                    isDarkMode: true,
                    onSuccess: (data) => {
                      // success callback

                      // in data you will get:
                      // {
                      //   type: "success",
                      //   setupIntentId: confirmed.setupIntent.id,
                      //   data: confirmed.setupIntent,
                      //   isSubscription: true,
                      //   firstName,
                      //   lastName,
                      //   email,
                      //   metadata: the webhook metadata object
                      // }
                      console.log("success", data);
                    },
                  });
                }}
                className={`relative block w-full text-center py-3 px-4 rounded font-medium cursor-pointer ${plan.highlight
                  ? 'bg-purple-600 text-white hover:bg-purple-700'
                  : 'bg-gray-700 text-white hover:bg-gray-600'
                  } transition duration-300 transform hover:scale-105 active:scale-95`}
              >
                {plan.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section >
  )
}

