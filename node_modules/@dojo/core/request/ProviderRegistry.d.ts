import { Provider, ProviderTest } from './interfaces';
import MatchRegistry from '../MatchRegistry';
import { Handle } from '../interfaces';
export default class ProviderRegistry extends MatchRegistry<Provider> {
    setDefaultProvider(provider: Provider): void;
    register(test: string | RegExp | ProviderTest | null, value: Provider, first?: boolean): Handle;
}
