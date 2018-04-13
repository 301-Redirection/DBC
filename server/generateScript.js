function generateScript() {
    var code = "";
    code += genPushLane();
    return code;
}

function genPushLane() {
    return "return {0,0,0}";
}

module.exports = generateScript;