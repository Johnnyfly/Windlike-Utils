# Verification
```js
interface VerificationModule {
  readonly _phoneRE: RegExp;
  readonly _emailRE: RegExp;

  checkRe: (re: RegExp) => (checkedStr: string) => boolean;
  checkLength: (min: number, max: number) => (str: string) => boolean;
  check: (checkType: CheckType) => (checkedStr: string) => boolean;
  [prop: string]: any
}

type CheckType = 'phone' | 'email';
```

## checkRe
#### Describe
```js
(re: RegExp) => (checkedStr: string) => boolean;
```

#### Arguments
  - re(RegExp)

#### Returns
(```(checkedStr: string) => boolean```)

#### Example
```js
const checkFunction = utils.verification.checkRe(/<[\s\S]*?(script)[\s\S]*?>/);

checkFunction('<script></script>');  // true
checkFunction('<script src="src/script.js"></script>');  // true
checkFunction('<script src="src/script.js"/>');  // true
```

## checkLength
#### Describe
```js
(min: number, max: number) => (str: string) => boolean;
```

#### Arguments
  - min(number)
  - max(number)

#### Returns
(```(str: string) => boolean```)

#### Example
```js
const checkStringLength = utils.verification.checkLength(1, 5);

checkStringLength('windlike');  // false
checkStringLength('wind');  // true
```

## check
#### Describe
```js
type CheckType = 'phone' | 'email';

(checkType: CheckType) => (checkedStr: string) => boolean;
```

#### Arguments
  - checkType(CheckType): 'phone' | 'email'

#### Returns
(```(checkedStr: string) => boolean```)

#### Example
```js
const checkPhone = utils.verification.check('phone');
const checkEmail = utils.verification.check('email');

checkPhone('13800000000');  // true
checkEmail('windlike@windlike.com');  // true
```