window.onload=function() {

    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    var list=document.getElementById("list");
    var buttons=document.getElementById("buttons").getElementsByTagName("span");
    var container=document.getElementById("container");
    var index=1;
    var timer;
    var animated=false;
    function shownButton(){
         for (var i = 0; i < buttons.length ; i++) {
            if( buttons[i].className == 'on'){
                buttons[i].className = '';
            }
        }
        buttons[index -1].className="on";
    }


    function animate(offset){ 
        var time = 300;
        var inteval = 10;
        var speed = offset/(time/inteval);
          animated=true;
         var newLeft=parseInt(list.style.left) +offset;
        function go(){
            if ( (speed > 0 && parseInt(list.style.left) < newLeft) || (speed < 0 && parseInt(list.style.left) > newLeft)) {
                list.style.left = parseInt(list.style.left) + speed + 'px';
                setTimeout(go, inteval);
            }
            else 
            {
                 animated=false;
                 if (newLeft >-600) {
             list.style.left=-3000+"px";
                 };
                if (newLeft <-3000) {
             list.style.left=-600+"px";
              };
            }
        }
        go();
    };





    prev.onclick=function(){

        if (!animated) {
        if (index==1) {
            index=5;
        }else {
           index -=1; 
        }
        
        shownButton();
             animate(600);
        }
    

    };



    next.onclick=function(){
         
    
        if (!animated) {
             if (index==5) {
            index=1;
        }else {
           index +=1; 
        }    
             shownButton();
             animate(-600);
        }
    };


    for (var i = 0; i < buttons.length; i++) {
        buttons[i].onclick=function(){
            if (this.className=="on") {
                return;
            }
            var myIndex=parseInt(this.getAttribute("index"));
            var offset=-600*(myIndex-index);
             if (!animated) {
             animate(offset);
            }
            index=myIndex;
             shownButton();
        
        }
    }


    
    function play(){
        timer=setInterval(function(){
            next.onclick();
        },2000);
    }


    function stop(){
        clearInterval(timer);
    }


   play();


container.onmouseover=stop;
container.onmouseout=play;
}