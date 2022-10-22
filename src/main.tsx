import './index.css'
import { createRoot } from 'react-dom/client'
import SortableImpl from "./SortableImpl";

createRoot(document.getElementById('root') as HTMLElement)
    .render(<SortableImpl/>)
