var t, pa = [];
if (location.href.indexOf('#') !== -1) {
    pa = (location.href.split('#')[1]).split(';');
}
window.onhashchange = function() {
    location.reload();
}
var number;
var o = 0;
var globalnum;
var n, cf, range = [],
rmode = false,
boards = false,
boardsw = false;
for (var op in pa) {
    if (pa[op].indexOf(':') !== -1) {
        var t = pa[op].split(':');
        if (t[1]) {
            if (t[0] == 't') {
                n = t[1];
            } else if (t[0] == 'r') {
                if (t[1] == 'true') {
                    cf = true;
                } else {
                    cf = false;
                }
            }
        }
    }
}
function judge(d) {
    if (parseFloat(d).toString() == "NaN") {
        return false;
    } else {
        return true;
    }
}
function getresult() {
    var e = document.getElementById('result');
    e.innerHTML = '<h3>抽取模式：';
    if (rmode) {
        e.innerHTML += '范围抽取-';
    } else {
        e.innerHTML += '指定数值抽取-';
    }
    if (cf) {
        e.innerHTML += '有重复抽取';
    } else {
        e.innerHTML += '无重复抽取';
    }
    e.innerHTML += '<\/h3><h3>抽取结果:</h3>';
    var total = number.length;
    for (var i in number) {
        if (!rmode && (Number(i) + 1) > n) {
            total -= 1;
            console.log('Excepted one additional number.');
        } else {
            e.innerHTML += '<p>[第' + (Number(i) + 1) + '次] ' + number[i] + '号</p>';
        }
    }
    e.innerHTML += '<\/h3><h3>抽取分析:</h3><p>已经抽取了' + total + '次<\/p>';
}
function warn() {
    alert('Please type the proper Number(>1) or Range.\n请输入合法的数值(>1)或者范围\n\nRange Input Example: 1-50\n范围输入示例：1-50');
    n = '',
    range = [],
    cf = 'none';
    return rp();
}
function rp() {
    rmode = false;
    if (!n) {
        n = prompt('How Many? or What\'s the range?\n请输入数值(>1)或抽号范围(Example:1-50)', '');
    }
    if (typeof cf == 'undefined' || cf == 'none') {
        cf = confirm('Allow Repeating?\n允许有重复数字出现吗？');
    }
    number = [];
    if (!n) {
        warn();
    }
    var k = n.split('-');
    range['s'] = k[0];
    range['e'] = k[1];
    if (n.indexOf('-') !== -1) {
        if (k.length == 2) {
            if (!judge(k[0]) || !judge(k[1])) {
                warn();
            } else {
                rmode = true;
            }
        } else {
            warn();
        }
    } else {
        if (!judge(n) || Number(n) <= 1) {
            warn();
        }
    }
}
rp();

function count() {
    var a;
    if (!rmode) {
        a = Math.floor(Math.random() * parseInt(n)) + 1;
    } else {
        a = Math.floor(Math.random() * (parseInt(range['e']) - parseInt(range['s']) + 1) + parseInt(range['s']));
    }
    if (number.indexOf(a) !== -1 && !cf) {
        if (! (number.length >= Number(n))) {
            return count();
        }
    }
    if (number.length >= Number(n) && !cf) {
        document.getElementById('t').innerHTML = 'Finished';
    } else {
        document.getElementById('t').innerHTML = a;
    }
    globalnum = a;
}

function p() {
    if (rmode) {
        if (number.length >= (Number(range['e']) - Number(range['s'])) + 1) {
            n = number.length - 1;
        }
    }
    if (! (number.length >= Number(n) + 1) || cf) {
        if (o == 0) {
            t = setInterval(count, 10);
            o = 1;
        } else {
            clearInterval(t);
            number[number.length] = globalnum;
            console.log(number.length);
            o = 0;
        }
    } else {
        document.getElementById('t').innerHTML = 'Finished';
        setTimeout(function() {
            if (!boardsw) {
                if (confirm('要查看结果吗？\n点击取消会重来')) {
                    board();
                } else {
                    n = '',
                    range = [],
                    cf = 'none';
                    return rp();
                }
            }
        },
        1000);
    }
    getresult();
}

function board() {
    boardsw = true;
    var e = document.getElementById('pan');
    var p = document.getElementById('pb');
    var b = document.getElementById('br');
    if (!boards) {
        boards = true;
        b.style.height = 'auto';
        b.style.minHeight = '100%';
        e.style.opacity = 0;
        b.style.marginLeft = 0;
        setTimeout(function() {
            p.innerHTML = '返回O_o';
            e.style.opacity = 1;
            boardsw = false;
        },
        1000);
    } else {
        boards = false;
        e.style.opacity = 0;
        b.style.marginLeft = '100%';
        setTimeout(function() {
            p.innerHTML = '抽取情况';
            e.style.opacity = 1;
            b.style.height = '10px';
            b.style.minHeight = '0px';
            boardsw = false;
        },
        1000);
    }
}