(function (namespace) {
    "use strict";

    function Room(settings) {
        $.extend(this, settings);

        // it's easier to define the map transposed, so swap the rows and cols of the map
        var temp_map = [];
        for (var i = 0; i < this.size.w; i++) {
            temp_map[i] = [];
        }
        for (var i = 0; i < this.size.h; i++) {
            for (var j = 0; j < this.size.w; j++) {
                temp_map[j][i] = this.map[i][j];
            }
        }
        this.map = temp_map;
    }

    /**
     *
     */
    Room.prototype.pointWithinBounds = function(destination) {
        return  destination.x >= 0 && destination.y >= 0 &&
                destination.x < this.size.w && destination.y < this.size.h;
    };

    /**
     *
     */
    Room.prototype.pointNotBlocked = function(destination) {
        return this.map[destination.x][destination.y] === 1;
    };

    /**
     * Checks if the character is on a transition point
     * @return false if not, the TransitionPoint if it is
     */
    Room.prototype.checkTransition = function (character) {
        for (var name in this.transitionPoints) {
            if (this.transitionPoints.hasOwnProperty(name)) {
                var p = this.transitionPoints[name];
                if (character.location.equals(p.from)) {
                    return p;
                }
            }
        }

        return false;
    };

    /**
     * Loads this room in
     */
    Room.prototype.load = function(el) {
        el.css('background-position', this.background.x + 'em ' + this.background.y + 'em');
        el.css('background-color', this.backgroundColour);

        return this;
    };

    window["Room"] = Room;

})(window.profile = window.profile || {});
