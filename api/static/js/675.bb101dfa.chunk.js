"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[675],{9675:function(e,t,a){a.r(t),a.d(t,{default:function(){return C}});var n=a(5671),s=a(3144),r=a(136),i=a(7277),l=a(2791),d=a(1680),c=a(9773),o=a(4390),h=a(9963),p=a(9827),u=a(807),g=a(6650),x=a(1087),j=a(1091),f=a(6582),Z=a(6147),v=a(1501),m=a(4569),b=a.n(m),A=a(184),C=function(e){(0,r.Z)(a,e);var t=(0,i.Z)(a);function a(e){var s;return(0,n.Z)(this,a),(s=t.call(this,e)).handlePageChange=function(e,t){s.setState({page:t});var a=5*(t-1);b().get("/api/seleteTable?class=DAILY&order_by=pid&desc=desc&limit=5&offset="+a).then((function(e){s.setState({postArr:e.data.data})}))},s.state={postArr:[],page:1,postCount:0,error_flag:!1,error_message:""},s}return(0,s.Z)(a,[{key:"componentDidMount",value:function(){var e=this;b().get("/api/seleteTable?class=DAILY&order_by=pid&desc=desc&limit=5").then((function(t){e.setState({postArr:t.data.data})})),b().get("/api/getTableCount/DAILY").then((function(t){200==t.data.code&&e.setState({postCount:Math.ceil(t.data.data/5)})}))}},{key:"handleDelete",value:function(e,t,a){var n=this;window.confirm("\u60a8\u786e\u5b9a\u8981\u5220\u9664\u65e5\u8bb0\u300a "+a+" \u300b \u5417")&&b().post("/api/delete/DAILY/pid="+t).then((function(t){if(200==t.data.code){var a=n.state.postArr;a.splice(e,1),n.setState({postArr:a})}else 401==t.data.code&&n.setState({error_flag:!0,error_message:t.data.message})}))}},{key:"render",value:function(){var e=this;return(0,A.jsxs)("div",{className:"AdminAritleList",children:[this.state.error_flag?(0,A.jsx)(v.Z,{severity:"error",children:this.state.error_message}):(0,A.jsx)("span",{}),(0,A.jsxs)("div",{className:"header",children:[(0,A.jsx)("div",{className:"title",children:(0,A.jsx)("h3",{children:"\u65e5\u8bb0\u7ba1\u7406"})}),(0,A.jsx)(x.rU,{to:"/newPost",children:(0,A.jsx)(j.Z,{variant:"contained",children:"\u5199\u4e00\u7bc7\u65b0\u65e5\u8bb0"})})]}),(0,A.jsx)("div",{className:"content",children:(0,A.jsxs)(h.Z,{component:g.Z,children:[(0,A.jsxs)(d.Z,{"aria-label":"simple table",children:[(0,A.jsx)(p.Z,{children:(0,A.jsxs)(u.Z,{children:[(0,A.jsx)(o.Z,{align:"center",children:"\u6807\u9898"}),(0,A.jsx)(o.Z,{align:"center",children:"\u53d1\u5e03\u65f6\u95f4"}),(0,A.jsx)(o.Z,{align:"center",children:"\u64cd\u4f5c"})]})}),(0,A.jsx)(c.Z,{children:this.state.postArr.map((function(t,a){return(0,A.jsxs)(u.Z,{sx:{"&:last-child td, &:last-child th":{border:0}},children:[(0,A.jsx)(o.Z,{align:"center",children:t.title}),(0,A.jsx)(o.Z,{align:"center",children:t.create_date}),(0,A.jsx)(o.Z,{align:"center",children:(0,A.jsxs)(f.Z,{variant:"contained","aria-label":"outlined primary button group",children:[(0,A.jsx)(j.Z,{children:(0,A.jsx)(x.rU,{to:"/newPost?class=daily&pid="+t.pid,children:"\u4fee\u6539"})}),(0,A.jsx)(j.Z,{onClick:e.handleDelete.bind(e,a,t.pid,t.title),children:"\u5220\u9664"})]})})]},a)}))})]}),(0,A.jsx)(Z.Z,{count:this.state.postCount,variant:"outlined",shape:"rounded",page:this.state.page,onChange:this.handlePageChange.bind(this)})]})})]})}}]),a}(l.Component)}}]);
//# sourceMappingURL=675.bb101dfa.chunk.js.map