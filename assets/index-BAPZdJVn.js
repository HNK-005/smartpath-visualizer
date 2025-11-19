(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))t(s);new MutationObserver(s=>{for(const i of s)if(i.type==="childList")for(const o of i.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&t(o)}).observe(document,{childList:!0,subtree:!0});function n(s){const i={};return s.integrity&&(i.integrity=s.integrity),s.referrerPolicy&&(i.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?i.credentials="include":s.crossOrigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function t(s){if(s.ep)return;s.ep=!0;const i=n(s);fetch(s.href,i)}})();var m=(a=>(a.START="start",a.END="end",a.WALL="wall",a.VISITED="visited",a.WEIGHT="weight",a.UNVISITED="unvisited",a.PATH="path",a))(m||{}),f=(a=>(a.BFS="BFS",a.DFS="DFS",a.DIJKSTRA="Dijkstra",a.ASTAR="A*",a))(f||{}),b=(a=>(a.START="mode-start",a.END="mode-end",a.WALL="mode-wall",a.WEIGHT="mode-weight",a.ERASER="mode-eraser",a))(b||{}),C=(a=>(a[a.SLOW=50]="SLOW",a[a.MEDIUM=20]="MEDIUM",a[a.FAST=5]="FAST",a))(C||{}),v=(a=>(a[a.LOW=1]="LOW",a[a.MEDIUM=5]="MEDIUM",a[a.HIGH=10]="HIGH",a))(v||{}),I=(a=>(a.PLAY="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z",a.PAUSE="M15.75 5.25v13.5m-7.5-13.5v13.5",a.CHEVRON_LEFT="M15.75 19.5 8.25 12l7.5-7.5",a.CHEVRON_RIGHT="m8.25 4.5 7.5 7.5-7.5 7.5",a))(I||{});class J{algorithmOptions=[{value:f.DIJKSTRA,label:"Dijkstra"},{value:f.ASTAR,label:"A*"},{value:f.BFS,label:"Breadth-First Search"},{value:f.DFS,label:"Depth-First Search"}];speedOptions=[{value:C.SLOW,label:"Slow"},{value:C.MEDIUM,label:"Medium"},{value:C.FAST,label:"Fast"}];weightOptions=[{value:v.LOW,label:`Low (${v.LOW})`},{value:v.MEDIUM,label:`Medium (${v.MEDIUM})`},{value:v.HIGH,label:`High (${v.HIGH})`}];selectWeight;selectAlgorithm;selectSpeed;btnRun;btnPause;btnResetGrid;btnClearPath;btnClearWalls;btnGenerateMaze;btnExportFile;btnImportFile;constructor(){this.selectWeight=document.getElementById("weight"),this.selectAlgorithm=document.getElementById("algorithm"),this.selectSpeed=document.getElementById("speed"),this.btnRun=document.getElementById("btn-run"),this.btnPause=document.getElementById("btn-pause"),this.btnResetGrid=document.getElementById("btn-reset-grid"),this.btnClearPath=document.getElementById("btn-clear-path"),this.btnClearWalls=document.getElementById("btn-clear-walls"),this.btnGenerateMaze=document.getElementById("btn-generate-maze"),this.btnExportFile=document.getElementById("btn-export-file"),this.btnImportFile=document.getElementById("btn-import-file"),this.renderOptions(this.algorithmOptions,this.speedOptions,this.weightOptions)}renderOptions(e,n,t){this.selectAlgorithm.innerHTML=e.map(s=>`<option value="${s.value}">${s.label}</option>`).join(""),this.selectSpeed.innerHTML=n.map(s=>`<option value="${s.value}" ${s.value===C.MEDIUM?"selected":""}>${s.label}</option>`).join(""),this.selectWeight.innerHTML=t.map(s=>`<option value="${s.value}">${s.label}</option>`).join("")}bindSelectWeightChange(){this.selectWeight.addEventListener("change",e=>{const n=e.target,t=parseInt(n.value,10);document.dispatchEvent(new CustomEvent("weight-change",{detail:{weight:t}}))})}bindSelectAlgorithmChange(){this.selectAlgorithm.addEventListener("change",e=>{const t=e.target.value;document.dispatchEvent(new CustomEvent("algorithm-change",{detail:{algorithm:t}}))})}bindSelectSpeedChange(){this.selectSpeed.addEventListener("change",e=>{const t=e.target.value;document.dispatchEvent(new CustomEvent("speed-change",{detail:{speed:t}}))})}bindButtonRunClick(e){this.btnRun.addEventListener("click",()=>{e()})}bindButtonPauseClick(e){this.btnPause.addEventListener("click",()=>{e()})}bindButtonResetGridClick(e){this.btnResetGrid.addEventListener("click",()=>{e()})}bindButtonClearPathClick(e){this.btnClearPath.addEventListener("click",()=>{e()})}bindButtonClearWallsClick(e){this.btnClearWalls.addEventListener("click",()=>{e()})}bindButtonGenerateMazeClick(e){this.btnGenerateMaze.addEventListener("click",()=>{e()})}bindButtonExportFile(e){this.btnExportFile.addEventListener("click",()=>{e()})}bindButtonImportFile(e){this.btnImportFile.addEventListener("click",()=>{e()})}getBtnRun(){return this.btnRun}getBtnPause(){return this.btnPause}getSelectAlgorithm(){return this.selectAlgorithm}getBtnResetGrid(){return this.btnResetGrid}getBtnClearPath(){return this.btnClearPath}getBtnClearWalls(){return this.btnClearWalls}getBtnGenerateMaze(){return this.btnGenerateMaze}}class K{board;drawToolbar;countVisitedNodes;countPathNodes;totalPathCost;executionTime;modeInputs;constructor(){this.board=document.getElementById("board"),this.drawToolbar=document.getElementById("draw-toolbar"),this.modeInputs=this.drawToolbar.querySelectorAll('input[id^="mode-"]'),this.countVisitedNodes=document.getElementById("count-visited-nodes"),this.countPathNodes=document.getElementById("count-path-length"),this.totalPathCost=document.getElementById("count-total-path-cost"),this.executionTime=document.getElementById("count-execution-time"),this.handleToolbarToggle()}getTypeNode(e){return e.getIsStart()?m.START:e.getIsEnd()?m.END:e.getIsWall()?m.WALL:e.getWeight()>=1?m.WEIGHT:e.getIsVisited()?m.VISITED:e.getIsPath()?m.PATH:m.UNVISITED}render(e){this.board.innerHTML="",e.getNodes().forEach((n,t)=>{const s=document.createElement("div");s.classList.add("flex"),n.forEach((i,o)=>{const r=document.createElement("div");r.id="cell",r.dataset.row=t.toString(),r.dataset.col=o.toString();const l=this.getTypeNode(i);l===m.WEIGHT&&(r.dataset.weight=i.getWeight().toString()),r.dataset.type=l,s.appendChild(r)}),this.board.appendChild(s)})}bindDrawModeChange(e){this.modeInputs.forEach(n=>{n.addEventListener("change",t=>{const s=t.target;if(s.checked){const i=s.id;e(i)}})})}bindDrawBoard(e){this.board.addEventListener("click",n=>{const t=n.target;if(t&&t.id==="cell"){const s=parseInt(t.dataset.row,10),i=parseInt(t.dataset.col,10);e(s,i).forEach(r=>{const l=this.getNodeElement(r.getRow(),r.getCol()),g=this.getTypeNode(r);g===m.WEIGHT&&(l.dataset.weight=r.getWeight().toString()),l.dataset.type=g})}})}handleToolbarToggle(){const e=this.drawToolbar.querySelector("#toggle-toolbar"),n=this.drawToolbar.querySelector("#draw-mode");e.addEventListener("click",()=>{n.hidden=!n.hidden;const t=e.querySelector("svg path");t!==null&&(n.hidden?t.setAttribute("d",I.CHEVRON_LEFT):t.setAttribute("d",I.CHEVRON_RIGHT))})}bindUpdateBoard(e){const n=this.getTypeNode(e),t=this.getNodeElement(e.getRow(),e.getCol());n===m.WEIGHT&&(t.dataset.weight=e.getWeight().toString()),t.dataset.type=n}bindSetWeightMode(e){const n=this.getWeightElement();n.dataset.weight=e().toString()}bindClearPath(e){e().forEach(t=>{const s=this.getNodeElement(t.getRow(),t.getCol()),i=this.getTypeNode(t);i===m.WEIGHT&&(s.dataset.weight=t.getDistance().toString()),s.dataset.type=i})}bindClearWeights(e){e().forEach(t=>{const s=this.getNodeElement(t.getRow(),t.getCol()),i=this.getTypeNode(t);s.dataset.type=i})}bindClearWalls(e){e().forEach(t=>{const s=this.getNodeElement(t.getRow(),t.getCol()),i=this.getTypeNode(t);i===m.WEIGHT&&(s.dataset.weight=t.getDistance().toString()),s.dataset.type=i})}updateCountVisitedNodes(e){this.countVisitedNodes.innerText=e.toString()}updateCountPathNodes(e){this.countPathNodes.innerText=e.toString()}updateTotalPathCost(e){this.totalPathCost.innerText=e.toString()}updateExecutionTime(e){this.executionTime.innerText=e.toString()}getBoardElement(){return this.board}getModeInputs(){return this.modeInputs}getNodeElement(e,n){return this.board.querySelector(`div[id="cell"][data-row="${e}"][data-col="${n}"]`)}getWeightElement(){return this.drawToolbar.querySelector('label[for="mode-weight"] span[data-type="weight"]')}getCountVisitedNodes(){return this.countVisitedNodes}getCountPathNodes(){return this.countPathNodes}getTotalPathCost(){return this.totalPathCost}getExecutionTime(){return this.executionTime}}class W{async saveFile(e){try{const t=await(await window.showSaveFilePicker({suggestedName:"data.json",types:[{description:"File JSON",accept:{"application/json":[".json"]}}]})).createWritable();t.write(e),await t.close()}catch(n){console.error("File save cancelled or failed:",n);return}}async readFile(){try{const[e]=await window.showOpenFilePicker({types:[{description:"File JSON",accept:{"application/json":[".json"]}}],multiple:!1});return await(await e.getFile()).text()}catch(e){return console.error("File open cancelled or failed:",e),null}}}class _{view;constructor(e){this.view=e}hanldeSelectWeightChange(){this.view.bindSelectWeightChange()}handleSelectAlgorithmChange(){this.view.bindSelectAlgorithmChange()}handleSelectSpeedChange(){this.view.bindSelectSpeedChange()}handleButtonRunClick(e){this.view.bindButtonRunClick(e)}handleButtonPauseClick(e){this.view.bindButtonPauseClick(e)}handleButtonResetGridClick(e){this.view.bindButtonResetGridClick(e)}handleButtonClearPathClick(e){this.view.bindButtonClearPathClick(e)}handleButtonClearWallsClick(e){this.view.bindButtonClearWallsClick(e)}handleButtonGenerateMazeClick(e){this.view.bindButtonGenerateMazeClick(e)}handleButtonExportFile(e){this.view.bindButtonExportFile(()=>{const n=new W,t=e();n.saveFile(t)})}handleButtonImportFile(e){this.view.bindButtonImportFile(()=>{new W().readFile().then(t=>{t&&e(t)})})}}class A{row;col;isWall=!1;isStart=!1;isEnd=!1;isVisited=!1;isPath=!1;weight=0;distance=1/0;heuristic=0;previous=null;constructor(e,n){this.row=e,this.col=n}reset(){this.isWall=!1,this.isStart=!1,this.isEnd=!1,this.isVisited=!1,this.isPath=!1,this.weight=0,this.distance=1/0,this.heuristic=0,this.previous=null}resetPathState(){this.isVisited=!1,this.isPath=!1,this.distance=1/0,this.heuristic=0,this.previous=null}getRow(){return this.row}getCol(){return this.col}setWall(e){this.isWall=e}getIsWall(){return this.isWall}setStart(e){this.isStart=e}getIsStart(){return this.isStart}setEnd(e){this.isEnd=e}getIsEnd(){return this.isEnd}setDistance(e){this.distance=e}getDistance(){return this.distance}setWeight(e){this.weight=e}getWeight(){return this.weight}setHeuristic(e){this.heuristic=e}getHeuristic(){return this.heuristic}setPrevious(e){this.previous=e}getPrevious(){return this.previous}setVisited(e){this.isVisited=e}getIsVisited(){return this.isVisited}setPath(e){this.isPath=e}getIsPath(){return this.isPath}}class S{nodes;numRows;numCols;constructor(e,n){this.numRows=e,this.numCols=n,this.nodes=[],this.initializeMatrix()}initializeMatrix(){for(let e=0;e<this.numRows;e++){const n=[];for(let t=0;t<this.numCols;t++)n.push(new A(e,t));this.nodes.push(n)}}setNodes(e){this.nodes=e}getNodes(){return this.nodes}getNode(e,n){return this.nodes[e][n]}setNumRows(e){this.numRows=e}getNumRows(){return this.numRows}setNumCols(e){this.numCols=e}getNumCols(){return this.numCols}}class x{getNeighbors(e,n){const t=[[0,1],[1,0],[0,-1],[-1,0]],s=[];for(const[i,o]of t){const r=e.getRow()+i,l=e.getCol()+o;if(r>=0&&l>=0&&r<n.getNumRows()&&l<n.getNumCols()){const g=n.getNode(r,l);g.getIsWall()||s.push(g)}}return s}reconstructPath(e){const n=[];let t=e;for(;t;)n.unshift(t),t=t.getPrevious();return n}}class Y extends x{findPath(e,n,t){const s=[n],i=new Set([n]),o=[];for(;s.length>0;){const r=s.shift();if(!r.getIsWall()){if(r.getDistance()===1/0)break;if(!r.getIsVisited()){if(o.push(r),r===t)return{visitedNodesInOrder:o,shortestPath:this.reconstructPath(t)};for(const l of this.getNeighbors(r,e))i.has(l)||(i.add(l),l.setPrevious(r),l.setDistance(r.getDistance()+l.getWeight()+1),s.push(l))}}}return{visitedNodesInOrder:o,shortestPath:[]}}}class Z extends x{findPath(e,n,t){const s=[n],i=new Set([n]),o=[];for(;s.length>0;){const r=s.pop();if(!r.getIsWall()){if(r.getDistance()===1/0)break;if(!r.getIsVisited()){if(o.push(r),r===t)return{visitedNodesInOrder:o,shortestPath:this.reconstructPath(t)};for(const l of this.getNeighbors(r,e))i.has(l)||(i.add(l),l.setPrevious(r),l.setDistance(r.getDistance()+l.getWeight()+1),s.push(l))}}}return{visitedNodesInOrder:o,shortestPath:[]}}}class Q{heap;constructor(e=[]){this.heap=e}getParentIndex(e){return Math.floor((e-1)/2)}getLeftChildIndex(e){return 2*e+1}getRightChildIndex(e){return 2*e+2}swap(e,n){[this.heap[e],this.heap[n]]=[this.heap[n],this.heap[e]]}size(){return this.heap.length}}class H extends Q{comparator;indexMap=new Map;constructor(e=[],n){super(e),this.comparator=n,this.heap.forEach((t,s)=>{this.indexMap.set(t,s)}),this.buildHeap()}swap(e,n){const t=this.heap[e],s=this.heap[n];super.swap(e,n),this.indexMap.set(t,n),this.indexMap.set(s,e)}buildHeap(){for(let e=Math.floor(this.size()/2)-1;e>=0;e--)this.heapifyDown(e)}contains(e){return this.indexMap.has(e)}insert(e){this.heap.push(e),this.indexMap.set(e,this.heap.length-1),this.heapifyUp(this.heap.length-1)}decreaseKey(e){const n=this.indexMap.get(e);n!==void 0&&this.heapifyUp(n)}shift(){if(this.heap.length===0)return;const e=this.heap[0],n=this.heap.pop();return this.indexMap.delete(e),this.heap.length>0&&n!==void 0&&(this.heap[0]=n,this.indexMap.set(n,0),this.heapifyDown(0)),e}heapifyUp(e){let n=e;for(;n>0;){const t=this.getParentIndex(n);if(this.comparator(this.heap[n],this.heap[t])>=0)break;this.swap(n,t),n=t}}heapifyDown(e){const n=this.size();let t=e;for(;;){const s=this.getLeftChildIndex(t),i=this.getRightChildIndex(t);let o=t;if(s<n&&this.comparator(this.heap[s],this.heap[o])<0&&(o=s),i<n&&this.comparator(this.heap[i],this.heap[o])<0&&(o=i),o===t)break;this.swap(t,o),t=o}}}class X extends x{findPath(e,n,t){const s=[],i=new H([],(o,r)=>o.getDistance()-r.getDistance());for(i.insert(n);i.size()>0;){const o=i.shift();if(!o.getIsWall()){if(o.getDistance()===1/0)break;if(!o.getIsVisited()){if(o.setVisited(!0),s.push(o),o===t)return{visitedNodesInOrder:s,shortestPath:this.reconstructPath(t)};for(const r of this.getNeighbors(o,e)){const l=o.getDistance()+r.getWeight()+1;l<r.getDistance()&&(r.setDistance(l),r.setPrevious(o),i.contains(r)?i.decreaseKey(r):i.insert(r))}}}}return{visitedNodesInOrder:s,shortestPath:[]}}}class ee extends x{heuristic(e,n){return Math.abs(e.getRow()-n.getRow())+Math.abs(e.getCol()-n.getCol())}findPath(e,n,t){const s=[],i=new Map,o=new Map,r=new Set,l=new Set;i.set(n,n.getDistance()),o.set(n,this.heuristic(n,t));const g=new H([n],(u,p)=>(o.get(u)??1/0)-(o.get(p)??1/0));for(r.add(n);g.size()>0;){const u=g.shift();if(!u.getIsWall()){if(u.getDistance()===1/0)break;if(!u.getIsVisited()){if(r.delete(u),l.add(u),s.push(u),u===t)return{visitedNodesInOrder:s,shortestPath:this.reconstructPath(t)};for(const p of this.getNeighbors(u,e)){if(l.has(p))continue;const d=(i.get(u)??1/0)+p.getWeight()+1;d<(i.get(p)??1/0)&&(p.setPrevious(u),p.setDistance(d),i.set(p,d),o.set(p,d+this.heuristic(p,t)),r.has(p)?g.decreaseKey(p):(g.insert(p),r.add(p)))}}}}return{visitedNodesInOrder:s,shortestPath:[]}}}class te{static create(e){switch(e){case f.BFS:return new Y;case f.DFS:return new Z;case f.DIJKSTRA:return new X;case f.ASTAR:return new ee;default:throw new Error(`Thuật toán '${e}' không được hỗ trợ.`)}}}function B(a){return new Promise(e=>setTimeout(e,a))}class ne{constructor(e){this.grid=e}generate(e,n){const t=this.grid.getNumRows(),s=this.grid.getNumCols();for(let i=0;i<s;i++)this.setWallSafe(0,i,e,n),this.setWallSafe(t-1,i,e,n);for(let i=0;i<t;i++)this.setWallSafe(i,0,e,n),this.setWallSafe(i,s-1,e,n);this.divide(1,1,t-2,s-2,e,n)}divide(e,n,t,s,i,o){if(t-e<2||s-n<2)return;if(this.shouldDivideHorizontally(e,n,t,s)){const l=[];for(let d=e+1;d<t;d++)d%2===0&&l.push(d);if(l.length===0)return;const g=l[Math.floor(Math.random()*l.length)],u=[];for(let d=n;d<=s;d++)d%2===1&&u.push(d);const p=u[Math.floor(Math.random()*u.length)];for(let d=n;d<=s;d++)d!==p&&this.setWallSafe(g,d,i,o);this.divide(e,n,g-1,s,i,o),this.divide(g+1,n,t,s,i,o)}else{const l=[];for(let d=n+1;d<s;d++)d%2===0&&l.push(d);if(l.length===0)return;const g=l[Math.floor(Math.random()*l.length)],u=[];for(let d=e;d<=t;d++)d%2===1&&u.push(d);const p=u[Math.floor(Math.random()*u.length)];for(let d=e;d<=t;d++)d!==p&&this.setWallSafe(d,g,i,o);this.divide(e,n,t,g-1,i,o),this.divide(e,g+1,t,s,i,o)}}shouldDivideHorizontally(e,n,t,s){const i=t-e,o=s-n;return i>o?!0:o>i?!1:Math.random()<.5}setWallSafe(e,n,t,s){const i=this.grid.getNode(e,n);i===t||i===s||i.setWall(!0)}}class se{model;view;drawMode;startNode=null;endNode=null;speed=C.MEDIUM;defaultRows=50;defaultCols=96;constructor(e){this.view=e,this.drawMode=b.START,this.model=new S(this.defaultRows,this.defaultCols),this.view.render(this.model)}handleReRenderBoard(e,n,t){this.model=e,this.startNode=n,this.endNode=t,this.view.render(e),document.dispatchEvent(new CustomEvent("board-update",{detail:{startNode:this.startNode,endNode:this.endNode}}))}handleDrawModeChange(){this.view.bindDrawModeChange(e=>{this.drawMode=e})}handleDrawBoard(){this.view.bindDrawBoard((e,n)=>{const t=this.model.getNode(e,n),s=[];switch(t.reset(),!this.startNode?.getIsStart()&&this.startNode===t&&(this.startNode=null),!this.endNode?.getIsEnd()&&this.endNode===t&&(this.endNode=null),this.drawMode){case b.START:this.startNode&&(this.startNode.reset(),s.push(this.startNode)),t.setStart(!0),t.setDistance(1),this.startNode=t;break;case b.END:this.endNode&&(this.endNode.reset(),s.push(this.endNode)),t.setEnd(!0),this.endNode=t;break;case b.WALL:t.setWall(!0);break;case b.WEIGHT:const i=this.view.getWeightElement().dataset.weight?parseInt(this.view.getWeightElement().dataset.weight,10):1;t.setWeight(i);break;case b.ERASER:break}return document.dispatchEvent(new CustomEvent("board-update",{detail:{startNode:this.startNode,endNode:this.endNode}})),s.push(t),s})}handleResetGrid(){this.model=new S(this.defaultRows,this.defaultCols),this.view.render(this.model),this.startNode=null,this.endNode=null,document.dispatchEvent(new CustomEvent("board-update",{detail:{startNode:this.startNode,endNode:this.endNode}}))}handleClearWeights(){this.view.bindClearWeights(()=>{const e=[];for(let n=0;n<this.model.getNumRows();n++)for(let t=0;t<this.model.getNumCols();t++){const s=this.model.getNode(n,t);s.getWeight()>0&&(s.setWeight(0),e.push(s))}return e})}handleClearPath(){this.view.bindClearPath(()=>{const e=[];for(let n=0;n<this.model.getNumRows();n++)for(let t=0;t<this.model.getNumCols();t++){const s=this.model.getNode(n,t);(s.getIsVisited()||s.getIsPath()||s.getDistance()!==1/0||s.getHeuristic()!==0||s.getPrevious()!==null)&&(s.resetPathState(),s===this.startNode&&s.setDistance(1),e.push(s))}return e})}handleClearWalls(){this.view.bindClearWalls(()=>{const e=[];for(let n=0;n<this.model.getNumRows();n++)for(let t=0;t<this.model.getNumCols();t++){const s=this.model.getNode(n,t);s.getIsWall()&&(s.setWall(!1),e.push(s))}return e})}handleCounts(){document.addEventListener("node-visited",e=>{const n=e.detail.countNode;this.view.updateCountVisitedNodes(n)}),document.addEventListener("node-path",e=>{const n=e.detail.countNode;this.view.updateCountPathNodes(n)}),document.addEventListener("visualization-end",e=>{if(e.detail){const n=e.detail.totalPathCost,t=e.detail.executionTime;this.view.updateTotalPathCost(n),this.view.updateExecutionTime(t)}})}async visualize(e,n){if(!this.startNode||!this.endNode)return;const t=Date.now(),i=te.create(e).findPath(this.model,this.startNode,this.endNode);await this.animateVisitedNodes(i.visitedNodesInOrder,n),i.shortestPath.length>0&&await this.animateShortestPath(i.shortestPath,n),document.dispatchEvent(new CustomEvent("visualization-end",{detail:{totalPathCost:this.endNode.getDistance(),executionTime:Date.now()-t}}))}async animateVisitedNodes(e,n){for(let t=0;t<e.length;t++){await n(),await B(this.speed);const s=e[t];document.dispatchEvent(new CustomEvent("node-visited",{detail:{countNode:t+1}})),!(s.getIsStart()||s.getIsEnd())&&(s.reset(),s.setVisited(!0),this.view.bindUpdateBoard(s))}}async animateShortestPath(e,n){for(let t=0;t<e.length;t++){await n(),await B(this.speed*1.5);const s=e[t];document.dispatchEvent(new CustomEvent("node-path",{detail:{countNode:t+1}})),!(s.getIsStart()||s.getIsEnd())&&(s.reset(),s.setPath(!0),this.view.bindUpdateBoard(s))}}setDrawMode(e){this.drawMode=e}setSpeed(e){this.speed=e}generateMaze(){if(!this.startNode||!this.endNode)return;new ne(this.model).generate(this.startNode,this.endNode);for(let n=0;n<this.model.getNumRows();n++)for(let t=0;t<this.model.getNumCols();t++){const s=this.model.getNode(n,t);this.view.bindUpdateBoard(s)}}getModel(){return this.model}getStartNode(){return this.startNode}getEndNode(){return this.endNode}}class L{constructor(e){this.task=e}pauseResolve=null;isPaused=!1;async pausePoint(){if(this.isPaused)return new Promise(e=>{this.pauseResolve=e})}pause(){this.isPaused=!0}resume(){this.pauseResolve&&(this.pauseResolve(),this.pauseResolve=null),this.isPaused=!1}start(){this.task()}getIsPaused(){return this.isPaused}}const ie=a=>JSON.stringify(a,null,2),ae=a=>{try{return JSON.parse(a)}catch(e){return console.error("Failed to parse data string:",e),null}},D=(a,e=!0)=>e?ie(a):ae(a),oe=`<div class="flex h-screen bg-gray-100">
  <aside class="flex h-screen bg-gray-100">
    <div
      class="w-80 bg-white overflow-y-auto h-screen flex flex-col justify-between"
    >
      <div>
        <h1
          class="text-2xl font-bold p-4 h-[3.25rem] border-b-[1px] border-r-[1px] border-secondary border-dashed"
        >
          SmartPath Visualizer
        </h1>
        <div class="flex flex-col gap-4 justify-between p-4 mt-4">
          <div class="space-y-2">
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="algorithm"
              >
                Select an Algorithm:
              </label>
              <select id="algorithm"></select>
            </div>
            <div class="flex gap-2">
              <button id="btn-run" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
                  />
                </svg>
                Run
              </button>
              <button id="btn-pause" disabled>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.75 5.25v13.5m-7.5-13.5v13.5"
                  />
                </svg>
              </button>
            </div>
            <button id="btn-reset-grid" class="w-full mt-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="size-6"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                />
              </svg>

              Reset Grid
            </button>
            <button id="btn-clear-walls" class="w-full mt-4">
              Clear Walls
            </button>
            <button id="btn-clear-path" class="w-full mt-4">Clear Path</button>
            <button id="btn-generate-maze" class="w-full mt-4" disabled>
              Generate Maze
            </button>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="algorithm"
              >
                Visualization Speed:
              </label>
              <select id="speed"></select>
            </div>
            <div class="space-y-2">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="algorithm"
              >
                Weight value:
              </label>
              <select id="weight"></select>
            </div>
          </div>
        </div>
      </div>
      <div
        class="flex bottom-0 w-full divide-x-2 divide-dotted divide-gray-400"
      >
        <button id="btn-export-file" class="button rounded-none h-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
            />
          </svg>

          Export
        </button>
        <button id="btn-import-file" class="rounded-none h-14">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
            />
          </svg>

          Import
        </button>
        <input
          id="import-input"
          type="file"
          accept=".json"
          style="display: none"
        />
      </div>
    </div>
  </aside>
  <main class="flex-1 overflow-auto flex flex-col">
    <header class="flex items-center justify-between bg-white p-4 z-10">
      <div class="space-x-6 flex text-sm font-medium">
        <div>
          <span class="font-semibold">Visited Nodes:</span>
          <span id="count-visited-nodes">0</span>
        </div>
        <div>
          <span class="font-semibold">Path Length:</span>
          <span id="count-path-length">0</span>
        </div>
        <div>
          <span class="font-semibold">Total Path Cost:</span>
          <span id="count-total-path-cost">0</span>
        </div>
        <div>
          <span class="font-semibold">Execution Time:</span>
          <span id="count-execution-time">0.00</span>ms
        </div>
      </div>
    </header>
    <div id="grid-container" class="flex-1 flex justify-center items-center">
      <div
        id="board"
        class="border border-gray-300 bg-white p-2 inline-block rounded-lg"
      >
        <!-- Grid will be rendered here -->
      </div>

      <div
        id="draw-toolbar"
        class="fixed top-4 right-0 bg-white border shadow-lg rounded p-2 flex items-center space-x-2 z-50"
      >
        <button id="toggle-toolbar" class="p-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>

        <div id="draw-mode" class="transition-all duration-1000 ease-in-out">
          <div class="flex items-center space-x-2">
            <span class="text-sm font-medium mr-2">Draw Mode:</span>

            <!-- Start -->
            <input
              type="radio"
              name="mode"
              id="mode-start"
              class="hidden peer/start"
              checked
            />
            <label
              for="mode-start"
              class="mode peer-checked/start:border-gray-500 peer-checked/start:border-2"
            >
              <span id="cell" class="block" data-type="start"></span>
            </label>

            <!-- End -->
            <input
              type="radio"
              name="mode"
              id="mode-end"
              class="hidden peer/end"
            />
            <label
              for="mode-end"
              class="mode peer-checked/end:border-gray-500 peer-checked/end:border-2"
            >
              <span id="cell" class="block" data-type="end"></span>
            </label>

            <!-- Wall -->
            <input
              type="radio"
              name="mode"
              id="mode-wall"
              class="hidden peer/wall"
            />
            <label
              for="mode-wall"
              class="mode peer-checked/wall:border-gray-500 peer-checked/wall:border-2"
            >
              <span id="cell" class="block" data-type="wall"></span>
            </label>

            <!-- Weight -->
            <input
              type="radio"
              name="mode"
              id="mode-weight"
              class="hidden peer/weight"
            />
            <label
              for="mode-weight"
              class="mode peer-checked/weight:border-gray-500 peer-checked/weight:border-2"
            >
              <span
                id="cell"
                class="block"
                data-type="weight"
                data-weight="1"
              ></span>
            </label>

            <!-- Clear -->
            <input
              type="radio"
              name="mode"
              id="mode-eraser"
              class="hidden peer/eraser"
            />
            <label
              for="mode-eraser"
              class="mode peer-checked/eraser:border-gray-500 peer-checked/eraser:border-2"
            >
              <span id="cell" class="block" data-type="eraser">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-eraser w-4 h-4"
                >
                  <path
                    d="m7 21-4.3-4.3c-1-1-1-2.5 0-3.4l9.6-9.6c1-1 2.5-1 3.4 0l5.6 5.6c1 1 1 2.5 0 3.4L13 21"
                  ></path>
                  <path d="M22 21H7"></path>
                  <path d="m5 11 9 9"></path>
                </svg>
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <footer class="bg-white p-4 z-10">
      <div class="flex flex-row items-center space-x-4">
        <h2 class="font-semibold text-sm text-nowrap">Color Legend:</h2>
        <ul
          class="flex flex-row flex-wrap w-full space-x-4 text-sm justify-between"
        >
          <li class="flex items-center">
            <span
              id="cell"
              data-type="start"
              class="inline-block rounded mr-2"
            ></span
            >Start Node
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="end"
              class="inline-block rounded mr-2"
            ></span
            >End Node
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="wall"
              class="inline-block rounded mr-2"
            ></span
            >Walls
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="weight"
              data-weight="1"
              class="inline-block rounded mr-2"
            ></span
            >Weight 1
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="weight"
              data-weight="5"
              class="inline-block rounded mr-2"
            ></span
            >Weight 5
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="weight"
              data-weight="10"
              class="inline-block rounded mr-2"
            ></span
            >Weight 10
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="path"
              class="inline-block rounded mr-2"
            ></span
            >Path
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="unvisited"
              class="inline-block rounded mr-2"
            ></span
            >Unvisited
          </li>
          <li class="flex items-center">
            <span
              id="cell"
              data-type="visited"
              class="inline-block rounded mr-2"
            ></span
            >Visited
          </li>
        </ul>
      </div>
    </footer>
  </main>
</div>
`;document.querySelector("#app").innerHTML=oe;document.addEventListener("DOMContentLoaded",()=>{const a=new J,e=new _(a),n=new K,t=new se(n),s=async(c,h)=>{document.dispatchEvent(new Event("visualization-start")),await t.visualize(h,c.pausePoint.bind(c))};let i=new L(()=>s(i,a.getSelectAlgorithm().value));const o=a.getBtnRun().innerHTML,r=a.getBtnPause().innerHTML,l=n.getCountVisitedNodes().innerHTML,g=n.getCountPathNodes().innerHTML,u=n.getTotalPathCost().innerHTML,p=n.getExecutionTime().innerHTML,d=a.getBtnRun(),y=a.getBtnPause(),P=a.getBtnResetGrid(),M=a.getBtnClearPath(),k=a.getBtnClearWalls(),T=a.getBtnGenerateMaze(),R=n.getBoardElement(),N=a.getSelectAlgorithm(),z=n.getWeightElement(),V=n.getModeInputs(),F=n.getCountVisitedNodes(),G=n.getCountPathNodes(),O=n.getTotalPathCost(),j=n.getExecutionTime();t.handleDrawModeChange(),t.handleDrawBoard(),t.handleCounts(),e.hanldeSelectWeightChange(),e.handleSelectAlgorithmChange(),e.handleSelectSpeedChange(),e.handleButtonRunClick(()=>{i.start()}),e.handleButtonPauseClick(()=>{i.getIsPaused()?(i.resume(),N.disabled=!0,P.disabled=!0,y.querySelector("svg path").setAttribute("d",I.PAUSE)):(i.pause(),N.disabled=!1,P.disabled=!1,y.querySelector("svg path").setAttribute("d",I.PLAY))}),e.handleButtonResetGridClick(()=>{document.dispatchEvent(new Event("visualization-end")),t.handleResetGrid()}),e.handleButtonClearPathClick(()=>{t.handleClearPath()}),e.handleButtonClearWallsClick(()=>{t.handleClearWalls()}),e.handleButtonGenerateMazeClick(()=>{t.handleClearPath(),t.handleClearWalls(),t.generateMaze()}),document.addEventListener("weight-change",c=>{const h=c.detail.weight;z.dataset.weight=h.toString()}),document.addEventListener("algorithm-change",c=>{const h=c.detail.algorithm;i=new L(()=>s(i,h));const w=document.querySelector('label[for="mode-weight"]');if(h==f.DIJKSTRA||h==f.ASTAR)w.style.display="block";else{w.style.display="none";const E=V.item(0);E.checked=!0,E.dispatchEvent(new Event("change"))}document.dispatchEvent(new Event("visualization-end"))}),document.addEventListener("speed-change",c=>{const h=c.detail.speed;t.setSpeed(h)}),document.addEventListener("board-update",c=>{const h=c.detail.startNode,w=c.detail.endNode;h&&w?(a.getBtnRun().disabled=!1,a.getBtnGenerateMaze().disabled=!1):(a.getBtnRun().disabled=!0,a.getBtnGenerateMaze().disabled=!0)}),document.addEventListener("visualization-start",()=>{R.style.pointerEvents="none",d.textContent="Running...",d.disabled=!0,y.disabled=!1,P.disabled=!0,M.disabled=!0,k.disabled=!0,T.disabled=!0,N.disabled=!0,F.innerHTML=l,G.innerHTML=g,O.innerHTML=u,j.innerHTML=p,(N.value===f.DFS||N.value===f.BFS)&&t.handleClearWeights(),t.handleClearPath()}),document.addEventListener("visualization-end",()=>{document.dispatchEvent(new CustomEvent("board-update",{detail:{startNode:t.getStartNode(),endNode:t.getEndNode()}})),y.disabled=!0,d.innerHTML=o,y.innerHTML=r,R.style.pointerEvents="auto",N.disabled=!1,P.disabled=!1,M.disabled=!1,k.disabled=!1,T.disabled=!1});const U=c=>{const h=new A(c.row,c.col);return h.setStart(c.isStart),h.setWall(c.isWall),h.setWeight(c.weight),h.setEnd(c.isEnd),h.setVisited(c.isVisited),h.setPath(c.isPath),h.setDistance(c.distance??1/0),h.setHeuristic(c.heuristic),h};e.handleButtonExportFile(()=>D({...t.getModel(),startNode:t.getStartNode(),endNode:t.getEndNode()})),e.handleButtonImportFile(c=>{const h=D(c,!1),w=new S(h.numRows,h.numCols);w.setNodes(h.nodes.map(q=>q.map(U)));const E=w.getNode(h.startNode.row,h.startNode.col),$=w.getNode(h.endNode.row,h.endNode.col);t.handleReRenderBoard(w,E,$)})});
