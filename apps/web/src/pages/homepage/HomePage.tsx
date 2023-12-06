import Logo from '/logo.svg';

export const HomePage = () => {
  return (
    <div>
      <a href="https://vitejs.dev" target="_blank">
        <img src={Logo} className="logo" alt="Vite logo" />
      </a>
    </div>
  )
}