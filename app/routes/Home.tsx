import { Link } from 'react-router';

export default function Home() {
  return (
    <>
      <section className="h-[60vh] min-h-[500px] flex items-center justify-center text-center text-white bg-cover bg-center" style={{ backgroundImage: "url('/images/banner.jpg')" }}>
        <div className="bg-black/30 p-8 rounded">
          <h1 className="text-5xl font-bold mb-4 drop-shadow-lg">Timeless Pieces. Curated History.</h1>
          <p className="text-xl mb-6">Discover hand-selected antiques and vintage treasures in Kingston.</p>
          <Link to="/gallery" className="btn-primary">Browse Collection</Link>
        </div>
      </section>
      <section className="container-custom text-center">
        <br></br>
        <h2 className="text-3xl mb-6">Welcome to Antique Alley</h2>
        <p className="max-w-3xl mx-auto">Step into a world where history comes alive. At Antique Alley, every corner is filled with hand-selected antiques, vintage furniture, and rare collectibles that carry a story of their own. For over 25 years in downtown Kingston, we’ve been a haven for collectors, design enthusiasts, and curious treasure-seekers alike.
        From timeless heirlooms to unique finds you won’t see anywhere else, our collection invites you to explore, discover, and bring a piece of the past into your present. Whether you’re hunting for that perfect accent piece, a conversation-starting collectible, or simply soaking in the charm of a bygone era, Antique Alley promises an experience as unforgettable as the treasures we offer.
        Come visit us, and let your journey through history begin.</p>
        <br></br>
      </section>

      {/* Featured Categories */}
      <section className="container-custom">
        <h2 className="text-3xl font-bold text-center mb-10">Featured Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {/* Furniture Card */}
          <div className="text-center">
            <div className="overflow-hidden rounded-[6px] mb-4">
              <img 
                src="/images/furniture.jpg" 
                alt="Antique Furniture" 
                className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-xl font-bold">Furniture</h3>
          </div>

          {/* Collectibles Card */}
          <div className="text-center">
            <div className="overflow-hidden rounded-[6px] mb-4">
              <img 
                src="/images/collectibles.jpg" 
                alt="Collectibles" 
                className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-xl font-bold">Collectibles</h3>
          </div>

          {/* Vintage Clothing Card */}
          <div className="text-center">
            <div className="overflow-hidden rounded-[6px] mb-4">
              <img 
                src="/images/clothing.jpg" 
                alt="Vintage Clothing" 
                className="w-full h-[200px] object-cover hover:scale-105 transition-transform duration-300" 
              />
            </div>
            <h3 className="text-xl font-bold">Vintage Clothing</h3>
          </div>
        </div>
      </section>
    </>
  );
}