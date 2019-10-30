function Animation(options) {
    this.elems = options.blocks;
    this.timings = options.func;
    this.time = options.durations;
    this.pause = options.delay;
    this.animations = {};
}

/*Animation.prototype.simpleThD = function (elem, duration) {
    function timing(timePassed) {
        return [timePassed * -97, timePassed * 15, timePassed * 100, 35 - (timePassed * 35)];
    }
    function draw(progress) {
        $(elem).eq(0).css({"transform":"translate3d(" + progress[0] + "%" + ", " + progress[1] + "%" + ", " + progress[2] + "px" + ") rotateY(" + progress[3] + "deg)"});
    }

    var start = performance.now();
    requestAnimationFrame(function anim(time) {
        var timePassed = (time - start) / duration;
        if (timePassed > 1) timePassed = 1;

        var progress = timing(timePassed);
        draw(progress);

        if (timePassed < 1) requestAnimationFrame(anim);
    });
};*/