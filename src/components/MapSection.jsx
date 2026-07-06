const asset = (path) => `/ever/assets/${path}`

export default function MapSection() {
  return (
    <section id="map" className="relative bg-ever-cold-1 text-ever-cold-3">
      <div className="px-ever-l py-ever-l">
        <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-4">
          Location
        </h2>
        <p className="text-ever-cold-3/80 max-w-xl mb-6">
          The Ever complex is located in the Obrucheva district, a 7-minute walk from Kaluzhskaya metro station.
        </p>
        <div className="aspect-[4/3] max-h-[500px] bg-ever-cold-2/20 rounded overflow-hidden">
          <img
            src={asset('images/landing/map/map-en.svg')}
            alt="Map of Ever location"
            className="w-full h-full object-contain"
            onError={(e) => {
              e.target.style.display = 'none'
              const fallback = e.target.parentElement
              if (fallback) {
                fallback.classList.add('flex', 'items-center', 'justify-center')
                fallback.innerHTML = '<p class="text-ever-cold-3/60">Map (add map-en.svg to public/ever/assets/images/landing/map/)</p>'
              }
            }}
          />
        </div>
      </div>
    </section>
  )
}
