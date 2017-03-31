(function ($) {

    $.fn.extend(jQuery.fn, {

        stars: function (options) {
            //DEFAULT PARAMS
            var defaults = {
                "speed": 20000,
                "linelength": 0.001,
                "color": "#000",
            };

            //PARAMS FUSION
            var parametres = $.extend(defaults, options);

            var ctx = Sketch.create(),
                time = 0,
                speed = defaults.speed,
                flagTime = ctx.now,
                lineLength = defaults.linelength,
                delay = 0,
                delaySpeed = 10 / speed,
                delayTrigger = false,
                pos = [112, 131, 299, 107, 153, 265, 212, 140, 159, 214, 217, 109, 267, 285, 166, 120, 258, 289, 115, 274, 204, 296, 102, 126, 184, 300, 219, 100, 248, 142, 158, 113, 279, 237, 213, 297, 103, 228, 187, 160, 208, 283, 192, 119, 211, 190, 199, 154, 223, 224, 242, 250, 164, 189, 104, 210, 292, 275, 175, 123, 284, 122, 247, 234, 270, 282, 136, 139, 133, 174, 165, 262, 268, 269, 286, 245, 222, 162, 260, 137, 240, 288, 255, 101, 144, 116, 264, 178, 176, 202, 150, 243, 155, 168, 143, 272, 161, 278, 239, 157, 170, 298, 195, 207, 261, 259, 146, 105, 244, 194, 181, 232, 200, 209, 117, 252, 206, 246, 254, 235, 138, 249, 193, 291, 129, 135, 225, 290, 287, 266, 125, 241, 147, 256, 151, 271, 173, 171, 169, 132, 293, 141, 179, 148, 180, 276, 236, 177, 281, 145, 111, 218, 220, 114, 233, 215, 108, 257, 172, 253, 231, 227, 188, 203, 110, 294, 167, 273, 201, 295, 238, 127, 156, 185, 183, 163, 152, 191, 280, 197, 186, 221, 251, 226, 149, 216, 277, 196, 128, 198, 118, 130, 124, 121, 205, 182, 106, 263, 134, 230, 229];

            // ACTIVE/DESACTIVE AU SURVOL LE DELAY //

            ctx.mouseover = function () {
                delayTrigger = !delayTrigger;
                console.log("hey");
            };
            ctx.mouseout = function () {
                delayTrigger = !delayTrigger;
            };

            // DESSIN ET ANIMATION DE ARC //

            var arc = function (time) {
                if (delayTrigger) {
                    if (delay >= 2) {
                        delay = 2;
                    } else {
                        delay += delaySpeed * 2;
                    }
                } else {
                    if (delay <= delaySpeed) {
                        delay = 0;
                    } else {
                        delay -= delaySpeed * 2;
                    }
                }
                for (i = 10; i < 200; i++) {
                    ctx.beginPath();
                    ctx.arc(ctx.width / 2, ctx.height / 2, pos[i] * 3 - 250, (time - delay) * Math.PI + pos[i] + i, (time) * Math.PI + lineLength + pos[i] + i);
                    ctx.lineWidth = 1 * (i / 50);
                    ctx.lineCap = 'round';
                    ctx.strokeStyle = defaults.color;
                    ctx.stroke();
                }
            };

            // COMPTE DE 0 à 2 en fonction du temps //

            function circleRunning() {
                if (time >= 2) {
                    flagTime = ctx.now;
                }
                time = (ctx.now - flagTime) / speed;
            }

            // EXECUTION À CHAQUE FRAME //

            ctx.draw = function () {
                circleRunning();
                arc(time);
            };

            function resize_canvas() {
                canvas = document.getElementById("canvas");
                if (canvas.width < window.innerWidth) {
                    canvas.width = window.innerWidth;
                }

                if (canvas.height < window.innerHeight) {
                    canvas.height = window.innerHeight;
                }
            }
            $("body").resize(function () {
                resize_canvas();
            });

        },
    });

})(jQuery);