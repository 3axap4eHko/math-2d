LINE
====

### Dynamic methods and properties
``` javascript
import Line from 'math-2d/Line';

// creation line with common line equation (Ax+By+C=0) coefficients A,B and C
const line = new Line(A, B, C);
// getting A coefficient of common line equation
line.A
// getting B coefficient of common line equation
line.B
// getting C coefficient of common line equation
line.C
// getting direction vector length
line.length
// calculate point value through common line equation
line.calc(point)
// calculate x coordinate value through common line equation
line.calcX(y)
// calculate y coordinate value through common line equation
line.calcY(x)
// object representation of the line
line.toObject()
// string representation of the line
line.toString()

```

### Static methods and properties
``` javascript
// creation line by to defined points
Line.createFromPoints(pointA, pointB)
// returns the shortest distance between line and point
Line.getDistance(line, point)
// return angle between two lines
Line.getAngle(lineA, lineB)
// returns true if lines are same
Line.areSame(lineA, lineB)
// returns true if lines are parallel
Line.areParallel(lineA, lineB)
// returns new line that perpendicular to defined line and come through point
Line.getPerpendicular(line, point)
// returns true if two lines are perpendicular
Line.arePerpendicular(lineA, lineB)
// returns the point of line intersection
Line.getIntersect(lineA, lineB)
// returns true if point is align to line
Line.isAlign(line, point)
// returns the closest point on the line to the defined point
Line.getClosestPointTo(line, point)
// returns two points on the line at defined distance from the defined point
Line.getPointsAtDistance(line, point, distance)
```
