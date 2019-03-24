const { exec } = require('child_process');

/**
 * @param {number[][]|number[]|string[]|string[][]} args
 */
const f = async (args) => {
	const { stdout } = await new Promise((resolve, reject) => {
		const script =
			typeof args[0] === 'number' || typeof args[0] === 'string'
				? `c(${args.join(', ')})`
				: args.map((a) => `c(${a.join(', ')})`).join(', ');

		exec(
			`Rscript -e "library(mvnormtest);x<-rbind(${script});mshapiro.test(x);"`,
			(err, stdout, stderr) => {
				if (err) {
					reject(err);
				} else {
					resolve({ stdout, stderr });
				}
			}
		);
	});

	const [, w, p] = stdout.match(/\s+W = (.+), p-value = (.+)\s+/);

	return {
		w: parseFloat(w),
		p: parseFloat(p)
	};
};

module.exports = f;
