import { APP_NAME } from "@/lib/utils/constants"
import { PageShell } from "@/components/layout/page-shell"

export default function PrivacyPage() {
  return (
    <PageShell>
      <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
        <h1 className="font-heading text-4xl font-bold mb-8">Privacy Policy</h1>
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <p className="lead">
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p>
            At {APP_NAME}, we value your privacy and are committed to protecting your personal information.
            This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Information We Collect</h2>
          <p>
            We may collect personal information that you voluntarily provide to us when you:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Register for an account or apply for admission</li>
            <li>Subscribe to our newsletter</li>
            <li>Contact us via our contact forms</li>
            <li>Participate in surveys or promotions</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">How We Use Your Information</h2>
          <p>
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-6 space-y-2 mb-4">
            <li>Process your application and providing educational services</li>
            <li>Communicate with you about updates, events, and news</li>
            <li>Improve our website and user experience</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Data Security</h2>
          <p>
            We implement appropriate technical and organizational measures to maintain the safety of your personal information.
            However, please note that no method of transmission over the Internet or electronic storage is 100% secure.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Contact Us</h2>
          <p>
            If you have any questions about this Privacy Policy, please contact us.
          </p>
        </div>
      </div>
    </PageShell>
  )
}
