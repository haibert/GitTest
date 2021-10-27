const { withAppBuildGradle } = require('@expo/config-plugins')

const addToAppGradle = (content) => {
    let dependencies = content.match(/dependencies {(.*?)}/)[1]
    dependencies = dependencies.concat(
        "\nimplementation project(':react-native-fs')"
    )
    return dependencies
}

module.exports = (config) => {
    return withAppBuildGradle(config, async (config) => {
        if (config.modResults.language === 'groovy') {
            // console.log(config.modResults.contents)
            // config.modResults.contents = addToGradleSettings(
            //     config.modResults.contents
            // )
        } else {
            throw new Error(
                "withPickFirst: Can't add pickFirst(s) because app build.grandle is not groovy"
            )
        }
        return config
    })
}
