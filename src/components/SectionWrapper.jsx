export default function SectionWrapper({ children, className = "" }) {
  return (
    <section className={`py-20 md:py-28 px-4 sm:px-6 md:px-16 ${className}`}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}