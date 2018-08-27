(function (namespace) {
    "use strict";

    var block_input = {};



    namespace['states'] = {
        transitioning: block_input,
        walking: block_input,
        standing: (function () {
            var xDown = null, yDown = null;

            var keydownHandler = function (e) {
                var didMove = false;

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

                    //use
                    case 'e'.charCodeAt(0):
                    case 'E'.charCodeAt(0):
                        this.interact();
                    break;
                }

                // update the camera
                this.updateCamera();

                // if we actually moved
                if (didMove) {
                    this.pushState('walking');

                    // check to see if we are on a transition point, do the transition if we are
                    var transitionPt = this.currentRoom.checkTransition(this.character);

                    // just remove the animation
                    this.character.bindOnceAnimationEnd(function () {
                        this.popState();

                        if (transitionPt !== false) {
                            this.transition(transitionPt);
                        }
                    }.bind(this));
                }
            };

            return {
                keydown: keydownHandler,
                touchstart: function (e) {
                    xDown = e.touches[0].clientX;
                    yDown = e.touches[0].clientY;

                    // stop overscrolling
                    e.preventDefault();
                },
                touchmove: function (e) {
                    if ( ! xDown || ! yDown ) {
                        return;
                    }

                    var xUp = e.touches[0].clientX;
                    var yUp = e.touches[0].clientY;

                    var xDiff = xDown - xUp;
                    var yDiff = yDown - yUp;

                    var fakeKeyCode = null;

                    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {// most significant
                        if ( xDiff > 0 ) {
                            fakeKeyCode = 37;
                        } else {
                            fakeKeyCode = 39;
                        }
                    } else {
                        if ( yDiff > 0 ) {
                            fakeKeyCode = 38;
                        } else {
                            fakeKeyCode = 40;
                        }
                    }

                    keydownHandler.call(this, {
                        keyCode: fakeKeyCode
                    });

                    // reset values
                    xDown = null;
                    yDown = null;

                    // stop overscrolling
                    e.preventDefault();
                }
            };
        })()
    };
})(window.profile = window.profile || {});
