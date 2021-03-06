const { withMainApplication } = require('@expo/config-plugins')

const addToMainApp = (content) => {
    const publicClassIndex = content.indexOf('public class MainApplication')

    const regexpPackagingOptions = /\s*?(?=\/\*\*\n   \* Loads Flipper)/
    const insertLocation = content.match(regexpPackagingOptions)

    content =
        content.substring(0, publicClassIndex - 1) +
        'import com.rnfs.RNFSPackage; // <------- add package\n' +
        content.substring(publicClassIndex)

    content =
        content.substring(0, insertLocation.index) +
        `
        \n\t@Override
        protected List<ReactPackage> getPackages() {
          return Arrays.<ReactPackage>asList(
            new MainReactPackage(), // <---- add comma
            new RNFSPackage() // <---------- add package
          );
        ` +
        content.substring(insertLocation.index, content.length)

    return content
}

module.exports = (config) => {
    return withMainApplication(config, async (config) => {
        config.modResults.contents = addToMainApp(config.modResults.contents)
        return config
    })
}
