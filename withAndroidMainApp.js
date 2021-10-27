const { withMainApplication } = require('@expo/config-plugins')

const addToMainApp = (content) => {
    const regexpPackagingOptions = /\s*?(?=\/\*\*\n   \* Loads Flipper)/
    const insertLocation = content.match(regexpPackagingOptions)

    const newContent =
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

    return newContent
}

module.exports = (config) => {
    return withMainApplication(config, (config) => {
        config.modResults.contents = addToMainApp(config.modResults.contents)
        return config
    })
}
// '//INSERTED \n@Override\nprotected List<ReactPackage> getPackages() {\nreturn Arrays.<ReactPackage>asList(\nnew MainReactPackage(), // <---- add comma\nnew RNFSPackage() // <---------- add package\n);\n}' +
