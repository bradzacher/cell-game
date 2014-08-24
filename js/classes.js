(function(namespace) {
    "use strict";

    namespace.transitionEndBind = "transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd";
    namespace.animationEndBind = "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd";
    namespace.bindEventOnce = function (target, event, fn) {
        var handler = function(e) {
            if (e.target == target[0]) { // chrome was sending animation end events for incorrect targets
                e.stopPropagation();
                e.preventDefault();

                fn();

                target.unbind(event, handler);
            }
        };

        target.bind(event, handler);
    }

    /**
     * Size class
     */
    function Size(w, h) {
        this.w = w;
        this.h = h;
    }
    window['Size'] = Size;

    /**
     * Point class
     */
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    Point.prototype.clone = function() {
        return new Point(this.x, this.y);
    };
    Point.prototype.add = function(side, direction) {
        if (side === 'left') {
            this.x += direction;
        } else if (side === 'top') {
            this.y += direction;
        }
    };
    Point.prototype.get = function(side) {
        if (side === 'left') {
            return this.x;
        } else if (side === 'top') {
            return this.y;
        }
    };
    Point.prototype.equals = function(p) {
        return this.x == p.x && this.y == p.y;
    }
    window['Point'] = Point;

    /**
     * Transition point
     */
    function TransitionPoint(fromPoint, connection, toPoint) {
        this.from = fromPoint;
        this.connection = connection;
        this.to = toPoint;
    }
    window['TransitionPoint'] = TransitionPoint;

    /**
     * Recolours an image completely
     */
    function FilterImage() {
        var img = new Image();

        img.onload = function() {
            // draw the image on a new canvas
            var canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;
            var context = canvas.getContext('2d');
            context.drawImage(img, 0, 0, img.width, img.height);

            // recolour all the pixels
            var pixels = context.getImageData(0, 0, img.width, img.height);
            var d = pixels.data;
            for (var i = 0; i < d.length; i+=4) {
                  // recolour to red
                  d[i]   = 255;//d[i];
                  d[i+1] = 0;
                  d[i+2] = 0;
                  d[i+3] = (d[i+3] === 0) ? 0 : d[i+3];
            }

            context.putImageData(pixels, 0, 0, 0, 0, img.height, img.width);

            var recolouredSpritesheet = canvas.toDataURL('image/png');

            var style = document.createElement('style');
            style.type = 'text/css';
            style.innerHTML = '.game-object.highlight { background-image: url(' + recolouredSpritesheet + '); }';
            document.getElementsByTagName('head')[0].appendChild(style);
        };

        img.src = 'http://zacher.com.au/home/sprites/objects.png';
    }
    window['FilterImage'] = FilterImage;
})(window.profile = window.profile || {});
