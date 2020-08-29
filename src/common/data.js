import { listVm } from '@/api/vm';
import { listElement } from '@/api/element';

export const getVmOptions = queryParams => listVm(queryParams).then(response => {
  let vmList = Object.values(response.rows)
  let list = [];
  if (vmList) {
    let vmObj = null;
    for(let i=0;i<vmList.length; i++) {
      vmObj = {};
      vmObj.id = vmList[i].id;
      vmObj.label = vmList[i].title;
      vmObj.os = vmList[i].spec;
      vmObj.bandwidth = vmList[i].bandwidth;
      vmObj.disk = vmList[i].store;
      vmObj.ip = vmList[i].publicIp;
      vmObj.icon = `100${i+1}.png`;
      list.push(vmObj);
    }
  }
  return list;
});

export const vmData = [
  {
    id: 1,
    os: "Linux",
    bandwidth: "5Mb/s",
    disk: "256G",
    ip: "120.11.23.51",
    label: "容器-1",
  },
  {
    id: 2,
    os: "Linux",
    bandwidth: "5Mb/s",
    disk: "256G",
    ip: "120.11.23.52",
    label: "容器-2",
  },
  {
    id: 3,
    os: "Linux",
    bandwidth: "5Mb/s",
    disk: "256G",
    ip: "120.11.23.53",
    label: "容器-3",
  },
  {
    id: 4,
    os: "Linux",
    bandwidth: "5Mb/s",
    disk: "256G",
    ip: "120.11.23.54",
    label: "容器-4",
  }];

export const getElements = async queryParams =>  
  await listElement(queryParams).then(response => {
    let eleList = Object.values(response.rows)
    let list = [];
    if (eleList) {
      let eleObj = null;
      for(let i=0;i<eleList.length; i++) {
        eleObj = {};
        eleObj.id = eleList[i].type;
        eleObj.title = eleList[i].title;
        eleObj.max = eleList[i].max;
        eleObj.min = eleList[i].min;
        if (eleList[i].target) {
          let str = eleList[i].target
          eleObj.target = str.split(",");
        }
        eleObj.icon = eleList[i].imgUrl;
        eleObj.remark = eleList[i].remark;
        list.push(eleObj);
      }
    }
    return list;
  })

export const elements = [{
  id: 1,
  max: 1,
  min: 1,
  target: [3,4],
  icon: 'ele_channel.png',
  title: 'Channel',
  type: 'channel',
  remark: `Channel通道，至少1个，至多1个，与Peer、Order节点相连`
}, {
  id: 2,
  max: 1,
  min: 1,
  target: [3],
  icon: 'ele_org.png',
  title: 'Org',
  type: 'org',
  remark: 'Org组织，一个组织可以在多个channel中，目前只支持一个通道，且Org组织最多两个'
}, {
  id: 3,
  max: 5,
  min: 1,
  target: [],
  icon: 'ele_peer.png',
  title: 'Peer',
  type: 'peer',
  remark: 'Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer'
}, {
  id: 4,
  max: 1,
  min: 1,
  target: [1],
  icon: 'ele_order.png',
  title: 'Order',
  type: 'order',
  remark: '一个channel通道至少关联一个order排序节点'
}, {
  id: 5,
  max: 10,
  min: 1,
  target: [3],
  icon: 'ele_contract.png',
  title: '智能合约',
  type: 'contract',
  remark: '只有一份合约，合约内容、名称不可修改，一个peer只可以关联一份合约'
}, {
  id: 11,
  max: 1,
  min: 1,
  target: [3],
  icon: 'ele_browser.png',
  title: '区块链浏览器',
  type: 'browser',
  remark: '区块链浏览器，与Peer关联'
}, {
  id: 12,
  max: 1,
  min: 1,
  target: [3],
  icon: 'ele_game.png',
  title: '游戏',
  type: 'game',
  remark: '游戏，与Peer关联'
}];

export const exampleModel = [
  {
    id: 1,
    imgUrl: "https://s1.ax1x.com/2020/08/06/a2EMhF.png",
    title: " 复杂网络",
    graphInfo: "<mxGraphModel>\n  <root>\n    <mxCell id=\"0\"/>\n    <mxCell id=\"1\" parent=\"0\"/>\n    <mxCell id=\"2\" value=\"\" style=\"node;image=/static/images/ele/ele_channel.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:1,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[3,4],&quot;icon&quot;:&quot;ele_channel.png&quot;,&quot;title&quot;:&quot;Channel&quot;,&quot;remark&quot;:&quot;Channel通道，至少1个，至多1个，与Peer、Order节点相连&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"3\" value=\"\" style=\"node;image=/static/images/ele/ele_org.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:2,&quot;element&quot;:{&quot;id&quot;:2,&quot;max&quot;:2,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_org.png&quot;,&quot;title&quot;:&quot;Org&quot;,&quot;remark&quot;:&quot;Org组织，一个组织可以在多个channel中，目前只支持一个通道，且Org组织最多两个&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"284\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"4\" value=\"\" style=\"node;image=/static/images/ele/ele_order.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:3,&quot;element&quot;:{&quot;id&quot;:4,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[1],&quot;icon&quot;:&quot;ele_order.png&quot;,&quot;title&quot;:&quot;Order&quot;,&quot;remark&quot;:&quot;一个channel通道至少关联一个order排序节点&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"220\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"5\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:4,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"252\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"6\" value=\"\" style=\"node;image=/static/images/ele/ele_contract.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:5,&quot;element&quot;:{&quot;id&quot;:5,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_contract.png&quot;,&quot;title&quot;:&quot;智能合约&quot;,&quot;remark&quot;:&quot;只有一份合约，合约内容、名称不可修改，一个peer只可以关联一份合约&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"7\" value=\"\" style=\"node;image=/static/images/ele/ele_browser.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:6,&quot;element&quot;:{&quot;id&quot;:11,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_browser.png&quot;,&quot;title&quot;:&quot;区块链浏览器&quot;,&quot;remark&quot;:&quot;区块链浏览器，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"170\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"8\" value=\"\" style=\"node;image=/static/images/ele/ele_game.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:7,&quot;element&quot;:{&quot;id&quot;:12,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_game.png&quot;,&quot;title&quot;:&quot;游戏&quot;,&quot;remark&quot;:&quot;游戏，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"430\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"9\" style=\"exitX=0.5;exitY=1;entryX=0.5;entryY=0;\" parent=\"1\" source=\"2\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"10\" style=\"exitX=0;exitY=0.5;entryX=0.75;entryY=1;\" parent=\"1\" source=\"3\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"11\" style=\"exitX=0;exitY=0.5;entryX=1;entryY=0.5;\" parent=\"1\" source=\"6\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"12\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" parent=\"1\" source=\"7\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"14\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" parent=\"1\" source=\"4\" target=\"2\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"15\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"560\" y=\"210\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"16\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" parent=\"1\" source=\"6\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"17\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.75;\" parent=\"1\" source=\"3\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"18\" style=\"exitX=0.75;exitY=1;entryX=0.5;entryY=0;\" parent=\"1\" source=\"2\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"19\" style=\"exitX=1;exitY=0.5;entryX=0.5;entryY=1;\" parent=\"1\" source=\"8\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"20\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"100\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"21\" style=\"exitX=0.5;exitY=1;entryX=0.5;entryY=0;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"22\" value=\"\" style=\"node;image=/static/images/ele/ele_browser.png\" vertex=\"1\" data=\"{&quot;id&quot;:2,&quot;element&quot;:{&quot;id&quot;:11,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_browser.png&quot;,&quot;title&quot;:&quot;区块链浏览器&quot;,&quot;remark&quot;:&quot;区块链浏览器，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"70\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"23\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" edge=\"1\" parent=\"1\" source=\"22\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"24\" style=\"exitX=0;exitY=0.75;entryX=0.75;entryY=1;\" edge=\"1\" parent=\"1\" source=\"3\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"25\" style=\"exitX=0;exitY=0;entryX=0.75;entryY=0;\" edge=\"1\" parent=\"1\" source=\"6\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n  </root>\n</mxGraphModel>\n",
    networkInfo: "{\"name\":\"复杂网络\",\"code\":\"third\",\"version\":\"v1.4\",\"consensus\":\"solo\",\"description\":\"fabric网络配置\"}"
  },
  {
    id: 2,
    imgUrl: "https://s1.ax1x.com/2020/08/06/a2EMhF.png",
    title: "三例网络",
    graphInfo: "<mxGraphModel>\n  <root>\n    <mxCell id=\"0\"/>\n    <mxCell id=\"1\" parent=\"0\"/>\n    <mxCell id=\"2\" value=\"\" style=\"node;image=/static/images/ele/ele_channel.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:1,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[3,4],&quot;icon&quot;:&quot;ele_channel.png&quot;,&quot;title&quot;:&quot;Channel&quot;,&quot;remark&quot;:&quot;Channel通道，至少1个，至多1个，与Peer、Order节点相连&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"3\" value=\"\" style=\"node;image=/static/images/ele/ele_org.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:2,&quot;element&quot;:{&quot;id&quot;:2,&quot;max&quot;:2,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_org.png&quot;,&quot;title&quot;:&quot;Org&quot;,&quot;remark&quot;:&quot;Org组织，一个组织可以在多个channel中，目前只支持一个通道，且Org组织最多两个&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"284\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"4\" value=\"\" style=\"node;image=/static/images/ele/ele_order.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:3,&quot;element&quot;:{&quot;id&quot;:4,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[1],&quot;icon&quot;:&quot;ele_order.png&quot;,&quot;title&quot;:&quot;Order&quot;,&quot;remark&quot;:&quot;一个channel通道至少关联一个order排序节点&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"220\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"5\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:4,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"252\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"6\" value=\"\" style=\"node;image=/static/images/ele/ele_contract.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:5,&quot;element&quot;:{&quot;id&quot;:5,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_contract.png&quot;,&quot;title&quot;:&quot;智能合约&quot;,&quot;remark&quot;:&quot;只有一份合约，合约内容、名称不可修改，一个peer只可以关联一份合约&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"7\" value=\"\" style=\"node;image=/static/images/ele/ele_browser.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:6,&quot;element&quot;:{&quot;id&quot;:11,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_browser.png&quot;,&quot;title&quot;:&quot;区块链浏览器&quot;,&quot;remark&quot;:&quot;区块链浏览器，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"170\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"8\" value=\"\" style=\"node;image=/static/images/ele/ele_game.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:7,&quot;element&quot;:{&quot;id&quot;:12,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_game.png&quot;,&quot;title&quot;:&quot;游戏&quot;,&quot;remark&quot;:&quot;游戏，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"430\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"9\" style=\"exitX=0.5;exitY=1;entryX=0.5;entryY=0;\" parent=\"1\" source=\"2\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"10\" style=\"exitX=0;exitY=0.5;entryX=0.75;entryY=1;\" parent=\"1\" source=\"3\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"11\" style=\"exitX=0;exitY=0.5;entryX=1;entryY=0.5;\" parent=\"1\" source=\"6\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"12\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" parent=\"1\" source=\"7\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"14\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" parent=\"1\" source=\"4\" target=\"2\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"15\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"560\" y=\"210\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"16\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" parent=\"1\" source=\"6\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"17\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.75;\" parent=\"1\" source=\"3\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"18\" style=\"exitX=0.75;exitY=1;entryX=0.5;entryY=0;\" parent=\"1\" source=\"2\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"19\" style=\"exitX=1;exitY=0.5;entryX=0.5;entryY=1;\" parent=\"1\" source=\"8\" target=\"15\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"20\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"100\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"21\" style=\"exitX=0.5;exitY=1;entryX=0.5;entryY=0;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"22\" value=\"\" style=\"node;image=/static/images/ele/ele_browser.png\" vertex=\"1\" data=\"{&quot;id&quot;:2,&quot;element&quot;:{&quot;id&quot;:11,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_browser.png&quot;,&quot;title&quot;:&quot;区块链浏览器&quot;,&quot;remark&quot;:&quot;区块链浏览器，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"70\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"23\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" edge=\"1\" parent=\"1\" source=\"22\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"24\" style=\"exitX=0;exitY=0.75;entryX=0.75;entryY=1;\" edge=\"1\" parent=\"1\" source=\"3\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"25\" style=\"exitX=0;exitY=0;entryX=0.75;entryY=0;\" edge=\"1\" parent=\"1\" source=\"6\" target=\"20\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n  </root>\n</mxGraphModel>\n",
    networkInfo: "{\"name\":\"三例网络\",\"code\":\"third\",\"version\":\"v1.4\",\"consensus\":\"solo\",\"description\":\"fabric网络配置\"}"
  },
  {
    id: 3,
    imgUrl: "https://s1.ax1x.com/2020/08/06/a2EMhF.png",
    title: "双例网络",
    graphInfo: "<mxGraphModel>\n  <root>\n    <mxCell id=\"0\"/>\n    <mxCell id=\"1\" parent=\"0\"/>\n    <mxCell id=\"2\" value=\"\" style=\"node;image=/static/images/ele/ele_channel.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:1,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[3,4],&quot;icon&quot;:&quot;ele_channel.png&quot;,&quot;title&quot;:&quot;Channel&quot;,&quot;remark&quot;:&quot;Channel通道，至少1个，至多1个，与Peer、Order节点相连&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"3\" value=\"\" style=\"node;image=/static/images/ele/ele_org.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:2,&quot;element&quot;:{&quot;id&quot;:2,&quot;max&quot;:2,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_org.png&quot;,&quot;title&quot;:&quot;Org&quot;,&quot;remark&quot;:&quot;Org组织，一个组织可以在多个channel中，目前只支持一个通道，且Org组织最多两个&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"284\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"4\" value=\"\" style=\"node;image=/static/images/ele/ele_order.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:3,&quot;element&quot;:{&quot;id&quot;:4,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[1],&quot;icon&quot;:&quot;ele_order.png&quot;,&quot;title&quot;:&quot;Order&quot;,&quot;remark&quot;:&quot;一个channel通道至少关联一个order排序节点&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"220\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"5\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:4,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"252\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"6\" value=\"\" style=\"node;image=/static/images/ele/ele_contract.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:5,&quot;element&quot;:{&quot;id&quot;:5,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_contract.png&quot;,&quot;title&quot;:&quot;智能合约&quot;,&quot;remark&quot;:&quot;只有一份合约，合约内容、名称不可修改，一个peer只可以关联一份合约&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"390\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"7\" value=\"\" style=\"node;image=/static/images/ele/ele_browser.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:6,&quot;element&quot;:{&quot;id&quot;:11,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_browser.png&quot;,&quot;title&quot;:&quot;区块链浏览器&quot;,&quot;remark&quot;:&quot;区块链浏览器，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"170\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"8\" value=\"\" style=\"node;image=/static/images/ele/ele_game.png\" parent=\"1\" vertex=\"1\" data=\"{&quot;id&quot;:7,&quot;element&quot;:{&quot;id&quot;:12,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_game.png&quot;,&quot;title&quot;:&quot;游戏&quot;,&quot;remark&quot;:&quot;游戏，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\">\n      <mxGeometry x=\"430\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"9\" style=\"exitX=0.5;exitY=1;entryX=0.5;entryY=0;\" parent=\"1\" source=\"2\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"10\" style=\"exitX=0;exitY=0.5;entryX=0.75;entryY=1;\" parent=\"1\" source=\"3\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"11\" style=\"exitX=0;exitY=0.5;entryX=1;entryY=0.5;\" parent=\"1\" source=\"6\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"12\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" parent=\"1\" source=\"7\" target=\"5\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"14\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" parent=\"1\" source=\"4\" target=\"2\" edge=\"1\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"15\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"560\" y=\"210\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"16\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" edge=\"1\" parent=\"1\" source=\"6\" target=\"15\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"17\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.75;\" edge=\"1\" parent=\"1\" source=\"3\" target=\"15\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"18\" style=\"exitX=0.75;exitY=1;entryX=0.5;entryY=0;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"15\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"19\" style=\"exitX=1;exitY=0.5;entryX=0.5;entryY=1;\" edge=\"1\" parent=\"1\" source=\"8\" target=\"15\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n  </root>\n</mxGraphModel>\n",
    networkInfo: "{\"name\":\"双例网络\",\"code\":\"third\",\"version\":\"v1.4\",\"consensus\":\"solo\",\"description\":\"fabric网络配置\"}"
  },
  {
    id: 4,
    imgUrl: "https://s1.ax1x.com/2020/08/06/a2EMhF.png",
    title: "单例网络",
    graphInfo: "<mxGraphModel>\n  <root>\n    <mxCell id=\"0\"/>\n    <mxCell id=\"1\" parent=\"0\"/>\n    <mxCell id=\"2\" value=\"\" style=\"node;image=/static/images/ele/ele_channel.png\" vertex=\"1\" data=\"{&quot;id&quot;:1,&quot;element&quot;:{&quot;id&quot;:1,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[3,4],&quot;icon&quot;:&quot;ele_channel.png&quot;,&quot;title&quot;:&quot;Channel&quot;,&quot;remark&quot;:&quot;Channel通道，至少1个，至多1个，与Peer、Order节点相连&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"252\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"3\" value=\"\" style=\"node;image=/static/images/ele/ele_org.png\" vertex=\"1\" data=\"{&quot;id&quot;:2,&quot;element&quot;:{&quot;id&quot;:2,&quot;max&quot;:2,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_org.png&quot;,&quot;title&quot;:&quot;Org&quot;,&quot;remark&quot;:&quot;Org组织，一个组织可以在多个channel中，目前只支持一个通道，且Org组织最多两个&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"130\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"4\" value=\"\" style=\"node;image=/static/images/ele/ele_order.png\" vertex=\"1\" data=\"{&quot;id&quot;:3,&quot;element&quot;:{&quot;id&quot;:4,&quot;max&quot;:1,&quot;min&quot;:1,&quot;target&quot;:[1],&quot;icon&quot;:&quot;ele_order.png&quot;,&quot;title&quot;:&quot;Order&quot;,&quot;remark&quot;:&quot;一个channel通道至少关联一个order排序节点&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"114\" y=\"30\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"5\" value=\"\" style=\"node;image=/static/images/ele/ele_peer.png\" vertex=\"1\" data=\"{&quot;id&quot;:4,&quot;element&quot;:{&quot;id&quot;:3,&quot;max&quot;:5,&quot;min&quot;:1,&quot;target&quot;:[],&quot;icon&quot;:&quot;ele_peer.png&quot;,&quot;title&quot;:&quot;Peer&quot;,&quot;remark&quot;:&quot;Peer节点，一个peer关联一台虚拟机，目前一个peer只能关联一份智能合约，最多5个peer&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"252\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"6\" value=\"\" style=\"node;image=/static/images/ele/ele_contract.png\" vertex=\"1\" data=\"{&quot;id&quot;:5,&quot;element&quot;:{&quot;id&quot;:5,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_contract.png&quot;,&quot;title&quot;:&quot;智能合约&quot;,&quot;remark&quot;:&quot;只有一份合约，合约内容、名称不可修改，一个peer只可以关联一份合约&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"390\" y=\"200\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"7\" value=\"\" style=\"node;image=/static/images/ele/ele_browser.png\" vertex=\"1\" data=\"{&quot;id&quot;:6,&quot;element&quot;:{&quot;id&quot;:11,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_browser.png&quot;,&quot;title&quot;:&quot;区块链浏览器&quot;,&quot;remark&quot;:&quot;区块链浏览器，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"170\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"8\" value=\"\" style=\"node;image=/static/images/ele/ele_game.png\" vertex=\"1\" data=\"{&quot;id&quot;:7,&quot;element&quot;:{&quot;id&quot;:12,&quot;max&quot;:10,&quot;min&quot;:1,&quot;target&quot;:[3],&quot;icon&quot;:&quot;ele_game.png&quot;,&quot;title&quot;:&quot;游戏&quot;,&quot;remark&quot;:&quot;游戏，与Peer关联&quot;},&quot;normalType&quot;:&quot;&quot;,&quot;name&quot;:&quot;&quot;,&quot;code&quot;:&quot;&quot;}\" parent=\"1\">\n      <mxGeometry x=\"320\" y=\"380\" width=\"96\" height=\"84\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"9\" style=\"exitX=0.5;exitY=1;entryX=0.5;entryY=0;\" edge=\"1\" parent=\"1\" source=\"2\" target=\"5\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"10\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" edge=\"1\" parent=\"1\" source=\"3\" target=\"5\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"11\" style=\"exitX=0;exitY=0.5;entryX=1;entryY=0.5;\" edge=\"1\" parent=\"1\" source=\"6\" target=\"5\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"12\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" edge=\"1\" parent=\"1\" source=\"7\" target=\"5\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"13\" style=\"exitX=0.5;exitY=0;entryX=0.5;entryY=1;\" edge=\"1\" parent=\"1\" source=\"8\" target=\"5\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n    <mxCell id=\"14\" style=\"exitX=1;exitY=0.5;entryX=0;entryY=0.5;\" edge=\"1\" parent=\"1\" source=\"4\" target=\"2\">\n      <mxGeometry relative=\"1\" as=\"geometry\"/>\n    </mxCell>\n  </root>\n</mxGraphModel>\n",
    networkInfo: "{\"name\":\"单例网络\",\"code\":\"third\",\"version\":\"v1.4\",\"consensus\":\"solo\",\"description\":\"fabric网络配置\"}"
  },
];


