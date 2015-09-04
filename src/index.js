export default () => {
	let counter = 0,
		buffer = [],
		indexBuffer = [];

	return {
		add(value) {
			let freeIndex = indexBuffer.pop();
			if (freeIndex === undefined) {
				freeIndex = counter++;
			}
			buffer[freeIndex] = value;

			return () => {
				buffer[freeIndex] = undefined;
				indexBuffer.unshift(freeIndex);
			}
		},
		buffer
	};
}
