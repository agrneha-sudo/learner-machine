import Link from 'next/link'
import { Shield } from 'lucide-react'

export const metadata = {
  title: 'Privacy Policy — Learner Machine',
  description: 'Privacy Policy for LearnerMachine.com — how we collect, use, and protect your personal information.',
}

const sections = [
  {
    title: 'Introduction',
    content: [
      'LearnerMachine.com ("we", "our", "us") values your privacy and is committed to protecting your personal information. This Privacy Policy describes how your personal information is collected, used, and shared when you visit or make a purchase from www.learnermachine.com.',
      'LearnerMachine.com is a digital platform offering downloadable products such as ebooks, PDFs, video trainings, online courses, and other educational materials.',
      'LearnerMachine.com is a subsidiary of InGadgets Pvt Ltd, located at: D2-1404, Cleo County, Sector-121, Noida.',
      'By using our website, you agree to the terms of this Privacy Policy.',
    ],
  },
  {
    title: 'Information We Collect',
    content: [
      'When you visit our website or purchase a digital product, we may collect certain information from you.',
    ],
    subsections: [
      {
        title: 'Personal Information',
        items: [
          'Name',
          'Email address',
          'Billing address',
          'Payment details (processed securely through third-party payment gateways)',
          'Phone number (if provided)',
          'Account login details (if you create an account)',
        ],
      },
      {
        title: 'Device Information',
        intro: 'We may automatically collect certain information about your device, including:',
        items: [
          'IP address',
          'Browser type',
          'Device type',
          'Operating system',
          'Referring websites',
          'Pages visited on our website',
          'Time spent on pages',
        ],
        note: 'This information helps us understand how users interact with our website and improve user experience.',
      },
    ],
  },
  {
    title: 'How We Use Your Information',
    content: ['We use the collected information to:'],
    items: [
      'Process and complete digital product purchases',
      'Deliver downloadable digital products',
      'Send order confirmations and download links',
      'Provide customer support',
      'Improve our website and services',
      'Communicate important updates regarding your purchase',
      'Prevent fraud and ensure security of transactions',
      'Send marketing emails or updates (only if you opt-in)',
    ],
  },
  {
    title: 'Payment Information',
    content: [
      'All payments made on LearnerMachine.com are processed through secure third-party payment processors. We do not store your complete credit card or payment details on our servers.',
      'Payment providers may include: Cashfree, Razorpay, Stripe, PayPal, Apple / Google payment systems, and other secure payment gateways.',
      'These providers maintain their own privacy and security standards.',
    ],
  },
  {
    title: 'Digital Product Delivery',
    content: [
      'All products sold on LearnerMachine.com are digital downloadable products or view-on-platform products.',
      'After successful payment, customers receive access to their purchased digital content through email delivery, secure download links, or an account dashboard (if applicable). No physical shipping is involved.',
    ],
  },
  {
    title: 'Sharing of Information',
    content: [
      'We do not sell, rent, or trade your personal information.',
      'However, we may share your information with trusted third parties when necessary to operate our services, including:',
    ],
    items: [
      'Payment processing providers',
      'Website hosting providers',
      'Email service providers',
      'Analytics tools',
      'Legal authorities when required by law',
    ],
    note: 'All such third parties are required to protect your information.',
  },
  {
    title: 'Cookies and Tracking Technologies',
    content: ['Our website may use cookies and similar tracking technologies to:'],
    items: [
      'Improve website functionality',
      'Understand visitor behaviour',
      'Provide better user experience',
      'Analyse website performance',
    ],
    note: 'You can choose to disable cookies through your browser settings, although some website features may not function properly.',
  },
  {
    title: 'Data Security',
    content: [
      'We implement reasonable technical and organisational measures to protect your personal information.',
      'However, no method of transmission over the internet is completely secure, and we cannot guarantee absolute security.',
    ],
  },
  {
    title: 'Third-Party Links',
    content: [
      'Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those external websites. Users are encouraged to review the privacy policies of such websites before providing personal information.',
    ],
  },
  {
    title: 'Your Rights',
    content: ['Depending on your location, you may have rights regarding your personal data, including:'],
    items: [
      'Access to your personal information',
      'Correction of inaccurate data',
      'Request deletion of personal data',
      'Withdraw consent for marketing communications',
    ],
    note: 'To exercise these rights, please contact us using the contact details below.',
  },
  {
    title: "Children's Privacy",
    content: [
      'LearnerMachine.com is not intended for individuals under the age of 13 years. We do not knowingly collect personal information from children.',
      'If we become aware that a child has provided personal data, we will delete such information promptly.',
    ],
  },
  {
    title: 'Changes to This Privacy Policy',
    content: [
      'We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or services.',
      'Any updates will be posted on this page with the revised effective date.',
    ],
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen py-20 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">

        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium mb-6"
            style={{ backgroundColor: 'rgba(194,82,12,0.08)', color: 'var(--brand)', border: '1px solid rgba(194,82,12,0.2)' }}>
            <Shield size={14} />
            Legal
          </div>
          <h1 className="font-display font-bold text-4xl mb-4" style={{ color: 'var(--text-primary)' }}>
            Privacy Policy
          </h1>
          <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
            Last updated: March 2025 &nbsp;·&nbsp; LearnerMachine.com (a subsidiary of InGadgets Pvt Ltd)
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {sections.map((section, i) => (
            <div key={i} className="card p-8">
              <h2 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
                {section.title}
              </h2>

              {section.content?.map((para, j) => (
                <p key={j} className="text-sm leading-relaxed mb-3" style={{ color: 'var(--text-secondary)' }}>
                  {para}
                </p>
              ))}

              {'items' in section && section.items && (
                <ul className="space-y-2 mb-3">
                  {section.items.map((item, j) => (
                    <li key={j} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                      <span style={{ color: 'var(--brand)', flexShrink: 0 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}

              {'note' in section && section.note && (
                <p className="text-sm leading-relaxed mt-2" style={{ color: 'var(--text-muted)' }}>
                  {section.note}
                </p>
              )}

              {'subsections' in section && section.subsections?.map((sub, j) => (
                <div key={j} className="mt-5">
                  <p className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: 'var(--text-muted)' }}>
                    {sub.title}
                  </p>
                  {'intro' in sub && sub.intro && (
                    <p className="text-sm mb-2" style={{ color: 'var(--text-secondary)' }}>{sub.intro}</p>
                  )}
                  <ul className="space-y-2">
                    {sub.items.map((item, k) => (
                      <li key={k} className="flex gap-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                        <span style={{ color: 'var(--brand)', flexShrink: 0 }}>→</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {'note' in sub && sub.note && (
                    <p className="text-sm mt-3" style={{ color: 'var(--text-muted)' }}>{sub.note}</p>
                  )}
                </div>
              ))}
            </div>
          ))}

          {/* Contact section */}
          <div className="card p-8">
            <h2 className="font-display font-bold text-lg mb-4" style={{ color: 'var(--text-primary)' }}>
              Contact Us
            </h2>
            <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--text-secondary)' }}>
              If you have any questions regarding this Privacy Policy or your personal information, you may contact us at:
            </p>
            <div className="rounded-xl p-5 space-y-2 text-sm" style={{ background: 'var(--bg-secondary)' }}>
              <p className="font-semibold" style={{ color: 'var(--text-primary)' }}>LearnerMachine.com</p>
              <p style={{ color: 'var(--text-muted)' }}>A subsidiary of InGadgets Pvt Ltd</p>
              <p style={{ color: 'var(--text-muted)' }}>D2-1404, Cleo County, Sector-121, Noida, Uttar Pradesh, India</p>
              <a href="mailto:support@learnermachine.com" style={{ color: 'var(--brand)' }}>
                support@learnermachine.com
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mt-10">
          <Link href="/terms" className="btn-secondary">
            Terms &amp; Conditions
          </Link>
          <Link href="/contact" className="btn-secondary">
            Contact Support
          </Link>
        </div>

      </div>
    </div>
  )
}
