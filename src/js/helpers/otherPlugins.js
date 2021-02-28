// Toggle Other Plugins display
const otherPluginsClick = () => {
	let otherPluginsDiv = document.getElementById('gbm-other-plugins');
	if (!otherPluginsDiv) {
		return false;
	}
	if (otherPluginsDiv.style.display === 'block') {
		otherPluginsDiv.style.display = 'none';
	} else {
		otherPluginsDiv.style.display = 'block';
	}
	let container = document.getElementById('gbm-container');
	container.focus();
};

const otherPluginsBtn = document.getElementById('otherPlugins');
const otherPluginsClose = document.getElementById('otherPluginsClose');
if (otherPluginsBtn) {
	otherPluginsBtn.addEventListener('click', otherPluginsClick);
	otherPluginsClose.addEventListener('click', otherPluginsClick);
}
