(function(namespace) {
    "use strict";

    // enum for our game state
    var STATES = {
        STANDING: 0,
        WALKING: 1,
        TRANSITIONING: 2
    };

    var characterCameraPos = new Point(4, 4);

    function Game(characterEl, cameraEl) {
        this.character = new Character(characterEl);
        this.cameraEl = cameraEl;

        this.cameraEl.css('height', '9em');
        this.cameraEl.css('width', '10em');

        this.state = STATES.STANDING;

        this.loadRoom(namespace.rooms.myHouseBedroom, true); // load up the bedroom don't do transitions
        this.character.setPosition(new Point(3, 6)); // set his game location to just below the game console

        this.updateCamera(true);

        // bind the keyboard movement listener
        $(window).bind('keydown', function(e) {
            this.onKeyDown(e);
        }.bind(this));

        // vanilla javascript touch detection code taken from: http://stackoverflow.com/a/23230280/3736051
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var xDown = null;
        var yDown = null;

        var handleTouchStart = function(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        }.bind(this);

        var handleTouchMove = function(evt) {
            if ( ! xDown || ! yDown ) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                if ( xDiff > 0 ) {
                    this.onKeyDown({
                        keyCode: 37
                    });
                } else {
                    this.onKeyDown({
                        keyCode: 39
                    });
                }
            } else {
                if ( yDiff > 0 ) {
                    this.onKeyDown({
                        keyCode: 38
                    });
                } else {
                    this.onKeyDown({
                        keyCode: 40
                    });
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        }.bind(this);
    }

    /**
     * Called when a key is pressed
     */
    Game.prototype.onKeyDown = function(e) {
        var didMove = false;

        if (this.state === STATES.STANDING) {
            // first update the character position
            switch(e.keyCode)
            {
                //left
                case 'a'.charCodeAt(0):
                case 'A'.charCodeAt(0):
                case 37:
                    didMove = this.character.moveX(-1, this.currentRoom);
                break;

                //right
                case 'd'.charCodeAt(0):
                case 'D'.charCodeAt(0):
                case 39:
                    didMove = this.character.moveX(+1, this.currentRoom);
                break;

                //up
                case 'w'.charCodeAt(0):
                case 'W'.charCodeAt(0):
                case 38:
                    didMove = this.character.moveY(-1, this.currentRoom);
                break;

                //down
                case 's'.charCodeAt(0):
                case 'S'.charCodeAt(0):
                case 40:
                    didMove = this.character.moveY(+1, this.currentRoom);
                break;
            }

            // update the camera
            this.updateCamera();

            // if we actually moved
            if (didMove) {
                this.state = STATES.WALKING;

                // check to see if we are on a transition point, do the transition if we are
                var transitionPt = this.currentRoom.checkTransition(this.character);

                // just remove the animation
                this.character.bindOnceAnimationEnd(function () {
                    this.state = STATES.STANDING;

                    if (transitionPt !== false) {
                        this.transition(transitionPt);
                    }
                }.bind(this));
            } else {
                // just remove the animation
                this.character.bindOnceAnimationEnd(function () {
                    this.state = STATES.STANDING;
                }.bind(this));
            }
        }
    };

    Game.prototype.disableCameraAnimation = function() {
        this.cameraEl.addClass('notransition');
    };

    Game.prototype.enableCameraAnimation = function() {
        this.cameraEl[0].offsetHeight; // causes the dom to update so that it performs the changes without the transition
        this.cameraEl.removeClass('notransition');
    };

    /**
     * Triggers the camera to be updated
     * @param notransition - if set to true, the transition will be disabled for this update
     */
    Game.prototype.updateCamera = function(notransition) {
        if (notransition) {
            this.disableCameraAnimation();
        }

        var pos = this.currentRoom.updateCamera(this.character, characterCameraPos);
        this.cameraEl.css('background-position',
            pos.x + 'em' + ' ' +
            pos.y + 'em'
        );

        if (notransition) {
            this.enableCameraAnimation();
        }
    };

    /**
     * Causes the game to load the specified room
     */
    Game.prototype.loadRoom = function(room, notransition) {
        if (this.currentRoom) {
            this.currentRoom.unload();
        }
        this.currentRoom = room.load(this.cameraEl, notransition);
    };

    /**
     * Triggers the game to transition using the specified connection
     */
    Game.prototype.transition = function(transitionPt) {
        this.state = STATES.TRANSITIONING;


        this.cameraEl.addClass('room-transition');

        this.loadRoom(namespace.rooms[transitionPt.connection]);
        this.character.setPosition(transitionPt.to);

        this.updateCamera();

        namespace.bindEventOnce(this.cameraEl, namespace.animationEndBind, function() {
            this.cameraEl.removeClass('room-transition');

            this.state = STATES.STANDING;
        }.bind(this));
    };

    window['Game'] = Game;
})(window.profile = window.profile || {});
