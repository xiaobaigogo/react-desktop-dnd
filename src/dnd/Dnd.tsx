import Style from './Dnd.module.scss'
import GridContainer, { GridItem } from "./components/GridContainer";
import {useEffect, useInsertionEffect, useState} from "react";
import { GridController } from "./components/GridController";

const createBlock = (content: string) => {
    return <div style={ {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#ccc'
    } }>{ content }</div>
}

function Dnd() {
    const [ ctr, setCtr ] = useState<GridController | null>(null)

    const gridItems: GridItem[] = [
        { id: '1', x: 0, y: 0, w: 1, h: 1, element: createBlock('1') },
        { id: '2', x: 3, y: 0, w: 1, h: 1, element: createBlock('2') },
        // { id: '3', x: 2, y: 0, w: 1, h: 1, element: createBlock('3') },
        // { id: '4', x: 3, y: 0, w: 1, h: 1, element: createBlock('4') },
        // { id: '5', x: 4, y: 0, w: 1, h: 1, element: createBlock('5') },
        // { id: '6', x: 0, y: 1, w: 1, h: 1, element: createBlock('6') },
        // { id: '7', x: 1, y: 2, w: 1, h: 1, element: createBlock('7') },
        // { id: '8', x: 2, y: 2, w: 1, h: 1, element: createBlock('8') },
        // { id: '9', x: 3, y: 2, w: 1, h: 1, element: createBlock('9') },
        // { id: '10', x: 4, y: 2, w: 1, h: 1, element: createBlock('10') },
    ]

    setTimeout(() => {
        // 1. 外部设置布局
        // ctr?.setLayout([
        //     { i: '1', x: 1, y: 0, w: 1, h: 1 },
        //     { i: '2', x: 0, y: 0, w: 1, h: 1 },
        // ])

        // 2. 外部设置尺寸
        ctr?.setSize('1', {w: 2, h: 2})
    }, 2000)

    return (
        <div className={ Style.app }>
            <div className={ Style.panel }>
                { !ctr
                    ? '布局加载中...'
                    : <>
                        <div>样式控制</div>
                    </> }
            </div>
            <div className={ Style.workspace }>
                <GridContainer
                    items={ gridItems }
                    onLoad={ setCtr }
                    onReLayout={ layout => {
                        console.log(layout)
                    } }/>
            </div>
        </div>
    )
}

export default Dnd
