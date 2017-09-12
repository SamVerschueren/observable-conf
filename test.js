import test from 'ava';
import tempy from 'tempy';
import Conf from '.';

test.beforeEach(t => {
	t.context.conf = new Conf({cwd: tempy.directory()});
});

test('key should be a string', t => {
	t.throws(() => t.context.conf.select(), 'Expected `key` to be of type `string`, got `undefined`');
});

test('subscribe to change', t => {
	t.plan(1);

	t.context.conf.select('foo').subscribe(value => {
		t.is(value, '🦄');
	});

	t.context.conf.set('foo', '🦄');
});

test('do not emit if value does not change', t => {
	t.plan(2);

	let counter = 0;

	t.context.conf.select('foo').subscribe(value => {
		t.is(value, counter === 0 ? '🦄' : '🌈');
		counter++;
	});

	t.context.conf.set('foo', '🦄');
	t.context.conf.set('foo', '🦄');
	t.context.conf.set('foo', '🌈');
});

test('set with object', t => {
	t.plan(1);

	t.context.conf.select('foo').subscribe(value => {
		t.is(value, '🦄');
	});

	t.context.conf.set({
		foo: '🦄'
	});
});

test('set an object', t => {
	t.plan(1);

	t.context.conf.select('foo').subscribe(value => {
		t.deepEqual(value, {foo: 'bar'});
	});

	t.context.conf.set('foo', {
		foo: 'bar'
	});
});
