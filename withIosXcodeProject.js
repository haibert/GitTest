const { withXcodeProject } = require('@expo/config-plugins')

const resolvePath = (object, path, defaultValue) =>
    path.split('.').reduce((o, p) => (o ? o[p] : defaultValue), object)

const addToBuildPhase = (config) => {
    let PBXShellScriptBuildPhase = resolvePath(
        config.modResults.hash.project.objects.PBXShellScriptBuildPhase,
        '00DD1BFF1BD5951E006B06BC'
    )
    PBXShellScriptBuildPhase.shellScript
    console.log(
        ' 12 PBXShellScriptBuildPhase.shellScript',
        PBXShellScriptBuildPhase.shellScript
    )
    PBXShellScriptBuildPhase.shellScript =
        "\"export NODE_BINARY=node\\n\\n# The project root by default is one level up from the ios directory\\nexport PROJECT_ROOT=\\\"$PROJECT_DIR\\\"/..\\n\\n`node --print \\\"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-xcode.sh'\\\"`\\n `node --print \\\"require('path').dirname(require.resolve('react-native/package.json')) + '/scripts/react-native-vector-image/strip_svgs.sh'\\\"`\\n\""

    console.log(
        ' 12 PBXShellScriptBuildPhase.shellScript',
        PBXShellScriptBuildPhase.shellScript
    )

    config.modResults.hash.project.objects.PBXShellScriptBuildPhase

    return config
}
const string = '/"test"'
module.exports = (config) => {
    return withXcodeProject(config, async (config) => {
        addToBuildPhase(config)
        return config
    })
}
