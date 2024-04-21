export default function Footer() {
  return (
    <footer className="flex items-center pointer-events-none absolute bottom-0 opacity-0 p-2 w-full max-h-[100px] md:p-[4rem] bg-gradient-to-b from-transparent to-black fade-in-bottom-4">
      <div className="w-[50px] md:w-[70px]">
        <a href="https://www.lisaa.com/fr" target="_blank">
          <img src="/images/lisaa-logo.webp" alt="lisaa logo" />
        </a>
      </div>
      <ul>
        <li className="text-[0.9rem] md:text-[1.1rem] leading-5">
          Adobe Animate
        </li>
        <li className="text-[0.9rem] md:text-[1.1rem] leading-5">
          Adobe Photoshop
        </li>
        <li className="text-[0.9rem] md:text-[1.1rem] leading-5">Toon Boom</li>
      </ul>
    </footer>
  )
}
