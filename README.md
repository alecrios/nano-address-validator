# Nano Address Validator

Nano Address Validator is a thoroughly-tested library for validating addresses of the [Nano](https://nano.org/en) cryptocurrency. It can also validate addresses of Nano forks, such as [Banano](https://banano.cc/), by passing its custom prefix as a parameter.

## Specifications

A valid Nano address is a string that meets the following specifications:

### Begins with `nano_` (current prefix) or `xrb_` (legacy prefix)

As of Nano Node v19, addresses are emitted with the `nano_` prefix, although the original `xrb_` prefix will continue to be supported.

### Continues with a 52-character public key (the first of which is a `1` or `3`)

A raw address is a 256-bit unsigned integer in hexadecimal format. This is translated into a 260-bit number (padded at the start with four zeros) and encoded into a human-friendly string using a special base32 algorithm. This algorithm divides the 260-bit number into 52 5-bit segments and maps each segment to a character in an alphabet (`13456789abcdefghijkmnopqrstuwxyz`) that omits characters easily confused for others (`02lv`). Because the first segment is padded with zeros, its pattern is either `00000` (`1`) or `00001` (`3`). Thus, the encoded public key always begins with one of those characters.

### Continues with an 8-character checksum

The address contains a checksum of the public key in order to prevent typographical errors. A hash is generated from the unencoded public key using Blake2b with an 8-bit digest, which is then encoded using the same base32 algorithm as the public key and appended to the address. Thus, the final 8 characters of an address must match the derived checksum of the public key.

## Validation

The validation process consists of:

1. Verifying that the address is syntactically correct as far as prefix, structure, and alphabet.
2. Deriving the checksum of the public key and verifying that it matches the provided checksum.

## Installation

```
npm install nano-address-validator --save
```

## Examples

```js
import NanoAddressValidator from 'nano-address-validator';

// Validate Nano address
const nanoAddressValidator = new NanoAddressValidator();
const nanoAddress = 'nano_3t6k35gi95xu6tergt6p69ck76ogmitsa8mnijtpxm9fkcm736xtoncuohr3';
console.log(nanoAddressValidator.isValid(nanoAddress)); // true

// Validate Banano address
const bananoAddressValidator = new NanoAddressValidator('ban');
const bananoAddress = 'ban_1bananobh5rat99qfgt1ptpieie5swmoth87thi74qgbfrij7dcgjiij94xr';
console.log(bananoAddressValidator.isValid(bananoAddress)); // true
```

## API

### `NanoAddressValidator([prefix])`

Creates a new instance.

#### Arguments

- **prefix (_String_|_String[]_)**: The allowed prefix(es).

#### Returns

- **(_Object_)**: The newly created instance.

#### Exceptions

- **TypeError**: Prefix must be a string or an array of strings.

### `NanoAddressValidator.isValid(address)`

Checks whether an address is valid.

#### Arguments

- **address (_String_)**: The address to check.

#### Returns

- **(_Boolean_)**: Whether the address is valid.

#### Exceptions

- **Error**: Address must be defined.
- **TypeError**: Address must be a string.
