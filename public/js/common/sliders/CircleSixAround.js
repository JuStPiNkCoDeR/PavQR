/** 1 => -97%, 15%, 100px, 0deg
 * 2 => -195%, 0, 0, -35deg
 * 3 => -205%, -70%, -150px, 215deg
 * 4 => -108%, -65%, -50px, 180deg
 * 5 => -13%, -70%, -150px, 150deg/
 * 6 => */
function Slider(opt) {
    Animation.apply(this, arguments);
    this.steps = [];
    this.properties = [];
    this.inAnim = false;
    this.zommingDuration = opt.zoomDur;
    this.steps.push(0);
    function setFrame(timePassed, frame, prop) {
        var value = null;
        if (arguments.length === 3) {
            switch (frame) {
                case 0:
                    value = [timePassed * -97, timePassed * 15, timePassed * 100, 35 - (timePassed * 35)];
                    break;
                case 1:
                    value = [prop[0] - (timePassed * 98),  prop[1] - (timePassed * prop[1]), prop[2] - (timePassed * prop[2]), timePassed * -35]; //2
                    break;
                case 2:
                    value = [prop[0] - (timePassed * 10), prop[1] - (timePassed * 70), prop[2] - (timePassed * 115), prop[3] + (timePassed * 250)]; //3
                    break;
                case 3:
                    value = [prop[0] + (timePassed * 97), prop[1] + (timePassed * 5), prop[2] + (timePassed * 100), prop[3] - (timePassed * 35)]; //4
                    break;
                case 4:
                    value = [prop[0] + (timePassed * 95), prop[1] - (timePassed * 5), prop[2] - (timePassed * 100), prop[3] - (timePassed * 30)]; //5
                    break;
                case 5:
                    value = [prop[0] - (timePassed * prop[0]), prop[1] - (timePassed * prop[1]), prop[2] - (timePassed * prop[2]), prop[3] - (timePassed * 115)]; // 6
                    break;
                default:
                    value = undefined;
            }
        } else if (arguments.length === 2) return value = (frame) ? 1 + (timePassed * 0.04) : 1.04 - (timePassed * 0.04);
        return value;
    }
    function draw(progress, index, prop) {
        if (arguments.length === 2) $('.slider-block .slide').eq(index).css({"transform":"translate3d(" + progress[0] + "%" + ", " + progress[1] + "%" + ", " + progress[2] + "px" + ") rotateY(" + progress[3] + "deg)"});
        else if (arguments.length === 3) $('.slider-block .slide').eq(index).css({"transform":"translate3d(" + prop[index][0] + "%" + ", " + prop[index][1] + "%" + ", " + prop[index][2] + "px" + ") rotateY(" + prop[index][3] + "deg) scale("+ progress +")"});
    }
    this.sixSlidesAnimate = function (steps = this.steps, prop = this.properties, duration = this.time) {
         return setInterval(function () {
            for (var i = 0; i < steps.length; i++) {
                const state = steps[i];
                let proper = prop[i];
                const index = i;
                if (state !== null || state !== undefined) {
                    const start = performance.now();
                    requestAnimationFrame(function anim(time) {
                        let timePassed = (time - start) / duration;
                        if (timePassed > 1) timePassed = 1;

                        let progress = setFrame(timePassed, state, proper);
                        draw(progress, index);
                        prop[index] = progress;
                        if (timePassed < 1) requestAnimationFrame(anim);
                    });
                }
                if (steps[i] < 5) steps[i]+=1;
                else steps[i] = 0;
            }
            if (steps.length < 6) steps.push(0);
        }, this.pause);
    };
    this.zoom = function (index, In, prop = this.properties, duration = this.zommingDuration) {
        if (index < prop.length) {
            const start = performance.now();
            requestAnimationFrame(function anim(time) {
                let timePassed = (time - start) / duration;
                if (timePassed > 1) timePassed = 1;

                let progress = setFrame(timePassed, In);
                draw(progress, index, prop);
                if (timePassed < 1) requestAnimationFrame(anim);
            });
        }
    };
    this.pauseAnim = function (id, callback) {
        clearInterval(id);
        callback();
    }
}
Slider.prototype = Object.create(Animation.prototype);
Slider.prototype.constructor = Slider;