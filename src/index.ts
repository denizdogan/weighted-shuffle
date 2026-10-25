type ObjectInput = Record<string, number>;

type IterableInput<T = unknown> = Iterable<readonly [T, number]>;
type InputValue<T> = T extends IterableInput<infer Value> ? Value : string;

type Options = {
	direction?: "asc" | "desc";
	includeScores?: boolean;
};

export default function shuffle<T extends ObjectInput | IterableInput>(
	input: T,
	options: Options & { includeScores: true },
): [InputValue<T>, number][];
export default function shuffle<T extends ObjectInput | IterableInput>(
	input: T,
	options?: Options & { includeScores?: false },
): InputValue<T>[];
export default function shuffle<T extends ObjectInput | IterableInput>(
	input: T,
	options: Options,
): InputValue<T>[] | [InputValue<T>, number][];
export default function shuffle(
	input: ObjectInput | IterableInput,
	options: Options = {},
): unknown[] {
	const direction = options.direction ?? "asc";
	const entries: IterableInput =
		Symbol.iterator in input && typeof input[Symbol.iterator] === "function"
			? input
			: Object.entries(input);
	const tuples = Array.from(entries, ([value, weight]): [unknown, number] => [
		value,
		Math.random() ** (1 / weight),
	]);
	tuples.sort(
		direction === "desc" ? (a, b) => b[1] - a[1] : (a, b) => a[1] - b[1],
	);
	return options.includeScores ? tuples : tuples.map(([value]) => value);
}

export { shuffle };
