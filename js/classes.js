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


})(window.profile = window.profile || {});
