import { Layout } from "react-grid-layout";

export class GridController {
    /**
     * @description 布局信息
     */
    #layout: Layout[] = []

    /**
     * @description
     * @param updater 控制更新界面的函数
     * @param rows default: 5
     * @param cols default: 5
     */
    constructor(
        private updater: ((layout: Layout[]) => void),
        private rows = 5,
        private cols = 5,
    ) {
    }

    /**
     * @description 无参: 控制类同步到界面
     * @description 有参: 界面同步到控制类
     * @param layout 可选, 新的布局存储
     */
    syncLayout(layout?: Layout[]) {
        if(!!layout) this.#layout = layout
        else this.updater(this.#layout)
    }

    /**
     * @description 使用 JSON 格式存储当前布局信息
     */
    toJson() {
        return JSON.stringify(this.#layout)
    }

    /**
     * @description 从 JSON 格式恢复布局信息并更新到界面
     * @param layoutStr JSON字符串 更新失败则抛出错误
     */
    fromJson(layoutStr: string) {
        try {
            const try_parse = JSON.parse(layoutStr)
            this.updater(try_parse)
            this.#layout = try_parse
        }
        catch (e) {
            throw e
        }
    }
}