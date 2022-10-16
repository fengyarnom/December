"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[135],{135:function(t,e,a){a.r(e),a.d(e,{default:function(){return b}});var i=a(5671),n=a(3144),s=a(136),l=a(7277),h=a(2791),o=a(8074),c=a(3888),d=a(3064),r=a(6283),u=a(8916),g=a(5209),p=a(2900),v=a(8823),x=a(1091),f=a(4569),y=a.n(f),C=a(184),b=function(t){(0,s.Z)(a,t);var e=(0,l.Z)(a);function a(t){var n;return(0,i.Z)(this,a),(n=e.call(this,t)).state={pid:"",title:"",content:"",tags:"",isTop:0,isNotice:0,isDaily:0},n}return(0,n.Z)(a,[{key:"componentDidMount",value:function(){var t=this,e=window.location.href.split("?")[1];null!=e&&y().get("/api/modify?"+e).then((function(e){console.log(e),t.setState({pid:e.data.pid,title:e.data.title,content:e.data.content,tags:e.data.tags,isTop:e.data.isTop,isDaily:e.data.isDaily,isNotice:e.data.isNotice})}))}},{key:"handleTitleChange",value:function(t){this.setState({title:t.target.value})}},{key:"handleContentChange",value:function(t){this.setState({content:t.target.value})}},{key:"handleTagChange",value:function(t){this.setState({tags:t.target.value})}},{key:"handleIsTopChange",value:function(t){this.setState({isTop:t.target.checked})}},{key:"handleIsNoticeChange",value:function(t){this.setState({isNotice:t.target.checked})}},{key:"handleIsDailyChange",value:function(t){this.setState({isDaily:t.target.checked})}},{key:"send",value:function(){y().post("/api/newPost",{data:{pid:this.state.pid,title:this.state.title?this.state.title:"\u65e0\u9898",content:this.state.content,tags:this.state.tags,isTop:this.state.isTop,isNotice:this.state.isNotice,isDaily:this.state.isDaily}}).then((function(t){console.log(t),201==t.data.code?alert("\u6587\u7ae0\u6dfb\u52a0\u6210\u529f"):200==t.data.code&&alert("\u6587\u7ae0\u4fee\u6539\u6210\u529f")}))}},{key:"tab",value:function(t){if(9==t.keyCode){var e=document.querySelector("textarea"),a=e.selectionStart,i=e.selectionEnd;e.value=e.value.substring(0,a)+"\t"+e.value.substring(i),e.selectionStart=e.selectionEnd=a+1,t.preventDefault()}}},{key:"render",value:function(){return(0,C.jsxs)("div",{className:"newPost",children:[this.state.args,(0,C.jsxs)(c.Z,{"aria-label":"breadcrumb",children:[(0,C.jsx)(r.Z,{underline:"hover",color:"inherit",href:"/admin",children:"\u540e\u53f0"}),(0,C.jsx)(r.Z,{underline:"hover",color:"inherit",href:"/admin",children:"\u6587\u7ae0\u7ba1\u7406"}),(0,C.jsx)(o.Z,{color:"text.primary",children:"\u5199\u4e00\u7bc7\u65b0\u6587\u7ae0"})]}),(0,C.jsxs)("div",{className:"post",children:[(0,C.jsx)("div",{className:"title",children:(0,C.jsx)("input",{type:"text",value:this.state.title,onChange:this.handleTitleChange.bind(this),placeholder:"\u8bf7\u8f93\u5165\u6807\u9898"})}),(0,C.jsx)("div",{className:"content",children:(0,C.jsx)("textarea",{placeholder:"\u8bf7\u8f93\u5165\u5185\u5bb9",value:this.state.content,onChange:this.handleContentChange.bind(this),onKeyDown:this.tab.bind(this)})}),(0,C.jsx)(u.Z,{children:(0,C.jsx)(g.Z,{label:"\u66f4\u591a\u64cd\u4f5c"})}),(0,C.jsxs)("div",{className:"option",children:[(0,C.jsx)(d.Z,{id:"outlined-basic",label:"\u8bf7\u8f93\u5165\u6807\u7b7e",variant:"outlined",helperText:"\u82e5\u4f7f\u7528\u591a\u4e2a\u6807\u7b7e\uff0c\u8bf7\u7528\u5206\u53f7\u5206\u9694",value:this.state.tags,onChange:this.handleTagChange.bind(this)}),(0,C.jsxs)("div",{className:"checkbox",children:[(0,C.jsx)(p.Z,{control:(0,C.jsx)(v.Z,{checked:this.state.isTop,onChange:this.handleIsTopChange.bind(this)}),label:"\u8bbe\u7f6e\u4e3a\u7f6e\u9876\u6587\u7ae0"}),(0,C.jsx)(p.Z,{control:(0,C.jsx)(v.Z,{checked:this.state.isNotice,onChange:this.handleIsNoticeChange.bind(this)}),label:"\u8bbe\u7f6e\u4e3a\u901a\u544a"}),(0,C.jsx)(p.Z,{control:(0,C.jsx)(v.Z,{checked:this.state.isDaily,onChange:this.handleIsDailyChange.bind(this)}),label:"\u8bbe\u7f6e\u4e3a\u65e5\u8bb0"})]}),(0,C.jsx)(x.Z,{variant:"contained",onClick:this.send.bind(this),children:"\ud83d\ude80 \u63d0\u4ea4"})]})]})]})}}]),a}(h.Component)}}]);
//# sourceMappingURL=135.902259d1.chunk.js.map