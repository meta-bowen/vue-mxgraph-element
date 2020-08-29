<template>
  <el-container class="app-canvas">
    <el-aside class="app-canvas__sidebar" width="300px">
      <Panel class="element-panel" title="基础图形">
        <section>
          <ul class="elements">
            <template v-for="(element,index) in elements">
              <li class="element" :key="index" v-if="element.id < basicNodeId">
                <el-tooltip
                  class="item"
                  :content="element.remark"
                  placement="bottom-start"
                  effect="light"
                >
                  <img
                    v-bind="element"
                    class="element-img"
                    :src="`/static/images/ele/${element.icon}`"
                    :alt="element.title"
                    title
                  />
                </el-tooltip>
                <!-- <p>{{ element.title }}</p> -->
              </li>
            </template>
          </ul>
        </section>
      </Panel>
      <Panel class="element-panel" title="应用">
        <section>
          <ul class="elements">
            <template v-for="(element,index) in elements">
              <li class="element" :key="index" v-if="element.id > basicNodeId">
                <el-tooltip
                  class="item"
                  :content="element.remark"
                  placement="bottom-start"
                  effect="light"
                >
                  <img
                    v-bind="element"
                    class="element-img"
                    :src="`/static/images/ele/${element.icon}`"
                    :alt="element.title"
                    title
                  />
                </el-tooltip>
                <p>{{ element.title }}</p>
              </li>
            </template>
          </ul>
        </section>
      </Panel>
    </el-aside>
    <el-main class="app-canvas__main">
      <div class="tool-bar">
        <input @change="readFile" ref="importInput" class="hide" type="file" />
        <el-tooltip class="item" effect="dark" content="选择示例模板，以便在模板基础上搭建" placement="bottom-start">
          <el-button type="info" round size="mini" @click="handleTemplateVisible">示例模板</el-button>
        </el-tooltip>
        <el-dialog title="模板选择" :visible.sync="templateFormVisible">
          <el-form :model="templateForm">
            <el-form-item>
              <el-row v-loading="loading">
                <el-col
                  :xs="12"
                  :sm="8"
                  :md="6"
                  v-for="image in templateForm.images"
                  :key="image.id"
                >
                  <div class="template-select">
                    <el-radio v-model="radio" :label="image.id">{{image.title}}</el-radio>
                    <img :src="image.imgUrl" alt="图片" class="img" />
                  </div>
                </el-col>
              </el-row>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="templateFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="getTemplateInfo">确 定</el-button>
          </div>
        </el-dialog>
        <!-- <el-button type="primary" round size="mini" @click="importFile">导入</el-button> -->
        <!-- <el-button @click="exportFile" type="primary" round size="mini">导出</el-button> -->
        <!-- <el-button @click="logXML" type="text" size="mini">输出XML</el-button> -->
        <!-- <el-button @click="exportPic" type="text" size="mini">导出图片</el-button> -->
        <el-button @click="generateExampleModel" type="primary" round size="mini">生成示例模板</el-button>
        <!-- <el-tooltip class="item" effect="dark" content="提交搭建的模板" placement="bottom-start">
          <el-button @click="saveToServer" type="success" icon="el-icon-check" circle size="mini"></el-button>
        </el-tooltip>-->
        <el-tooltip class="item" effect="dark" content="删除选中的元素" placement="bottom-start">
          <el-button
            type="danger"
            icon="el-icon-delete"
            circle
            size="mini"
            @click="del"
            :disabled="_.isEmpty(selectVertex.data.element) && _.isEmpty(selectEdge)"
          ></el-button>
        </el-tooltip>
      </div>
      <div id="graphContainer"></div>
      <div class="outline-wrapper">
        <h4>导航器</h4>
        <div id="graphOutline" />
      </div>
    </el-main>
    <el-aside class="app-canvas__sidebar_right" width="200px">
      <Panel class="element-panel" title="属性" v-if="vertexPropVisible">
        <section>
          <el-form
            size="mini"
            class="normal-type-select"
            :model="selectVertex.data"
            :rules="rules"
            ref="selectVertex.data"
          >
            <el-form-item label="名称" prop="name">
              <el-input v-model="selectVertex.data.name" placeholder="请输入2~6位名称"></el-input>
            </el-form-item>
            <el-form-item label="code" prop="code">
              <el-input v-model="selectVertex.data.code" placeholder="请输入英文标识"></el-input>
            </el-form-item>
            <el-form-item label="虚拟机" v-if="vmVisible" prop="normalType">
              <el-select v-model="selectVertex.data.normalType" placeholder="请选择虚拟机">
                <el-option
                  v-for="item in vmOptions"
                  :key="item.id"
                  :label="item.label"
                  :value="item.id"
                >
                  <div class="normal-type-item">
                    <span
                      class="ml8"
                    >{{ item.label }} | {{item.ip}} | {{item.bandwidth}} | {{item.disk}}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="changeVertexProp">保存</el-button>
              <el-button @click="hideTypeSelect">取消</el-button>
            </el-form-item>
          </el-form>
        </section>
      </Panel>
      <Panel class="element-panel" title="网络配置" v-if="!vertexPropVisible">
        <section>
          <el-form
            size="mini"
            class="normal-type-select"
            :model="networkInfo"
            :rules="networkRules"
            ref="networkInfo"
          >
            <el-form-item label="名称" prop="name">
              <el-input v-model="networkInfo.name" placeholder="请输入2~6位名称"></el-input>
            </el-form-item>
            <el-form-item label="code" prop="code">
              <el-input v-model="networkInfo.code" placeholder="请输入英文标识"></el-input>
            </el-form-item>
            <el-form-item label="版本" prop="version">
              <el-input v-model="networkInfo.version" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="共识类型" prop="consensus">
              <el-select v-model="networkInfo.consensus" placeholder="请选择">
                <el-option v-for="item in consensusOption" :key="item" :label="item" :value="item">
                  <div class="normal-type-item">
                    <span class="ml8">{{ item }}</span>
                  </div>
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="描述" prop="version">
              <el-input v-model="networkInfo.description" :disabled="true"></el-input>
            </el-form-item>
            <!-- <el-form-item>
              <el-button type="primary" @click="saveNetworkConf">保存</el-button>
              <el-button @click="hideTypeSelect">取消</el-button>
            </el-form-item>-->
          </el-form>
        </section>
      </Panel>
      <EdgePanel
        v-if="!_.isEmpty(this.selectEdgeStyle)"
        :width="selectEdgeStyle.strokeWidth"
        :dashed="selectEdgeStyle.dashed"
        :color="selectEdgeStyle.strokeColor"
        :handle-style-change="ChangeEdgeStyle"
      />
    </el-aside>
  </el-container>
</template>

<script>
import FileSaver from "file-saver";
import Panel from "components/Panel";
import mxgraph from "../graph/index";
import { genGraph, destroyGraph, Graph } from "../graph/Graph";
import EdgePanel from "./components/EdgePanel";
import { elements, vmData } from "../common/data.js";
import { addInfo, listInfo } from "../api/info";
import { toPng } from "../api/convert";

const {
  mxGraph,
  mxOutline,
  mxEvent,
  mxCell,
  mxGeometry,
  mxUtils,
  mxEventObject,
  mxConnectionHandler,
} = mxgraph;

Object.assign(mxEvent, {
  NODE_CLICKED: "NODE_CLICKED",
});

let graph = null;
let outline = null;
let idSeed = 0;

const codeCount = new Array(elements[elements.length - 1].id);
codeCount.fill(0);

/**
 * insertVertex 执行三个过程
 * 1. 先是设置几何信息
 * 2. 然后创建一个节点
 * 3. 最后将这个节点添加到画布
 */
const insertVertex = (dom, target, x, y) => {
  const src = dom.getAttribute("src");
  const id = Number(dom.getAttribute("id"));
  const nodeRootVertex = new mxCell(
    "",
    new mxGeometry(0, 0, 96, 84),
    `node;image=${src}`
  );
  nodeRootVertex.vertex = true;
  // 自定义的业务数据放在 data 属性
  idSeed++;
  nodeRootVertex.data = {
    id: idSeed,
    element: elements.find((element) => element.id === id),
    normalType: "",
    name:
      elements.find((element) => element.id === id).type == "peer"
        ? elements.find((element) => element.id === id).title + codeCount[id]
        : elements.find((element) => element.id === id).title,
    code:
      elements.find((element) => element.id === id).type == "peer"
        ? elements.find((element) => element.id === id).type + codeCount[id]
        : elements.find((element) => element.id === id).type,
  };
  codeCount[id - 1]++;
  const cells = graph.importCells([nodeRootVertex], x, y, target);
  if (cells != null && cells.length > 0) {
    graph.setSelectionCells(cells);
  }
};

const makeDraggable = (sourceEles) => {
  const dropValidate = function (evt) {
    const x = mxEvent.getClientX(evt);
    const y = mxEvent.getClientY(evt);
    // 获取 x,y 所在的元素
    const elt = document.elementFromPoint(x, y);
    // 如果鼠标落在graph容器
    if (mxUtils.isAncestorNode(graph.container, elt)) {
      return graph;
    }
    // 鼠标落在其他地方
    return null;
  };

  // drop成功后新建一个节点
  const dropSuccessCb = function (_graph, evt, target, x, y) {
    insertVertex(this.element, target, x, y);
  };

  Array.from(sourceEles).forEach((ele) => {
    const dragElt = document.createElement("img");
    dragElt.setAttribute("src", ele.getAttribute("src"));
    dragElt.setAttribute("style", "width:120px;height:105px;");

    mxUtils.makeDraggable(
      ele,
      dropValidate,
      dropSuccessCb,
      dragElt,
      null,
      null,
      null,
      true
    );
  });
};

const listenGraphEvent = () => {
  // 监听所有点击事件
  graph.addListener(mxEvent.CLICK, (sender, evt) => {
    const cell = evt.properties.cell;
    if (!cell) {
      return;
    }
    const clickNode = cell.style.includes("node");
    if (clickNode) {
      // 使用 mxGraph 事件中心，触发自定义事件
      graph.fireEvent(new mxEventObject(mxEvent.NODE_CLICKED, "cell", cell));
    }
  });
};

const setCursor = () => {
  const oldGetCursorForCell = mxGraph.prototype.getCursorForCell;
  graph.getCursorForCell = function (...args) {
    const [cell] = args;
    return cell.style.includes("node")
      ? "pointer"
      : oldGetCursorForCell.apply(this, args);
  };
};

const onlyOneEdgeIds = [];
elements.forEach((ele) => {
  if (ele.type === "order" || ele.type === "game" || ele.type === "browser") {
    onlyOneEdgeIds.push(ele.id);
  }
});

const setConnectValidation = () => {
  // 连接边校验
  mxGraph.prototype.isValidConnection = (source, target) => {
    const sourceElementId = source.data.element.id;
    const targetElementId = target.data.element.id;
    for (var item = 0; item < elements.length; item++) {
      // 节点为 channel/game/browser时，仅允许连接一条边
      /* if (onlyOneEdgeIds.includes(sourceElementId)) {
        mxGraph.prototype.multigraph = false;
      } */
      if (sourceElementId === elements[item].id) {
        return elements[item].target.includes(targetElementId);
      }
    }
  };
};

const initGraph = () => {
  graph = genGraph(document.getElementById("graphContainer"));
  outline = new mxOutline(graph, document.getElementById("graphOutline"));
  // 将外元素拖拽进画布参考这个例子
  // https://github.com/jinzhanye/mxgraph-demos/blob/master/src/07.drag.html
  makeDraggable(document.getElementsByClassName("element-img"));
  listenGraphEvent();
  setCursor();
  setConnectValidation();
};

export default {
  name: "AppCanvas",
  data() {
    return {
      // originUrl: "http://192.168.1.231:8878", // 测试环境
      originUrl: "http://localhost:8081", // 本地环境
      json_info: {}, // 用于存储构建fabric网络编排内容
      networkInfo: {},
      consensusOption: ["solo", "kafka"],
      networkRules: {
        name: [
          { required: true, message: "请输入网络名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入code", trigger: "blur" },
          {
            min: 2,
            max: 20,
            message: "长度在 2 到 20 个字符",
            trigger: "blur",
          },
        ],
      },
      rules: {
        name: [
          { required: true, message: "请输入名称", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
        code: [
          { required: true, message: "请输入code", trigger: "blur" },
          {
            min: 2,
            max: 10,
            message: "长度在 2 到 10 个字符",
            trigger: "blur",
          },
        ],
      },
      vertexPropVisible: false,
      templateFormVisible: false,
      vmVisible: false,
      radio: "",
      // 遮罩层
      loading: true,
      basicNodeId: 10, // 划分基础图形与应用
      convertForm: {
        xml: "",
        weight: 0,
        height: 0,
      },
      templateForm: {
        images: [],
      },
      formLabelWidth: "120px",
      vmOptions: [],
      elements,
      selectEdge: {},
      selectVertex: {
        data: {
          name: null,
          code: null,
          normalType: null,
        },
      },
      nodeCount: [],
      edgeCount: [],
      templateInfo: {},
      templateData: {},
      imgUrl: "",
      templateListParams: {
        pageNum: 1,
        pageSize: 20,
      },
      queryParams: {
        pageNum: 1,
        pageSize: 50,
      },
    };
  },
  components: {
    Panel,
    EdgePanel,
  },
  computed: {
    selectEdgeStyle() {
      if (!_.isEmpty(this.selectEdge)) {
        return graph.getCellStyle(this.selectEdge);
      }
      return {};
    },
  },
  created() {
    this.getVmInfo();
    this.arrayInit();
    this.jsonInit();
    this.networkInit();
  },
  methods: {
    getVmInfo() {
      this.vmOptions = vmData; // 从data.js取出数据
    },
    handleTemplateVisible() {
      this.templateFormVisible = true;
      this.getTemplateList();
    },
    getTemplateList() {
      this.loading = true;
      listInfo(this.templateListParams).then((response) => {
        if (response.code === 200) {
          this.templateForm.images = response.rows;
          this.loading = false;
        } else {
          this.$message.info("模板信息获取失败");
        }
      });
    },
    getTemplateInfo() {
      // 1. 获取当前radio
      if (!this.radio) {
        this.$message.info("请选定一个模板");
        return;
      }
      // 2. 根据radio访问后端接口拿到对应的xml文件及network信息
      this.templateForm.images.forEach((ele) => {
        if (this.radio === ele.id) {
          graph.importModelXML(ele.graphInfo);
          this.networkInfo = JSON.parse(ele.networkInfo);
          this.arrayInit();
          let cells = Object.values(graph.model.cells); // 对象序列化
          cells.forEach((ele) => {
            if (ele.vertex == 1) {
              // 获取所有为vertex的节点，并初始化对应的count值，用于提交信息时校验
              this.nodeCount[ele.data.element.id - 1]++;
            }
          });
        }
      });
      this.templateFormVisible = false;
    },
    // 生成示例网络
    async generateExampleModel() {
      let flag = 1;
      // 1. 校验是否为有效网络
      for (var i = 0; i < elements.length; i++) {
        if (this.nodeCount[elements[i].id - 1] < elements[i].min) {
          this.$message.info(
            `当前版本${elements[i].title}最少${elements[i].min}个，无法构建网络，请完善`
          );
          return;
        }
      }
      // 2. 校验network信息是否为空
      this.$refs["networkInfo"].validate((valid) => {
        if (!valid) {
          this.$message.info("fabric网络配置信息未完善");
          flag = 0;
        }
      });
      if (flag == 1) {
        // 3. 获取模板信息(包含xml信息、image图片、title、networkInfo)
        this.templateData = {
          graphInfo: graph.exportModelXML(),
          infoLength: graph.exportModelXML().length,
          imgUrl: await this.exportPic(), // 图片不一定必要
          title: this.networkInfo.name,
          networkInfo: JSON.stringify(this.networkInfo),
        };
        // 4. 发送至后台
        addInfo(this.templateData)
          .then((response) => {
            if (response.code === 200) {
              // 4.1 获取回调信息
              setTimeout(() => {
                vm.$message.info(`模板数据已提交`);
              }, 500);
            }
          })
          .catch((e) => this.$message.info("模板数据提交失败"));
      }
    },
    saveToServer() {
      let flag = 1;
      // 1. 校验是否为有效网络
      for (var i = 0; i < elements.length; i++) {
        if (this.nodeCount[elements[i].id - 1] < elements[i].min) {
          this.$message.info(
            `当前版本${elements[i].title}最少${elements[i].min}个，无法构建网络，请完善`
          );
          flag = 0;
          return flag;
        }
      }
      // 2. 校验network信息是否为空
      this.$refs["networkInfo"].validate((valid) => {
        if (!valid) {
          this.$message.info("fabric网络配置信息未完善");
          flag = 0;
          return flag;
        }
      });
      if (flag == 1) {
        // 3.. 生成K8s所需的编排json
        this.generateJson();
        console.log("this.json_info", this.json_info);
      }
      return flag;

    },
    // network初始化
    networkInit() {
      this.networkInfo = {
        name: "",
        code: "",
        version: "v1.4",
        consensus: "solo",
        description: "fabric网络配置",
      };
    },
    // json_info初始化
    jsonInit() {
      this.json_info = {
        network: {},
        orgs: [],
        channels: [],
        order: {
          count: null,
        },
        peers: [],
        other: {
          game: {
            peercode: "",
          },
          browser: {
            peercode: "",
          },
          contract: {
            peers: "", // 链码部署的peer
          },
        },
      };
    },
    // 生成编排Json
    generateJson() {
      // 0. 初始化
      this.jsonInit();
      // 1. network信息赋值
      this.json_info.network = this.networkInfo;
      let cells = Object.values(graph.model.cells);

      let channelcode = "";
      let contracts = [];

      cells.forEach((ele) => {
        if (ele.vertex == 1) {
          // 获取对应的vertex
          // 1.1 org节点，本版本仅支持一个org
          if (
            ele.data.element.id ===
            elements.find((element) => element.type === "org").id
          ) {
            this.json_info.orgs[0] = {
              name: ele.data.name,
              code: ele.data.code,
              description: ele.data.element.remark,
            };
          } else if (
            ele.data.element.id ===
            elements.find((element) => element.type === "channel").id
          ) {
            // 1.2 channel 本版本仅支持一个channel
            this.json_info.channels[0] = {
              name: ele.data.name,
              code: ele.data.code,
              description: ele.data.element.remark,
            };
            channelcode = ele.data.code;
          } else if (
            ele.data.element.id ===
            elements.find((element) => element.type === "peer").id
          ) {
            // 1.3 peer
            let peer = {
              code: ele.data.code,
              channelcode: channelcode,
              anchor: true, // 默认全为锚节点
              port: "7051", // 默认port
            };
            this.json_info.peers.push(peer);
          } else if (
            ele.data.element.id ===
            elements.find((element) => element.type === "order").id
          ) {
            // 1.4 order 本版本order节点为1个
            this.json_info.order.count = 1;
          }
        } else if (ele.edge == 1) {
          // 获取对应的edge
          if (
            ele.source.data.element.id ===
            elements.find((element) => element.type === "contract").id
          ) {
            // 1.5 获取source为”智能合约“的边
            contracts.push(ele.target.data.code);
            this.json_info.other.contract.peers = contracts.join();
          } else if (
            ele.source.data.element.id ===
            elements.find((element) => element.type === "browser").id
          ) {
            // 1.6 获取source为”区块链浏览器“的边，本版本仅支持一个broswer所以直接赋值
            this.json_info.other.browser.peercode = ele.target.data.code;
          } else if (
            ele.source.data.element.id ===
            elements.find((element) => element.type === "game").id
          ) {
            // 1.7 获取source为”游戏“的边，本版本仅支持一个game所以直接赋值
            this.json_info.other.game.peercode = ele.target.data.code;
          }
        }
      });
    },
    arrayInit() {
      // 记录不同vertex节点个数
      this.nodeCount = new Array(elements[elements.length - 1].id);
      this.nodeCount.fill(0);
      this.edgeCount = new Array(elements[elements.length - 1].id);
      this.edgeCount.fill(0);
    },
    // 将模板转换为img并返回url
    async exportPic() {
      const data = graph.exportPicXML();
      this.convertForm = {
        xml: data.xml,
        weight: data.w,
        height: data.h,
      };
      let imgUrl;
      // 发送 data 到服务端
      await toPng(this.convertForm)
        .then((response) => {
          if (response.code === 200) {
            imgUrl = response.data.imgUrl;
          } else {
            this.$message.info(response.msg);
          }
        })
        .catch((e) => {
          this.$message.info("示例模板信息获取失败");
        });
      return imgUrl;
    },
    logXML() {
      this.$message.info("已经输出，请在控制台查看");
      const xml = graph.exportModelXML();
      // console.log(xml);
      // console.log("mode:", graph.getModel());
    },
    //*******
    // File
    //*******
    // 导出、导入功能参考这个例子
    // https://github.com/jgraph/mxgraph/blob/master/javascript/examples/fileio.html
    exportFile() {
      const xml = graph.exportModelXML();
      const blob = new Blob([xml], { type: "text/plain;charset=utf-8" });
      FileSaver.saveAs(blob, "pocket_monster.xml");
    },
    readFile(evt) {
      const file = evt.target.files[0];
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        const txt = e.target.result;
        graph.importModelXML(txt);
      };
      reader.readAsText(file);
    },
    importFile() {
      this.$refs.importInput.click();
    },
    //
    del() {
      // handleSelectionChange方法会对selectVertex初始化，根据当前所选mxCell的data.element是否为空来确定是否为vertex
      if (!_.isEmpty(this.selectVertex.data.element)) {
        const node = this.selectVertex.data.element.id;
        elements.forEach((element) => {
          if (node === element.id) {
            if (this.nodeCount[node - 1] === element.min) {
              this.$message.info(
                `当前版本${element.title}最少${element.min}个`
              );
            } else {
              this.nodeCount[node - 1]--;
              graph.removeCells([this.selectVertex]);
            }
          }
        });
      } else {
        graph.removeCells([this.selectEdge]);
      }
    },
    ChangeEdgeStyle(key, value) {
      graph.setStyle(this.selectEdge, key, value);
    },
    changeVertexProp() {
      this.$refs["selectVertex.data"].validate((valid) => {
        if (valid) {
          this.selectVertex.setValue(this.selectVertex.data.name);
          // 刷新vertex，否则name不显示
          graph.refresh(this.selectVertex);
          this.hideTypeSelect();
          this.$message.info("节点信息保存成功");
        }
      });
    },
    saveNetworkConf() {
      //1. 将networkInfo提交至后端
    },
    hideTypeSelect() {
      this.vertexPropVisible = false;
    },
    showNodeSelect(sender, evt) {
      this.vertexPropVisible = true;
      if (
        evt.properties.cell.data.element.id ===
        elements.find((element) => element.type === "peer").id
      ) {
        this.vmVisible = true;
      } else {
        this.vmVisible = false;
      }
    },
    handleSelectionChange(selectModel) {
      this.hideTypeSelect();
      this.selectVertex = {
        data: {
          name: "",
          code: "",
          normalType: null,
          element: null,
        },
      };
      this.selectEdge = {};
      if (!selectModel.cells.length) {
        return;
      }

      const cell = selectModel.cells[0];

      if (cell.vertex) {
        this.selectVertex = cell;
      } else {
        this.selectEdge = cell;
      }
    },
    receiveMessage(event) {
      if (event.origin !== this.originUrl) {
        return;
      }
      console.log("[receiveMessage-graph]", event);
      if (event.data === "getJsonInfo") {
        // 1. 调取saveToServer函数
        let status = this.saveToServer();
        let resData = {
          status: status, // 网络生成状态
          json_info: JSON.stringify(this.json_info)
        }
        event.source.postMessage(resData, event.origin);
      }
    },
    _listenEvent() {
      //监听message事件
      window.addEventListener("message", this.receiveMessage, false);

      // 监听自定义事件
      graph.addListener(mxEvent.NODE_CLICKED, this.showNodeSelect);
      graph.addListener(mxEvent.VERTEX_START_MOVE, this.hideTypeSelect);

      // 监听 mxGraph 事件
      const mxGraphSelectionModel = graph.getSelectionModel();
      mxGraphSelectionModel.addListener(
        mxEvent.CHANGE,
        this.handleSelectionChange
      );

      const vm = this;
      graph.addListener(mxEvent.MOVE_CELLS, (sender, evt) => {
        const cell = evt.properties.cells[0];
        const position = Graph.getCellPosition(cell);
        // setTimeout(() => {
        //   vm.$message.info(`节点被移动到 ${JSON.stringify(position)}`);
        // }, 500);
      });

      graph.addListener(mxEvent.CELLS_ADDED, (sender, evt) => {
        const cell = evt.properties.cells[0];
        if (graph.isPart(cell)) {
          return;
        }

        if (cell.vertex) {
          // 1. 获取当前节点id
          let node = cell.data.element.id;
          elements.forEach((element) => {
            if (node === element.id) {
              if (this.nodeCount[node - 1] < element.max) {
                this.nodeCount[node - 1]++;
              } else {
                this.$message.info(
                  `当前版本${element.title}最多${element.max}个`
                );
                graph.removeCells([cell]);
              }
            }
          });
        } else if (cell.edge) {
        }
      });

      graph.addListener(mxEvent.LABEL_CHANGED, (sender, evt) => {
        this.selectVertex.data.name = evt.getProperty("value");
        vm.$message.info(`内容改变为：${evt.getProperty("value")}`);
      });

      graph.addListener(mxEvent.CONNECT_CELL, (sender, evt) => {
        vm.$message.info(`改变了连线`);
      });
    },
  },

  mounted() {
    initGraph();
    this._listenEvent();
    window.onbeforeunload = function(e) {
        e = e || window.event;
      // 兼容IE8和Firefox 4之前的版本
      if (e) {
          e.returnValue = "您是否确认离开此页面-您输入的数据可能不会被保存";
      }
      // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
      return "您是否确认离开此页面-您输入的数据可能不会被保存";
    };
  },

  beforeDestroy() {
    destroyGraph();
  },
};
</script>

<style lang="less" scoped>
@import "../assets/style/module/util";
@import url("//unpkg.com/element-ui@2.13.2/lib/theme-chalk/index.css");

.app-canvas {
  width: 100%;
  height: 800px;
  #graphContainer {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 92vh;
    background: #fff url("../assets/images/grid.gif") 0 0 repeat;
    border: 1px solid rgba(178, 178, 178, 0.3);
    border-radius: 4px;
  }

  &__sidebar {
    background: #fff;
    margin-left: 10px;
    padding: 10px;
    border: 1px solid rgba(178, 178, 178, 0.3);
    border-radius: 4px;
    position: relative;
    .element-panel {
      margin-top: -9px;
    }
    .elements {
      margin-top: 20px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .element {
        width: 120px;
        text-align: center;
        margin-bottom: 10px;
        > img {
          cursor: pointer;
          width: 100%;
          // height: 120px;
        }
        > p {
          color: rgba(40, 40, 40, 1);
          margin-top: 0px;
          font-size: 12pt;
        }
      }
    }
  }

  &__sidebar_right {
    background: #fff;
    margin-right: 10px;
    padding: 10px;
    border: 1px solid rgba(178, 178, 178, 0.3);
    border-radius: 4px;
    .element-panel {
      margin-top: -9px;
    }
    .normal-type-select {
      padding: 10px 10px 0 10px;
      margin-top: 20px;
      background: #fff;
      border: 1px solid rgba(178, 178, 178, 0.3);
      border-radius: 4px;
    }
  }

  &__main {
    padding-top: 0px;
    padding-bottom: 0px;
    .tool-bar {
      background: #fff;
      border: 1px solid rgba(178, 178, 178, 0.3);
      border-radius: 4px;
      padding-left: 10px;
      padding-bottom: 5px;
      padding-top: 5px;
      margin-bottom: 20px;
      .template-select {
        border: 1px solid rgba(178, 178, 178, 0.3);
        border-radius: 4px;
        margin: 5px;
        padding: 5px;
        .img {
          width: 100%;
          height: 200px;
        }
      }
    }
    .normal-type-select {
      padding: 10px 10px 0 10px;
      position: fixed;
      background: #fff;
      border: 1px solid rgba(178, 178, 178, 0.3);
      border-radius: 4px;
    }
    .outline-wrapper {
      border: 1px solid rgba(178, 178, 178, 0.3);
      border-radius: 4px;
      background: #fff;
      position: fixed;
      right: 245px;
      top: 80px;
      z-index: 10;
      > h4 {
        padding: 6px;
        font-size: 12px;
        border-bottom: 1px solid rgba(178, 178, 178, 0.3);
        // border-radius:4px;
      }
      #graphOutline {
        width: 200px;
        height: 150px;
        overflow: hidden;
      }
    }
  }
}
</style>

<style lang="less">
.normal-type-item {
  display: flex;
  align-items: center;
  & > img {
    width: 20px;
    height: 20px;
    margin-right: 8px;
  }
}
</style>
