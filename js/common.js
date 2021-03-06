function ON_CHAT_RESIZE(){
    var $center = $(".chat-center");
    var $left = $(".room-left");
    var $right = $(".room-right");
    $(".chatcon-box").css({
        right:0,
        left:"auto"
    });
    $center.css({
       "margin-left":$left.width()+"px",
       "margin-right":$right.width()+"px"
    });
}

(function(){
    var CHAT = {};
    //obj {"title":{'class':'cls sd as','html':'哈哈'},"content":[{'class'}]}
    CHAT.toBottom = function(){
        var list = $(".chatcon-list").get(0);
        list.scrollTop=list.scrollHeight;
    }
    
    CHAT.playMp3 = function(url){
        $('<embed src="niftyplayer.swf?file=betty.mp3&as=0" name="niftyPlayer1" type="application/x-shockwave-flash" swLiveConnect="true" pluginspage="http://www.macromedia.com/go/getflashplayer"></embed>');
    }
    
    CHAT.insert = function(obj){
        var dom = $('<div class="chatcon-item"><div class="chatitem-box"><div class="chatitem-outer"><div class="chatitem-hd"><h5></h5></div><div class="chatitem-bd"></div></div></div></div>');
        if(!$.isPlainObject(obj)) return;
        dom.find('h5').addClass(obj.title.class).html(obj.title.html);
        var $bd = dom.find(".chatitem-bd");
        var contents = obj.content;
        for(var i = 0;i<contents.length;i++){
            var content = contents[i];
            $bd.append($("<p class='"+content.class+"'>"+content.html+"</p>"));
        }
        dom.appendTo($(".chatcon-list"));
        CHAT.toBottom();
    }
    window.CHAT = CHAT;
})();


(function($) {
    $.extend($.fn, {
        holderplace: function(options) {
            return this.each(function(){
                function onkeyup(e){
                    (function($this){
                        setTimeout(function(){
                           var length = $this.value.length;
                            if(length <=0){
                                $($this).siblings(".holder").show();
                            }else{
                                $($this).siblings(".holder").hide();
                            } 
                        },20);
                        
                    })(this);
                }
                
                $(this).delegate(".field-ui","click",function(){
                    $(this).find("input[type='text'],input[type='password']").focus();
                });
                $(this).delegate("input[type='text'],input[type='password']","keydown",onkeyup);
                
                $("input[type='text'],input[type='password']",this).each(function(){
                    onkeyup.call(this);
                });
                
            });
        }
    });
})(jQuery);

(function($) {
    $.extend($.fn, {
        widgetcheck: function(options) {
            return this.each(function(){
                function init(){
                    var ui = $(this).find('.field-check');
                    var $checkbox = $(this).find("input[type='checkbox']");
                    if($checkbox.attr("checked")){
                        ui.addClass("checked");
                        options.onchange && options.onchange.call(this,true);
                    }else{
                        ui.removeClass("checked");
                        options.onchange && options.onchange.call(this,false);
                    }
                }
                init.apply(this);
                $(this).bind("click",function(){
                      var ui = $(this).find('.field-check');
                      var $checkbox = $(this).find("input[type='checkbox']");
                      if ($checkbox.attr("checked")) {
                          $checkbox.attr("checked",false);
                          options.onchange && options.onchange.call(this,false);
                          ui.removeClass("checked");
                      } else {
                          $checkbox.attr("checked",true);
                          options.onchange && options.onchange.call(this,true);
                          ui.addClass("checked");
                      }
                      
                });
            });
        }
    });
})(jQuery);

(function($) {
    $.extend($.fn, {
        score: function(options) {
            options = $.extend({
                score:1,
                total:5
            },options);
            return this.each(function(){
                var score = options.score && $(this).attr("data-score");
                score = score>options.total?options.total:score;
                $(this).find(".score").width(score*18);
            });
        }
    });
})(jQuery);

(function($) {
    $.extend($.fn, {
        userlist: function(options) {
            options = $.extend({
                iconChange:function(type,id,active){},
                itemChange:function(id){}
            },options);
            return this.each(function(){
                $(this).children().each(function(){
                    var $right = $(".useritem-right",this);
                    var $center = $(".useritem-center",this);
                    $center.css({
                        "margin-right":($right.width()+1)+"px"
                    })
                });
                
                var $lastActive;
                
                $(this).delegate(".useritem-wrap","click",function(){
                    if($lastActive){
                        $lastActive.removeClass("active");
                    }
                    $(this).addClass("active");
                    options.itemChange($(this).data("id"));
                    $lastActive = $(this);
                });
                
                $(this).delegate(".useritem-right .icon-sprite","click",function(e){
                    var id = $(this).closest(".useritem-wrap").data("id");
                    if($(this).hasClass("active")){
                        $(this).removeClass("active");
                        
                        options.iconChange($(this).data("type"),id,false);
                    }else{
                        $(this).addClass("active");
                        options.iconChange($(this).data("type"),id,true);
                    }
                    e.stopPropagation();
                });
            });
        }
    });
})(jQuery);



(function($) {
    $.extend($.fn, {
        chatgroup: function(options) {
            options = $.extend({
                change:function(type){},
                init:function(type){}
            },options);
            return this.each(function(){
                function change(i){
                    $(this).children().each(function(j){
                        var type = $(this).data("type");
                        if(j == i){
                            $(this).replaceWith($('<font>' + this.innerHTML + '</font>').data("type",type));
                            options.change(type);
                        }else{
                            $(this).replaceWith($('<a href="#">' + this.innerHTML + '</a>').data("type",type));
                        }
                    });
                }
                
                (function(that){
                    $(that).delegate("a","click",function(){
                       change.call(that,$(this).index()); 
                    });
                    options.init($(that).find("font").data("type"));
                })(this);
                
            });
        }
    });
})(jQuery);

(function($) {
    $.extend($.fn, {
        chatCtrl: function(options) {
            options = $.extend({

            },options);
            function onclick(){
                var type = $(this).data("type");
                
                    if($(this).hasClass("active")){
                        $(this).removeClass("active");
                    }else{
                        $(this).addClass("active");
                    }
                
                
            }
            return this.each(function(){
                
                $(this).delegate(".icon-sprite","click",onclick);
                
            });
        }
    });
})(jQuery);

$(function(){
    ON_CHAT_RESIZE();
    $("[cascade-url]").each(function(){
       var url = $(this).attr("cascade-url");
       $(this).cascade({
            url:"/ajax/cascade.php"
       });
    });
    
    $(".score-box").score();
    
    $(".validate-form").validate();
    
    
    
    
    $(".roomuser-box").resizable({ handles: "e",resize:ON_CHAT_RESIZE });
    $(".chatcon-box").resizable({ handles: "w" ,resize:ON_CHAT_RESIZE});
    
    (function(){
        $("#room-open-btn").bind("click",function(){
            $(".roomuser-box").show();
            $(this).hide();
            ON_CHAT_RESIZE();
        });
        $("#room-hide-btn").bind("click",function(){
            $("#room-open-btn").show();
            $(".roomuser-box").hide();
            ON_CHAT_RESIZE();
        });
        $("#chatcon-open-btn").bind("click",function(){
            $(".chatcon-box").show();
            $(this).hide();
            ON_CHAT_RESIZE();
        });
        $("#chatcon-hide-btn").bind("click",function(){
            $("#chatcon-open-btn").show();
            $(".chatcon-box").hide();
            ON_CHAT_RESIZE();
        });
        
    })();
    
    
    
    $(".filed-check-wrap").widgetcheck({
        onchange:function(checked){
            if(checked){
                $(this).removeClass("disable");
                $("#signup-btn").removeClass("disable").attr("disabled",false);
            }else{
                $(this).addClass("disable");
                $("#signup-btn").addClass("disable").attr("disabled",true);
            }
        }
    });
    
    $(".valinum-wrap img").bind("click",function(){
       var out1 = /(.*)/.exec($(this).attr('src'));
       var out2 = /(.*)\?/.exec($(this).attr('src'));
       var out = out2||out1;
       if(out){
           $(this).attr("src",out[1]+"?v="+new Date().getTime());
       }
    });
    
    $(".fieldset-box").holderplace();
   // $(".field-check").widgetcheck();
    $("[effect-hover]").hover(function(){
       $(this).addClass("hover"); 
    },function(){
        $(this).removeClass("hover");
    });
    $("[position-last]").each(function(){
       $(this).children("*:last").addClass('last'); 
    });
    $("#g-search-text").autocomplete("/ajax/search.php",{
        width:function(){
            return $("#header .search-ui").innerWidth();
        },
        offset:function(){
            var $ui = $("#header .search-ui");
            var _offset = $ui.offset();
            var height = $ui.height();
            
            _offset.top = _offset.top + height;
            return _offset;
        },alwayInInput:true,onEnter:function(){
            $(this).closest("form").submit();
        },onSelectClick:function(){
            $(this).closest("form").submit();
        }
    });
    $('.slide-box').nivoSlider({
        effect : 'random', // Specify sets like: 'fold,fade,sliceDown'
        slices : 15, // For slice animations
        boxCols : 8, // For box animations
        boxRows : 4, // For box animations
        animSpeed : 500, // Slide transition speed
        pauseTime : 5000, // How long each slide will show
        startSlide : 0, // Set starting Slide (0 index)
        directionNav : true, // Next & Prev navigation
        directionNavHide : true, // Only show on hover
        controlNav : false, // 1,2,3... navigation
        keyboardNav : false, // Use left & right arrows
        pauseOnHover : true, // Stop animation while hovering
        manualAdvance : false, // Force manual transitions
        captionOpacity : 1, // Universal caption opacity
        prevText : '', // Prev directionNav text
        nextText : '', // Next directionNav text
        beforeChange : function() {
        }, // Triggers before a slide transition
        afterChange : function() {
        }, // Triggers after a slide transition
        slideshowEnd : function() {
        }, // Triggers after all slides have been shown
        lastSlide : function() {
        }, // Triggers when last slide is shown
        afterLoad : function() {
        } // Triggers when slider has loaded
    });
    (function(){
        var headerHeight = $("#header").outerHeight();
        var bodyHeight = $("#page-bd").outerHeight();
        var footerHeight = $("#footer").outerHeight()+$("#footer").outerHeight();
        function footerAlwaysBottom(){
            var screenHeight = $("html").height();
            
            if(footerHeight+bodyHeight+headerHeight<screenHeight){
                $("#footer").addClass("fix-bellow");
            }else{
                $("#footer").removeClass("fix-bellow");
            }
        }
        footerAlwaysBottom();
        $(window).bind("resize",footerAlwaysBottom);
    })();
    $("#g-user-upload").bind("change",function(){
       var value = this.value;
       
       if(!/(png|jpeg|jpg|gif)$/.test(value.toLowerCase())){
           $("#g-upload-tip").html(I18N.imageTypeError)
       }else{
           $("#g-upload-tip").html("");
       }
    });
});