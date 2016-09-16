'use strict';

import {sqredDiff, sqrtedSum} from '../utils';

export default function euclidean (x1,y1,x2,y2) {
    return sqrtedSum(sqredDiff(x1,x2), sqredDiff(y1,y2));
}