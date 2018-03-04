import MatchRegistry from '../MatchRegistry';
export default class ProviderRegistry extends MatchRegistry {
    setDefaultProvider(provider) {
        this._defaultValue = provider;
    }
    register(test, value, first) {
        let entryTest;
        if (typeof test === 'string') {
            entryTest = (url, options) => test === url;
        }
        else if (test instanceof RegExp) {
            entryTest = (url, options) => {
                return test ? test.test(url) : null;
            };
        }
        else {
            entryTest = test;
        }
        return super.register(entryTest, value, first);
    }
}
//# sourceMappingURL=ProviderRegistry.mjs.map