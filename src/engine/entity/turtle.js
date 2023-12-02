import {cos, sin, substrateAngles} from "../functions/trigo.js";

export class Turtle {

    x;
    y;
    angle = 0;

    turnAway(angle, max) {
        const sub = substrateAngles(this.angle, angle);
        this.turnAtMost(sub, max);
    };

    turnTowards(angle, max) {
        const sub = substrateAngles(angle, this.angle);
        this.turnAtMost(sub, max);
    }

    turn(turn) {
        this.angle += turn;
        this.angle %= 360;
        while (this.angle < 0) {
            this.angle += 360;
        }
    }

    turnAtMost(turn, max=360) {
        if (Math.abs(turn) > max) {
            this.angle += turn > 0 ? max : -max;
        } else {
            this.angle += turn;
        }

        this.angle %= 360;
        while (this.angle < 0) {
            this.angle += 360;
        }
    }

    wiggle(max_angle) {
        this.angle += Math.random() * max_angle;
        this.angle -= Math.random() * max_angle;
    }

    getVision() {
        const VISION_DISTANCE = 1;

        return [{
            x: this.x + cos(this.angle) * VISION_DISTANCE,
            y: this.y + sin(this.angle) * VISION_DISTANCE,
            angle: 0,
        }, {
            x: this.x + cos(this.angle + 45) * VISION_DISTANCE,
            y: this.y + sin(this.angle + 45) * VISION_DISTANCE,
            angle: 45,
        }, {
            x: this.x + cos(this.angle - 45) * VISION_DISTANCE,
            y: this.y + sin(this.angle - 45) * VISION_DISTANCE,
            angle: -45
        }];

    }


}
