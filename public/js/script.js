// Add to Comparison View logic
function addToComparison(inv_id) {
	let comparison = JSON.parse(localStorage.getItem('comparisonItems')) || [];
	if (comparison.length >= 2) {
		alert('You can only compare two vehicles at a time.');
		return;
	}
	if (comparison.includes(inv_id)) {
		alert('This vehicle is already selected for comparison.');
		return;
	}
	comparison.push(inv_id);
	localStorage.setItem('comparisonItems', JSON.stringify(comparison));
	if (comparison.length === 2) {
		// Redirect to versus page with both IDs as route params
		window.location.href = `/inv/versus/${comparison[0]}/${comparison[1]}`;
	} else {
		alert('Select one more vehicle to compare.');
	}
}
