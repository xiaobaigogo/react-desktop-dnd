import {CSSProperties, Dispatch, RefObject, SetStateAction, useEffect, useRef, useState} from "react";
import Sortable from "sortablejs";
import type {Options} from "sortablejs";
import "./index.css";

/**
 * @description default options for sortablejs
 */
const SortableOption__default: Options = {
    ghostClass: 'grid-desk-item__ghost',
    animation: 150,
}

/**
 * @description 网格布局的单元格的配置项
 */
export type GridDeskItem = {
    /**
     * @description unique key for each item
     */
    id: string
    /**
     * @description inner element to display
     */
    inner: JSX.Element
    /**
     * @description optional name for each item
     */
    name?: string
    /**
     * @description optional tooltip for each item
     */
    tooltip?: string
}

/**
 * @description 网格布局的右键菜单树形结构
 */
export type GridDeskContextMenuNode = {
    /**
     * @description 展示文本
     */
    title: string
    /**
     * @description 左侧图标
     */
    leftIcon?: JSX.Element
    /**
     * @description 右侧图标 有子项则默认为 '>' 图标
     */
    rightIcon?: JSX.Element
    /**
     * @description 子菜单, hover 展示
     */
    sub?: GridDeskContextMenuNode[]
}

/**
 * @description
 */
export type GridDeskProps = {
    /**
     * @description data of grid
     */
    data: GridDeskItem[]
    /**
     * @description style of container
     */
    style?: CSSProperties
    /**
     * @description options of item
     */
    cellOptions?: {
        /**
         * @description alias for the combination of `width` and `height`, will be overwritten by `width/height`
         * @default 50 (px)
         */
        size?: number
        /**
         * @description `width` of item
         * @default 50 (px)
         */
        width?: number
        /**
         * @description `height` of item
         * @default 50 (px)
         */
        height?: number
        /**
         * @description `margin` of item
         * @default 5 (px)
         */
        margin?: number
    },
    /**
     * @description event callback on item
     */
    cellEvents?: {
        click?: (item: GridDeskItem) => void
        rightClick?: (item: GridDeskItem) => void
    }
    /**
     * @description options passed to `sortablejs`
     */
    sortableOptions?: Options
    /**
     * @description callback when layout loaded
     * @param controller
     */
    onLoad?: (controller: GridDeskController) => void
    /**
     * @description 自定义右键菜单展示
     */
    contextMenuConfig: {
        /**
         * @description type: 配置类型 格子/空白
         * @description 值为直接配置项或根据右键点击上下文生成的配置项 (context: null-右键空白; GridDeskItem - 右键格子)
         */
        [type in 'cell' | 'blank']?: GridDeskContextMenuNode[] | ((context: GridDeskItem | null) => GridDeskContextMenuNode[])
    }
}

/**
 * @description GridDeskController
 * @description this controller holds the dispatch method returned by useState, which may cause memory-leak in some special cases
 */
export class GridDeskController {
    readonly #instance: Sortable
    readonly #setter: Dispatch<SetStateAction<GridDeskItem[]>>

    constructor(
        container: RefObject<HTMLDivElement>,
        setter: Dispatch<SetStateAction<GridDeskItem[]>>,
        customOptions?: Options,
    ) {
        this.#instance = Sortable.create(container.current!, {
            ...SortableOption__default,
            ...customOptions
        })
        this.#setter = setter
    }

    /**
     * @description append an item
     * @param item
     */
    append(item: GridDeskItem) {
        this.#setter(prev => [...prev, item])
    }

    /**
     * @description remove specific item by id
     * @param id unique key of item
     */
    remove(id: string) {
        this.#setter(prev => {
            return prev.filter(item => {
                return item.id !== id
            })
        })
    }

    /**
     * @description return the ID of each item in order
     */
    toIdOrder() {
        return this.#instance.toArray()
    }

    fromIdOrder(orderedIds: string[]) {
        this.#instance.sort(orderedIds, true)
    }

    /**
     * @description enable
     */
    enable() {
        this.#instance.option('disabled', false)
    }

    /**
     * @description disable
     */
    disable() {
        this.#instance.option('disabled', true)
    }

    /**
     * @description destroy all sortable binding
     */
    destroy() {
        this.#instance.destroy()
    }
}

/**
 * @description GridDesk component
 * @param props {GridDeskProps}
 * @example
 * import GridDesk from "{path_to_component}/{filename}.{ext}";
 *
 * export default function GridDeskUsage () {
 *     const gridData = new Array(20)
 *         .fill(0)
 *         .map((_, idx) => ({
 *             id: `id${idx}`,
 *             inner: <div>I`m {idx}</div>
 *         })
 *
 *     return (
 *         <GridDesk data={ gridData }/>
 *     )
 * }
 * @throws {Error} throws when duplicate id exists.
 */
export default function GridDesk(props: GridDeskProps) {
    if (new Set(props.data.map(_ => _.id)).size !== props.data.length)
        throw new Error('Duplicate id exists.')

    const {cellOptions, data, onLoad, sortableOptions, style, cellEvents} = props

    const _cellStyle: CSSProperties = {
        margin: cellOptions?.margin ?? 5,
        width: cellOptions?.width ?? cellOptions?.size ?? 50,
        height: cellOptions?.height ?? cellOptions?.size ?? 50,
        boxSizing: 'border-box',
        display: 'inline-block',
        overflow: 'hidden',
    }

    const _container = useRef<HTMLDivElement>(null)
    const [gridList, setGridList] = useState(data)

    useEffect(() => {
        const controller = new GridDeskController(_container, setGridList, sortableOptions)

        onLoad?.(controller)

        return () => {
            controller.destroy()
        }
    }, [])

    return (
        <div className="grid-desk__container"
             ref={_container}
             style={{
                 ...style,
                 width: '100%', minWidth: '100%', maxWidth: '100%',
                 height: '100%', minHeight: '100%', maxHeight: '100%',
                 flexShrink: 0, display: 'block', overflow: 'auto'
             }}>
            {
                gridList.map(item => {
                    return (
                        <div className="grid-desk__cell"
                             key={item.id} title={item.tooltip}
                             data-id={item.id} data-name={item.name}
                             style={_cellStyle}
                             onClick={(e) => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 cellEvents?.click?.(item)
                             }}
                             onContextMenu={(e) => {
                                 e.preventDefault()
                                 e.stopPropagation()
                                 cellEvents?.rightClick?.(item)
                             }}>
                            {item.inner}
                        </div>
                    )
                })
            }
        </div>
    )
}
