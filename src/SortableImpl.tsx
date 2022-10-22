import Sortable from "sortablejs"
import { useEffect, useState } from "react";
import GridDesk, { GridDeskItem } from "./GridDesk/GridDeskImpl";

const itemStyle = {
    width: '100px',
    height: '30px',
    border: 'solid 1px #ccc',
    backgroundColor: '#eee'
}

export default function SortableImpl() {
    const gridData: GridDeskItem[] = new Array(20)
        .fill(0)
        .map((_, idx) => ({
            id: `id${ idx }`,
            name: `name: ${ idx }`,
            inner: <div>I`m { idx }</div>
        }))

    return (
        <div style={ {} }>
            <GridDesk data={ gridData }/>
        </div>
    )
}