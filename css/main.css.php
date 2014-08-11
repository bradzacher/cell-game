/*
    Note that this is a php file so I can use php variables to make dev life easier
*/
<?php
    $vendorPrefixes = array(
        '-webkit-',
        '-moz-',
        '-ms-',
        '-o-',
        ''
    );

    $characterAnimTime = 0.2;
?>

html, body {
    width: 100%;
    height: 100%;
    margin: 0;
    font-size: 64px; /* each cell in the world is 64px*64px, this me use em to move things around*/
}

#body-container {
    height: 100%;
    width: 100%;

    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
}
#body-container > div {
    flex-grow: 0;
}

#preloader {
    display: none;
}

.notransition {
<?php
    foreach ($vendorPrefixes as $pre) {
?>
    <?=$pre?>transition: none !important;
<?php
    }
?>
}


#camera {
    height: 8em;
    width: 8em;
    background-image: url("../sprites/pallet_town.png");
    background-position: 0em em;
    background-repeat: no-repeat;
    background-size: 35em 30em;

<?php
    foreach ($vendorPrefixes as $pre) {
?>
    <?=$pre?>transition: background-position <?=$characterAnimTime?>s linear, background-color <?=$characterAnimTime?>s step-end;
<?php
    }
?>
}

#camera.room-transition {
<?php
    foreach ($vendorPrefixes as $pre) {
?>
    <?=$pre?>transition: background-position 0.3s step-end;
<?php
    }
?>
<?php
        foreach ($vendorPrefixes as $pre) {
?>
    <?=$pre?>animation: room-transition-frame 0.6s linear;
<?php
        }
?>
}

<?php
    foreach ($vendorPrefixes as $pre) {
?>
@<?=$pre?>keyframes room-transition-frame {
    0% {
        box-shadow: 0px 0px 0px 8em rgba(0, 0, 0, 0.0) inset;
    }
    50% {
        box-shadow: 0px 0px 0px 8em rgba(0, 0, 0, 1.0) inset;
    }
    100% {
        box-shadow: 0px 0px 0px 8em rgba(0, 0, 0, 0.0) inset;
    }
}
<?php
    }
?>

#character {
    height: 1em;
    width: 1em;
    background-image: url("../sprites/char.png");
    background-repeat: no-repeat;
    background-size: 10em 65px;
    position: relative;
    top: 4em;
    left: 4em;
}

/* character animation classes */
<?php
    $directions = array();
    $directions['left'] = [-2, -6];
    $directions['right'] = [-3, -7];
    $directions['up'] = [-1, -5];
    $directions['down'] = [0, -4];

    $directions['up2'] = [-1, -9];
    $directions['down2'] = [0, -8];

    foreach ($directions as $dir => $offset) {
?>
.stand-<?=$dir?> {
    background-position: <?=$offset[0]?>em 0em;
}
.walk-<?=$dir?> {
<?php
        foreach ($vendorPrefixes as $pre) {
?>
    <?=$pre?>animation: walk-<?=$dir?>-frame <?=$characterAnimTime?>s steps(1);
<?php
        }
?>
}

<?php
        foreach ($vendorPrefixes as $pre) {
?>
@<?=$pre?>keyframes walk-<?=$dir?>-frame {
    0% {
        background-position: <?=$offset[0]?>em 0em;
    }
    50% {
        background-position: <?=$offset[1]?>em 0em;
    }
    100% {
        background-position: <?=$offset[0]?>em 0em;
    }
}
<?php
        }
    }
?>

#overworld {

}
