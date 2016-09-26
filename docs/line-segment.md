LINE SEGMENT
============

Line segment is a line limited by two points

### Dynamic methods and properties
``` javascript
import LineSegment from 'math-2d/LineSegment';

// creation line segment
const lineSegment = new LineSegment(pointA, pointB);
// getting pointA
lineSegment.pointA
// getting pointB
lineSegment.pointB
// getting middle point of the line segment
lineSegment.middle
// getting direction vector
lineSegment.direction
// getting length of the line segment
lineSegment.length
// getting line representation of the line segment
lineSegment.line
// getting object representation of the line segment
lineSegment.toObject
// getting string representation of the line segment
lineSegment.toString
```

### Static methods and properties
``` javascript
import LineSegment from 'math-2d/LineSegment';

// returns x coordinate difference between line segment points A and B
LineSegment.getDX(lineSegment)
// returns y coordinate difference between line segment points A and B
LineSegment.getDY(lineSegment)
// returns true if line segments are equal
LineSegment.areEqual(lineSegmentA, lineSegmentB)
// returns true if point align to line segment (align to line and placed between line segment points)
LineSegment.isAlign(lineSegment, point)
// returns true if line segments are intersect
LineSegment.areIntersect(lineSegmentA, lineSegmentB)
// returns new line segment that perpendicular to defined line segment and come through point
LineSegment.getPerpendicular(lineSegment, point)
// returns points on the line segment at defined distance from the defined point
LineSegment.getPointsAtDistance(lineSegment, point, distance)
```