(function (namespace) {
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
        }
    }

    GameObject.prototype.addToRoom = function(room) {
        if (this.collision === 'block') {
            for (var i = this.loc.x; i < (this.loc.x + this.size.w); i++) {
                for (var j = this.loc.y; j < (this.loc.y + this.size.h); j++) {
                    room.map[i][j] = 0;
                }
            }
        }
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

    window['GameObject'] = GameObject;
})(window.profile = window.profile || {});
