'use strict';

import Point from './Point';

const _Points = Symbol('points');

function getProgressPoints(points, progress) {
    return points.slice(1).reduce( (result, point, idx) => {
        result.push(Point.getProgress(points[idx], points[idx + 1], progress));
        return result;
    }, [])
}

function getProgressPoint(points, progress) {
    if (points.length === 1) {
        return points[0];
    }
    return getProgressPoint(getProgressPoints(points, progress), progress);
}

export default class Bezier {
    constructor(...points) {
        this[_Points] = points;
    }
    getProgress(progress) {
        return getProgressPoint(this[_Points], progress);
    }
}