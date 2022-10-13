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
     * @description 设置更新函数 (更新到界面上)
     * @param updater
     */
    setUpdater(updater: (layout: Layout[]) => void) {

    }

    /**
     * @description 界面布局同步到控制类
     * @param layout 布局信息
     */
    syncLayout(layout: Layout[]) {
        this.#layout = layout
    }

    /**
     * @description 更新界面布局
     * @param layout 布局信息
     */
    setLayout(layout: Layout[]) {
        this.#layout = layout
        this.updater(this.#layout)
    }

    /**
     * @description 获取布局信息 (一份复制, 可读)
     */
    getLayout(): Layout[] {
        return JSON.parse(JSON.stringify(this.#layout))
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
        } catch (e) {
            throw e
        }
    }

    /**
     * @description 设置某项的大小
     * @param id 目标id
     * @param to 目标新大小 (可选择设置一项或两项)
     */
    setSize(id: string, to: { w?: number, h?: number }) {
        const _target = this.#layout.find(item => item.i === id)
        if (!_target) throw new Error(`No item with id '${id}'`)
        else {
            _target.w = to.w ?? _target.w
            _target.h = to.h ?? _target.h
            console.log(_target, this.#layout)
            this.updater(this.#layout)
        }
    }

    /**
     * @description 销毁, 清除 rc
     */
    dispose() {
        this.#layout = []
        this.updater = () => {
        }
    }
}