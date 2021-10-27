const { withSettingsGradle } = require('@expo/config-plugins')

const addToGradleSettings = (content) => {
    let newContent = content.concat(
        `
        include ':react-native-fs'
        project(':react-native-fs').projectDir = new File(settingsDir, '../node_modules/react-native-fs/android')
`
    )
    return newContent
}

module.exports = (config) => {
    return withSettingsGradle(config, async (config) => {
        if (config.modResults.language === 'groovy') {
            config.modResults.contents = addToGradleSettings(
                config.modResults.contents
            )
        } else {
            throw new Error(
                "withPickFirst: Can't add pickFirst(s) because app build.grandle is not groovy"
            )
        }
        return config
    })
}
