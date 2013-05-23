$.extend($.fn.tooltip.Constructor.prototype, {

    show : function(){
        var $tip, inside, pos, actualWidth, actualHeight, placement, tp;
           
          if (this.hasContent() && this.enabled) {
            $tip = this.tip();
            this.setContent();

            if (this.options.animation) {
              $tip.addClass('fade');
            }

            placement = (typeof this.options.placement === 'function') ?
              this.options.placement.call(this, $tip[0], this.$element[0]) :
              this.options.placement;

            inside = /in/.test(placement);

            $tip
              .detach()
              .css({ top: 0, left: 0, display: 'block' })
              .insertAfter(this.$element);

            pos = this.getPosition(inside);
            actualWidth = $tip[0].offsetWidth;
            actualHeight = $tip[0].offsetHeight;

            var arrow = $tip.find(".tooltip-arrow");
                
            switch (inside ? placement.split(' ')[1] : placement) {
              case 'bottom':
                if(pos.left + pos.width / 2 - actualWidth / 2 < 0){
                  tp = {top: pos.top + pos.height, left: 0};
                    arrow.css({marginLeft : pos.width/2 + actualWidth/2 *-1});
                }
                else if(pos.left + pos.width + actualWidth/2 > $(window).width()){
                  tp = {top: pos.top + pos.height, left: ($(window).width() - actualWidth)};
                     arrow.css({marginLeft : actualWidth/2 - pos.width/2 -2.5});
                }
                else{
                  tp = {top: pos.top + pos.height, left: pos.left + pos.width / 2 - actualWidth / 2};
                 }
              break;
              case 'top':
                  if(pos.left + pos.width / 2 - actualWidth / 2 < 0){
                    tp = {top: pos.top - actualHeight , left: 0};
                    arrow.css({marginLeft : pos.width/2 + actualWidth/2 *-1});
                 }
                 else if(pos.left + pos.width/2 + actualWidth/2 > $(window).width()){
                    tp = {top: pos.top - actualHeight , left: ($(window).width() - actualWidth)};
                     arrow.css({marginLeft : actualWidth/2 - pos.width/2 -2.5});
                  }
                  else{
                    tp = {top: pos.top - actualHeight , left: pos.left + pos.width / 2 - actualWidth / 2};
                  }
              break;
              case 'left':
                tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left - actualWidth};
                break;
              case 'right':
                tp = {top: pos.top + pos.height / 2 - actualHeight / 2, left: pos.left + pos.width};
                break;
            }
            $tip.offset(tp).addClass(placement).addClass('in');
          }
    }
});
