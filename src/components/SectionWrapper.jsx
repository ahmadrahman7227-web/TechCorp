export default function SectionWrapper({ id, children, className }) {
  return (
    <section id={id} className={className}>
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}