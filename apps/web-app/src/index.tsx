import React from 'react'
import ReactDOM from 'react-dom'
// import App from './pages/App'
// import { register } from './utils/ServiceWorker';

import './styles/index.scss'

const App = React.lazy(() => import('./pages/App'))

ReactDOM.render(
    <React.StrictMode>
        <React.Suspense fallback={<section>Loading</section>}>
            <App />
        </React.Suspense>
    </React.StrictMode>,
    document.getElementById('root')
)

// register();
