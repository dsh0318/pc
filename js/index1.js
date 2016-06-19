//头部下载APP
~function (){
    var app=document.getElementById("app");
    var detail=document.getElementById("detail");
    app.onmouseover=function(){
        detail.style.display="block";
    };
    app.onmouseout=function(){
        detail.style.display="none";
    };
}();


//导航更多点击下拉
~function(){
    var more=document.getElementById("more");
    var pull_down=document.getElementById("pull_down");
    var oA=more.getElementsByTagName("a")[0];
    var oEm=more.getElementsByTagName("em")[0];

    more.onmouseover=function(){
        pull_down.style.display="block";
        oA.style.borderBottom="none";
        oEm.className="select";
    };
    more.onmouseout=function(){
        pull_down.style.display="none";
        oEm.className="";
    };
}();




//宝贝 店铺
~function(){
    var search_t=document.getElementById("search_t");
    var spans=search_t.getElementsByTagName("span");
    var bao=document.getElementById("bao");
    var store=document.getElementById("store");
    var search=document.getElementById("search");//文本框
    var value=search.value;

    function change(n){
        for(var i=0;i<spans.length;i++){
            spans[i].className="";
        }
        spans[n].className="select";
    }
    for(var i=0;i<spans.length;i++){
        spans[i].index=i;
        spans[i].onclick=function(){
            if(this.id=="store"){
                search.value="";
            }else{
                search.value=value;
            }
            change(this.index);
        }
    }

    //文本框焦点验证
    ~function(){
        search.onfocus=function(){
            var reg=/^\s*$/;
            if(reg.test(this.value)){
                this.value=this.defaultValue;
            }else{
                this.value="";
            }
        };
        search.onblur=function(){
            var reg=/^\s*$/;
            if(reg.test(this.value)){
                this.value=this.defaultValue;
            }
        }
    }();

}();





//轮播图
~function(){
    var outer=document.getElementById("outer");
    var inner=document.getElementById("inner");
    var imgList=inner.getElementsByTagName("img");
    var tips=document.getElementById("tips");
    var oLis=tips.getElementsByTagName("li");
    var leftBtn=document.getElementById("leftBtn");
    var rightBtn=document.getElementById("rightBtn");
    var jsonData=null;


    //ajax请求数据
    var xhr=new XMLHttpRequest();
    xhr.open("get", "json.txt?_=" + Math.random(), false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && /^2\d{2}$/.test(xhr.status)) {
            jsonData = utils.formatJSON(xhr.responseText);
        }
    };
    xhr.send(null);

    //按照字符串拼接的方式绑定数据
    ~function(){
        //绑定的是轮播图区域的数据
        var str='';
        if(jsonData){
            for(var i=0;i<jsonData.length;i++){
                var curData=jsonData[i];
                str += '<div><img src="" trueImg="' + curData["img"] + '"/></div>';
            }
        }
        inner.innerHTML = str;

        //绑定焦点区域的数据
        str = '';
        if (jsonData) {
            for (i = 0; i<jsonData.length; i++) {
                i === 0 ? str += '<li class="select"></li>' : str += '<li></li>';
            }
        }
        tips.innerHTML = str;
    }();


    //实现图片延迟加载
    window.setTimeout(delay, 1000);
    function delay() {
        for (var i = 0;i < imgList.length; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    oImg = null;
                    animate(curImg, {opacity: 1}, 300);
                }
            }(i);
        }
    }

    //图片渐隐渐现的效果
    function fadeOut(){
        for(var i = 0;i<imgList.length;i++){
            ~function (i) {
                var curImg = imgList[i];
                var imgSiblings =utils.siblings(curImg);
                if(i == step){
                    curImg.style.zIndex = 1;
                    animate(curImg,{opacity:1},500);
                } else {
                    curImg.style.zIndex = 0;
                    animate(curImg,{opacity:0},500);
                }
            }(i)
        }
    }

    //自动轮播
    var step=0;
    function move(){
        if(step == imgList.length-1){
            step = -1;
        }
        step++;
        fadeOut();
        focusAlign();
    }
    var timer=window.setInterval(move,3000);

    //实现焦点对齐
    function focusAlign(){
        for(var i=0;i<oLis.length;i++){
            var curLi=oLis[i];
            curLi.className=i==step?"select":"";
        }
    }

    //实现焦点点击的效果
    ~function(){
        for(var i = 0;i<oLis.length;i++){
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                fadeOut();
                focusAlign();
            }
        }
    }();

    //鼠标悬停
    outer.onmouseover=function(){
        clearInterval(timer);
        leftBtn.style.display=rightBtn.style.display="block";
    };
    outer.onmouseout=function(){
        timer=window.setInterval(move,2000);
        leftBtn.style.display=rightBtn.style.display="none";
    };

    //实现按钮点击事件
    leftBtn.onclick = function(){
        if(step == 0){
            step = imgList.length;
        }
        step--;
        fadeOut();
        focusAlign();
    };
    rightBtn.onclick = move;
}();





//左侧导航
~function(){
    var navL=document.getElementById("navL");
    var last_navLi=utils.lastChild(navL);
    var first_navLi=utils.firstChild(navL);
    var navLi=utils.children(navL,"li");  //找到navL下的所有的li
    var icon=document.getElementsByTagName("samp");

    for(var i=0;i<navLi.length;i++){
        var cur=navLi[i];
        cur["index"]=utils.lastChild(cur); //找到li里面的最后一个子元素
        cur["indexs"]=utils.firstChild(cur);//找到li里面的第一个子元素
        cur.onmouseover=function(){
            this["index"].style.display="block";
            this.style.borderBottom="1px solid #e6e6e6";
            this.style.borderTop="1px solid #e6e6e6";
            this["indexs"].style.borderBottom="none";
            var pre=utils.prev(this);//上一个哥哥节点的第一个孩子节点
            if(pre){
                var a=utils.firstChild(pre);
                a.style.borderBottom="none";
            }
        };
        cur.onmouseout=function(){
            this["index"].style.display="none";
            this.style.borderBottom="none";
            this.style.borderTop="none";
            this["indexs"].style.borderBottom="1px dotted #e6e6e6";
            var pre=utils.prev(this);//上一个哥哥节点的第一个孩子节点
            if(pre){
                var a=utils.firstChild(pre);
                a.style.borderBottom="1px dotted #e6e6e6";
            }
        };
        last_navLi.onmouseover=function(){
            this["index"].style.display="block";
            this.style.borderTop="1px solid #e6e6e6";
            var pre=utils.prev(this);//上一个哥哥节点的第一个孩子节点
            if(pre){
                var a=utils.firstChild(pre);
                a.style.borderBottom="none";
            }
        };
        last_navLi.onmouseout=function(){
            this["index"].style.display="none";
            this.style.borderBottom="none";
            this.style.borderTop="none";
            var pre=utils.prev(this);//上一个哥哥节点的第一个孩子节点
            if(pre){
                var a=utils.firstChild(pre);
                a.style.borderBottom="1px dotted #e6e6e6";
            }
        };
        first_navLi.onmouseover=function(){
            this["index"].style.display="block";
            this.style.borderBottom="1px solid #e6e6e6";
            this.style.borderTop="none";
            this["indexs"].style.borderBottom="none";
            var pre=utils.prev(this);//上一个哥哥节点的第一个孩子节点
            if(pre){
                var a=utils.firstChild(pre);
                a.style.borderBottom="none";
            }
        };
        first_navLi.onmouseout=function(){
            this["index"].style.display="none";
            this.style.borderBottom="none";
            this.style.borderTop="none";
            this["indexs"].style.borderBottom="1px dotted #e6e6e6";
            var pre=utils.prev(this);//上一个哥哥节点的第一个孩子节点
            if(pre){
                var a=utils.firstChild(pre);
                a.style.borderBottom="1px dotted #e6e6e6";
            }
        }
    }
}();


//图片延迟加载
~function(){

}();


//底部友情链接
~function(){
    var blogroll = document.getElementById("blogroll");
    var link = document.getElementById("link");
    var oLis = link.getElementsByTagName("li");
    link.style.height = link.offsetHeight + blogroll.offsetHeight + "px";
    var steps = 0;

    function blogRoll() {
        if (steps == oLis.length-1) {
            steps=0;
            animate.setCss(link, "top", 0);
        }
        steps++;
        animate(link, {top: steps * -30}, 1000);
    }
    var timers=window.setInterval(blogRoll,2000);
}();





//Hi范儿下选项卡切换
~function(){
    var Hi_in=document.getElementById("Hi_in");
    var oLis=Hi_in.getElementsByTagName("li");
    var oDivs=Hi_in.getElementsByTagName("div");

    function changeTab(n){
        for(var i=0;i<oLis.length;i++){
            oLis[i].className="";
            oDivs[i].className="";
        }
        oLis[n].className="select";
        oDivs[n].className="select";
    }

    for(var i=0;i<oLis.length;i++){
        oLis[i].index=i;
        oLis[i].onclick=function(){
            changeTab(this.index);
        }
    }
}();




//好店推荐选项卡
~function(){
    var reco_in=document.getElementById("reco_in");
    var oLis=reco_in.getElementsByTagName("li");
    var oDivs=reco_in.getElementsByTagName("div");


    function changeTab(n){
        for(var i=0;i<oLis.length;i++){
            oLis[i].className="";
            oDivs[i].className="";
        }
        oLis[n].className="select";
        oDivs[n].className="select";
    }

    for(var i=0;i<oLis.length;i++){
        oLis[i].index=i;
        oLis[i].onclick=function(){
            changeTab(this.index);
        }
    }

    //点击出现蒙层
    var em=reco_in.getElementsByTagName("em");
    var oPs=reco_in.getElementsByTagName("p");
    var sTrongs=reco_in.getElementsByTagName("strong");

    function change(){
        for(var j=0;j<oPs.length;j++){
            oPs[j].index=j;
            oPs[j].onmouseover=function(){
                em[this.index].style.display="block";
            };
            oPs[j].onmouseout=function(){
                em[this.index].style.display="none";
            }
        }
        //点击取消关注
        for(var b=0;b<sTrongs.length;b++){
            var inner=sTrongs[b].innerHTML;//原始的innerHtml
            sTrongs[b].onmouseover=function(){
                this.innerHTML="取消关注";
                this.style.background="#fff";
                this.style.color="#333";
            };
            sTrongs[b].onmouseout=function(){
                this.innerHTML=inner;
                this.style.background="";
                this.style.color="#fff";
            }
        }
    }
    change();


    //点击取消关注弹出层
    var oStrong=reco_in.getElementsByTagName("strong");
    var mc=document.getElementById("mc");
    //var close=mc.getElementsByTagName("span")[0];
    for(var z=0;z<oStrong.length;z++){
        ~function(i){
            var curstrong=oStrong[z];
            curstrong.onclick=function(){
                mc.style.display="block";
            };
            close.onclick=function(){
                mc.style.display="none";
            }
        }(i)
    }
}();




//为你精选
~function(){
    var for_you=document.getElementById("for_you");
    var tit_b=document.getElementById("tit_b");
    var tit_bb=document.getElementById("tit_bb");
    var oUls=tit_b.getElementsByTagName("ul");//循环里面的所有的ul
    var change=document.getElementById("change");//点击换一换
    tit_bb.style.height=tit_bb.offsetHeight+"px";
    var step=0;

    function autoMove(){
        console.log(step);
        if(step==5){
            step=0;
            animate.setCss(tit_bb,"top",-855);
        }
        step++;
        animate.setCss(tit_bb,"top",step*-855);
    }
    change.onclick=autoMove;
}();



//回到顶部
~function(){
    var begin = document.getElementById('top');
    var bg=begin.innerHTML;
    var nav=document.getElementById("nav");
    begin.onmouseover=function(){
        begin.innerHTML="返回<br>顶部";
        begin.style.color="#f69";
        begin.style.lineHeight="18px";
    };
    begin.onmouseout=function(){
        begin.innerHTML=bg;
    };
    begin.onclick = function (){
        var duration = 500;
        var distance = utils.win('scrollTop');
        var interval = 10;
        var step = (distance/duration)*interval;
        var timer = window.setInterval(function (){
            if(utils.win('scrollTop') <= 0){
                window.clearInterval(timer);
                window.onscroll = show;
                return;
            }
            var srcollTop = utils.win('scrollTop');
            srcollTop -= step;
            utils.win('scrollTop',srcollTop);
        },interval);
        window.onscroll = null;
        this.style.display = 'none';
    };
    window.onscroll = show;

    function show(){
        var winScrollTop = utils.win('scrollTop');
        if(winScrollTop > 50){
            begin.style.display = 'block';
        }else{
            begin.style.display = 'none';
        }

        //首页导航
        if(winScrollTop>150){
            nav.style.position="fixed";
            nav.style.left=0;
            nav.style.top=0;
            nav.style.paddingTop="10px";
            nav.style.background="#fff";
            nav.style.zIndex=16;
        }else{
            nav.style.position="";
        }
    }

    //右侧滑动漂浮
    ~function(){
        var right_nav=document.getElementById("right_nav");
        var scrollbar=document.getElementById("scrollbar");

/*        right_nav.onmouseover=function(){
            animate(scrollbar,{right:0},500);
            animate(scrollbar_in,{right:0},500)
        };
        right_nav.onmouseout=function(){
            animate(scrollbar,{right:-36},500);
            animate(scrollbar_in,{right:-36},500)
        };*/
        var coupon=document.getElementById("coupon");
        var commodity=document.getElementById("commodity");
        var survey=document.getElementById("survey");
        var scrollbar_in=document.getElementById("scrollbar_in");
        var oSpans=scrollbar_in.getElementsByTagName("span");

        coupon.onmouseover=function(){
            this.style.backgroundColor="#f69";
            //oSpans[0].style.display="block";
            //scrollbar.style.right=0;
            //scrollbar_in.style.right=0;
        };
        coupon.onmouseout=function(){
            this.style.backgroundColor="#f6f6f6";
            //oSpans[0].style.display="none";
            //scrollbar_in.style.right="-36px";
           // scrollbar.style.right="-36px";
        };
        commodity.onmouseover=function(){
            this.style.backgroundColor="#f69";
            //oSpans[1].style.display="block";
            //scrollbar.style.right=0;
            //scrollbar_in.style.right=0;
        };
        commodity.onmouseout=function(){
            this.style.backgroundColor="#f6f6f6";
            //oSpans[1].style.display="none";
            //scrollbar_in.style.right="-36px";
            //scrollbar.style.right="-36px";
        };
        survey.onmouseover=function(){
            this.style.backgroundColor="#f69";
            //oSpans[2].style.display="block";
            //scrollbar.style.right=0;
            //scrollbar_in.style.right=0;
        };
        survey.onmouseout=function(){
            this.style.backgroundColor="#f6f6f6";
            //oSpans[2].style.display="none";
            //scrollbar_in.style.right="-36px";
            //scrollbar.style.right="-36px";
        }
    }();



}();







