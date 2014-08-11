(function(namespace) {
    "use strict";

    /**
     * Character class
     */
    function Character(elem) {
        this.el = elem;

        this.el.addClass('stand-down');

        this.location = new Point(0, 0);
    }

    /**
     * Sets the world-coords of the character
     */
    Character.prototype.setPosition = function(destination, notransition) {
        this.location = destination;
    };

    /**
     * Sets the camera-coords of the character
     * @param destination - the destination to position the character at on camera
     * @param notransition - if set to true, will disable CSS transition so character moves instantly
     */
    Character.prototype.setCameraPosition = function (destination, notransition) {
        // transition disable code from: http://stackoverflow.com/questions/11131875/what-is-the-cleanest-way-to-disable-css-transition-effects-temporarily
        if (notransition) {
            this.el.addClass('notransition');
        }
        this.el.css('left', destination.x + 'em');
        this.el.css('top', destination.y + 'em');
        if (notransition) {
            this.el[0].offsetHeight; // causes the dom to update so that it performs the changes without the transition
            this.el.removeClass('notransition');
        }
    };


    /**
     * Causes the character to try and walk
     * @param self - a reference to the character object
     * @param room - the room it's trying to walk in
     * @param side - the side it's moving on (top or left)
     * @param direction - the amount it's moving on the specified side (+1 or -1)
     * @param anim - the direction to animate (up, down, left, right)
     * @return true if the character actually moved, false otherwise
     */
    var walkOne = function (self, room, side, direction, anim) {
        var didWalk = false;

        var destination = self.location.clone();
        destination.add(side, direction);

        // only move div if it's a valid destination
        if (room.pointWithinBounds(destination) && room.pointNotBlocked(destination)) {
            self.setPosition(destination);
            didWalk = true;
        }

        var movedOnce = false;
        if ((anim === 'up' || anim === 'down') && self.el.hasClass('walk-' + anim)) {
            movedOnce = true;
        }

        // still play animation if invalid destination
        self.el.removeClass(function (index, css) {
            return (css.match (/(^|\s)stand-\S+/g) || []).join(' ');
        });
        self.el.removeClass(function (index, css) {
            return (css.match (/(^|\s)walk-\S+/g) || []).join(' ');
        });
        self.el[0].offsetHeight;

        // animate
        self.el.addClass('stand-' + anim);
        if (movedOnce) {
            self.el.addClass('walk-' + anim + '2')
        } else {
            self.el.addClass('walk-' + anim);
        }

        return didWalk;
    };

    /**
     * move the character along the x axis
     */
    Character.prototype.moveX = function(dir, room) {
        var anim = 'left';
        if (dir > 0) {
            anim = 'right';
        }
        return walkOne(this, room, 'left', dir, anim);
    };

    /**
     * move the character along the y axis
     */
    Character.prototype.moveY = function(dir, room) {
        var anim = 'up';
        if (dir > 0) {
            anim = 'down';
        }
        return walkOne(this, room, 'top', dir, anim);
    };

    /**
     * Binds a function to be run ONCE after an animation finishes
     */
    Character.prototype.bindOnceAnimationEnd = function(fn) {
        namespace.bindEventOnce(this.el, namespace.animationEndBind, fn);
    };

    window["Character"] = Character;

})(window.profile = window.profile || {});
