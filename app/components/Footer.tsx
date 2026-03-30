export default function Footer() {
  return (
    <footer className="bg-brand-dark text-white py-[60px] mt-auto">
      <div className="container-custom py-0 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="mb-4 text-xl">Antique Alley</h3>
          <p>Email: <a href="mailto:gdawdy@gmail.com">gdawdy@gmail.com</a></p>
          <p><a href="tel:6135451120">Phone: (613) 545-1120</a></p>
          <p><a href="https://www.facebook.com/antiquealleykingston/">Facebook: antiquealleykingston</a></p>
        </div>
        <div>
          <h3 className="mb-4 text-xl">Location</h3>
          <p>207-B Wellington Street, Kingston, ON</p>
        </div>
      </div>
    </footer>
  );
}