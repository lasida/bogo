export const createShortcode = attributes => {
	let shortcode = `[bogo]`;

	if ('suggestion' === attributes.view || 'dropdown' === attributes.view) {
		shortcode = shortcode.replace(/\]$/,
			` view="${attributes.view}"]`
		);

		if ('dropdown' === attributes.view && attributes.displayMode && attributes.displayMode !== 'text-only') {
			shortcode = shortcode.replace(/\]$/,
				` display_mode="${attributes.displayMode}"]`
			);
		}
	}

	return shortcode;
};
