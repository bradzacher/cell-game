(function (namespace) {
    // the definition of the room layouts
    namespace["rooms"] = {
        myHouseBedroom: new Room({
            size: new Size(8, 8),
            sprite: new Point(0, -22),
            backgroundColour: 'black',
            objects: [
                new GameObject({
                    name: 'Computer',
                    loc: new Point(0, 0),
                    size: new Size(1, 2),
                    sprite: new Point(0, 3),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'Desk',
                    loc: new Point(1, 0),
                    size: new Size(2, 2),
                    sprite: new Point(0, 5),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'TV',
                    loc: new Point(3, 4),
                    size: new Size(1, 1),
                    sprite: new Point(0, 0),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'SNES',
                    loc: new Point(3, 5),
                    size: new Size(1, 1),
                    sprite: new Point(1, 4),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'Bed',
                    loc: new Point(0, 6),
                    size: new Size(1, 2),
                    sprite: new Point(0, 1),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'Tree',
                    loc: new Point(6, 6),
                    size: new Size(1, 2),
                    sprite: new Point(1, 0),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'Wall',
                    loc: new Point(0, 0),
                    size: new Size(8, 1),
                    sprite: null,
                    collision: 'block'
                })
            ],
            transitionPoints: [
                new TransitionPoint(new Point(7, 1), "myHouseGndFloor", new Point(7, 1))
            ]
        }),
        myHouseGndFloor: new Room({
            size: new Size(8, 9),
            sprite: new Point(-26, -16),
            backgroundColour: 'black',
            objects: [
                new GameObject({
                    name: 'BookCase1',
                    loc: new Point(0, 0),
                    size: new Size(1, 2),
                    sprite: new Point(2, 0),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'BookCase2',
                    loc: new Point(1, 0),
                    size: new Size(1, 2),
                    sprite: new Point(2, 0),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'TV',
                    loc: new Point(3, 1),
                    size: new Size(1, 1),
                    sprite: new Point(0, 0),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'Table',
                    loc: new Point(3, 4),
                    size: new Size(2, 2),
                    sprite: new Point(2, 5),
                    collision: 'block'
                }),
                new GameObject({
                    name: 'Stool1',
                    loc: new Point(2, 4),
                    size: new Size(1, 1),
                    sprite: new Point(1, 2),
                    collision: 'none'
                }),
                new GameObject({
                    name: 'Stool2',
                    loc: new Point(2, 5),
                    size: new Size(1, 1),
                    sprite: new Point(1, 2),
                    collision: 'none'
                }),
                new GameObject({
                    name: 'Stool3',
                    loc: new Point(5, 4),
                    size: new Size(1, 1),
                    sprite: new Point(1, 2),
                    collision: 'none'
                }),
                new GameObject({
                    name: 'Stool4',
                    loc: new Point(5, 5),
                    size: new Size(1, 1),
                    sprite: new Point(1, 2),
                    collision: 'none'
                }),
                new GameObject({
                    name: 'WallTop',
                    loc: new Point(0, 0),
                    size: new Size(8, 1),
                    sprite: null,
                    collision: 'block'
                }),
                new GameObject({
                    name: 'WallBottomLeft',
                    loc: new Point(0, 8),
                    size: new Size(2, 1),
                    sprite: null,
                    collision: 'block'
                }),
                new GameObject({
                    name: 'WallBottomRight',
                    loc: new Point(4, 8),
                    size: new Size(2, 4),
                    sprite: null,
                    collision: 'block'
                })
            ],
            transitionPoints: [
                new TransitionPoint(new Point(7, 1), "myHouseBedroom", new Point(7, 1)),
                new TransitionPoint(new Point(2, 8), "outside", new Point(5, 5)),
                new TransitionPoint(new Point(3, 8), "outside", new Point(5, 5))
            ]
        }),
        outside: new Room({
            size: new Size(20, 18),
            sprite: new Point(0, 0),
            backgroundColour: 'white',
            objects: [],
            map: [
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
                [0, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            ],
            transitionPoints: [
                new TransitionPoint(new Point(5, 5), "myHouseGndFloor", new Point(3, 7))
            ]
        })
    };
})(window.profile = window.profile || {});
