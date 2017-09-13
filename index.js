'use strict';
const assert = require('assert');
const Conf = require('conf');
const Subject = require('rxjs/Subject').Subject;
require('rxjs/add/operator/distinctUntilChanged');		// eslint-disable-line import/no-unassigned-import

class CacheConf extends Conf {

	constructor(opts) {
		super(opts);

		this._subjects = new Map();
	}

	set(key, val) {
		const onChange = key => {
			const subject = this._subjects.get(key);

			if (subject) {
				subject.next(this.get(key));
			}
		};

		if (typeof key === 'object') {
			for (const k of Object.keys(key)) {
				super.set(k, key[k]);
				onChange(k);
			}
		} else {
			super.set(key, val);
			onChange(key);
		}
	}

	select(key) {
		if (typeof key !== 'string') {
			throw new TypeError(`Expected \`key\` to be of type \`string\`, got \`${typeof key}\``);
		}

		let subject = this._subjects.get(key);

		if (!subject) {
			subject = new Subject();
			this._subjects.set(key, subject);
		}

		return subject
			.asObservable()
			.distinctUntilChanged((a, b) => {
				try {
					assert.deepEqual(a, b);
					return true;
				} catch (err) {
					return false;
				}
			});
	}
}

module.exports = CacheConf;
