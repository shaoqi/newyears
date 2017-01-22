;!function(){
var cache = layer.cache||{}, skin = function(type){
        return (cache.skin ? (' ' + cache.skin + ' ' + cache.skin + '-'+type) : '');
      };
      layer.preview = function(options){
        var dict = options.dict || {};
        options = options || {};
        if(!options.photos) return;
        var photos = options.photos, data = photos.data || [];
        var start = photos.start || 0;
        dict.imgIndex = (start|0) + 1;

        options.img = options.img || 'img';

        if (data.length === 0){
          console.log('没有图片显示');
          return;
        }
        //上一张
        dict.imgprev = function(){
          dict.imgIndex--;
          if(dict.imgIndex < 1){
              if(!options.loop){
                  options.last();
                  return;
              }else{
                  dict.imgIndex = data.length;
              }
          }
          dict.tabimg();
        };
        //下一张
        dict.imgnext = function(){
          dict.imgIndex++;
          if(dict.imgIndex > data.length){
            if(!options.loop){
                options.last();
                return;
            }else{
                dict.imgIndex = 1;
            }
          }else{
            options.last();
          }
          dict.tabimg();
        };
        //切换
        dict.tabimg = function(){
          if(data.length <= 1) return;
          photos.start = dict.imgIndex - 1;
          layer.close(dict.index);
          options.dict = dict;
          layer.preview(options);
        }
        //一些动作
        dict.event = function(layero, index){
          dict.bigimg.hover(function(){
            dict.imgsee.show();
          }, function(){
            dict.imgsee.hide();
          });
          dict.bigimg.find('.layui-layer-imgprev').on('click', function(event){
            event.preventDefault();
            dict.imgprev();
          });
          dict.bigimg.find('.layui-layer-imgnext').on('click', function(event){
            event.preventDefault();
            dict.imgnext();
          });
          $('.layui-layer-shade').click(function(){
            options.previewClose();
          });
        };
        //图片预加载
        function loadImage(url, callback, error) {
          var img = new Image();
          img.src = url;
          if(img.complete){
            return callback(img);
          }
          img.onload = function(){
            img.onload = null;
            callback(img);
          };
          img.onerror = function(e){
            img.onerror = null;
            error(e);
          };
        };
        loadImage(data[start].src, function(img){
          var area = null;
          if(options.customArea){
            area = options.customArea(img);
          }else{
            area = (function(img){
              var width = img.width,height = img.height;
              var limitArea = options.limitArea;
              if(limitArea && (width > limitArea[0] || height > limitArea[1])){
                var limitProp = limitArea[0] / limitArea[1];
                var prop = width / height;
                if(limitProp < prop){
                  width = limitArea[0];
                  height = width / prop;
                }else{
                  height = limitArea[1];
                  width = height * prop;
                }
              }
              return [width+'px', height+'px'];
            })(img);
          }
          dict.index = layer.open($.extend({
            type: 1,
            area: area,
            title: false,
            shade: 0.3,
            shadeClose: true,
            closeBtn: true,
            move: '.layui-layer-phimg img',
            moveType: 1,
            scrollbar: false,
            moveOut: true,
            shift: Math.random()*5|0,
            skin: 'layui-layer-photos' + skin('photos'),
            content: '<div class="layui-layer-phimg">'
              +'<img src="'+ data[start].src +'" alt="'+ (data[start].alt||'') +'" layer-pid="'+ data[start].pid +'">'
              +'<div class="layui-layer-imgsee">'
                +(data.length > 1 ? '<span class="layui-layer-imguide"><a href="javascript:;" class="layui-layer-iconext layui-layer-imgprev"></a><a href="javascript:;" class="layui-layer-iconext layui-layer-imgnext"></a></span>' : '')
                +'<div class="layui-layer-imgbar" style="display:none;"><span class="layui-layer-imgtit"><a href="javascript:;">'+ (data[start].alt||'') +'</a><em>'+ dict.imgIndex +'/'+ data.length +'</em></span></div>'
              +'</div>'
            +'</div>',
            success: function(layero, index){
              dict.bigimg = layero.find('.layui-layer-phimg');
              dict.imgsee = layero.find('.layui-layer-imguide');
              dict.event(layero,index);
              options.tab && options.tab(data[start], layero,index);
            }, end: function(){
              dict.end = true;
            }
          }, options));
        }, function(){
          if(data.length > 1){
            dict.imgnext();
          }else{
            options.last();
          }
        });
        return dict;
      };
}();
