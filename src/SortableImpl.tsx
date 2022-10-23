import { useCallback, useState } from "react";
import GridDesk, { GridDeskController, GridDeskItem } from "./GridDesk/GridDeskImpl";

const itemStyle = {
    width: '100px',
    height: '30px',
    border: 'solid 1px #ccc',
    backgroundColor: '#eee'
}

export default function SortableImpl() {
    const [ count, setCount ] = useState(20)
    const gridData: GridDeskItem[] = new Array(count)
        .fill(0)
        .map((_, idx) => ({
            id: idx + '',
            name: `name: ${ idx }`,
            inner: <div>I`m { idx }</div>
        }))

    const [ ctr, setCtr ] = useState<GridDeskController>()

    const handleRemove = useCallback(() => {
        setCount(c => {
            ctr?.remove(c - 1 + '')
            return c - 1
        })
    }, [ ctr, count ])
    const handleAdd = useCallback(() => {
        setCount(c => {
            ctr?.append({
                id: c + '',
                inner: <div>I`m { c }</div>
            })
            return c + 1
        })
    }, [ ctr, count ])
    const handleOrder = useCallback(() => {
        ctr?.fromIdOrder(
            new Array(count)
                .fill(0)
                .map((_, idx) => idx)
                .sort((a, b) => Math.random() > 0.5 ? 1 : -1)
                .map(_ => _ + '')
        )
    }, [ ctr, count ])
    const handleIdOrder = useCallback(() => {
        const arr = ctr?.toIdOrder()
        alert(arr?.join(' | ') ?? '无')
    }, [ ctr ])

    return (
        <div style={ {} }>
            <p style={ { color: '#fff' } }>curr: { count }</p>
            <button onClick={ handleRemove }>remove</button>
            <button onClick={ handleAdd }>add</button>
            <button onClick={ handleIdOrder }>id order</button>
            <button onClick={ handleOrder }>rand order</button>
            <br/>
            <GridDesk data={ gridData } onLoad={ setCtr }/>
        </div>
    )
}