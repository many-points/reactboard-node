(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{16:function(t,e,a){t.exports=a(26)},23:function(t,e,a){},26:function(t,e,a){"use strict";a.r(e);var n=a(0),s=a.n(n),r=a(12),o=a.n(r),i=a(4),c=a(5),l=a(7),m=a(6),u=a(8),d=a(29),h=a(28),p=a(10);var f=function(t,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:15e3;return Promise.race([fetch(t,e),new Promise(function(t,e){return setTimeout(function(){return e(new Error("Request timed out."))},a)})])},g=a(27);function v(t){var e=function(t){return t<10?"0"+t:t};return"".concat(t.toLocaleDateString().replace(/\s/g,"\xa0"),"\xa0")+"".concat(e(t.getHours()),":").concat(e(t.getMinutes()),":").concat(e(t.getSeconds()))}function E(t){var e=t.split("~");return 2===e.length&&e[0]==e[1]}var b=function(t){var e=v(new Date(t.createdAt)),a=t.isThread?v(new Date(t.threadUpdatedAt)):null,n=t.humanId||"nothing",r=E(n),o=t.images;return s.a.createElement("div",{className:"post slide-up"},s.a.createElement("div",{className:"postTop"},s.a.createElement("div",{className:"postTopLeft"},"".concat(t.index,"\xa0"),s.a.createElement("a",{href:"#",className:"postId ".concat(r?"dubs":"")},s.a.createElement("span",null,n),t.isOp&&s.a.createElement(s.a.Fragment,null,"~",s.a.createElement("span",{className:"op"},"op"))),t.linkTo&&s.a.createElement(g.a,{className:"postLink",to:"/thread/".concat(t.linkTo)},"~")),s.a.createElement("div",{className:"postTopRight"},s.a.createElement("span",{className:"postTimestamp"},e))),o&&0!==o.length&&s.a.createElement("img",{className:"postImage",src:"/"+o[0]}),s.a.createElement("p",{className:"postText unstyled"},t.text),s.a.createElement("div",{className:"postBottom"},s.a.createElement("div",{className:"postBottomLeft"}),s.a.createElement("div",{className:"postBottomRight"},t.isThread&&s.a.createElement("span",{className:"lastPostTimestamp"},"Last\xa0update:\xa0".concat(a)))))},y=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(l.a)(this,Object(m.a)(e).call(this,t))).messages={default:"",hotkey:"Press\xa0Alt+Enter\xa0to\xa0post",empty:"Posts\xa0can't\xa0be\xa0empty"},a.buttonText="Post",a.state={text:"",message:"hotkey",alert:!1,loading:!1,filename:"",file:null},t.threadForm&&(a.messages.hotkey="Press\xa0Alt+Enter\xa0to\xa0create\xa0thread",a.buttonText="Create"),a}return Object(u.a)(e,t),Object(c.a)(e,[{key:"handleChange",value:function(t){var e=this;this.setState({text:t.target.value}),setTimeout(function(){return e.setState({message:"hotkey",alert:!1})},0)}},{key:"handleSubmit",value:function(t){var e=this;t.preventDefault(),this.setState({alert:!1});var a=this.state.text.trim(),n=(this.state.filename.trim(),this.state.file);""!==a?(this.setState({loading:!0}),this.props.submit({text:a},{file:n}).then(function(t){e.setState({text:"",loading:!1})})):setTimeout(function(){return e.setState({message:"empty",alert:!0})},100)}},{key:"handleShortcut",value:function(t){13===t.keyCode&&t.altKey&&(t.preventDefault(),this.refs.submit.click())}},{key:"uploadFile",value:function(t){this.setState({filename:t.target.files[0].name,file:t.target.files[0]})}},{key:"fileButton",value:function(t){t.preventDefault(),this.refs.file.click()}},{key:"render",value:function(){return s.a.createElement("div",{className:"floaty"},s.a.createElement("form",{className:"form slide-up",onSubmit:this.handleSubmit.bind(this)},s.a.createElement("textarea",{className:"formTextarea",rows:"7",value:this.state.text,onChange:this.handleChange.bind(this),onKeyDown:this.handleShortcut.bind(this)}),s.a.createElement("div",{className:"formButtons"},s.a.createElement("div",{className:"formRight"},s.a.createElement("input",{className:"formSubmit btn",type:"submit",value:this.buttonText,ref:"submit"}),s.a.createElement("button",{className:"formFile btn",onClick:this.fileButton.bind(this)},s.a.createElement("span",null,"Upload file")),s.a.createElement("input",{ref:"file",type:"file",style:{display:"none"},onChange:this.uploadFile.bind(this)}),s.a.createElement("div",{className:"formFilename"},this.state.filename&&"File:\xa0".concat(this.state.filename))),s.a.createElement("div",{className:"formLeft"},s.a.createElement("div",{className:"formMessageBox ".concat(this.state.alert?"textAlert":"")},this.messages[this.state.message])))))}}]),e}(n.Component);var N=function(t){return s.a.createElement("div",{className:"loading"},s.a.createElement("div",{className:t.error?"loadingError":""}))},k=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(l.a)(this,Object(m.a)(e).call(this,t))).state={id:a.props.id,op:"",posts:[],loading:!1,error:!1,form:!1},a}return Object(u.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){var t=this;this.setState({loading:!0}),f("/api/posts/".concat(this.state.id)).then(function(t){return t.json()}).then(function(e){return t.setState({posts:e.data.posts,loading:!1,op:e.data.op,form:!0})}).catch(function(e){console.error(e),t.setState({error:!0})})}},{key:"addImage",value:function(t){var e=this;console.log(t);var a=new FormData;a.append("file",t.file),console.log(a);var n={method:"POST",headers:{Authentication:t.token},body:a};return f("/api/images/".concat(t.postId),n).then(function(t){return t.json()}).then(function(a){var n=e.state.posts.find(function(e){return e._id===t.postId}),s=e.state.posts.indexOf(n),r=JSON.parse(JSON.stringify(n));r.images.push(a.path);var o=Object(p.a)(e.state.posts.slice(0,s)).concat([r],Object(p.a)(e.state.posts.slice(s+1)));e.setState({posts:o})}).catch(function(t){console.error(t),setTimeout(function(){return e.setState({error:!0})})})}},{key:"addPost",value:function(t,e){var a=this,n={method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(t)};return this.setState({loading:!0}),f("/api/posts/".concat(this.state.id),n).then(function(t){return t.json()}).then(function(t){if(!1===t.success)throw Error("Request failed");a.setState({posts:Object(p.a)(a.state.posts).concat([t.post]),loading:!1},function(){return window.scrollTo(0,document.body.scrollHeight)}),e.file&&a.addImage(Object.assign(e,{postId:t.post._id,token:t.post.token}))}).catch(function(t){console.error(t),setTimeout(function(){return a.setState({error:!0})})})}},{key:"render",value:function(){var t=this,e=this.state.form&&s.a.createElement(y,{key:"form",id:this.state.id,submit:this.addPost.bind(this),image:this.addImage.bind(this)}),a=(this.state.loading||this.state.error)&&s.a.createElement(N,{error:this.state.error}),n=this.state.posts.map(function(e,a){return s.a.createElement("li",{key:e._id},s.a.createElement(b,{id:e._id,index:a,humanId:e.humanId,text:e.text,createdAt:e.createdAt,isOp:e._id===t.state.op,images:e.images}))});return s.a.createElement(s.a.Fragment,null,s.a.createElement("ul",{className:"unstyled posts floaty"},n),e,a)}}]),e}(n.Component),O=function(t){function e(){return Object(i.a)(this,e),Object(l.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(u.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){var t=this,e=v(new Date(this.props.createdAt)),a=v(new Date(this.props.threadUpdatedAt)),n=this.props.humanId||"nothing",r=E(n),o=this.props.images,i=s.a.createElement("li",{key:"op"},s.a.createElement("div",{className:"post threadOp slide-up"},s.a.createElement("div",{className:"postTop"},s.a.createElement("div",{className:"postTopLeft"},s.a.createElement("a",{href:"#",className:"postId ".concat(r?"dubs":"")},s.a.createElement("span",null,"0\xa0"+n)),this.props.linkTo&&s.a.createElement(g.a,{className:"postLink",to:"/thread/".concat(this.props.linkTo)},"~")),s.a.createElement("div",{className:"postTopRight"},s.a.createElement("span",{className:"postTimestamp"},e))),o&&0!==o.length&&s.a.createElement("img",{src:"/"+o[0]}),s.a.createElement("p",{className:"postText unstyled"},this.props.text),s.a.createElement("div",{className:"postBottom"},s.a.createElement("div",{className:"postBottomLeft"},s.a.createElement("span",{className:"postCount"},"Total\xa0posts:\xa0".concat(this.props.postCount||"1"))),s.a.createElement("div",{className:"postBottomRight"},s.a.createElement("span",{className:"lastPostTimestamp"},"Last\xa0update:\xa0".concat(a)))))),c=this.props.posts.map(function(e,a){return e._id!==t.props.id&&s.a.createElement("li",{key:e._id},s.a.createElement(b,{id:e._id,index:a+t.props.postCount-t.props.posts.length,humanId:e.humanId,text:e.text,createdAt:e.createdAt,isOp:!1,images:e.images}))});return s.a.createElement("ul",{className:"threadPreview unstyled floaty"},i,c)}}]),e}(n.Component),T=function(t){function e(t){var a;return Object(i.a)(this,e),(a=Object(l.a)(this,Object(m.a)(e).call(this,t))).state={threads:[],loading:!1,error:!1,form:!1},a}return Object(u.a)(e,t),Object(c.a)(e,[{key:"componentWillMount",value:function(){var t=this;this.setState({loading:!0}),f("/api/threads").then(function(t){return t.json()}).then(function(e){return t.setState({threads:e.data,loading:!1,form:!0})}).catch(function(e){console.error(e),t.setState({error:!0})})}},{key:"addThread",value:function(t){var e=this,a={method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"},body:JSON.stringify(t)};return this.setState({loading:!0}),f("/api/threads",a).then(function(t){return t.json()}).then(function(t){if(!1===t.success)throw Error("Request failed");e.setState({threads:[t.thread].concat(Object(p.a)(e.state.threads)),loading:!1},function(){return window.scrollTo(0,0)})}).catch(function(t){setTimeout(function(){return e.setState({error:!0})})})}},{key:"render",value:function(){var t=this.state.form&&s.a.createElement(y,{id:this.state.id,submit:this.addThread.bind(this),threadForm:!0}),e=(this.state.loading||this.state.error)&&s.a.createElement(N,{error:this.state.error}),a=this.state.threads.map(function(t,e){return s.a.createElement("li",{key:t._id},s.a.createElement(O,{id:t.op._id,humanId:t.op.humanId,text:t.op.text,createdAt:t.op.createdAt,linkTo:t._id,threadUpdatedAt:t.updatedAt,posts:t.posts,postCount:t.postCount,images:t.op.images[0]}))});return s.a.createElement(s.a.Fragment,null,s.a.createElement("ul",{className:"unstyled posts"},a),t,e)}}]),e}(n.Component),j=(a(23),function(t){function e(){return Object(i.a)(this,e),Object(l.a)(this,Object(m.a)(e).apply(this,arguments))}return Object(u.a)(e,t),Object(c.a)(e,[{key:"render",value:function(){return s.a.createElement(d.a,null,s.a.createElement("div",{className:"container"},s.a.createElement(h.a,{exact:!0,path:"/",render:function(t){return s.a.createElement(T,null)}}),s.a.createElement(h.a,{exact:!0,path:"/thread/:id",render:function(t){return s.a.createElement(k,{id:t.match.params.id})}})))}}]),e}(n.Component));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(s.a.createElement(j,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(t){t.unregister()})}},[[16,2,1]]]);
//# sourceMappingURL=main.137e53bf.chunk.js.map