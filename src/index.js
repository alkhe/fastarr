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
				buffer.splice(freeIndex, 1);
				indexBuffer.push(freeIndex);
			}
		},
		buffer
	};
}
