# UDO-MXGRAPH-UI
> wanbowen | 2020-08-29 ShenZhen

## 技术栈
本项目基于mxGraph + Vue + Element.UI 构建，基于 [Pokemon diagram](https://github.com/jinzhanye/pokemon-diagram) 二次开发

## 参考文档 & API

- [使用 postMessage 进行 iframe 跨域通信](https://juejin.im/post/6844903477018116104)
- [mxGraph 入门实例教程 ***重点必看**](https://yejinzhan.gitee.io/2019/04/27/mxGraph%20%E5%85%A5%E9%97%A8%E5%AE%9E%E4%BE%8B%E6%95%99%E7%A8%8B/)
- [mxGraph官方文档](https://jgraph.github.io/mxgraph/docs/js-api/files/index-txt.html)


## 在线演示

[点我访问]()

## 运行

``` bash
# 安装依赖
npm install

# 启动
npm start

# 访问
http://localhost:7777
```

## 功能
- 从面板拖拽元素加入到画布
- 选中顶点（节点），可在右侧面板修改节点属性
- 选中边（线条），可在右侧面板修改线条样式，包括线形、粗细、颜色
- 删除线条、节点
- 导出、控制台打印XML（默认隐藏）
- 导入示例模板、生成示例模板
- 导航器，通过实例化 `mxOutline` 实现
- 节点连接边校验，具体校验规则放在了 `setConnectValidation` 方法中
- 节点数量校验控制，通过存储在 `nodeCount[]` 数组进行校验
- 将网络拓扑结构生成为需要的json编排格式，为新增节点的属性赋值并全局唯一， 通过 `generateJson` 方法实现
- 通过 `window.postMessage` 与其他前端项目通信
- 关闭、刷新页面弹出提示

> 注：本项目在 Chrome 下进行开发，并没有对其他浏览器做兼容处理
