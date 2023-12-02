export function toRadians(degrees) {
    return degrees * Math.PI / 180;
}

export function toDegrees(radians) {
    return radians * 180 / Math.PI;
}

export function cos(degrees) {
    return Math.cos(toRadians(degrees));
}

export function sin(degrees) {
    return Math.sin(toRadians(degrees));
}

export function substrateAngles(h1, h2) {
    if (h1 < 0 || h1 >= 360) {
        h1 = (h1 % 360 + 360) % 360;
    }
    if (h2 < 0 || h2 >= 360) {
        h2 = (h2 % 360 + 360) % 360;
    }
    var diff = h1 - h2;
    if (diff > -180 && diff <= 180) {
        return diff;
    } else if (diff > 0) {
        return diff - 360;
    } else {
        return diff + 360;
    }
}

export function distanceBetween(p1, p2) {
    return Math.sqrt((p1.x - p2.x) * (p1.x - p2.x) + (p1.y - p2.y) * (p1.y - p2.y));
}

export function angleTo(from, to) {
    return toDegrees(Math.atan2(to.y - from.y, to.x - from.x));
}

export function dotEquals(p1, p2) {
    return p1.x === p2.x && p1.y === p2.y;
}
