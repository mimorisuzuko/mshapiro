# mshapiro

Multivariate Shapiro Wilk test in JavaScript through R

```js
const mshapiro = require('./');

(async () => {
	// Multivariate
	await mshapiro([
		[...],
		[...]
	]);

	// Univariate
	await mshapiro([...]);
})().catch(console.error);
```