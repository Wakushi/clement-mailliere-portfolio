export default function Hamburger({
  hamburgerMenuToggle,
}: {
  hamburgerMenuToggle: () => void
}) {
  return (
    <div className="hamburger-icon" onClick={hamburgerMenuToggle}>
      <div id="hamburger-menu" className="hamburger-menu">
        <div className="bar top"></div>
        <div className="bar middle"></div>
        <div className="bar bottom"></div>
      </div>
    </div>
  )
}
