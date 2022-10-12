import "react-grid-layout/css/styles.css";
import GridLayout, { Layout } from "react-grid-layout";
import { GridController } from "./GridController";
import { useLayoutEffect, useState } from "react";

/**
 * @description 内容物参数
 */
export type GridItem = {
    /**
     * @description 唯一标识
     */
    id: string
    /**
     * @description x
     */
    x: number
    /**
     * @description y
     */
    y: number
    /**
     * @description 宽度占几个单位
     */
    w: number
    /**
     * @description 高度占几个单位
     */
    h: number
    /**
     * @description 内容物
     */
    element: JSX.Element
}

/**
 * @description 容器参数
 */
export type GridContainerProps = {
    /**
     * @description
     */
    style?: any
    /**
     * @description
     */
    className?: any
    /**
     * @description 容器宽度(px)
     * @default 1000
     */
    width?: number
    /**
     * @description (最大)行数
     * @default 5
     */
    rows?: number
    /**
     * @description (始终)列数
     * @default 5
     */
    cols?: number
    /**
     * @description 单元格间距
     * @default 10
     */
    gap?: [ number, number ]
    /**
     * @description 容器内边距
     * @default gap
     * @see GridContainerProps.gap
     */
    padding?: [ number, number ]
    /**
     * @description 内容列表
     */
    items?: GridItem[]
    /**
     * @description 单元格高度 (px)
     * @default 200
     */
    cellHeight?: number
    /**
     * @description 组件加载完毕后提供控制类
     * @param _ctr 布局控制类
     */
    onLoad?: (_ctr: GridController) => void
    /**
     * @description 重新布局后回调
     * @param _layout 新布局
     */
    onReLayout?: (_layout: Layout[]) => void
}

/**
 * @bugs 参数 `rows` 不起作用. 因为 `RGL` 的 `maxRows` 参数实际为某一单元格可供拉伸的最大高度而不是容器中的最大行数. 可采用监听前后布局来取消掉某次非法的拖拽实现最大高度限制.
 * @param props
 */
export default (props: GridContainerProps) => {
    const {
        style,
        className,
        width = 1000,
        cols = 5,
        rows = 5,
        gap = [ 10, 10 ],
        padding = gap,
        items = [],
        cellHeight = 100,
        onLoad,
        onReLayout,
    } = props

    const [ layout, setLayout ] = useState<Layout[]>(items.map(item => {
        const { id, x, y, w, h } = item
        return {
            i: id,
            x, y, w, h
        }
    }))
    const _ctr = new GridController(setLayout, rows, cols)

    useLayoutEffect(() => {
        onLoad?.(_ctr)
    }, [])

    return <div
        className={ className }
        style={ {
            position: 'relative',
            width: '100%',
            height: '100%',
            ...style
        } }>
        <GridLayout
            maxRows={ rows } cols={ cols }
            width={ width } layout={ layout }
            margin={ gap } containerPadding={ padding }
            rowHeight={ cellHeight }
            isBounded={ true } isResizable={ false }
            onLayoutChange={ newLayout => {
                setLayout(newLayout)
                _ctr.syncLayout(newLayout)
                onReLayout?.(newLayout)
            } }>
            {
                items.map(item =>
                    <div key={ item.id }>
                        { item.element }
                    </div>
                )
            }
        </GridLayout>
    </div>
}