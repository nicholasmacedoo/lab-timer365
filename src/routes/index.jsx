import { createBrowserRouter } from "react-router-dom";
import { HomePage } from '../pages/home'
import { HistoryPage } from '../pages/history'
import { Layout } from '../template'

export const routes = createBrowserRouter([
    {
        path: '/', // caminho
        element: <Layout />, // componente que vai renderizar em tela
        // nested routes
        children: [
            {
                path: '/', // caminho da pagina,
                element: <HomePage />
            },
            {
                path: '/historico',
                element: <HistoryPage />
            }
        ]
    }
])