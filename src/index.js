import blake from 'blakejs';
import nanoBase32 from 'nano-base32';

/**
 * Checks whether an address is valid.
 * @param {String} address The address to check.
 * @param {String|String[]} [prefix=['nano', 'xrb']] The allowed prefix(es).
 * @throws {Error} Address must be defined.
 * @throws {TypeError} Address must be a string.
 * @throws {TypeError} Prefix must be a string or an array of strings.
 * @returns {Boolean} Whether the address is valid.
 */
export default function (address, prefix = ['nano', 'xrb']) {
	// Ensure the address is provided.
	if (address === undefined) {
		throw Error('Address must be defined.');
	}

	// Ensure the address is a string.
	if (typeof address !== 'string') {
		throw TypeError('Address must be a string.');
	}

	let allowedPrefixes;

	// Ensure the prefix is valid.
	if (Array.isArray(prefix)) {
		if (prefix.some((currentPrefix) => typeof currentPrefix !== 'string')) {
			throw TypeError('Prefix must be a string or an array of strings.');
		}

		allowedPrefixes = prefix;
	} else if (typeof prefix === 'string') {
		allowedPrefixes = [prefix];
	} else {
		throw TypeError('Prefix must be a string or an array of strings.');
	}

	/** The regex pattern for validating the address. */
	const pattern = new RegExp(
		`^(${allowedPrefixes.join('|')})_[13]{1}[13456789abcdefghijkmnopqrstuwxyz]{59}$`,
	);

	// Validate the syntax of the address.
	if (!pattern.test(address)) {
		return false;
	}

	/** The expected checksum as a base32-encoded string. */
	const expectedChecksum = address.slice(-8);

	/** The public key as a base32-encoded string. */
	const publicKey = address.slice(address.indexOf('_') + 1, -8);

	/** The public key as an array buffer. */
	const publicKeyBuffer = nanoBase32.decode(publicKey);

	/** The actual checksum as an array buffer. */
	const actualChecksumBuffer = blake.blake2b(publicKeyBuffer, null, 5).reverse();

	/** The actual checksum as a base32-encoded string. */
	const actualChecksum = nanoBase32.encode(actualChecksumBuffer);

	// Validate the provided checksum against the derived checksum.
	return expectedChecksum === actualChecksum;
}
