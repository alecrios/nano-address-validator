import {expect} from 'chai';
import NanoAddressValidator from '../lib/nano-address-validator';

describe('NanoAddressValidator', () => {
	describe('constructor', () => {
		it('should throw error for invalid types', () => {
			expect(() => new NanoAddressValidator(null)).to.throw(TypeError);
			expect(() => new NanoAddressValidator(123)).to.throw(TypeError);
			expect(() => new NanoAddressValidator(['a', 1, {}])).to.throw(TypeError);
		});

		it('should provide default prefixes if not provided', () => {
			const prefixes = ['nano', 'xrb'];
			expect(() => new NanoAddressValidator(prefixes)).to.not.throw();
			expect(new NanoAddressValidator().prefixes).to.deep.equal(prefixes);
		});

		it('should support a prefix array', () => {
			const prefixes = ['foo', 'bar', 'baz'];
			expect(() => new NanoAddressValidator(prefixes)).to.not.throw();
			expect(new NanoAddressValidator(prefixes).prefixes).to.deep.equal(prefixes);
		});

		it('should support a prefix string', () => {
			const prefix = 'foo';
			expect(() => new NanoAddressValidator(prefix)).to.not.throw();
			expect(new NanoAddressValidator(prefix).prefixes).to.deep.equal([prefix]);
		});
	});

	describe('isValid', () => {
		it('should throw error if address is not provided', () => {
			const validator = new NanoAddressValidator();
			expect(() => validator.isValid()).to.throw(Error);
		});

		it('should throw error if address is not a string', () => {
			const validator = new NanoAddressValidator();
			expect(() => validator.isValid(123)).to.throw(Error);
		});

		it('should return false for invalid prefixes', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3',
				'foo_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3',
				'NANO_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return false for invalid characters', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tu0',
				'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tu2',
				'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tul',
				'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tuv',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return false for invalid casing', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'XRB_14CUEJFPR58EPNPXENIRUSIMSRBWXBECIN7A3IZQ1INJPTECC31QSJWQUOE6',
				'XRB_1NIABKX3GBXIT5J5YYQCPAS71DKFFGGBR6ZPD3HEUI8RPOOCM5XQBDWQ44OH',
				'XRB_1H31PB3B4PUZUY9IJC4YUCCE73GEWD3BM3ZPUGIQ46SBWSNZW8CGE6HXNFZB',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return false for public keys not starting with 1 or 3', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'xrb_03ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo',
				'xrb_23ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo',
				'xrb_43ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return false for lack of an underscore', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'xrb35jjmmmh81kydepzeuf9oec8hzkay7msr6yxagzxpcht7thwa5bus5tomgz9',
				'xrb1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est',
				'xrb3wm37qz19zhei7nzscjcopbrbnnachs4p1gnwo5oroi3qonw6inwgoeuufdp',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return false for improper length', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'xrb_11111111111111111111111111111111111111111111',
				'xrb_1111111111111111111111111111111111111111111111111111',
				'xrb_111111111111111111111111111111111111111111111111111111111111hifc8npp',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return false for whitespace', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				' nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
				'nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k ',
				'	nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
				'	nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k	',
				'nano_ 3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
				'nano _3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(false);
			});
		});

		it('should return true for valid addresses', () => {
			const validator = new NanoAddressValidator();

			const addresses = [
				'xrb_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
				'xrb_1stofnrxuz3cai7ze75o174bpm7scwj9jn3nxsn8ntzg784jf1gzn1jjdkou',
				'xrb_1q3hqecaw15cjt7thbtxu3pbzr1eihtzzpzxguoc37bj1wc5ffoh7w74gi6p',
				'xrb_3dmtrrws3pocycmbqwawk6xs7446qxa36fcncush4s1pejk16ksbmakis78m',
				'xrb_3hd4ezdgsp15iemx7h81in7xz5tpxi43b6b41zn3qmwiuypankocw3awes5k',
				'xrb_1awsn43we17c1oshdru4azeqjz9wii41dy8npubm4rg11so7dx3jtqgoeahy',
				'xrb_1anrzcuwe64rwxzcco8dkhpyxpi8kd7zsjc1oeimpc3ppca4mrjtwnqposrs',
				'nano_3arg3asgtigae3xckabaaewkx3bzsh7nwz7jkmjos79ihyaxwphhm6qgjps4',
				'nano_1stofnrxuz3cai7ze75o174bpm7scwj9jn3nxsn8ntzg784jf1gzn1jjdkou',
				'nano_1q3hqecaw15cjt7thbtxu3pbzr1eihtzzpzxguoc37bj1wc5ffoh7w74gi6p',
				'nano_3dmtrrws3pocycmbqwawk6xs7446qxa36fcncush4s1pejk16ksbmakis78m',
				'nano_3hd4ezdgsp15iemx7h81in7xz5tpxi43b6b41zn3qmwiuypankocw3awes5k',
				'nano_1awsn43we17c1oshdru4azeqjz9wii41dy8npubm4rg11so7dx3jtqgoeahy',
				'nano_1anrzcuwe64rwxzcco8dkhpyxpi8kd7zsjc1oeimpc3ppca4mrjtwnqposrs',
			];

			addresses.forEach((address) => {
				expect(validator.isValid(address)).to.equal(true);
			});
		});
	});
});
