var container = document.getElementById("container");
var items = container.getElementsByClassName("item");

var touchstart = {
    x: 0,
    y: 0
}
var translateX = 0;
var clientX = 0;
var target = 1;
container.addEventListener("touchstart", function (event) {
    var targetTouche = event.targetTouches[0];
    touchstart.x = targetTouche.clientX;
    touchstart.y = targetTouche.clientY;
});
container.addEventListener("touchmove", function (event) {
    var targetTouche = event.targetTouches[0];
    var cx = targetTouche.clientX - touchstart.x;
    var t = target - Number((cx / 256).toFixed(0));
    if (items[t]) {
        if (!hasClass(items[t])) {
            if (items[t + 1]) removeClass(items[t + 1], "swipt-target");
            if (items[t - 1]) removeClass(items[t - 1], "swipt-target");
            if (items[t]) addClass(items[t], "swipt-target");
        }
        let style = "transform:translateX(" + (translateX + cx + "px") + ");"
        container.style = style;
        clientX = cx;
    }
});

container.addEventListener("touchend", function (event) {
    var n = Number((clientX / 256).toFixed(0));
    target = target - n;
    translateX = translateX + n * 256;
    container.style = "transform:translateX(" + (translateX + "px") + ");";
});

function hasClass(elem, cls) {
    cls = cls || '';
    if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
    return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

function addClass(elem, cls) {
    if (!hasClass(elem, cls)) {
        elem.className = elem.className == '' ? cls : elem.className + ' ' + cls;
    }
}

function removeClass(elem, cls) {
    if (hasClass(elem, cls)) {
        var newClass = ' ' + elem.className.replace(/[\t\r\n]/g, '') + ' ';
        while (newClass.indexOf(' ' + cls + ' ') >= 0) {
            newClass = newClass.replace(' ' + cls + ' ', ' ');
        }
        elem.className = newClass.replace(/^\s+|\s+$/g, '');
    }
}