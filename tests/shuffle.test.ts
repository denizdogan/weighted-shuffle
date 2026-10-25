import {
	afterEach,
	beforeEach,
	describe,
	expect,
	expectTypeOf,
	test,
	vi,
} from "vitest";

import { Direction, shuffle } from "../src/index.ts";

const arrayInput = [
	["a", 1],
	["b", 2],
	["c", 4],
	["d", 8],
] as const;
const objectInput = { a: 1, b: 2, c: 4, d: 8 };
const outputAsc = ["a", "c", "d", "b"];
const outputDesc = ["b", "d", "c", "a"];
const scoresAsc = [
	["a", 0.0625],
	["c", 0.25],
	["d", 0.5],
	["b", 0.75],
];
const scoresDesc = [
	["b", 0.75],
	["d", 0.5],
	["c", 0.25],
	["a", 0.0625],
];

describe("shuffling", () => {
	beforeEach(() => {
		// These draws yield exact scores of 1/16, 3/4, 1/4, and 1/2.
		vi.spyOn(Math, "random")
			.mockImplementation(() => {
				throw new Error("Unexpected random draw");
			})
			.mockReturnValueOnce(1 / 16)
			.mockReturnValueOnce(9 / 16)
			.mockReturnValueOnce(1 / 256)
			.mockReturnValueOnce(1 / 256);
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	test("object, ascending", () => {
		const output: string[] = shuffle(objectInput);
		expect(output).toEqual(outputAsc);
	});

	test("object, descending", () => {
		const output: string[] = shuffle(objectInput, {
			direction: Direction.desc,
		});
		expect(output).toEqual(outputDesc);
	});

	test("array, ascending", () => {
		const output: ("a" | "b" | "c" | "d")[] = shuffle(arrayInput);
		expect(output).toEqual(outputAsc);
	});

	test("array, descending", () => {
		const output = shuffle(arrayInput, { direction: Direction.desc });
		expect(output).toEqual(outputDesc);
	});

	test.each([Direction.asc, Direction.desc])("map, %s", (direction) => {
		const input = new Map(arrayInput);
		const output: ("a" | "b" | "c" | "d")[] = shuffle(input, { direction });
		expect(output).toEqual(
			direction === Direction.asc ? outputAsc : outputDesc,
		);
		expect([...input]).toEqual(arrayInput);
	});

	test("readonly map preserves object keys", () => {
		const first = { id: 1 };
		const second = { id: 2 };
		const input: ReadonlyMap<{ id: number }, number> = new Map([
			[first, 1],
			[second, 2],
		]);
		const output: { id: number }[] = shuffle(input);
		expect(output).toEqual([first, second]);
		expect(output[0]).toBe(first);
		expect(output[1]).toBe(second);
		expect([...input]).toEqual([
			[first, 1],
			[second, 2],
		]);
	});

	test.each([Direction.asc, Direction.desc])("set, %s", (direction) => {
		const input: ReadonlySet<(typeof arrayInput)[number]> = new Set(arrayInput);
		const output: ("a" | "b" | "c" | "d")[] = shuffle(input, { direction });
		expect(output).toEqual(
			direction === Direction.asc ? outputAsc : outputDesc,
		);
		expect([...input]).toEqual(arrayInput);
	});

	test("generator inputs are consumed", () => {
		function* entries() {
			yield* arrayInput;
		}
		const input = entries();
		const output: ("a" | "b" | "c" | "d")[] = shuffle(input);
		expect(output).toEqual(outputAsc);
		expect(input.next().done).toBe(true);
	});

	test.each([Direction.asc, Direction.desc])(
		"include scores, %s",
		(direction) => {
			const output: [string, number][] = shuffle(objectInput, {
				direction,
				includeScores: true,
			});
			expect(output).toEqual(
				direction === Direction.asc ? scoresAsc : scoresDesc,
			);
		},
	);

	test("scored output preserves literal values and accepts readonly options", () => {
		const options = Object.freeze({
			direction: Direction.desc,
			includeScores: true,
		} as const);
		const output: ["a" | "b" | "c" | "d", number][] = shuffle(
			arrayInput,
			options,
		);
		expect(output).toEqual(scoresDesc);
		expect(options).toEqual({ direction: Direction.desc, includeScores: true });
	});

	test.each([
		{},
		{ includeScores: false },
		{ direction: Direction.asc },
	] as const)(
		"default options %j return values in ascending order",
		(options) => {
			const output: string[] = shuffle(objectInput, options);
			expect(output).toEqual(outputAsc);
		},
	);

	test.each([false, true])("dynamic includeScores %s", (includeScores) => {
		const output = shuffle(objectInput, { includeScores });
		expectTypeOf(output).toEqualTypeOf<string[] | [string, number][]>();
		expect(output).toEqual(includeScores ? scoresAsc : outputAsc);
	});

	test.each([undefined, true] as const)(
		"optional includeScores %s",
		(includeScores) => {
			const options: { includeScores?: true } = { includeScores };
			const output = shuffle(objectInput, options);
			expectTypeOf(output).toEqualTypeOf<string[] | [string, number][]>();
			expect(output).toEqual(includeScores ? scoresAsc : outputAsc);
		},
	);

	test("empty map -> empty output", () => {
		expect(shuffle(new Map<string, number>())).toEqual([]);
	});

	test("empty set -> empty output", () => {
		expect(shuffle(new Set<readonly [string, number]>())).toEqual([]);
	});

	test("empty array -> empty output", () => {
		expect(shuffle([])).toEqual([]);
	});

	test("empty object -> empty output", () => {
		expect(shuffle({})).toEqual([]);
	});

	test("only enumerable properties are included", () => {
		const input = {};
		Object.defineProperty(input, "a", { value: 1, enumerable: true });
		Object.defineProperty(input, "b", { value: 2 });
		const output = shuffle(input);
		expect(output).toHaveLength(1);
		expect(output[0]).toEqual("a");
	});

	test("objects with non-callable iterator properties use their entries", () => {
		expect(shuffle({ a: 1, [Symbol.iterator]: 0 })).toEqual(["a"]);
	});

	test("strongly typed", () => {
		// @ts-expect-error
		const output: string[] = shuffle([[{ name: "Maurine" }, 713]]);
		expect(output).toHaveLength(1);
	});
});
