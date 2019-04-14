# Nano Address Validator

Nano Address Validator is a thoroughly-tested library for validating addresses of the [Nano](https://nano.org/en) cryptocurrency. It can also validate addresses of Nano forks, such as [Banano](https://banano.cc/), by passing its custom prefix as a parameter.

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

## Reference

### `NanoAddressValidator([prefixes])`

Creates a new instance of the `NanoAddressValidator` class.

#### Arguments

- **prefixes (_String_|_String[]_)**: The allowed prefix(es).

#### Returns

- **(_Object_)**: Returns the newly created object.

#### Exceptions

- **TypeError**: Thrown if `prefix` is not a string or an array of strings.

### `NanoAddressValidator.isValid(address)`

Checks if `address` is a valid address.

#### Arguments

- **address (_String_)**: The address to check.

#### Returns

- **(_Boolean_)**: Returns `true` if the address is valid, else `false`.

#### Exceptions

- **Error**: Thrown if `address` is undefined.
- **TypeError**: Thrown if `address` is not a string.
