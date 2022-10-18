import './index.css'
import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import Dnd from './dnd/Dnd'

createRoot(document.getElementById('root') as HTMLElement)
    .render(
        // <StrictMode>
            <Dnd/>
        // </StrictMode>
    )
