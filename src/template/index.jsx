import { Header } from "../components/header";
import PropTypes from 'prop-types'
import './template.css'

export function Layout({ children }) {
    return (
        <>
            <Header />
            <main className="container--template">
                <div className="container--template-contents">
                    {children}
                </div>
            </main>
        </>
    )
}

Layout.propTypes = {
    children: PropTypes.node,
}