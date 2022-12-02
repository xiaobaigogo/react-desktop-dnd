import { useRef, useState } from "react";
import { GridDeskContextMenuNode, GridDeskItem } from "./GridDeskImpl";

type GridDeskContextMenuProps = {
  nodes: GridDeskContextMenuNode[]
  item?: GridDeskItem
}

function MenuItem(nodes: GridDeskContextMenuNode) {

  const [showOptions, setShowOptions] = useState(false)
  
  return (
    <div 
      className="grid-desk-context-menu-item"
      onMouseEnter={() => setShowOptions(true)}
      onMouseLeave={() => setShowOptions(false)}
    >
      {nodes.leftIcon ? nodes.leftIcon : <></>}
      <span onClick={() => nodes.cb?.()}>{nodes.title}</span>
      {nodes.sub?.length
      ? (
        <div
          style={{
            visibility: showOptions? 'visible' : 'hidden',
            position: 'absolute',
            left: '100%',
            top: '0'
          }}
        >
          {nodes.sub.map((item, idx) => (
            <MenuItem key={idx} {...item}/>
          ))}
        </div>
      )
      :  <></>
      }
      {nodes.rightIcon ? nodes.rightIcon : <></>}
    </div>
  )
}

export default function GridDeskContextMenu(props: GridDeskContextMenuProps) {

  return (
    <div className="grid-desk-context-menu">
      {props.nodes.map((item, idx) => 
        <MenuItem key={idx} {...item}/>
      )}
    </div>
  )
}