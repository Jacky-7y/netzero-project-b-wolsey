export default function About() {
  return (
    <main>
      <section className="bg-brand-olive text-white text-center py-[60px]">
        <h1 className="text-3xl font-bold">Our Story</h1>
      </section>

      <section className="container-custom max-w-3xl">
        <br></br>
        <div className="space-y-6 text-lg leading-relaxed">
          <p>
            <strong>Antique Alley</strong> (Cellar Door Antiques and Kate's Vintage Kloset) is a true antique and collectible shop in the downtown core of Kingston. 
            Antique Alley has been in the same location for more than 25 years; and over 48 years in downtown Kingston.
          </p>
          <p>
            Located at the end of an alley way off of Wellington Street, most think we are a tiny shop, but once inside you will find over <strong>5,000 square feet</strong> of inventory. 
            We have an eclectic look and a very large inventory. A visit to the shop is a necessity.
          </p>
          <p>
            Gayle or Gary will be glad to assist you in finding what you need, collect or just would love to own. 
            We welcome the opportunity to create the best shopping experience in antique hunting!
          </p>
          <div className="p-4 border-l-4 border-brand-gold bg-stone-100 italic text-stone-600">
            PLEASE NOTE: Antique Alley is not hiring and would never hire without meeting the candidate in person.
          </div>
        </div>
      </section>
    </main>
  );
}