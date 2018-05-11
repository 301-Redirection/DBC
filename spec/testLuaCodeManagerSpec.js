const { lcm } = require('../server/LuaCodeManager.js');

describe('Lua Code Manager tests', () => {
    beforeEach(() => {
        lcm.reset();
    });

    it('test one helper function added', () => {
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n');
    });
    it('test two helper functions added', () => {
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction2');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\n');
    });
    it('test the same helper function added multiple times', () => {
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n');
    });
    it('test a helper function added multiple times and another function involved', () => {
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\n');
    });
    it('test an API function with just a middle', () => {
        lcm.addToAPIFunction('test', 'middle code');

        expect(lcm.generate()).toBe('function test()\n    middle code\nend\n\n');
    });
    it('test an API function with a middle and start forwards', () => {
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToAPIFunction('test', 'middle code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\nend\n\n');
    });
    it('test an API function with a middle and start backwards', () => {
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\nend\n\n');
    });
    it('test an API function with a start, middle and end forwards', () => {
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToEndAPIFunction('test', 'end code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with a start, middle and end backwards', () => {
        lcm.addToEndAPIFunction('test', 'end code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with lots of things one', () => {
        lcm.addToEndAPIFunction('test', 'end code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    middle code\n    middle code\n    middle code\n    end code\nend\n\n');
    });
    it('test an API function with lots of things two', () => {
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToStartAPIFunction('test', 'start code');

        lcm.addToStartAPIFunction('test2', 'start code');
        lcm.addToEndAPIFunction('test2', 'end code');

        expect(lcm.generate()).toBe('function test()\n    start code\n    start code\n    middle code\nend\n\nfunction test2()\n    start code\n    end code\nend\n\n');
    });
    it('test an API function and helper function together', () => {
        lcm.addToAPIFunction('test', 'middle code');
        lcm.addToStartAPIFunction('test', 'start code');
        lcm.addToStartAPIFunction('test', 'start code');

        lcm.addToStartAPIFunction('test2', 'start code');
        lcm.addToEndAPIFunction('test2', 'end code');

        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction2');
        lcm.addHelperFunction('testHelperFunction');
        lcm.addHelperFunction('testHelperFunction');

        expect(lcm.generate()).toBe('-- nothing to see here\n\n-- Other snippet\n\nfunction test()\n    start code\n    start code\n    middle code\nend\n\nfunction test2()\n    start code\n    end code\nend\n\n');
    });
});
