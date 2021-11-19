// react:
import { default as React, useMemo, } from 'react'; // base technology of our nodestrap components
import { 
// compositions:
composition, mainComposition, imports, 
// layouts:
layout, vars, children, 
// rules:
rules, variants, rule, fontFace, } from '@cssfn/cssfn'; // cssfn core
import { 
// hooks:
createUseSheet, } from '@cssfn/react-cssfn'; // cssfn for react
import { createCssVar, fallbacks, } from '@cssfn/css-var'; // Declares & retrieves *css variables* (css custom properties).
import { createCssConfig, 
// utilities:
usesGeneralProps, usesSuffixedProps, overwriteProps, } from '@cssfn/css-config'; // Stores & retrieves configuration using *css custom properties* (css variables)
// nodestrap utilities:
import { 
// styles:
fillTextLineHeightLayout, } from '@nodestrap/layouts';
// nodestrap components:
import { Element, } from '@nodestrap/element';
import { 
// hooks:
isSize as basicIsSize, usesSizeVariant as basicUsesSizeVariant, useSizeVariant as basicUseSizeVariant, usesThemeVariant as basicUsesThemeVariant, useThemeVariant, usesOutlinedVariant, notMild, isMild, usesMildVariant as basicUsesMildVariant, useMildVariant, usesForeg as basicUsesForeg, 
// configs:
cssProps as bcssProps, } from '@nodestrap/basic';
import fontItems from './Icon-font-material';
export const isSize = (sizeName, styles) => basicIsSize(sizeName, styles);
/**
 * Uses basic sizes.
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export const usesSizeVariant = (sizeOverwrite, factory = sizeOf, options = sizeOptions()) => {
    // dependencies:
    const [sizes, sizeRefs, sizeDecls, ...restSizes] = basicUsesSizeVariant(factory, options);
    return [
        () => sizeOverwrite ? composition([
            vars({
                [cssDecls.size]: ((sizeOverwrite !== cssProps.size) ? sizeOverwrite : null),
            }),
        ]) : sizes(),
        sizeRefs,
        sizeDecls,
        ...restSizes,
    ];
};
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `StyleCollection` represents sizing definitions for the given `sizeName`.
 */
export const sizeOf = (sizeName) => composition([
    layout({
        // overwrites propName = propName{SizeName}:
        ...overwriteProps(cssDecls, usesSuffixedProps(cssProps, sizeName)),
    }),
]);
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export const sizeOptions = () => ['sm', 'nm', 'md', 'lg', '1em'];
export const useSizeVariant = (props) => basicUseSizeVariant(props);
//#endregion sizes
// colors:
//#region themes
/**
 * Uses theme colors.
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export const usesThemeVariant = (factory, options) => {
    // dependencies:
    const [themes, themeRefs, themeDecls, ...restThemes] = basicUsesThemeVariant(factory, options);
    return [
        () => composition([
            imports([
                themes(),
            ]),
            vars({
                // delete unused imported vars:
                [themeDecls.foreg]: null,
                [themeDecls.border]: null,
                [themeDecls.foregOutlined]: null,
                [themeDecls.foregMild]: null,
                [themeDecls.focus]: null,
            }),
            vars({
                // prevent theme from inheritance, so the Icon always use currentColor if the theme is not set
                [themeDecls.backg]: 'initial',
                [themeDecls.backgMild]: 'initial',
            }),
        ]),
        themeRefs,
        themeDecls,
        ...restThemes,
    ];
};
//#endregion themes
//#region mild
/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export const usesMildVariant = (factory) => {
    // dependencies:
    const [mild, mildRefs, mildDecls, ...restMild] = basicUsesMildVariant(factory);
    const [, themeRefs] = usesThemeVariant();
    return [
        () => composition([
            imports([
                mild(),
            ]),
            vars({
                // delete unused imported vars:
                [mildDecls.foregFn]: null,
            }),
            vars({
                [mildDecls.backgFn]: fallbacks(
                // themeRefs.backgMildImpt,  // first  priority
                themeRefs.backgMild, // second priority
                // themeRefs.backgMildCond,  // third  priority
                cssProps.foreg),
            }),
        ]),
        mildRefs,
        mildDecls,
        ...restMild,
    ];
};
//#endregion mild
//#region foreg
/**
 * Uses foreground color (icon color).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export const usesForeg = (foregOverwrite) => {
    // dependencies:
    const [foreg, foregRefs, foregDecls, ...restForeg] = basicUsesForeg();
    const [, themeRefs] = usesThemeVariant();
    const [, mildRefs] = usesMildVariant();
    return [
        () => foregOverwrite ? composition([
            vars({
                [foregDecls.foreg]: ((foregOverwrite !== foregRefs.foreg) ? foregOverwrite : null),
            }),
        ]) : composition([
            imports([
                foreg(),
            ]),
            vars({
                [foregDecls.foregFn]: fallbacks(
                // themeRefs.backgImpt,  // first  priority
                themeRefs.backg, // second priority
                // themeRefs.backgCond,  // third  priority
                cssProps.foreg),
                [foregDecls.foreg]: fallbacks(
                // outlinedRefs.backgTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                mildRefs.backgTg, // toggle mild     (if `usesMildVariant()` applied)
                foregRefs.foregFn),
            }),
        ]),
        foregRefs,
        foregDecls,
        ...restForeg,
    ];
};
const [iconColorRefs, iconColorDecls] = createCssVar();
/**
 * Uses icon color.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents icon color definitions.
 */
export const usesIconColor = () => {
    // dependencies:
    const [, outlinedRefs] = usesOutlinedVariant();
    const [, foregRefs] = usesForeg();
    return [
        () => composition([
            vars({
                [iconColorDecls.iconCol]: fallbacks(outlinedRefs.foregTg, // toggle outlined (if `usesOutlinedVariant()` applied)
                iconColorRefs.iconColMildTg, // toggle mild     (if `usesMildVariant()` applied)
                foregRefs.foregFn),
            }),
            variants([
                notMild([
                    vars({
                        [iconColorDecls.iconColMildTg]: 'initial',
                    }),
                ]),
                isMild([
                    vars({
                        [iconColorDecls.iconColMildTg]: outlinedRefs.foregFn,
                    }),
                ]),
            ]),
        ]),
        iconColorRefs,
        iconColorDecls,
    ];
};
//#endregion icon color
// utilities:
/**
 * Merges two specified url to final url.
 * @param base The relative or absolute base url.
 * @param target The relative or absolute target url.
 * @returns A final url.
 * If `target` is an absolute url, the `base` discarded.
 * Otherwise, the combination of `base` url followed by `target` url.
 */
export const concatUrl = (base, target) => {
    const dummyUrl = new URL('http://dummy');
    const baseUrl = new URL(base, dummyUrl);
    const targetUrl = new URL(target, baseUrl);
    const result = targetUrl.href;
    if (result.startsWith(dummyUrl.origin))
        return result.substr(dummyUrl.origin.length);
    return result;
};
/**
 * Gets the file format based on the extension of the specified `fileName`.
 * @param fileName The name of the file to retrieve.
 * @returns
 * A `string` represents the file format.
 * -or-
 * `null` if the format file is unknown.
 */
export const formatOf = (fileName) => {
    if (!fileName)
        return null;
    const match = fileName.match(/(?<=\.)\w+$/)?.[0];
    if (match) {
        if (match === 'ttf')
            return 'format("truetype")';
        return `format("${match}")`;
    } // if
    return null;
};
const [iconRefs, iconDecls] = createCssVar();
export const usesIconLayout = () => {
    // dependencies:
    // colors:
    const [foreg, foregRefs] = usesForeg();
    return composition([
        imports([
            // colors:
            foreg(),
        ]),
        layout({
            // layouts:
            display: 'inline-flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'nowrap',
            // positions:
            verticalAlign: 'baseline',
            // children:
            ...children('::before', [
                imports([
                    fillTextLineHeightLayout(),
                ]),
            ]),
            // customize:
            ...usesGeneralProps(cssProps),
            // foregrounds:
            foreg: foregRefs.foreg,
        }),
    ]);
};
export const usesIconFontLayout = (img) => {
    return composition([
        rules([
            // load a custom font:
            fontFace([
                imports([
                    config.font.style, // define the font's properties
                ]),
                layout({
                    src: config.font.files.map((file) => `url("${concatUrl(config.font.path, file)}") ${formatOf(file)}`).join(','),
                }),
            ]),
        ]),
        layout({
            ...children('::after', [
                imports([
                    // use the loaded custom font:
                    config.font.style, // apply the defined font's properties
                ]),
                layout({
                    // layouts:
                    content: img ?? iconRefs.img,
                    display: 'inline',
                    // foregrounds:
                    foreg: 'currentColor',
                    // backgrounds:
                    backg: 'transparent',
                    // sizes:
                    fontSize: cssProps.size,
                    overflowY: 'hidden',
                    // accessibilities:
                    userSelect: 'none',
                    // typos:
                    lineHeight: 1,
                    textTransform: 'none',
                    letterSpacing: 'normal',
                    wordWrap: 'normal',
                    whiteSpace: 'nowrap',
                    direction: 'ltr',
                    //#region turn on available browser features
                    '-webkit-font-smoothing': 'antialiased',
                    'textRendering': 'optimizeLegibility',
                    '-moz-osx-font-smoothing': 'grayscale',
                    fontFeatureSettings: 'liga', // support for IE
                    //#endregion turn on available browser features
                }),
            ]),
        }),
    ]);
};
export const usesIconImageLayout = (img) => {
    return composition([
        layout({
            // backgrounds:
            backg: 'currentColor',
            // sizes:
            // a dummy element, for making the image's width
            ...children('img', [
                layout({
                    // layouts:
                    display: 'inline-block',
                    // appearances:
                    visibility: 'hidden',
                    // sizes:
                    blockSize: cssProps.size,
                    inlineSize: 'auto',
                    // transition:
                    transition: 'inherit',
                    // accessibilities:
                    userSelect: 'none', // disable selecting icon's img
                }),
            ]),
            // image masking:
            maskSize: 'contain',
            maskRepeat: 'no-repeat',
            maskPosition: 'center',
            maskImage: img ?? iconRefs.img, // set icon's image
        }),
    ]);
};
export const usesIconVariants = () => {
    // dependencies:
    // layouts:
    const [sizes] = usesSizeVariant();
    // colors:
    const [themes] = usesThemeVariant();
    const [mild] = usesMildVariant();
    return composition([
        imports([
            // layouts:
            sizes(),
            // colors:
            themes(),
            mild(),
        ]),
    ]);
};
export const usesIconImage = (img, foregOverwrite, sizeOverwrite) => {
    // dependencies:
    // layouts:
    const [sizes] = sizeOverwrite ? usesSizeVariant(sizeOverwrite) : [null];
    // colors:
    const [foreg, foregRefs] = foregOverwrite ? usesForeg(foregOverwrite) : [null, null];
    return composition([
        imports([
            // layouts:
            usesIconImageLayout(img),
            sizes?.(),
            // colors:
            foreg?.(),
        ]),
        (foregRefs ? layout({
            // foregrounds:
            foreg: foregRefs.foreg, // foreg => color => currentColor => backg
        }) : null),
    ]);
};
export const usesIcon = () => {
    return composition([
        imports([
            // layouts:
            usesIconLayout(),
            // variants:
            usesIconVariants(),
        ]),
        variants([
            rule('.font', [
                imports([
                    // layouts:
                    usesIconFontLayout(),
                ]),
            ]),
            rule('.img', [
                imports([
                    // layouts:
                    usesIconImageLayout(),
                ]),
            ]),
        ]),
    ]);
};
export const useIcon = (props) => {
    return useMemo(() => {
        const iconImg = (() => {
            const file = config.img.files.find((file) => file.match(/[\w-.]+(?=\.\w+$)/)?.[0] === props.icon);
            if (!file)
                return null;
            return concatUrl(config.img.path, file);
        })();
        const isIconFont = config.font.items.includes(props.icon);
        return {
            class: (() => {
                if (iconImg)
                    return 'img'; // icon name is found in iconImg
                if (isIconFont)
                    return 'font'; // icon name is found in iconFont
                return null; // icon name is not found in both iconImg & iconFont
            })(),
            style: {
                // appearances:
                [iconDecls.img]: (() => {
                    if (iconImg)
                        return `url("${iconImg}")`; // the url of the icon's image
                    if (isIconFont)
                        return `"${props.icon}"`; // the string of the icon's name
                    return undefined; // icon name is not found in both iconImg & iconFont
                })(),
            },
            children: [
                (iconImg && (<img key='ico-img' src={iconImg} alt=''/>)),
            ].filter((child) => !!child),
        };
    }, [props.icon]);
};
export const useIconSheet = createUseSheet(() => [
    mainComposition([
        imports([
            usesIcon(),
        ]),
    ]),
]);
// configs:
export const [cssProps, cssDecls, cssVals, cssConfig] = createCssConfig(() => {
    const basics = {
        foreg: 'currentColor',
        sizeNm: '24px',
    };
    return {
        ...basics,
        size: basics.sizeNm,
        sizeSm: [['calc(', basics.sizeNm, '*', 0.75, ')']],
        sizeMd: [['calc(', basics.sizeNm, '*', 1.50, ')']],
        sizeLg: [['calc(', basics.sizeNm, '*', 2.00, ')']],
        size1em: '1em',
        // animations:
        transition: bcssProps.transition,
    };
}, { prefix: 'ico' });
const config = {
    font: {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.
         * It's the `front-end url`, not the physical path on the server.
         */
        path: '/fonts/',
        /**
         * A list of icon's fonts with extensions.
         * The order does matter. Place the most preferred file on the first.
         */
        files: [
            'MaterialIcons-Regular.woff2',
            'MaterialIcons-Regular.woff',
            'MaterialIcons-Regular.ttf',
        ],
        /**
         * A list of valid icon-font's content.
         */
        items: fontItems,
        /**
         * The css style of icon-font to be loaded.
         */
        style: composition([
            layout({
                fontFamily: '"Material Icons"',
                fontWeight: 400,
                fontStyle: 'normal',
                textDecoration: 'none',
            }),
        ]),
    },
    img: {
        /**
         * A `url directory` pointing to the collection of the icon's images.
         * It's the `front-end url`, not the physical path on the server.
         */
        path: '/icons/',
        /**
         * A list of icon's images with extensions.
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files: [
            'instagram.svg',
            'whatsapp.svg',
            'close.svg',
            'busy.svg',
            'prev.svg',
            'next.svg',
            'dropdown.svg',
            'dropright.svg',
            'dropleft.svg',
        ],
    },
};
export function Icon(props) {
    // styles:
    const sheet = useIconSheet();
    // variants:
    const sizeVariant = useSizeVariant(props);
    const themeVariant = useThemeVariant(props);
    const mildVariant = useMildVariant(props);
    // appearances:
    const icon = useIcon(props);
    // jsx:
    return (<Element 
    // other props:
    {...props} 
    // semantics:
    tag={props.tag ?? 'span'} 
    // classes:
    mainClass={props.mainClass ?? sheet.main} variantClasses={[...(props.variantClasses ?? []),
            sizeVariant.class,
            themeVariant.class,
            mildVariant.class,
        ]} classes={[...(props.classes ?? []),
            // appearances:
            icon.class,
        ]} 
    // styles:
    style={{ ...(props.style ?? {}),
            // appearances:
            ...icon.style,
        }}>
            {icon.children}
            {props.children}
        </Element>);
}
export { Icon as default };
