'use strict';

export default function diagonal (x1,y1,x2,y2) {
    return Math.min(Math.abs(x1-x2), Math.abs(y1-y2));
}