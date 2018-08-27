(function (namespace) {
    'use strict';

    function GameObject(settings) {
        $.extend(this, settings);

        if (this.sprite !== null) {
            this.el = $(document.createElement('div'))
                        .addClass('game-object')
                        .css('height', this.size.h + 'em')
                        .css('width', this.size.w + 'em')
                        .css('top', this.loc.y + 'em')
                        .css('left', this.loc.x + 'em')
                        .css('background-position',
                            '-' + this.sprite.x + 'em -' + this.sprite.y + 'em')
                        .css('background-repeat', 'no-repeat');
            if (this.highlight) {
                this.el.addClass('highlight');
                this.subEl = $(document.createElement('div'))
                                .css('background-position',
                                    '-' + this.sprite.x + 'em -' + this.sprite.y + 'em')
                                .appendTo(this.el);

            }
        }
    }

    GameObject.prototype.addToRoom = function(room) {
        var fn = function(v) {
            for (var i = this.loc.x; i < (this.loc.x + this.size.w); i++) {
                for (var j = this.loc.y; j < (this.loc.y + this.size.h); j++) {
                    room.map[i][j] = v;
                }
            }
        }.bind(this);

        fn(this);
    };

    GameObject.prototype.load = function(el, notransition) {
        if (this.el) {
            this.el.removeClass('game-object-unload');
            if (notransition !== true) {
                this.el.addClass('game-object-load');
            }
            this.el.appendTo(el);
        }
    };

    GameObject.prototype.unload = function() {
        if (this.el) {
            this.el.removeClass('game-object-load');
            this.el.addClass('game-object-unload');
            namespace.bindEventOnce(this.el, namespace.animationEndBind, function() {
                this.el.remove();
            }.bind(this));
        }
    };

    GameObject.prototype.updatePos = function(pos) {
        if (this.el) {
            var newPos = new Point(this.loc.x - pos.x, this.loc.y - pos.y);
            this.el.css('top', newPos.y + 'em')
                   .css('left', newPos.x + 'em');
        }
    };

    /**
     * returns true if a collision occured, false otherwise
     */
    GameObject.prototype.doCollision = function() {
        if (this.collision === 'block') {
            return true;
        } else if (!this.collision || this.collision === 'none') {
            return false;
        } else {
            return this.collision.call(this);
        }
    };

    /**
     * triggers the interaction with the object
     */
     GameObject.prototype.doInteraction = function() {
        if (this.interaction) {
            this.interaction();
        }
     };

    window['GameObject'] = GameObject;
})(window.profile = window.profile || {});
