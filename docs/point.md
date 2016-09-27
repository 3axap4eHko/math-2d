# POINT

### Dynamic methods and properties
``` javascript
import Point from 'math-2d/Point';

// creation point with coordinates (x;y)
const point = new Point(x, y);
// point x coordinate
point.x
// point y coordinate
point.y
// point module, equals to euclidean distance
point.module
// object representation of the point
point.toObject()
// string representation of the point
point.toString()
```

### Static methods and properties
``` javascript
import Point from 'math-2d/Point';

// returns x coordinates difference
Point.getDX(pointA, pointB)
// returns y coordinates difference
Point.getDY(pointA, pointB)
// returns distance between two points
Point.getDistance(pointA, pointB)
// return true if two points are equal
Point.areEqual(pointA, pointB)
// return true if target point inside rectangle of two points
Point.isBetween(point, pointA, pointB)
// returns inverted point through point (0;0)
Point.invert(point)
// returns sum of two points
Point.add(pointA, pointB)
// returns result of multiplication point and scalar value
Point.scale(pointA, value)
// returns result of scalar multiplication points as vectors
Point.mult(pointA, pointB)
// returns new point as result of rotation around center
Point.rotate(point, center, angle)
// returns a middle point between defined two points
Point.getMiddle(pointA, pointB)
// returns order number of point in the fields with defined width
Point.getIdx(point, width)
```
