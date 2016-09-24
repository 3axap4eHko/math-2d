'use strict';

import {compareTake} from 'yyf-core/iterate';
import manhattan from '../distance/manhattan';
import {pointToIdx} from '../utils';

const directions = [
    {x:  1, y:  0},
    {x:  0, y:  1},
    {x: -1, y:  0},
    {x:  0, y: -1},
    {x:  1, y:  1},
    {x: -1, y:  1},
    {x: -1, y: -1},
    {x:  1, y: -1}
];

export default function AStar(startPoint, finishPoint, width, height, weightCallback, heuristicCallback, maxIterationCount, onWhiteList) {
    heuristicCallback = heuristicCallback || function(x, y) {
            return manhattan(x, finishPoint.x, y, finishPoint.y)*distance;
        };
    maxIterationCount = maxIterationCount || width*height;
    var iteration = 1,
        distance = manhattan(startPoint.x, finishPoint.x, startPoint.y, finishPoint.y) + 1,
        currentPoint,
        visitedList = {},
        blackList = {},
        whiteList = {},
        getPoint = function (id, x, y, pid, pg, pm) {
            var w = weightCallback(x, y),
                h = heuristicCallback(x, y),
                g = w + pg,
                m = pm + 1;
            return {
                id: id || pointToIdx(x, y, width),
                x: x,
                y: y,
                p: pid,
                w: w,
                h: h,
                g: g,
                m: m,
                f: h + g
            };
        },
        whiteListReduce = function(point1, point2){
            return point1.f <= point2.f ? point1 : point2;
        },
        addToWhiteList = function (newPoint) {
            iteration++;
            visitedList[newPoint.id] = whiteList[newPoint.id] = newPoint;
            onWhiteList && onWhiteList(newPoint.x, newPoint.y);
        },
        directionToPoint = function(dir) {
            return getPoint(0, currentPoint.x + dir.x, currentPoint.y + dir.y, currentPoint.id, currentPoint.g, currentPoint.m);
        },
        excludeAlreadyHaven = function(newPoint) {
            return newPoint.x>=0 && newPoint.x<width && newPoint.y>=0 && newPoint.y<height && newPoint.w != Number.MAX_VALUE && !visitedList[newPoint.id];
        },
        result = [];

    startPoint = getPoint(pointToIdx(startPoint.x, startPoint.y, width), startPoint.x, startPoint.y,-1,0,0);
    finishPoint = getPoint(pointToIdx(finishPoint.x, finishPoint.y, width), finishPoint.x, finishPoint.y,-1,0,0);
    visitedList[startPoint.id] = whiteList[startPoint.id] = startPoint;

    while (iteration++<maxIterationCount && Object.keys(whiteList).length && (currentPoint = compareTake(whiteList, whiteListReduce).value).id != finishPoint.id) {
        blackList[currentPoint.id] = currentPoint;
        directions.map(directionToPoint).filter(excludeAlreadyHaven).forEach(addToWhiteList);
    }

    if (currentPoint.id == finishPoint.id) {
        do {
            result.unshift({
                x: currentPoint.x,
                y: currentPoint.y,
                dx: finishPoint.x - currentPoint.x,
                dy: finishPoint.y - currentPoint.y
            });
            finishPoint = currentPoint;
            currentPoint = blackList[currentPoint.p];

        }while(currentPoint.p!=-1);
    }
    return result;
}