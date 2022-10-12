import Style from './App.module.scss'
import GridContainer from "./components/GridContainer";
import {useState} from "react";
import {LayoutController} from "./components/LayoutController";

function App() {
    const [ctr, setCtr] = useState<LayoutController | null>(null)

    return (
        <div className={Style.app}>
            <div className={Style.panel}>
                控制项列表...
            </div>
            <div className={Style.workspace}>
                <GridContainer onLoad={setCtr}/>
            </div>
        </div>
    )
}

export default App
