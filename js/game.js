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
        this.states = [];

        this.character = new Character(characterEl);
        this.cameraEl = cameraEl;

        this.cameraEl.css('height', '9em');
        this.cameraEl.css('width', '10em');

        this.state = STATES.STANDING;

        this.loadRoom(namespace.rooms.myHouseBedroom, true); // load up the bedroom don't do transitions
        this.character.setPosition(new Point(3, 6)); // set his game location to just below the game console

        this.updateCamera(true);

        // register a listener for each event
        var events = ['click', 'dblclick',
                        'mousedown', 'mouseenter', 'mouseleave', 'mousemove', 'mouseover', 'mouseout', 'mouseup',
                        'keydown', 'keypress', 'keyup',
                        'touchstart', 'touchend', 'touchcancel', 'touchleave', 'touchmove'];

        var fn = this.handleInput.bind(this);
        events.forEach(function (e) {
            document.addEventListener(e, fn, false);
        });

        this.pushState('standing');
    }

    /**
     * Called when input is detected
     */
    Game.prototype.handleInput = function(e) {
        var currentState = namespace.states[this.states[this.states.length-1]];

        if (currentState[e.type]) {
            currentState[e.type].call(this, e);
        }
    };

    /**
     * Add a new game state to the stack
     */
    Game.prototype.pushState = function(state) {
        this.states.push(state);
    };

    /**
     * Remove the current game state from the stack
     */
    Game.prototype.popState = function() {
        return this.states.pop();
    };

    /**
     * Disable the css animation on the camera so it can be instantly moved
     */
    Game.prototype.disableCameraAnimation = function() {
        this.cameraEl.addClass('notransition');
    };

    /**
     * Re-enable the css animation on the camera so it moves smoothly again
     */
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
        this.pushState('transitioning');

        this.cameraEl.addClass('room-transition');

        this.loadRoom(namespace.rooms[transitionPt.connection]);
        this.character.setPosition(transitionPt.to);

        this.updateCamera();

        namespace.bindEventOnce(this.cameraEl, namespace.animationEndBind, function() {
            this.cameraEl.removeClass('room-transition');

            this.popState();

            // dispatch a fake "down" event
            //var e = new Event('keydown');
            //document.dispatchEvent(e);
        }.bind(this));
    };

    /**
     * Triggers an interaction with the object in front of the character
     */
    Game.prototype.interact = function() {
        var point = this.character.location.clone();
        switch (this.character.facing) {
            case Character.directions.up:
                point.y = point.y - 1;
            break;
            case Character.directions.down:
                point.y = point.y + 1;
            break;
            case Character.directions.left:
                point.x = point.x - 1;
            break;
            case Character.directions.right:
                point.x = point.x + 1;
            break;
        }

        this.currentRoom.map[point.x][point.y].doInteraction();
    };

    window['Game'] = Game;
})(window.profile = window.profile || {});
