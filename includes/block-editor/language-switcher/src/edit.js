import { __ } from '@wordpress/i18n';
import { useBlockProps, BlockControls } from '@wordpress/block-editor';
import { ToolbarDropdownMenu, Dashicon } from '@wordpress/components';

import { formatListBullets, tip, chevronDown } from '@wordpress/icons';

export default function LanguageSwitcher({ attributes, setAttributes }) {

	const ListPreview = () => {
		const listItems = Object.entries(
			bogo?.availableLanguages ?? {}
		).map(([locale, language]) => {
			return (
				<li key={locale} className={language.tags.join(' ')}>
					<span className="bogo-language-name">
						{language.nativename ?? locale}
					</span>
				</li>
			);
		});

		return (
			<ul className="bogo-language-switcher">
				{listItems}
			</ul>
		);
	};

	const SuggestionPreview = () => {
		return (
			<p>{__("This page is also available in XXX.", 'bogo')}</p>
		);
	};

	const DropdownPreview = () => {
		const currentLanguage = Object.entries(
			bogo?.availableLanguages ?? {}
		).find(([locale]) => locale === bogo?.currentLocale);

		const displayName = currentLanguage
			? currentLanguage[1].nativename || currentLanguage[0]
			: __('Select Language', 'bogo');

		return (
			<div className="bogo-language-switcher-dropdown-wrapper">
				<select className="bogo-language-switcher-dropdown" disabled value="">
					<option value="">{displayName}</option>
				</select>
			</div>
		);
	};

	const blockProps = useBlockProps({
		className: 'components-placeholder',
		style: {
			minHeight: '60px',
			marginTop: '28px',
			marginBottom: '28px',
			paddingLeft: '28px',
		},
	});

	return (
		<>
			<BlockControls group="block">
				<ToolbarDropdownMenu
					label={__('Switch view', 'bogo')}
					icon={
						attributes.view === 'suggestion'
							? tip
							: attributes.view === 'dropdown'
								? chevronDown
								: formatListBullets
					}
					controls={[
						{
							title: __('List view', 'bogo'),
							icon: formatListBullets,
							onClick: () => setAttributes({
								view: 'list',
							}),
						},
						{
							title: __('Dropdown view', 'bogo'),
							icon: chevronDown,
							onClick: () => setAttributes({
								view: 'dropdown',
							}),
						},
						{
							title: __('Suggestion view', 'bogo'),
							icon: tip,
							onClick: () => setAttributes({
								view: 'suggestion',
							}),
						},
					]}
				/>
			</BlockControls>
			<div {...blockProps}>
				{
					attributes.view === 'suggestion'
						? <SuggestionPreview />
						: attributes.view === 'dropdown'
							? <DropdownPreview />
							: <ListPreview />
				}
			</div>
		</>
	);
}

