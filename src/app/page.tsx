export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <div className="container px-4 py-16 text-center">
        <h1 className="font-heading text-5xl font-bold tracking-tight text-neutral-900 sm:text-6xl md:text-7xl">
          Welcome to{" "}
          <span className="text-primary">Little Gems</span>{" "}
          <span className="text-secondary">School</span>
        </h1>

        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
          The official website for Little Gems School. Featuring curriculum details, admissions, school news and more.
        </p>

        <div className="mt-10 flex items-center justify-center gap-x-6">
          <span className="rounded-md bg-primary px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700 transition-colors cursor-default">
            Coming Soon
          </span>
          <span className="text-sm font-semibold leading-6 text-neutral-900">
            Under Development
          </span>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl font-bold mb-3">+</div>
            <h3 className="font-heading text-lg font-semibold text-neutral-900">
              Quality Education
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Comprehensive curriculum designed for excellence
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-secondary text-4xl font-bold mb-3">*</div>
            <h3 className="font-heading text-lg font-semibold text-neutral-900">
              Experienced Staff
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Dedicated teachers committed to student success
            </p>
          </div>

          <div className="rounded-lg border border-neutral-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="text-primary text-4xl font-bold mb-3">#</div>
            <h3 className="font-heading text-lg font-semibold text-neutral-900">
              Excellence
            </h3>
            <p className="mt-2 text-sm text-neutral-600">
              Nurturing young minds to reach their full potential
            </p>
          </div>
        </div>

        <footer className="mt-16 text-sm text-neutral-500">
          Feature 1.1: Project Initialization | Next.js 14 + TypeScript + Tailwind CSS
        </footer>
      </div>
    </main>
  )
}
