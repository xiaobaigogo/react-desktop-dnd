import { CSSProperties, useEffect, useRef } from "react";
import Sortable from "sortablejs";
import type { Options } from "sortablejs";

/**
 * @description GridDeskController
 */
class GridDeskController {
    constructor() {
    }
}

/**
 * @description
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
     * @description options passed to `sortablejs`
     */
    sortableOptions?: Options
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
    if(new Set(props.data.map(_ => _.id)).size !== props.data.length)
        throw new Error('Duplicate id exists.')

    const { cellOptions } = props
    const _cellWidth = cellOptions?.width ?? cellOptions?.size ?? 50
    const _cellHeight = cellOptions?.height ?? cellOptions?.size ?? 50

    const _container = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const _instance = Sortable.create(_container.current!)

        return () => {
            _instance.destroy()
        }
    }, [ _container ])

    return (
        <div className="grid-desk__container"
             ref={ _container }
             style={ {
                 ...props.style,
                 width: '100%', minWidth: '100%', maxWidth: '100%',
                 height: '100%', minHeight: '100%', maxHeight: '100%',
                 flexShrink: 0, display: 'block', overflow: 'auto'
             } }>
            {
                props.data.map(item => {
                    return (
                        <div className="grid-desk__cell"
                             key={ item.id } title={ item.tooltip }
                             data-id={ item.id } data-name={ item.name }
                             style={ {
                                 margin: 5, padding: 5,
                                 border: 'solid 1px #ccc',
                                 background: '#fff',
                                 width: _cellWidth,
                                 height: _cellHeight,
                                 boxSizing: 'border-box',
                                 display: 'inline-block',
                                 overflow: 'hidden',
                             } }>
                            { item.inner }
                        </div>
                    )
                })
            }
        </div>
    )
}