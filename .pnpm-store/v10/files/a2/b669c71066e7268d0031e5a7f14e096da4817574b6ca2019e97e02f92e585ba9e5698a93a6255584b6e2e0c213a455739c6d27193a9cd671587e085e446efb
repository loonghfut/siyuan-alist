/* eslint-disable ts/prefer-literal-enum-member */
/* 块级节点类型 */
export enum NodeType {
    NodeNotebook = "NodeNotebook",
    NodeFolder = "NodeFolder",

    NodeDocument = "NodeDocument",
    NodeSuperBlock = "NodeSuperBlock",
    NodeBlockquote = "NodeBlockquote",
    NodeList = "NodeList",
    NodeListItem = "NodeListItem",

    NodeHeading = "NodeHeading",
    NodeParagraph = "NodeParagraph",
    NodeMathBlock = "NodeMathBlock",
    NodeTable = "NodeTable",
    NodeCodeBlock = "NodeCodeBlock",
    NodeHTMLBlock = "NodeHTMLBlock",
    NodeBlockQueryEmbed = "NodeBlockQueryEmbed",
    NodeAttributeView = "NodeAttributeView",

    NodeThematicBreak = "NodeThematicBreak",
    NodeAudio = "NodeAudio",
    NodeVideo = "NodeVideo",
    NodeIFrame = "NodeIFrame",
    NodeWidget = "NodeWidget",
}

/* 块类型 */
export enum BlockType {
    /* 容器块 */
    d = "d", // 文档块
    s = "s", // 超级块
    b = "b", // 引述块
    l = "l", // 列表块
    i = "i", // 列表项

    /* 叶子块 */
    h = "h", // 标题块
    p = "p", // 段落块
    m = "m", // 公式块
    t = "t", // 表格块
    c = "c", // 代码块
    html = "html", // HTML 块
    query_embed = "query_embed", // 嵌入块

    tb = "tb", // 分隔线
    audio = "audio", // 音频块
    video = "video", // 视频块
    iframe = "iframe", // iframe
    widget = "widget", // 挂件块
}

/* 容器块 */
export enum Container {
    d = BlockType.d, // 文档块
    s = BlockType.s, // 超级块
    b = BlockType.b, // 引述块
    l = BlockType.l, // 列表块
    i = BlockType.i, // 列表项
}

/* 叶子块 */
export enum Leaf {
    /* 可搜索时过滤 */
    h = BlockType.h, // 标题块
    p = BlockType.p, // 段落块
    m = BlockType.m, // 公式块
    t = BlockType.t, // 表格块
    c = BlockType.c, // 代码块
    html = BlockType.html, // HTML 块
    query_embed = BlockType.query_embed, // 嵌入块

    /* 不可搜索时过滤 */
    tb = BlockType.tb, // 分隔线
    audio = BlockType.audio, // 音频块
    video = BlockType.video, // 视频块
    iframe = BlockType.iframe, // iframe
    widget = BlockType.widget, // 挂件块
}

/* 块子类型 */
export enum BlockSubType {
    h1 = "h1", // <icon-h1 />
    h2 = "h2", // <icon-h2 />
    h3 = "h3", // <icon-h3 />
    h4 = "h4", // <icon-h4 />
    h5 = "h5", // <icon-h5 />
    h6 = "h6", // <icon-h6 />
    u = "u", // <icon-unordered-list />
    o = "o", // <icon-ordered-list />
    t = "t", // <icon-select-all />
    none = "",
}

/* 列表块/列表项 节点子类型 */
export enum NodeListSubType {
    u = BlockSubType.u,
    o = BlockSubType.o,
    t = BlockSubType.t,
}

/* 标题节点子类型 */
export enum NodeHeadingSubType {
    h1 = BlockSubType.h1,
    h2 = BlockSubType.h2,
    h3 = BlockSubType.h3,
    h4 = BlockSubType.h4,
    h5 = BlockSubType.h5,
    h6 = BlockSubType.h6,
}

/**
 * 搜索方案
 * REF: https://github.com/siyuan-note/siyuan/blob/145243e0583b7259fed143833a648e61f8863528/kernel/api/search.go#L221
 */
export enum Method {
    keyword, // 关键字
    querySyntax, // 查询语法
    sql, // SQL
    regex, // 正则表达式
}

/**
 * 搜索结果分组方案
 * REF: https://github.com/siyuan-note/siyuan/blob/145243e0583b7259fed143833a648e61f8863528/kernel/api/search.go#L231
 */
export enum GroupBy {
    noGroupBy, // 不分组
    group, // 按文档分组
}

/**
 * 搜索结果排序方案
 * REF: https://github.com/siyuan-note/siyuan/blob/145243e0583b7259fed143833a648e61f8863528/kernel/api/search.go#L226
 */
export enum OrderBy {
    type, // 按块类型（默认）
    createdASC, // 创建时间升序
    createdDESC, // 创建时间降序
    modifiedASC, // 修改时间升序
    modifiedDESC, // 修改时间降序
    sortByContent, // 按原文内容顺序（仅限按文档分组）
    sortByRankAsc, // 按相关度升序
    sortByRankDesc, // 按相关度降序
}

/**
 * 文档排序方案
 * REF: [util package - github.com/siyuan-note/siyuan/kernel/util - Go Packages](https://pkg.go.dev/github.com/siyuan-note/siyuan/kernel/util)
 */
export enum SortMode {
    SortModeNameASC, // 0：文件名字母升序
    SortModeNameDESC, // 1：文件名字母降序
    SortModeUpdatedASC, // 2：文件更新时间升序
    SortModeUpdatedDESC, // 3：文件更新时间降序
    SortModeAlphanumASC, // 4：文件名自然数升序
    SortModeAlphanumDESC, // 5：文件名自然数降序
    SortModeCustom, // 6：自定义排序
    SortModeRefCountASC, // 7：引用数升序
    SortModeRefCountDESC, // 8：引用数降序
    SortModeCreatedASC, // 9：文件创建时间升序
    SortModeCreatedDESC, // 10：文件创建时间降序
    SortModeSizeASC, // 11：文件大小升序
    SortModeSizeDESC, // 12：文件大小降序
    SortModeSubDocCountASC, // 13：子文档数升序
    SortModeSubDocCountDESC, // 14：子文档数降序
}
