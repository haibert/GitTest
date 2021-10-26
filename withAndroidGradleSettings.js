const { withSettingsGradle } = require('@expo/config-plugins')

module.exports = (config) => {
    if (!paths) {
        throw new Error('withAndroidGradleSettings: No paths specified!')
    }

    return withSettingsGradle(config, (config) => {
        console.log(config)
        // if (config.modResults.language === 'groovy') {
        //     config.modResults.contents = addPickFirst(
        //         config.modResults.contents,
        //         paths
        //     )
        // } else {
        //     throw new Error(
        //         "withPickFirst: Can't add pickFirst(s) because app build.grandle is not groovy"
        //     )
        // }
        return config