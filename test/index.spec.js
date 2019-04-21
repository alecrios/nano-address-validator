import {expect} from 'chai';
import isValid from '../lib/nano-address-validator';

const validAddresses = [
	'nano_14cuejfpr58epnpxenirusimsrbwxbecin7a3izq1injptecc31qsjwquoe6',
	'nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
	'nano_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tuk',
	'nano_1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est',
	'nano_19773kh38t6dtqsseq8oa5jk8o7ycas3t77d1xznoktdipcbofkzuhcjzeba',
	'nano_3ing74j39b544e9w4yrur9fzuwges71ddo83ahgskzhzaa3ytzr7ra3jfsgi',
	'nano_3wtbdcjrgro1cc87bnnia6ht1jqu96q9km6qttrza7ioxbxr7yqxzf1psugd',
	'nano_1m1e8m7ryf4zhx4xk9tegfxt8g5mpertjwfowtjanpjji1ttnkseunagbspj',
	'nano_3hua6a116y4jmbeaf63zi6mn8gf5s4n3eyxa3q4m5ibabi6pmegfubky3wpi',
	'nano_1azif31ho333hnfb39acaua7jcgha4cjio4n5rc543jain37j8n7dqi6g8jo',
	'nano_3dx4o17y4xcg5aeo1h7an5z8onk139hhs9oa37xkb1uzqnxfzphzpfjwyw4x',
	'nano_1b7t1fxn8uuj51dsxfi6mzp7mb3m9pocyznqzh9zfb1etzkdufgpdinq553q',
	'nano_38zpmsje8de6tgkan8yf3t86e31444qkznxyah6zqtqckex1nec97wo94xc9',
	'nano_36gyiognuibzsnsuqrntnpqa51xic5iickdeggcaugb79uh3nmrdtf7gg4t6',
	'nano_1h31pb3b4puzuy9ijc4yucce73gewd3bm3zpugiq46sbwsnzw8cge6hxnfzb',
	'nano_19so3616wepcwjj868z7pfnsciegjyp68omt3c13qoepnccskgyjayjksyrc',
	'nano_1niabkx3gbxit5j5yyqcpas71dkffggbr6zpd3heui8rpoocm5xqbdwq44oh',
	'nano_3re5wi4pjkpdjs9z1dn7oxitcapimkoyp1b1bqh1tj4e1hbpcj6h41zz8biz',
	'nano_3iirom9oxgqeu6xmsun9rq8b4ybb783mpk4aqdsojo9zi66yi1y6kqw1qmt3',
	'nano_36xysg5opeeaowmeazjd9oy6xtrexy1cf65jw77i5kt83do94twe918ag6dp',
	'nano_3k5grtxarxfooa9xf5qhaspaeixw939aaab6z391yzpyo8tgoh8x9kko3bfm',
	'nano_35syfzh8yx5zaypmoumtfe6pe9n5d9fo1f5b8in3ks3kcby8bwkm754gi31j',
	'nano_34m3ts1rpirfubibcbmj1ds8kjqdi7ypihirqw4fnqxthh6er33m7p4y93zx',
	'nano_3winfya6ngotsxndyyf4o1ue57ff1rmtwiz81w6qez6hxfy4fgm5ybmhjzrt',
	'nano_3eeio87pksrgndzcrdbasnhmmoyyqikemndrc8au8ygyt9xjp3rdjcyh6ia1',
];

describe('isValid', () => {
	it('should throw error if address is not provided', () => {
		expect(() => isValid()).to.throw(Error);
	});

	it('should throw error if address is not a string', () => {
		expect(() => isValid(123)).to.throw(Error);
	});

	it('should throw error for invalid allowed prefixes', () => {
		expect(() => isValid(validAddresses[0], null)).to.throw(TypeError);
		expect(() => isValid(validAddresses[0], 123)).to.throw(TypeError);
		expect(() => isValid(validAddresses[0], ['a', 1, {}])).to.throw(TypeError);
	});

	it('should return false for invalid prefixes', () => {
		const addresses = [
			'_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3',
			'foo_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3',
			'NANO_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return false for invalid characters', () => {
		const addresses = [
			'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tu0',
			'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tu2',
			'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tul',
			'xrb_3uip1jmeo4irjuua9xiyosq6fkgogwd6bf5uqopb1m6mfq6g3n8cna6h3tuv',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return false for invalid casing', () => {
		const addresses = [
			'XRB_14CUEJFPR58EPNPXENIRUSIMSRBWXBECIN7A3IZQ1INJPTECC31QSJWQUOE6',
			'XRB_1NIABKX3GBXIT5J5YYQCPAS71DKFFGGBR6ZPD3HEUI8RPOOCM5XQBDWQ44OH',
			'XRB_1H31PB3B4PUZUY9IJC4YUCCE73GEWD3BM3ZPUGIQ46SBWSNZW8CGE6HXNFZB',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return false for public keys not starting with 1 or 3', () => {
		const addresses = [
			'xrb_03ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo',
			'xrb_23ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo',
			'xrb_43ezf4od79h1tgj9aiu4djzcmmguendtjfuhwfukhuucboua8cpoihmh8byo',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return false for lack of an underscore', () => {
		const addresses = [
			'xrb35jjmmmh81kydepzeuf9oec8hzkay7msr6yxagzxpcht7thwa5bus5tomgz9',
			'xrb1ipx847tk8o46pwxt5qjdbncjqcbwcc1rrmqnkztrfjy5k7z4imsrata9est',
			'xrb3wm37qz19zhei7nzscjcopbrbnnachs4p1gnwo5oroi3qonw6inwgoeuufdp',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return false for improper length', () => {
		const addresses = [
			'xrb_11111111111111111111111111111111111111111111',
			'xrb_1111111111111111111111111111111111111111111111111111',
			'xrb_111111111111111111111111111111111111111111111111111111111111hifc8npp',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return false for whitespace', () => {
		const addresses = [
			' nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
			'nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k ',
			'	nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
			'	nano_3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k	',
			'nano_ 3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
			'nano _3jwrszth46rk1mu7rmb4rhm54us8yg1gw3ipodftqtikf5yqdyr7471nsg1k',
		];

		addresses.forEach((address) => {
			expect(isValid(address)).to.equal(false);
		});
	});

	it('should return true for syntactically valid addresses with good checksums', () => {
		validAddresses.forEach((address) => {
			expect(isValid(address)).to.equal(true);
		});
	});

	it('should return false for syntactically valid addresses with bad checksums', () => {
		validAddresses.forEach((address) => {
			// Change the last character to invalidate the checksum.
			const addressWithBadChecksum = address.slice(-1) !== 'a'
				? address.replace(/.$/, 'a')
				: address.replace(/.$/, 'b');

			expect(isValid(addressWithBadChecksum)).to.equal(false);
		});
	});

	it('should return true for valid addresses with alternate valid prefixes', () => {
		validAddresses.forEach((address) => {
			// Change the last prefix.
			const addressWithAlternatePrefix = address.replace(/nano_/, 'ban_');

			expect(isValid(addressWithAlternatePrefix, 'ban')).to.equal(true);
		});
	});
});
