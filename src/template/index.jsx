import { Outlet } from 'react-router-dom'
import { Header } from "../components/header";

import './template.css'

export function Layout() {
    return (
        <>
            <Header />
            <main className="container--template">
                <div className="container--template-contents">
                    <Outlet />
                </div>
            </main>
        </>
    )
}
