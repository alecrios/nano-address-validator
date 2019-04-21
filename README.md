# Nano Address Validator

Nano Address Validator is a thoroughly-tested library for validating addresses of the [Nano](https://nano.org/en) cryptocurrency. Its process consists of not only syntax analysis but also checksum verification. It can even validate addresses of Nano forks, such as [Banano](https://banano.cc/), by accepting any number of allowed prefixes.

## Address Specifications

```
nano_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3
└─┬─┘└────────────────────────┬─────────────────────────┘└──┬───┘
  A                           B                             C
```

**A. Prefix** - An address must begin with either `nano_` (modern prefix) or `xrb_` (legacy prefix).

Because Nano was originally named RaiBlocks, the prefix `xrb_` was used (the `x` denoting a non-national currency, per the ISO 4217 currency code standard). After rebranding, the `nano_` prefix was introduced. As of Nano Node v19, the legacy prefix is deprecated, though it will continue to be supported.

**B. Public Key** - An address must contain a 52-character encoded public key, which begins with either `1` or `3`.

A raw address is a 256-bit unsigned integer in hexadecimal format. This is translated into a 260-bit number (padded at the start with four zeros) and encoded into a human-friendly string using a special base32 algorithm. This algorithm divides the 260-bit number into 52 5-bit segments and maps each segment to a character in an alphabet (`13456789abcdefghijkmnopqrstuwxyz`) that omits characters easily confused for others (`02lv`). Because the first segment is padded with zeros, its pattern is either `00000` (`1`) or `00001` (`3`). Thus, the encoded public key always begins with one of those characters.

**C. Checksum** - An address must contain an 8-character encoded checksum of the public key.

The address contains a checksum of the public key in order to prevent typographical errors. A hash is generated from the unencoded public key using Blake2b with an 8-bit digest, which is then encoded using the same base32 algorithm as the public key and appended to the address. Thus, the final 8 characters of an address must match the derived checksum of the public key.

## Validation Process

The validation process consists of two major operations:

1. Verifying that the address is syntactically correct as far as prefix, structure, length, and alphabet.
2. Deriving the checksum of the public key and verifying that it matches the checksum provided within the address.

## Installation

```
npm install nano-address-validator --save
```

## Examples

```js
import isValid from 'nano-address-validator';

const nanoAddress = 'nano_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3';
const bananoAddress = 'ban_1bananobh5rat99qfgt1ptpieie5swmoth87thi74qgbfrij7dcgjiij94xr';

// Validate Nano address
isValid(nanoAddress); // true

// Validate Banano address
isValid(bananoAddress, 'ban'); // true

// Validate Nano/Banano addresses
isValid(nanoAddress, ['ban', 'nano', 'xrb']); // true
isValid(bananoAddress, ['ban', 'nano', 'xrb']); // true
```

## API

### `isValid(address, [prefix = ['nano', 'xrb']])`

Checks whether an address is valid.

#### Arguments

- **address (_String_)**: The address to check.
- **prefix (_String_|_String[]_)**: The allowed prefix(es).

#### Exceptions

- **Error**: Address must be defined.
- **TypeError**: Address must be a string.
- **TypeError**: Prefix must be a string or an array of strings.

#### Returns

- **(_Boolean_)**: Whether the address is valid.
