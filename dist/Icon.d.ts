import { default as React } from 'react';
import type { Factory } from '@cssfn/types';
import type { Cust } from '@cssfn/css-types';
import { StyleCollection } from '@cssfn/cssfn';
import { ElementProps } from '@nodestrap/element';
import { ThemeName, ThemeVariant, MildVariant } from '@nodestrap/basic';
import fontItems from './Icon-font-material.js';
export declare type SizeName = 'sm' | 'nm' | 'md' | 'lg' | '1em' | (string & {});
export declare const isSize: (sizeName: SizeName, styles: StyleCollection) => import("@cssfn/cssfn").RuleEntry;
/**
 * Uses basic sizes.
 * For example: `sm`, `lg`.
 * @param factory Customize the callback to create sizing definitions for each size in `options`.
 * @param options Customize the size options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents sizing definitions for each size in `options`.
 */
export declare const usesSizeVariant: (sizeOverwrite?: Cust.Ref | undefined, factory?: (sizeName: SizeName) => StyleCollection, options?: SizeName[]) => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<import("@nodestrap/basic").SizeVars>, import("@cssfn/css-var").ReadonlyDecls<import("@nodestrap/basic").SizeVars>];
/**
 * Creates sizing definitions for the given `sizeName`.
 * @param sizeName The given size name written in camel case.
 * @returns A `StyleCollection` represents sizing definitions for the given `sizeName`.
 */
export declare const sizeOf: (sizeName: SizeName) => StyleCollection;
/**
 * Gets the all available size options.
 * @returns A `SizeName[]` represents the all available size options.
 */
export declare const sizeOptions: () => SizeName[];
export interface SizeVariant {
    size?: SizeName;
}
export declare const useSizeVariant: (props: SizeVariant) => {
    class: string | null;
};
/**
 * Uses theme colors.
 * For example: `primary`, `secondary`, `danger`, `success`, etc.
 * @param factory Customize the callback to create color definitions for each color in `options`.
 * @param options Customize the color options.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents color definitions for each color in `options`.
 */
export declare const usesThemeVariant: (factory?: Factory<StyleCollection> | undefined, options?: ThemeName[] | undefined) => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<import("@nodestrap/basic").ThemeVars>, import("@cssfn/css-var").ReadonlyDecls<import("@nodestrap/basic").ThemeVars>];
/**
 * Uses toggleable mildification.
 * @param factory Customize the callback to create mildification definitions for each toggle state.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents toggleable mildification definitions.
 */
export declare const usesMildVariant: (factory?: Factory<StyleCollection> | undefined) => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<import("@nodestrap/basic").MildVars>, import("@cssfn/css-var").ReadonlyDecls<import("@nodestrap/basic").MildVars>];
/**
 * Uses foreground color (icon color).
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents foreground color definitions.
 */
export declare const usesForeg: (foregOverwrite?: Cust.Ref | undefined) => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<import("@nodestrap/basic").ForegVars>, import("@cssfn/css-var").ReadonlyDecls<import("@nodestrap/basic").ForegVars>];
export interface IconColorVars {
    /**
     * final icon color.
     */
    iconCol: any;
    /**
     * toggles on icon color - at mild variant.
     */
    iconColMildTg: any;
}
/**
 * Uses icon color.
 * @returns A `[Factory<StyleCollection>, ReadonlyRefs, ReadonlyDecls]` represents icon color definitions.
 */
export declare const usesIconColor: () => readonly [() => StyleCollection, import("@cssfn/css-var").ReadonlyRefs<IconColorVars>, import("@cssfn/css-var").ReadonlyDecls<IconColorVars>];
/**
 * Merges two specified url to final url.
 * @param base The relative or absolute base url.
 * @param target The relative or absolute target url.
 * @returns A final url.
 * If `target` is an absolute url, the `base` discarded.
 * Otherwise, the combination of `base` url followed by `target` url.
 */
export declare const concatUrl: (base: string, target: string) => string;
/**
 * Gets the file format based on the extension of the specified `fileName`.
 * @param fileName The name of the file to retrieve.
 * @returns
 * A `string` represents the file format.
 * -or-
 * `null` if the format file is unknown.
 */
export declare const formatOf: (fileName: string) => string | null;
export interface IconVars {
    /**
     * Icon's image url or icon's name.
     */
    img: any;
}
export declare const usesIconLayout: () => StyleCollection;
export declare const usesIconFontLayout: (img?: Cust.Ref | undefined) => StyleCollection;
export declare const usesIconImageLayout: (img?: Cust.Ref | undefined) => StyleCollection;
export declare const usesIconVariants: () => StyleCollection;
export declare const usesIconImage: (img: Cust.Ref, foregOverwrite?: Cust.Ref | undefined, sizeOverwrite?: Cust.Ref | undefined) => StyleCollection;
export declare const useIconSheet: Factory<import("jss").Classes<"main">>;
export declare const useIcon: <TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>) => {
    class: string | null;
    style: {
        [x: string]: string | undefined;
    };
    children: React.ReactNode;
};
export declare const cssProps: import("@cssfn/css-config").Refs<{
    size: string;
    sizeSm: (string | number)[][];
    sizeMd: (string | number)[][];
    sizeLg: (string | number)[][];
    size1em: string;
    transition: Cust.Ref;
    foreg: string;
    sizeNm: string;
}>, cssDecls: import("@cssfn/css-config").Decls<{
    size: string;
    sizeSm: (string | number)[][];
    sizeMd: (string | number)[][];
    sizeLg: (string | number)[][];
    size1em: string;
    transition: Cust.Ref;
    foreg: string;
    sizeNm: string;
}>, cssVals: import("@cssfn/css-config").Vals<{
    size: string;
    sizeSm: (string | number)[][];
    sizeMd: (string | number)[][];
    sizeLg: (string | number)[][];
    size1em: string;
    transition: Cust.Ref;
    foreg: string;
    sizeNm: string;
}>, cssConfig: import("@cssfn/css-config").CssConfigSettings;
export declare const config: {
    font: {
        /**
         * A `url directory` pointing to the collection of the icon's fonts.
         * It's the `front-end url`, not the physical path on the server.
         */
        path: string;
        /**
         * A list of icon's fonts with extensions.
         * The order does matter. Place the most preferred file on the first.
         */
        files: string[];
        /**
         * A list of valid icon-font's content.
         */
        items: string[];
        /**
         * The css style of icon-font to be loaded.
         */
        style: StyleCollection;
    };
    img: {
        /**
         * A `url directory` pointing to the collection of the icon's images.
         * It's the `front-end url`, not the physical path on the server.
         */
        path: string;
        /**
         * A list of icon's images with extensions.
         * The order doesn't matter, but if there are any files with the same name but different extensions, the first one will be used.
         */
        files: string[];
    };
};
declare type CustomIconList = 'instagram' | 'whatsapp' | 'close' | 'busy' | 'prev' | 'next' | 'dropdown' | 'dropright' | 'dropleft';
export declare type IconList = CustomIconList | ((typeof fontItems)[number]) | (string & {});
export interface IconProps<TElement extends HTMLElement = HTMLElement> extends ElementProps<TElement>, SizeVariant, ThemeVariant, MildVariant {
    icon: IconList;
}
export declare function Icon<TElement extends HTMLElement = HTMLElement>(props: IconProps<TElement>): JSX.Element;
export { Icon as default };
