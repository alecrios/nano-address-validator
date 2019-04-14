export default class NanoAddressValidator {
	constructor(prefixes) {
		if (prefixes === undefined) {
			this.prefixes = ['nano', 'xrb'];
		} else if (Array.isArray(prefixes)) {
			if (prefixes.some((prefix) => typeof prefix !== 'string')) {
				throw TypeError('`prefixes` must be a string or an array of strings.');
			}

			this.prefixes = prefixes;
		} else if (typeof prefixes === 'string') {
			this.prefixes = [prefixes];
		} else {
			throw TypeError('`prefixes` must be a string or an array of strings.');
		}

		this.pattern = new RegExp(
			`^(${this.prefixes.join('|')})_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$`,
		);
	}

	isValid(address) {
		if (address === undefined) {
			throw Error('`address` must be defined.');
		} else if (typeof address !== 'string') {
			throw TypeError('`address` must be a string.');
		}

		return this.pattern.test(address);
	}
}
