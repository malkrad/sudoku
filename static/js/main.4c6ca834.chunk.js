(this["webpackJsonpsudoku-react"]=this["webpackJsonpsudoku-react"]||[]).push([[0],[,,,,,,,,,,,function(e,t,n){e.exports=n(21)},,,,,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),l=n.n(r),a=n(10),i=n.n(a),o=(n(16),n(1)),s=n(8),u=n(3),c=n(4),f=n(6),h=n(5),m=n(2),v=n(7),d=(n(17),n(18),function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).handleClick=n.handleClick.bind(Object(m.a)(n)),n}return Object(v.a)(t,e),Object(c.a)(t,[{key:"handleClick",value:function(){this.props.handleClick(this.props.idx)}},{key:"render",value:function(){var e="Cell";return this.props.immutable?e+=" immutable":e+=" mutable",this.props.focused&&(e+=" focused"),this.props.wrongCell&&(e+=" wrongCell"),this.props.causingError&&(e+=" causingError"),this.props.hint&&(e+=" hint"),l.a.createElement("div",{className:e,onClick:this.handleClick},0!==this.props.num?this.props.num:"")}}]),t}(r.Component)),p=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).cellClicked=n.cellClicked.bind(Object(m.a)(n)),n}return Object(v.a)(t,e),Object(c.a)(t,[{key:"cellClicked",value:function(e){this.props.handleClick(this.props.idx,e)}},{key:"render",value:function(){var e=this,t=this.props.cells.map((function(t,n){return l.a.createElement(d,{idx:n,key:String(e.props.idx)+"-"+String(n),num:t,handleClick:e.cellClicked,focused:e.props.focusedCell===n,wrongCell:e.props.wrongCells[n],causingError:e.props.causingError[n],immutable:e.props.immutable[n],hint:e.props.hints[n]})}));return l.a.createElement("div",{className:"Subgrid"},t)}}]),t}(r.Component);p.defaultProps={cells:new Array(9).fill(0)};var y=p,b=(n(19),function(e){function t(){return Object(u.a)(this,t),Object(f.a)(this,Object(h.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(c.a)(t,[{key:"render",value:function(){var e,t,n=this;if(this.props.focusedCell){var r=Object(o.a)(this.props.focusedCell,2);e=r[0],t=r[1]}var a=this.props.subgrids.map((function(r,a){return l.a.createElement(y,{idx:a,key:a,cells:r,handleClick:n.props.handleClick,focusedCell:e===a?t:void 0,wrongCells:n.props.wrongCells[a],causingError:n.props.causingError[a],immutable:n.props.immutable[a],hints:n.props.hints[a]})})),i="SudokuBoard";return this.props.solved?i+=" solved":i+=" unsolved",l.a.createElement("div",{className:i},a)}}]),t}(r.Component));b.defaultProps={subgrids:new Array(9).fill(new Array(9).fill(0))};var k=b,w=function(e){function t(e){var n;return Object(u.a)(this,t),(n=Object(f.a)(this,Object(h.a)(t).call(this,e))).state={cells:new Array(9).fill().map((function(){return Array(9).fill(0)})),hints:new Array(9).fill().map((function(){return Array(9).fill(!1)})),immutable:new Array(9).fill().map((function(){return Array(9).fill(!1)})),wrongCells:new Array(9).fill().map((function(){return Array(9).fill(!1)})),causingError:new Array(9).fill().map((function(){return Array(9).fill(!1)})),focusedCell:void 0,solved:!1},n.setFocus=n.setFocus.bind(Object(m.a)(n)),n.changeCell=n.changeCell.bind(Object(m.a)(n)),n.clearBoard=n.clearBoard.bind(Object(m.a)(n)),n.hint=n.hint.bind(Object(m.a)(n)),n.solve=n.solve.bind(Object(m.a)(n)),n.makeBoard=n.makeBoard.bind(Object(m.a)(n)),n.handleKeyDown=n.handleKeyDown.bind(Object(m.a)(n)),n}return Object(v.a)(t,e),Object(c.a)(t,[{key:"setFocus",value:function(e,t){this.state.immutable[e][t]||this.setState({focusedCell:[e,t]})}},{key:"handleKeyDown",value:function(e){var t=e.key;this.state.focusedCell&&!isNaN(parseInt(t))?this.handleNumberDown(parseInt(e.key)):["ArrowLeft","ArrowRight","ArrowUp","ArrowDown"].includes(t)&&this.handleArrowDown(t)}},{key:"handleNumberDown",value:function(e){this.changeCell.apply(this,[e].concat(Object(s.a)(this.state.focusedCell))),this.checkConflicts.apply(this,Object(s.a)(this.state.focusedCell)),this.checkSolved()}},{key:"changeCell",value:function(e,t,n){if(!this.state.immutable[t][n]){var r=this.state.cells;r[t][n]=e,this.setState({cells:r})}}},{key:"checkConflicts",value:function(){var e=this,t=this.state.cells,n=new Array(9).fill().map((function(){return Array(9).fill(!1)})),r=new Array(9).fill().map((function(){return Array(9).fill(!1)}));t.forEach((function(t,l){return t.forEach((function(t,a){if(0!==t){var i=e.checkCell(l,a),s=Object(o.a)(i,2),u=s[0],c=s[1];if(u){var f=e.findWrongCells(t,l,a,c,n,r),h=Object(o.a)(f,2);n=h[0],r=h[1]}}}))})),this.setState({wrongCells:n,causingError:r})}},{key:"checkSolved",value:function(){for(var e=this.state,t=e.cells,n=e.wrongCells,r=!0,l=0;l<t.length;l++)for(var a=0;a<t[l].length;a++){if(!t[l][a]||n[l][a]){r=!1;break}if(!r)break}this.setState({solved:r})}},{key:"handleArrowDown",value:function(e){var t,n;if(this.state.focusedCell){var r=Object(o.a)(this.state.focusedCell,2);switch(t=r[0],n=r[1],e){case"ArrowLeft":var l=this.moveLeft(t,n),a=Object(o.a)(l,2);t=a[0],n=a[1];break;case"ArrowRight":var i=this.moveRight(t,n),s=Object(o.a)(i,2);t=s[0],n=s[1];break;case"ArrowUp":var u=this.moveUp(t,n),c=Object(o.a)(u,2);t=c[0],n=c[1];break;case"ArrowDown":var f=this.moveDown(t,n),h=Object(o.a)(f,2);t=h[0],n=h[1]}}else t=0,n=0;this.setState({focusedCell:[t,n]})}},{key:"moveLeft",value:function(e,t){return t%3!==0?t--:e%3!==0&&(t+=2,e--),[e,t]}},{key:"moveRight",value:function(e,t){return t%3!==2?t++:e%3!==2&&(t-=2,e++),[e,t]}},{key:"moveUp",value:function(e,t){return 0!==Math.floor(t/3)?t-=3:0!==Math.floor(e/3)&&(t+=6,e-=3),[e,t]}},{key:"moveDown",value:function(e,t){return 2!==Math.floor(t/3)?t+=3:2!==Math.floor(e/3)&&(t-=6,e+=3),[e,t]}},{key:"checkCell",value:function(e,t){var n=this.state.cells[e][t],r=this.getBlock(e,this.state.cells),l=this.getRow(e,t,this.state.cells),a=this.getCol(e,t,this.state.cells),i={block:!1,row:!1,col:!1};return r.filter((function(e){return e===n})).length>=2&&(i.block=!0),l.filter((function(e){return e===n})).length>=2&&(i.row=!0),a.filter((function(e){return e===n})).length>=2&&(i.col=!0),[i.block||i.row||i.col,i]}},{key:"getBlock",value:function(e,t){return t[e]}},{key:"getRow",value:function(e,t,n){var r,l=3*Math.floor(e/3),a=n.slice(l,l+3),i=3*Math.floor(t/3),o=a.map((function(e){return e.slice(i,i+3)}));return(r=[]).concat.apply(r,Object(s.a)(o))}},{key:"getCol",value:function(e,t,n){var r,l=n.filter((function(t,n){return n%3===e%3})).map((function(e){return e.filter((function(e,n){return n%3===t%3}))}));return(r=[]).concat.apply(r,Object(s.a)(l))}},{key:"findWrongCells",value:function(e,t,n,r,l,a){if(r.block){var i=this.findWrongCellsInBlock(e,t,l,a),s=Object(o.a)(i,2);l=s[0],a=s[1]}if(r.row){var u=this.findWrongCellsInRow(e,t,n,l,a),c=Object(o.a)(u,2);l=c[0],a=c[1]}if(r.col){var f=this.findWrongCellsInCol(e,t,n,l,a),h=Object(o.a)(f,2);l=h[0],a=h[1]}return[l,a]}},{key:"findWrongCellsInBlock",value:function(e,t,n,r){var l=this;return n[t]=new Array(9).fill(!0),r[t]=r[t].map((function(n,r){return l.state.cells[t][r]===e||n})),[n,r]}},{key:"findWrongCellsInRow",value:function(e,t,n,r,l){var a=this;return r=r.map((function(e,l){return Math.floor(l/3)===Math.floor(t/3)?r[l].map((function(e,t){return Math.floor(t/3)===Math.floor(n/3)||e})):e})),l=l.map((function(r,i){return Math.floor(i/3)===Math.floor(t/3)?l[i].map((function(t,r){return Math.floor(r/3)===Math.floor(n/3)&&a.state.cells[i][r]===e||t})):r})),[r,l]}},{key:"findWrongCellsInCol",value:function(e,t,n,r,l){var a=this;return r=r.map((function(e,l){return l%3===t%3?r[l].map((function(e,t){return t%3===n%3||e})):e})),l=l.map((function(r,i){return i%3===t%3?l[i].map((function(t,r){return r%3===n%3&&a.state.cells[i][r]===e||t})):r})),[r,l]}},{key:"clearBoard",value:function(){var e=this;this.setState({cells:this.state.cells.map((function(t,n){return t.map((function(t,r){return e.state.immutable[n][r]?t:0}))})),wrongCells:new Array(9).fill().map((function(){return Array(9).fill(!1)})),causingError:new Array(9).fill().map((function(){return Array(9).fill(!1)})),solved:!1})}},{key:"solve",value:function(){var e=this,t=this.state.cells.map((function(t,n){return t.map((function(t,r){return e.state.immutable[n][r]?t:0}))})),n=this.solveNext(t,!1),r=n.result,l=n.cells;r?this.setState({solved:!0,cells:l,wrongCells:new Array(9).fill().map((function(){return Array(9).fill(!1)})),causingError:new Array(9).fill().map((function(){return Array(9).fill(!1)}))}):alert("Sorry, but something went wrong!")}},{key:"solveNext",value:function(e,t){var n=this.nextEmptyCell(e);if(!n)return{result:!0,cells:e};var r=Object(o.a)(n,2),l=r[0],a=r[1],i=this.cellSolutions(l,a,e);if(!i.length)return{result:!1,cells:e};i=t?this.shuffle(i):i;var s=!0,u=!1,c=void 0;try{for(var f,h=i[Symbol.iterator]();!(s=(f=h.next()).done);s=!0){var m=f.value;if(e[l][a]=m,this.solveNext(e).result)return{result:!0,cells:e};e[l][a]=0}}catch(v){u=!0,c=v}finally{try{s||null==h.return||h.return()}finally{if(u)throw c}}return{result:!1,cells:e}}},{key:"nextEmptyCell",value:function(e){for(var t=0;t<e.length;t++)for(var n=0;n<e[0].length;n++)if(0===e[t][n])return[t,n];return null}},{key:"cellSolutions",value:function(e,t,n){var r=new Array(9).fill(0).map((function(e,t){return t+1})),l=this.getBlock(e,n),a=this.getRow(e,t,n),i=this.getCol(e,t,n);return r=r.filter((function(e){return!l.includes(e)&&!a.includes(e)&&!i.includes(e)}))}},{key:"shuffle",value:function(e){for(var t=e.length-1;t>0;t--){var n=Math.floor(Math.random()*t),r=[e[n],e[t]];e[t]=r[0],e[n]=r[1]}return e}},{key:"makeBoard",value:function(){var e=Array.from({length:9}).map((function(){return Array(9).fill(0)})),t=this.solveAndShuffle(e),n=t.result,r=t.cells;if(n){var l=this.shuffle(Object(s.a)(Array(81).keys())),a=!0,i=!1,o=void 0;try{for(var u,c=l[Symbol.iterator]();!(a=(u=c.next()).done);a=!0){var f=u.value,h=Math.floor(f/9),m=f%9,v=r[h][m];r[h][m]=0;var d=this.cellSolutions(h,m,r);1!==d.length&&2!==d.length&&(r[h][m]=v)}}catch(y){i=!0,o=y}finally{try{a||null==c.return||c.return()}finally{if(i)throw o}}var p=this.immutableCells(r);this.setState({cells:r,immutable:p,wrongCells:new Array(9).fill().map((function(){return Array(9).fill(!1)})),causingError:new Array(9).fill().map((function(){return Array(9).fill(!1)})),solved:!1})}else alert("Something wrong happend while trying to make a board!")}},{key:"solveAndShuffle",value:function(e){return this.solveNext(e,!0)}},{key:"immutableCells",value:function(e){return e.map((function(e,t){return e.map((function(e,t){return!!e}))}))}},{key:"hint",value:function(){var e=this.findLonelyCells(),t=Object(o.a)(e,2),n=t[0],r=t[1],l=this.findLonelyValues(),a=Object(o.a)(l,2),i=a[0],s=a[1],u=new Array(9).fill().map((function(){return Array(9).fill(!1)}));u=u.map((function(e,t){return e.map((function(e,n){return r[t][n]||s[t][n]}))})),n||i?this.setState({hints:u}):alert("No direct solutions")}},{key:"findLonelyCells",value:function(){for(var e=this,t=this.state,n=t.cells,r=t.immutable,l=t.hints,a=!1,i=n.map((function(t,l){return t.map((function(t,a){return r[l][a]?[]:e.cellSolutions(l,a,n)}))})),o=0;o<i.length;o++)for(var s=0;s<i[o].length;s++)1===i[o][s].length&&(l[o][s]=!0,a=!0);return[a,l]}},{key:"findLonelyValues",value:function(){var e=this,t=this.state,n=t.cells,r=t.immutable,l=t.hints,a=n.map((function(t,l){return t.map((function(t,a){return r[l][a]?[]:e.cellSolutions(l,a,n)}))})),i=new Array(9).fill().map((function(){return Array(9).fill(0)}));return a.forEach((function(e,t){return e.forEach((function(e,n){return i[t][e]+=1}))})),[!1,l]}},{key:"componentDidMount",value:function(){this.makeBoard(),document.addEventListener("keydown",this.handleKeyDown)}},{key:"componentWillUnmount",value:function(){document.removeEventListener("keydown",this.handleKeyDown)}},{key:"render",value:function(){return l.a.createElement("div",null,l.a.createElement("header",null,l.a.createElement("h1",{id:"title"},"Sudoku JS")),l.a.createElement(k,{subgrids:this.state.cells,handleClick:this.setFocus,focusedCell:this.state.focusedCell,wrongCells:this.state.wrongCells,causingError:this.state.causingError,immutable:this.state.immutable,hints:this.state.hints,solved:this.state.solved}),l.a.createElement("div",{className:"HelperButtonsContainer"},l.a.createElement("button",{className:"HelperButton",onClick:this.makeBoard},"New"),l.a.createElement("button",{className:"HelperButton",onClick:this.clearBoard},"Clear"),l.a.createElement("button",{className:"HelperButton",onClick:this.solve},"Solve!")))}}]),t}(r.Component);n(20);var g=function(){return l.a.createElement("div",{className:"App"},l.a.createElement(w,null))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(l.a.createElement(g,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}],[[11,1,2]]]);
//# sourceMappingURL=main.4c6ca834.chunk.js.map