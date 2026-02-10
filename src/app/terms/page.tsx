import { APP_NAME } from "@/lib/utils/constants"
import { PageShell } from "@/components/layout/page-shell"

export default function TermsPage() {
    return (
        <PageShell>
            <div className="container mx-auto px-4 py-24 md:py-32 max-w-4xl">
                <h1 className="font-heading text-4xl font-bold mb-8">Terms of Service</h1>
                <div className="prose prose-neutral dark:prose-invert max-w-none">
                    <p className="lead">
                        Last updated: {new Date().toLocaleDateString()}
                    </p>
                    <p>
                        Welcome to {APP_NAME}. By accessing or using our website, you agree to be bound by these Terms of Service.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Use of Website</h2>
                    <p>
                        You agree to use our website for lawful purposes only and in a way that does not infringe the rights of,
                        restrict or inhibit anyone else's use and enjoyment of the website.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Intellectual Property</h2>
                    <p>
                        All content on this website, including text, graphics, logos, images, and software, is the property of
                        {APP_NAME} or its content suppliers and is protected by international copyright laws.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Limitation of Liability</h2>
                    <p>
                        {APP_NAME} shall not be liable for any direct, indirect, incidental, consequential, or punitive damages
                        arising out of your access to, or use of, the website.
                    </p>

                    <h2 className="text-2xl font-bold mt-8 mb-4">Changes to Terms</h2>
                    <p>
                        We reserve the right to modify these terms at any time. Please check this page periodically for changes.
                        Your continued use of the site following the posting of changes will mean that you accept and agree to the changes.
                    </p>
                </div>
            </div>
        </PageShell>
    )
}
