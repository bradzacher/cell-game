(function (namespace) {
    "use strict";

    function Room(settings) {
        $.extend(this, settings);
        var i, j;

        // if we have a map
        if (this.map) {

            // it's easier to define the map transposed, so swap the rows and cols of the map
            var temp_map = [];
            for (i = 0; i < this.size.w; i++) {
                temp_map[i] = [];
            }
            for (i = 0; i < this.size.h; i++) {
                for (j = 0; j < this.size.w; j++) {
                    temp_map[j][i] = this.map[i][j];
                }
            }
            this.map = temp_map;
        } else {
            this.map = [];
            for (i = 0; i < this.size.w; i++) {
                this.map[i] = [];
                for (j = 0; j < this.size.h; j++) {
                    this.map[i][j] = 1;
                }
            }
        }

        this.objects.forEach(function (o) {
            o.addToRoom(this);
        }.bind(this));
    }

    /**
     * checks if the point is within the room's bounds
     */
    Room.prototype.pointWithinBounds = function(destination) {
        return  destination.x >= 0 && destination.y >= 0 &&
                destination.x < this.size.w && destination.y < this.size.h;
    };

    /**
     * checks if the point is blocked off
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
    Room.prototype.load = function(el, notransition) {
        el.css('background-position', this.sprite.x + 'em ' + this.sprite.y + 'em');
        el.css('background-color', this.backgroundColour);

        this.objects.forEach(function (o) {
            o.load(el, notransition);
        });

        return this;
    };

    /**
     * Unloads the room
     */
    Room.prototype.unload = function() {
        this.objects.forEach(function (o) {
            o.unload();
        });
    };

    /**
     * Calculates the new background offset and updates the game objects
     */
    Room.prototype.updateCamera = function(character, camera) {
        var pos = new Point(0,0);

        pos.x = (this.sprite.x + camera.x - character.location.x);
        pos.y = (this.sprite.y + camera.y - character.location.y);

        this.objects.forEach(function (o) {
            o.updatePos(new Point(character.location.x - camera.x,
                                  character.location.y - camera.y));
        }.bind(this));

        return pos;
    };

    window["Room"] = Room;

})(window.profile = window.profile || {});
