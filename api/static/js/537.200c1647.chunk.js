"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[537],{537:function(e,t,n){n.r(t),n.d(t,{default:function(){return S}});var a=n(5671),s=n(3144),r=n(136),i=n(7277),l=n(2791),d=n(1680),c=n(9773),o=n(4390),h=n(9963),p=n(9827),u=n(807),g=n(6650),x=n(1087),j=n(1091),Z=n(6582),f=n(6147),m=n(1501),v=n(4569),b=n.n(v),C=n(184),S=function(e){(0,r.Z)(n,e);var t=(0,i.Z)(n);function n(e){var s;return(0,a.Z)(this,n),(s=t.call(this,e)).handlePageChange=function(e,t){s.setState({page:t});var n=5*(t-1);b().get("/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=5&offset="+n).then((function(e){s.setState({postArr:e.data.data})}))},s.state={postArr:[],page:1,postCount:0,error_flag:!1,error_message:""},s}return(0,s.Z)(n,[{key:"componentDidMount",value:function(){var e=this;b().get("/api/seleteTable?class=POST&order_by=pid&desc=desc&limit=5").then((function(t){e.setState({postArr:t.data.data})})),b().get("/api/getTableCount/POST").then((function(t){200==t.data.code&&e.setState({postCount:Math.ceil(t.data.data/5)})}))}},{key:"handleDelete",value:function(e,t,n){var a=this;window.confirm("\u60a8\u786e\u5b9a\u8981\u5220\u9664\u6587\u7ae0\u300a "+n+" \u300b \u5417")&&b().post("/api/delete/POST/pid="+t).then((function(t){if(200==t.data.code){var n=a.state.postArr;n.splice(e,1),a.setState({postArr:n})}else 401==t.data.code&&a.setState({error_flag:!0,error_message:t.data.message})}))}},{key:"render",value:function(){var e=this;return(0,C.jsxs)("div",{className:"AdminAritleList",children:[this.state.error_flag?(0,C.jsx)(m.Z,{severity:"error",children:this.state.error_message}):(0,C.jsx)("span",{}),(0,C.jsxs)("div",{className:"header",children:[(0,C.jsx)("div",{className:"title",children:(0,C.jsx)("h3",{children:"\u6587\u7ae0\u7ba1\u7406"})}),(0,C.jsx)(x.rU,{to:"/newPost",children:(0,C.jsx)(j.Z,{variant:"contained",children:"\u5199\u4e00\u7bc7\u65b0\u6587\u7ae0"})})]}),(0,C.jsx)("div",{className:"content",children:(0,C.jsxs)(h.Z,{component:g.Z,children:[(0,C.jsxs)(d.Z,{sx:{minWidth:650},"aria-label":"simple table",children:[(0,C.jsx)(p.Z,{children:(0,C.jsxs)(u.Z,{children:[(0,C.jsx)(o.Z,{align:"center",children:"\u6807\u9898"}),(0,C.jsx)(o.Z,{align:"center",children:"\u53d1\u5e03\u65f6\u95f4"}),(0,C.jsx)(o.Z,{align:"center",children:"\u6807\u7b7e"}),(0,C.jsx)(o.Z,{align:"center",children:"\u64cd\u4f5c"})]})}),(0,C.jsx)(c.Z,{children:this.state.postArr.map((function(t,n){return(0,C.jsxs)(u.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,C.jsx)(o.Z,{align:"center",children:t.title}),(0,C.jsx)(o.Z,{align:"center",children:t.create_date}),(0,C.jsxs)(o.Z,{align:"center",children:[t.tags," "]}),(0,C.jsx)(o.Z,{align:"center",children:(0,C.jsxs)(Z.Z,{variant:"contained","aria-label":"outlined primary button group",children:[(0,C.jsx)(j.Z,{children:(0,C.jsx)(x.rU,{to:"/newPost?class=post&pid="+t.pid,children:"\u4fee\u6539"})}),(0,C.jsx)(j.Z,{onClick:e.handleDelete.bind(e,n,t.pid,t.pid),children:"\u5220\u9664"})]})})]},n)}))})]}),(0,C.jsx)(f.Z,{count:this.state.postCount,variant:"outlined",shape:"rounded",page:this.state.page,onChange:this.handlePageChange.bind(this)})]})})]})}}]),n}(l.Component)}}]);
//# sourceMappingURL=537.200c1647.chunk.js.map