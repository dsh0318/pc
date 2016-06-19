animate.setCss=function(ele,attr,val){
    if(attr=="opacity"){
        ele.style.opacity=val;
        ele.style.filter="alpha(opacity="+val*100+")";
    }else{
        ele.style[attr]=val+"px";
    }
};



animate.getCss=function(ele,attr){
    if(window.getComputedStyle){
        return parseFloat(window.getComputedStyle(ele,null)[attr]);
    }else{
        if(attr=="opacity"){
            var val=ele.currentStyle.filter;
            var reg=/alpha\(opacity=(\d+(?:\.\d+)?)\)/;
            if(reg.test(val)){
                return RegExp.$1/100;
            }else{
                return 1;
            }
        }else{
            return parseFloat(ele.currentStyle[attr]);
        }
    }
};


function linear(t,b,c,d){
    return b+t/d*c;
}


function animate(ele,target,duraction,effect,callback){
    window.clearInterval(ele.timer);
    var begin={};
    var change={};
    for(var key in target){
        if(target.hasOwnProperty(key)){
            begin[key]=animate.getCss(ele,key);
            change[key]=target[key]-begin[key];
        }
    }

    var time=0;
    var interval=10;
    ele.timer=window.setInterval(function(){
        time+=interval;
        if(time>=duraction){
            for(var key in target){
                if(target.hasOwnProperty(key)){
                    animate.setCss(ele,key,target[key]);
                    window.clearInterval(ele.timer);
                    if(typeof callback=="function"){
                        callback.call(ele);
                    }
                    return;
                }
            }
        }
        for(var key in target){
            if(target.hasOwnProperty(key)){
                var val=linear(time,begin[key],change[key],duraction);
                animate.setCss(ele,key,val);
            }
        }
    },interval)
}
