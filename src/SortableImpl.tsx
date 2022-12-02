import {useCallback, useState} from "react";
import GridDesk, {GridDeskContextMenuNode, GridDeskController, GridDeskItem} from "./GridDesk/GridDeskImpl";

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
            id: idx + '',
            name: `name: ${idx}`,
            inner: <div style={{
                width: '100%',
                height: '100%',
                border: 'solid 1px #ccc',
                background: '#fff',
            }}>I`m {idx}</div>
        }))

    const [ctr, setCtr] = useState<GridDeskController>()

    const handleRemove = useCallback(() => {
        ctr?.remove(0 + '')
    }, [ctr])
    const handleAdd = useCallback(() => {
        ctr?.append({
            id: '20',
            inner: <div style={{
                border: 'solid 1px #ccc',
                background: '#fff',
                width: '100%',
                height: '100%',
            }}>I`m {20}</div>
        })
    }, [ctr])
    const handleOrder = useCallback(() => {
        ctr?.fromIdOrder(
            new Array(20)
                .fill(0)
                .map((_, idx) => idx)
                .sort((a, b) => Math.random() > 0.5 ? 1 : -1)
                .map(_ => _ + '')
        )
    }, [ctr])
    const handleIdOrder = useCallback(() => {
        const arr = ctr?.toIdOrder()
        alert(arr?.join(' | ') ?? '无')
    }, [ctr])

    const [cellSize, setCellSize] = useState('60')

    // const contextMenuConfig = useState()

    return (
        <div style={{}}>
            <button onClick={handleRemove}>remove</button>
            <button onClick={handleAdd}>add</button>
            <button onClick={handleIdOrder}>id order</button>
            <button onClick={handleOrder}>rand order</button>
            <input value={cellSize} type="number" onChange={(e) => setCellSize(e.target.value)}/>
            <br/>
            <GridDesk data={gridData}
                      onLoad={setCtr}
                      cellOptions={{
                          size: parseInt(cellSize)
                      }}
                      contextMenuConfig={{
                          cell: (item: GridDeskItem | null) => {
                                console.log(item)
                              return [
                                { 
                                    title: item?.name || 'name',
                                    cb: () => console.log(item)
                                }
                            ]
                          },
                          blank: [
                            { 
                                title: '左键', 
                                cb: () => {console.log('点击左键')},
                                sub: [
                                    { 
                                        title: '左键一',
                                        sub: [
                                            {
                                                title: '左键11',
                                            }
                                        ]
                                    }, 
                                    { title: '左键二' }
                                ] 
                            }, 
                            { title: '右键' }
                          ]
                      }}
                      cellEvents={{
                          click: item => {
                            //   item.inner = <></>
                            //   alert('clicked: ' + JSON.stringify(item, null, 4))
                          },
                          rightClick: item => {
                            //   item.inner = <></>
                            //   alert('rightClicked: ' + JSON.stringify(item, null, 4))
                          }
                      }}/>
        </div>
    )
}
