(function (namespace) {
    "use strict";

    $(document).ready(function() {
        var game = new Game($('#character'), $('#camera'));
    });
})(window.profile = window.profile || {});
