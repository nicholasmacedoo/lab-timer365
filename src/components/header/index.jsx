import './header.css'

export function Header() {
    return (
        <header className='container--header'>
            <img src="/logotipo.png" alt="Logotipo do LAB Timer365" />

            <nav>
                <a href="#">Home</a>
                <a href="#">Historico</a>
            </nav>
        </header>
    )
}