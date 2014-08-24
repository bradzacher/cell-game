(function (namespace) {
    "use strict";

    $(document).ready(function() {
        FilterImage();

        var game = new Game($('#character'), $('#camera'));
    });
})(window.profile = window.profile || {});
