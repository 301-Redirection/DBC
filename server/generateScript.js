function genPushLane() {
    return 'return {0,0,0}';
}

function generateScript() {
    let code = '';
    code += genPushLane();
    return code;
}

module.exports = generateScript;
