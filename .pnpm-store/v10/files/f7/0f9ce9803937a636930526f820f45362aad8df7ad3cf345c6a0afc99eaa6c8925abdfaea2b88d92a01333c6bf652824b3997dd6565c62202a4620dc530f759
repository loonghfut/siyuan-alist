// Copyright (C) 2023 SiYuan Community
//
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <https://www.gnu.org/licenses/>.

// #region content

/**
 * Get the full configuration of the workspace
 */
export interface IResponse {
    /**
     * status code
     */
    readonly code: number;
    readonly data: IData;
    /**
     * status message
     */
    readonly msg: string;
}

/**
 * response data
 */
export interface IData {
    readonly conf: IConf;
    /**
     * Whether it is in publish mode
     */
    readonly isPublish: boolean;
    /**
     * Whether the user interface is not loaded
     */
    readonly start: boolean;
}

/**
 * Configuration object
 */
export interface IConf {
    /**
     * Access authorization code
     */
    readonly accessAuthCode: TAccessAuthCode;
    readonly account: IAccount;
    readonly ai: Iai;
    readonly api: IAPI;
    readonly appearance: IAppearance;
    readonly bazaar: IBazaar;
    /**
     * Cloud Service Provider Region
     * - `0`: Chinese mainland
     * - `1`: North America
     */
    readonly cloudRegion: number;
    readonly community?: { [key: string]: any };
    /**
     * Data index status
     * - `0`: Indexed
     * - `1`: Not indexed
     */
    readonly dataIndexState: number;
    readonly editor: IEditor;
    readonly export: IExport;
    readonly fileTree: IFileTree;
    readonly flashcard: IFlashCard;
    readonly graph: IGraph;
    readonly keymap: IKeymap;
    /**
     * User interface language
     * Same as {@link IAppearance.lang}
     */
    readonly lang: TLang;
    /**
     * List of supported languages
     */
    readonly langs: ILang[];
    /**
     * A list of the IP addresses of the devices on which the kernel resides
     */
    readonly localIPs: string[];
    /**
     * Log level
     */
    readonly logLevel: TLogLevel;
    /**
     * Whether to open the user guide after startup
     */
    readonly openHelp: boolean;
    readonly publish: IPublish;
    /**
     * Whether it is running in read-only mode
     */
    readonly readonly: boolean;
    readonly repo: IRepo;
    readonly search: ISearch;
    /**
     * Whether to display the changelog for this release version
     */
    readonly showChangelog: boolean;
    readonly snippet: ISnippet;
    readonly stat: IStat;
    readonly sync: ISync;
    readonly system: ISystem;
    readonly tag: ITag;
    readonly uiLayout: IUILayout;
    /**
     * Community user data (Encrypted)
     */
    readonly userData: string;
}

/**
 * Access authorization code
 */
export type TAccessAuthCode = "" | "*******";

/**
 * Account configuration
 */
export interface IAccount {
    /**
     * Display the title icon
     */
    readonly displayTitle: boolean;
    /**
     * Display the VIP icon
     */
    readonly displayVIP: boolean;
}

/**
 * Artificial Intelligence (AI) related configuration
 */
export interface Iai {
    readonly openAI: IOpenAI;
}

/**
 * Open AI related configuration
 */
export interface IOpenAI {
    /**
     * API base URL
     */
    readonly apiBaseURL: string;
    /**
     * API key
     */
    readonly apiKey: string;
    /**
     * The maximum number of contexts passed when requesting the API
     */
    readonly apiMaxContexts: number;
    /**
     * Maximum number of tokens (0 means no limit)
     */
    readonly apiMaxTokens: number;
    /**
     * The model name called by the API
     */
    readonly apiModel: string;
    /**
     * API Provider
     */
    readonly apiProvider: TOpenAIAPIProvider;
    /**
     * API request proxy address
     */
    readonly apiProxy: string;
    /**
     * Parameter `temperature` that controls the randomness of the generated text
     */
    readonly apiTemperature: number;
    /**
     * API request timeout (unit: seconds)
     */
    readonly apiTimeout: number;
    /**
     * API request additional user agent field
     */
    readonly apiUserAgent: string;
    /**
     * API version number
     */
    readonly apiVersion: string;
}

/**
 * API Provider
 */
export type TOpenAIAPIProvider = "Azure" | "OpenAI";

/**
 * SiYuan API related configuration
 */
export interface IAPI {
    /**
     * API Token
     */
    readonly token: string;
}

/**
 * SiYuan appearance related configuration
 */
export interface IAppearance {
    /**
     * Close button behavior
     * - `0`: Exit application
     * - `1`: Minimize to pallets
     */
    readonly closeButtonBehavior: number;
    /**
     * Dark code block theme
     */
    readonly codeBlockThemeDark: string;
    /**
     * Light code block theme
     */
    readonly codeBlockThemeLight: string;
    /**
     * List of installed dark themes
     */
    readonly darkThemes: IAppearanceThemeItem[];
    /**
     * Whether to hide status bar
     */
    readonly hideStatusBar: boolean;
    /**
     * The name of the icon currently in use
     */
    readonly icon: string;
    /**
     * List of installed icon names
     */
    readonly icons: string[];
    /**
     * The version number of the icon currently in use
     */
    readonly iconVer: string;
    /**
     * The language used by the current user
     */
    readonly lang: TLang;
    /**
     * List of installed light themes
     */
    readonly lightThemes: IAppearanceThemeItem[];
    /**
     * The current theme mode
     * - `0`: Light theme
     * - `1`: Dark theme
     */
    readonly mode: number;
    /**
     * Whether the theme mode follows the system theme
     */
    readonly modeOS: boolean;
    /**
     * The name of the dark theme currently in use
     */
    readonly themeDark: string;
    /**
     * Whether the current theme has enabled theme JavaScript
     */
    readonly themeJS: boolean;
    /**
     * The name of the light theme currently in use
     */
    readonly themeLight: string;
    /**
     * The version number of the theme currently in use
     */
    readonly themeVer: string;
}

/**
 * Theme item
 */
export interface IAppearanceThemeItem {
    /**
     * Appearance theme label
     */
    readonly label: string;
    /**
     * Appearance theme name
     */
    readonly name: string;
}

/**
 * The language used by the current user
 *
 * User interface language
 * Same as {@link IAppearance.lang}
 */
export type TLang = "en_US" | "es_ES" | "fr_FR" | "zh_CHT" | "zh_CN";

/**
 * SiYuan bazaar related configuration
 */
export interface IBazaar {
    /**
     * Whether to disable all plug-ins
     */
    readonly petalDisabled: boolean;
    /**
     * Whether to trust (enable) the resources for the bazaar
     */
    readonly trust: boolean;
}

/**
 * SiYuan editor related configuration
 */
export interface IEditor {
    /**
     * Allow HTML blocks to run scripts
     */
    readonly allowHTMLBLockScript: boolean;
    /**
     * Whether the backlink panel contains children
     */
    readonly backlinkContainChildren: boolean;
    /**
     * The default number of backlinks to expand
     */
    readonly backlinkExpandCount: number;
    /**
     * The default number of backlinks to mention
     */
    readonly backmentionExpandCount: number;
    /**
     * The maximum length of the dynamic anchor text for block references
     */
    readonly blockRefDynamicAnchorTextMaxLen: number;
    /**
     * Whether the code block has enabled ligatures
     */
    readonly codeLigatures: boolean;
    /**
     * Whether the code block is automatically wrapped
     */
    readonly codeLineWrap: boolean;
    /**
     * Whether the code block displays line numbers
     */
    readonly codeSyntaxHighlightLineNum: boolean;
    /**
     * The number of spaces generated by the Tab key in the code block, configured as 0 means no
     * conversion to spaces
     */
    readonly codeTabSpaces: number;
    /**
     * Whether to display the bookmark icon
     */
    readonly displayBookmarkIcon: boolean;
    /**
     * Whether to display the network image mark
     */
    readonly displayNetImgMark: boolean;
    /**
     * The number of blocks loaded each time they are dynamically loaded
     */
    readonly dynamicLoadBlocks: number;
    /**
     * Whether the embedded block displays breadcrumbs
     */
    readonly embedBlockBreadcrumb: boolean;
    /**
     * Common emoji icons
     */
    readonly emoji: string[];
    /**
     * The trigger mode of the preview window
     * - `0`: Hover over the cursor
     * - `1`: Hover over the cursor while holding down Ctrl
     * - `2`: Do not trigger the floating window
     */
    readonly floatWindowMode: number;
    /**
     * The font used in the editor
     */
    readonly fontFamily: string;
    /**
     * The font size used in the editor
     */
    readonly fontSize: number;
    /**
     * Whether to enable the use of the mouse wheel to adjust the font size of the editor
     */
    readonly fontSizeScrollZoom: boolean;
    /**
     * Whether the editor uses maximum width
     */
    readonly fullWidth: boolean;
    /**
     * The time interval for generating document history, set to 0 to disable document history
     * (unit: minutes)
     */
    readonly generateHistoryInterval: number;
    /**
     * History retention days
     */
    readonly historyRetentionDays: number;
    /**
     * Whether to enable text justification
     */
    readonly justify: boolean;
    /**
     * KeTex macro definition (JSON string)
     */
    readonly katexMacros: string;
    /**
     * Whether to enable single-click list item mark focus
     */
    readonly listItemDotNumberClickFocus: boolean;
    /**
     * Whether to enable the list logical reverse indentation scheme
     */
    readonly listLogicalOutdent: boolean;
    readonly markdown: IEditorMarkdown;
    /**
     * Whether to enable the `[[` symbol to search only for document blocks
     */
    readonly onlySearchForDoc: boolean;
    /**
     * PlantUML rendering service address
     */
    readonly plantUMLServePath: string;
    /**
     * Whether to enable read-only mode
     */
    readonly readOnly: boolean;
    /**
     * Whether to enable RTL (left-to-right chirography) mode
     */
    readonly rtl: boolean;
    /**
     * Whether to enable spell checking
     */
    readonly spellcheck: boolean;
    /**
     * Whether to enable virtual references
     */
    readonly virtualBlockRef: boolean;
    /**
     * Virtual reference keyword exclusion list (separated by commas `,`)
     */
    readonly virtualBlockRefExclude: string;
    /**
     * Virtual reference keyword inclusion list (separated by commas `,`)
     */
    readonly virtualBlockRefInclude: string;
}

/**
 * Markdown syntax configuration
 */
export interface IEditorMarkdown {
    /**
     * Whether to enable asterisk syntax `*foo*` `**bar**`
     */
    readonly inlineAsterisk: boolean;
    /**
     * Whether to enable inline formula syntax `$foo$`
     */
    readonly inlineMath: boolean;
    /**
     * Whether to enable strikethrough syntax `~~foo~~`
     */
    readonly inlineStrikethrough: boolean;
    /**
     * Whether to enable subscript syntax `~foo~`
     */
    readonly inlineSub: boolean;
    /**
     * Whether to enable superscript syntax `^foo^`
     */
    readonly inlineSup: boolean;
    /**
     * Whether to enable tag syntax `#foo#`
     */
    readonly inlineTag: boolean;
    /**
     * Whether to enable underscore syntax `_foo_` `__bar__`
     */
    readonly inlineUnderscore: boolean;
}

/**
 * SiYuan export related configuration
 */
export interface IExport {
    /**
     * Add article title (insert the article title as a first-level title at the beginning of
     * the document)
     */
    readonly addTitle: boolean;
    /**
     * Embedded block export mode
     * - `0`: Original block content
     * - `1`: Quotation block
     */
    readonly blockEmbedMode: number;
    /**
     * Content block reference export mode
     * - `0`: Original text (deprecated)
     * - `1`: Quotation block (deprecated)
     * - `2`: Anchor text block link
     * - `3`: Anchor text only
     * - `4`: Footnote
     * - `5`: Anchor hash
     */
    readonly blockRefMode: number;
    /**
     * The symbol on the left side of the block reference anchor text during export
     */
    readonly blockRefTextLeft: string;
    /**
     * The symbol on the right side of the block reference anchor text during export
     */
    readonly blockRefTextRight: string;
    /**
     * The path of the template file used when exporting to Docx
     */
    readonly docxTemplate: string;
    /**
     * File annotation reference export mode
     * - `0`: File name - page number - anchor text
     * - `1`: Anchor text only
     */
    readonly fileAnnotationRefMode: number;
    /**
     * Custom watermark position, size, style, etc. when exporting to an image
     */
    readonly imageWatermarkDesc: string;
    /**
     * The watermark text or watermark file path used when exporting to an image
     */
    readonly imageWatermarkStr: string;
    /**
     * Whether to add YAML Front Matter when exporting to Markdown
     */
    readonly markdownYFM: boolean;
    /**
     * Pandoc executable file path
     */
    readonly pandocBin: string;
    /**
     * Whether the beginning of the paragraph is empty two spaces.
     * Insert two full-width spaces `U+3000` at the beginning of the paragraph.
     */
    readonly paragraphBeginningSpace: boolean;
    /**
     * Custom footer content when exporting to PDF
     */
    readonly pdfFooter: string;
    /**
     * Custom watermark position, size, style, etc. when exporting to PDF
     */
    readonly pdfWatermarkDesc: string;
    /**
     * The watermark text or watermark file path used when exporting to PDF
     */
    readonly pdfWatermarkStr: string;
    /**
     * Tag close marker symbol
     */
    readonly tagCloseMarker: string;
    /**
     * Tag start marker symbol
     */
    readonly tagOpenMarker: string;
}

/**
 * Document tree related configuration
 */
export interface IFileTree {
    /**
     * Whether to allow the creation of sub-documents deeper than 7 levels
     */
    readonly allowCreateDeeper: boolean;
    /**
     * Whether to automatically locate the currently open document in the document tree
     */
    readonly alwaysSelectOpenedFile: boolean;
    /**
     * Whether to close all tabs when starting
     */
    readonly closeTabsOnStart: boolean;
    /**
     * The notebook to storage the new document
     */
    readonly docCreateSaveBox: string;
    /**
     * The storage path of the new document
     */
    readonly docCreateSavePath: string;
    /**
     * The maximum number of documents listed
     */
    readonly maxListCount: number;
    /**
     * The maximum number of open tabs
     */
    readonly maxOpenTabCount: number;
    /**
     * Whether to open the file in the current tab
     */
    readonly openFilesUseCurrentTab: boolean;
    /**
     * The notebook to storage the new document created using block references
     */
    readonly refCreateSaveBox: string;
    /**
     * The storage path of the new document created using block references
     */
    readonly refCreateSavePath: string;
    /**
     * Close the secondary confirmation when deleting a document
     */
    readonly removeDocWithoutConfirm: boolean;
    /**
     * Document sorting method
     * - `0`: File name ascending
     * - `1`: File name descending
     * - `2`: File update time ascending
     * - `3`: File update time descending
     * - `4`: File name natural number ascending
     * - `5`: File name natural number descending
     * - `6`: Custom sorting
     * - `7`: Reference count ascending
     * - `8`: Reference count descending
     * - `9`: File creation time ascending
     * - `10`: File creation time descending
     * - `11`: File size ascending
     * - `12`: File size descending
     * - `13`: Sub-document count ascending
     * - `14`: Sub-document count descending
     * - `15`: Use document tree sorting rules
     * - `256`: Unspecified sorting rules, according to the notebook priority over the document
     * tree to obtain sorting rules
     */
    readonly sort: number;
    /**
     * Whether to save the content of the .sy file as a single-line JSON object
     */
    readonly useSingleLineSave: boolean;
}

/**
 * Flashcard related configuration
 */
export interface IFlashCard {
    /**
     * Whether to enable deck card making
     */
    readonly deck: boolean;
    /**
     * Whether to enable heading block card making
     */
    readonly heading: boolean;
    /**
     * Whether to enable list block card making
     */
    readonly list: boolean;
    /**
     * Whether to enable mark element card making
     */
    readonly mark: boolean;
    /**
     * Maximum interval days
     */
    readonly maximumInterval: number;
    /**
     * New card limit
     */
    readonly newCardLimit: number;
    /**
     * FSRS request retention parameter
     */
    readonly requestRetention: number;
    /**
     * Review card limit
     */
    readonly reviewCardLimit: number;
    /**
     * Review mode
     * - `0`: New and old mixed
     * - `1`: New card priority
     * - `2`: Old card priority
     */
    readonly reviewMode: number;
    /**
     * Whether to enable super block card making
     */
    readonly superBlock: boolean;
    /**
     * FSRS weight parameter list
     */
    readonly weights: string;
}

/**
 * SiYuan graph related configuration
 */
export interface IGraph {
    readonly global: IGraphGlobal;
    readonly local: IGraphLocal;
    /**
     * Maximum number of content blocks displayed
     */
    readonly maxBlocks: number;
}

/**
 * Global graph configuration
 */
export interface IGraphGlobal {
    readonly d3: IGraphD3;
    /**
     * Whether to display nodes in daily notes
     */
    readonly dailyNote: boolean;
    /**
     * The minimum number of references to the displayed node
     */
    readonly minRefs: number;
    readonly type: IGraphType;
}

/**
 * d3.js graph configuration
 */
export interface IGraphD3 {
    /**
     * Whether to display the arrow
     */
    readonly arrow: boolean;
    /**
     * Central gravity intensity
     */
    readonly centerStrength: number;
    /**
     * Repulsion radius
     */
    readonly collideRadius: number;
    /**
     * Repulsion intensity
     */
    readonly collideStrength: number;
    /**
     * Line opacity
     */
    readonly lineOpacity: number;
    /**
     * Link distance
     */
    readonly linkDistance: number;
    /**
     * Line width
     */
    readonly linkWidth: number;
    /**
     * Node size
     */
    readonly nodeSize: number;
}

/**
 * SiYuan node type filter
 */
export interface IGraphType {
    /**
     * Display quote block
     */
    readonly blockquote: boolean;
    /**
     * Display code block
     */
    readonly code: boolean;
    /**
     * Display heading block
     */
    readonly heading: boolean;
    /**
     * Display list block
     */
    readonly list: boolean;
    /**
     * Display list item
     */
    readonly listItem: boolean;
    /**
     * Display formula block
     */
    readonly math: boolean;
    /**
     * Display paragraph block
     */
    readonly paragraph: boolean;
    /**
     * Display super block
     */
    readonly super: boolean;
    /**
     * Display table block
     */
    readonly table: boolean;
    /**
     * Display tag
     */
    readonly tag: boolean;
}

/**
 * Local graph configuration
 */
export interface IGraphLocal {
    readonly d3: IGraphD3;
    /**
     * Whether to display nodes in daily notes
     */
    readonly dailyNote: boolean;
    readonly type: IGraphType;
}

/**
 * SiYuan keymap related configuration
 */
export interface IKeymap {
    readonly editor: IKeymapEditor;
    readonly general: IKeymapGeneral;
    readonly plugin: { [key: string]: { [key: string]: IKey } };
}

/**
 * SiYuan editor shortcut keys
 */
export interface IKeymapEditor {
    readonly general: IKeymapEditorGeneral;
    readonly heading: IKeymapEditorHeading;
    readonly insert: IKeymapEditorInsert;
    readonly list: IKeymapEditorList;
    readonly table: IKeymapEditorTable;
}

/**
 * SiYuan editor general shortcut keys
 */
export interface IKeymapEditorGeneral {
    readonly ai: IKey;
    readonly alignCenter: IKey;
    readonly alignLeft: IKey;
    readonly alignRight: IKey;
    readonly attr: IKey;
    readonly backlinks: IKey;
    readonly collapse: IKey;
    readonly copyBlockEmbed: IKey;
    readonly copyBlockRef: IKey;
    readonly copyHPath: IKey;
    readonly copyID: IKey;
    readonly copyPlainText: IKey;
    readonly copyProtocol: IKey;
    readonly copyProtocolInMd: IKey;
    readonly copyText: IKey;
    readonly duplicate: IKey;
    readonly duplicateCompletely: IKey;
    readonly exitFocus: IKey;
    readonly expand: IKey;
    readonly expandDown: IKey;
    readonly expandUp: IKey;
    readonly fullscreen: IKey;
    readonly graphView: IKey;
    readonly hLayout: IKey;
    readonly insertAfter: IKey;
    readonly insertBefore: IKey;
    readonly insertBottom: IKey;
    readonly insertRight: IKey;
    readonly jumpToParent: IKey;
    readonly jumpToParentNext: IKey;
    readonly jumpToParentPrev: IKey;
    readonly moveToDown: IKey;
    readonly moveToUp: IKey;
    readonly netAssets2LocalAssets: IKey;
    readonly netImg2LocalAsset: IKey;
    readonly newContentFile: IKey;
    readonly newNameFile: IKey;
    readonly newNameSettingFile: IKey;
    readonly openBy: IKey;
    readonly optimizeTypography: IKey;
    readonly outline: IKey;
    readonly preview: IKey;
    readonly quickMakeCard: IKey;
    readonly redo: IKey;
    readonly refPopover: IKey;
    readonly refresh: IKey;
    readonly refTab: IKey;
    readonly rename: IKey;
    readonly showInFolder: IKey;
    readonly spaceRepetition: IKey;
    readonly switchReadonly: IKey;
    readonly undo: IKey;
    readonly vLayout: IKey;
    readonly wysiwyg: IKey;
}

/**
 * SiYuan shortcut key
 */
export interface IKey {
    /**
     * Custom shortcut key
     */
    readonly custom: string;
    /**
     * Default shortcut key
     */
    readonly default: string;
}

/**
 * SiYuan editor heading shortcut keys
 */
export interface IKeymapEditorHeading {
    readonly heading1: IKey;
    readonly heading2: IKey;
    readonly heading3: IKey;
    readonly heading4: IKey;
    readonly heading5: IKey;
    readonly heading6: IKey;
    readonly paragraph: IKey;
}

/**
 * SiYuan editor insert shortcut keys
 */
export interface IKeymapEditorInsert {
    readonly "appearance": IKey;
    readonly "bold": IKey;
    readonly "check": IKey;
    readonly "clearInline": IKey;
    readonly "code": IKey;
    readonly "inline-code": IKey;
    readonly "inline-math": IKey;
    readonly "italic": IKey;
    readonly "kbd": IKey;
    readonly "lastUsed": IKey;
    readonly "link": IKey;
    readonly "list": IKey;
    readonly "mark": IKey;
    readonly "memo": IKey;
    readonly "ordered-list": IKey;
    readonly "quote": IKey;
    readonly "ref": IKey;
    readonly "strike": IKey;
    readonly "sub": IKey;
    readonly "sup": IKey;
    readonly "table": IKey;
    readonly "tag": IKey;
    readonly "underline": IKey;
}

/**
 * SiYuan editor list shortcut keys
 */
export interface IKeymapEditorList {
    readonly checkToggle: IKey;
    readonly indent: IKey;
    readonly outdent: IKey;
}

/**
 * SiYuan editor table shortcut keys
 */
export interface IKeymapEditorTable {
    readonly "delete-column": IKey;
    readonly "delete-row": IKey;
    readonly "insertColumnLeft": IKey;
    readonly "insertColumnRight": IKey;
    readonly "insertRowAbove": IKey;
    readonly "insertRowBelow": IKey;
    readonly "moveToDown": IKey;
    readonly "moveToLeft": IKey;
    readonly "moveToRight": IKey;
    readonly "moveToUp": IKey;
}

/**
 * SiYuan general shortcut keys
 */
export interface IKeymapGeneral {
    readonly addToDatabase: IKey;
    readonly backlinks: IKey;
    readonly bookmark: IKey;
    readonly closeAll: IKey;
    readonly closeLeft: IKey;
    readonly closeOthers: IKey;
    readonly closeRight: IKey;
    readonly closeTab: IKey;
    readonly closeUnmodified: IKey;
    readonly commandPanel: IKey;
    readonly config: IKey;
    readonly dailyNote: IKey;
    readonly dataHistory: IKey;
    readonly editReadonly: IKey;
    readonly enter: IKey;
    readonly enterBack: IKey;
    readonly fileTree: IKey;
    readonly globalGraph: IKey;
    readonly globalSearch: IKey;
    readonly goBack: IKey;
    readonly goForward: IKey;
    readonly goToEditTabNext: IKey;
    readonly goToEditTabPrev: IKey;
    readonly goToTab1: IKey;
    readonly goToTab2: IKey;
    readonly goToTab3: IKey;
    readonly goToTab4: IKey;
    readonly goToTab5: IKey;
    readonly goToTab6: IKey;
    readonly goToTab7: IKey;
    readonly goToTab8: IKey;
    readonly goToTab9: IKey;
    readonly goToTabNext: IKey;
    readonly goToTabPrev: IKey;
    readonly graphView: IKey;
    readonly inbox: IKey;
    readonly lockScreen: IKey;
    readonly mainMenu: IKey;
    readonly move: IKey;
    readonly newFile: IKey;
    readonly outline: IKey;
    readonly recentDocs: IKey;
    readonly replace: IKey;
    readonly riffCard: IKey;
    readonly search: IKey;
    readonly selectOpen1: IKey;
    readonly splitLR: IKey;
    readonly splitMoveB: IKey;
    readonly splitMoveR: IKey;
    readonly splitTB: IKey;
    readonly stickSearch: IKey;
    readonly syncNow: IKey;
    readonly tabToWindow: IKey;
    readonly tag: IKey;
    readonly toggleDock: IKey;
    readonly toggleWin: IKey;
    readonly unsplit: IKey;
    readonly unsplitAll: IKey;
}

/**
 * Supported language
 */
export interface ILang {
    /**
     * Language name
     */
    readonly label: string;
    /**
     * Language identifier
     */
    readonly name: string;
}

/**
 * Log level
 */
export type TLogLevel = "debug" | "error" | "fatal" | "info" | "off" | "trace" | "warn";

/**
 * Publish service related configuration
 */
export interface IPublish {
    /**
     * Publish service basic auth configuration
     */
    readonly auth: IPublishAuth;
    /**
     * Whether to enable the publishing service
     */
    readonly enable: boolean;
    /**
     * The port used by the publishing service
     */
    readonly port: number;
}

/**
 * Publish service basic auth configuration
 *
 * Publish service basic auth related configuration
 */
export interface IPublishAuth {
    /**
     * Publish service Basic authentication username/password list
     */
    readonly accounts: IPublishAuthAccount[];
    /**
     * Whether to enable publishing service basic authentication
     */
    readonly enable: boolean;
}

/**
 * Publish service basic auth account
 */
export interface IPublishAuthAccount {
    /**
     * Remarks information
     */
    readonly memo: string;
    /**
     * Basic authentication password
     */
    readonly password: string;
    /**
     * Basic authentication username
     */
    readonly username: string;
}

/**
 * Snapshot repository related configuration
 */
export interface IRepo {
    /**
     * Snapshot index retention days
     */
    readonly indexRetentionDays: number;
    /**
     * Snapshot encryption key (base64 encoded 256-bit key)
     */
    readonly key: string;
    /**
     * Number of snapshot indexes retained daily
     */
    readonly retentionIndexesDaily: number;
    /**
     * Synchronous index timing, if it exceeds this time, the user is prompted that the index
     * performance is degraded (unit: milliseconds)
     */
    readonly syncIndexTiming: number;
}

/**
 * SiYuan search related configuration
 */
export interface ISearch {
    /**
     * Whether to search in block aliases
     */
    readonly alias: boolean;
    /**
     * Whether to search in audio blocks
     */
    readonly audioBlock: boolean;
    /**
     * Extract backlink mention keywords from block aliases
     */
    readonly backlinkMentionAlias: boolean;
    /**
     * Extract backlink mention keywords from block reference anchor text
     */
    readonly backlinkMentionAnchor: boolean;
    /**
     * Extract backlink mention keywords from document names
     */
    readonly backlinkMentionDoc: boolean;
    /**
     * Maximum number of backlink mention keywords
     */
    readonly backlinkMentionKeywordsLimit: number;
    /**
     * Extract backlink mention keywords from block names
     */
    readonly backlinkMentionName: boolean;
    /**
     * Whether to search quote blocks
     */
    readonly blockquote: boolean;
    /**
     * Whether to distinguish between uppercase and lowercase letters when searching
     */
    readonly caseSensitive: boolean;
    /**
     * Whether to search code blocks
     */
    readonly codeBlock: boolean;
    /**
     * Whether to search database blocks
     */
    readonly databaseBlock: boolean;
    /**
     * Whether to search document blocks
     */
    readonly document: boolean;
    /**
     * Whether to search embedded blocks
     */
    readonly embedBlock: boolean;
    /**
     * Whether to search heading blocks
     */
    readonly heading: boolean;
    /**
     * Whether to search HTML blocks
     */
    readonly htmlBlock: boolean;
    /**
     * Whether to search block attributes
     */
    readonly ial: boolean;
    /**
     * Whether to search in iframe blocks
     */
    readonly iframeBlock: boolean;
    /**
     * Whether to search resource file paths
     */
    readonly indexAssetPath: boolean;
    /**
     * Number of search results displayed
     */
    readonly limit: number;
    /**
     * Whether to search list blocks
     */
    readonly list: boolean;
    /**
     * Whether to search list items
     */
    readonly listItem: boolean;
    /**
     * Whether to search formula blocks
     */
    readonly mathBlock: boolean;
    /**
     * Whether to search block notes
     */
    readonly memo: boolean;
    /**
     * Whether to search block names
     */
    readonly name: boolean;
    /**
     * Whether to search paragraph blocks
     */
    readonly paragraph: boolean;
    /**
     * Whether to search super blocks
     */
    readonly superBlock: boolean;
    /**
     * Whether to search table blocks
     */
    readonly table: boolean;
    /**
     * Whether to search in video blocks
     */
    readonly videoBlock: boolean;
    /**
     * Whether to get virtual reference keywords from block aliases
     */
    readonly virtualRefAlias: boolean;
    /**
     * Whether to get virtual reference keywords from block reference anchor text
     */
    readonly virtualRefAnchor: boolean;
    /**
     * Whether to get virtual reference keywords from document names
     */
    readonly virtualRefDoc: boolean;
    /**
     * Whether to get virtual reference keywords from block names
     */
    readonly virtualRefName: boolean;
    /**
     * Whether to search in widget blocks
     */
    readonly widgetBlock: boolean;
}

/**
 * SiYuan code snippets related configuration
 */
export interface ISnippet {
    /**
     * Whether to enable CSS code snippets
     */
    readonly enabledCSS: boolean;
    /**
     * Whether to enable JavaScript code snippets
     */
    readonly enabledJS: boolean;
}

/**
 * SiYuan workspace content statistics
 */
export interface IStat {
    /**
     * Asset file size (unit: bytes)
     */
    readonly assetsSize: number;
    /**
     * Number of content blocks
     */
    readonly blockCount: number;
    /**
     * Size of resource files after chunk encryption (unit: bytes)
     */
    readonly cAssetsSize: number;
    /**
     * Number of content blocks after chunk encryption
     */
    readonly cBlockCount: number;
    /**
     * Size of the data directory after chunk encryption (unit: bytes)
     */
    readonly cDataSize: number;
    /**
     * Number of content block trees after chunk encryption (number of documents)
     */
    readonly cTreeCount: number;
    /**
     * Data directory size (unit: bytes)
     */
    readonly dataSize: number;
    /**
     * Number of content block trees (number of documents)
     */
    readonly treeCount: number;
}

/**
 * SiYuan synchronization related configuration
 */
export interface ISync {
    /**
     * Cloud workspace name
     */
    readonly cloudName: string;
    /**
     * Whether to enable synchronization
     */
    readonly enabled: boolean;
    /**
     * Whether to create a conflict document when a conflict occurs during synchronization
     */
    readonly generateConflictDoc: boolean;
    /**
     * Synchronization mode
     * - `0`: Not set
     * - `1`: Automatic synchronization
     * - `2`: Manual synchronization
     * - `3`: Completely manual synchronization
     */
    readonly mode: number;
    /**
     * Whether to enable synchronization perception
     */
    readonly perception: boolean;
    /**
     * Cloud storage service provider
     * - `0`: SiYuan official cloud storage service
     * - `2`: Object storage service compatible with S3 protocol
     * - `3`: Network storage service using WebDAV protocol
     */
    readonly provider: number;
    readonly s3: ISyncS3;
    /**
     * The prompt information of the last synchronization
     */
    readonly stat: string;
    /**
     * The time of the last synchronization (Unix timestamp)
     */
    readonly synced: number;
    readonly webdav: ISyncWebDAV;
}

/**
 * S3 compatible object storage related configuration
 */
export interface ISyncS3 {
    /**
     * Access key
     */
    readonly accessKey: string;
    /**
     * Bucket name
     */
    readonly bucket: string;
    /**
     * Connection concurrency
     */
    readonly concurrentReqs: number;
    /**
     * Service endpoint
     */
    readonly endpoint: string;
    /**
     * Whether to use path-style URLs
     */
    readonly pathStyle: boolean;
    /**
     * Storage region
     */
    readonly region: string;
    /**
     * Security key
     */
    readonly secretKey: string;
    /**
     * Whether to skip TLS verification
     */
    readonly skipTlsVerify: boolean;
    /**
     * Timeout (unit: seconds)
     */
    readonly timeout: number;
}

/**
 * WebDAV related configuration
 */
export interface ISyncWebDAV {
    /**
     * Connection concurrency
     */
    readonly concurrentReqs: number;
    /**
     * Service endpoint
     */
    readonly endpoint: string;
    /**
     * Password
     */
    readonly password: string;
    /**
     * Whether to skip TLS verification
     */
    readonly skipTlsVerify: boolean;
    /**
     * Timeout (unit: seconds)
     */
    readonly timeout: number;
    /**
     * Username
     */
    readonly username: string;
}

/**
 * System related information
 */
export interface ISystem {
    /**
     * The absolute path of the `resources` directory under the SiYuan installation directory
     */
    readonly appDir: string;
    /**
     * Boot automatically mode
     * - `0`: Close automatically start
     * - `1`: Auto start
     * - `2`: Silent auto start
     */
    readonly autoLaunch2: number;
    /**
     * The absolute path of the `conf` directory of the current workspace
     */
    readonly confDir: string;
    /**
     * Kernel operating environment
     * - `docker`: Docker container
     * - `android`: Android device
     * - `ios`: iOS device
     * - `std`: Desktop Electron environment
     */
    readonly container: TSystemContainer;
    /**
     * The absolute path of the `data` directory of the current workspace
     */
    readonly dataDir: string;
    /**
     * List of disabled feature names
     */
    readonly disabledFeatures: string[];
    /**
     * Whether to disable Google Analytics
     */
    readonly disableGoogleAnalytics: boolean;
    /**
     * Whether to automatically download the installation package for the new version
     */
    readonly downloadInstallPkg: boolean;
    /**
     * The absolute path of the user's home directory for the current operating system user
     */
    readonly homeDir: string;
    /**
     * The UUID of the current session
     */
    readonly id: string;
    /**
     * Whether the current version is an internal test version
     */
    readonly isInsider: boolean;
    /**
     * Whether the current version is a Microsoft Store version
     */
    readonly isMicrosoftStore: boolean;
    /**
     * Kernel version number
     */
    readonly kernelVersion: string;
    /**
     * Lock screen mode
     * - `0`: Manual
     * - `1`: Manual + Follow the operating system
     */
    readonly lockScreenMode: number;
    /**
     * The name of the current device
     */
    readonly name: string;
    readonly networkProxy: INetworkProxy;
    /**
     * Whether to enable network serve (whether to allow connections from other devices)
     */
    readonly networkServe: boolean;
    /**
     * The operating system name determined at compile time
     * (obtained using the command `go tool dist list`)
     * - `android`: Android
     * - `darwin`: macOS
     * - `ios`: iOS
     * - `linux`: Linux
     * - `windows`: Windows
     */
    readonly os: TSystemOS;
    /**
     * Operating system platform name
     */
    readonly osPlatform: string;
    /**
     * Whether to upload error logs
     */
    readonly uploadErrLog: boolean;
    /**
     * The absolute path of the workspace directory
     */
    readonly workspaceDir: string;
}

/**
 * Kernel operating environment
 * - `docker`: Docker container
 * - `android`: Android device
 * - `ios`: iOS device
 * - `std`: Desktop Electron environment
 */
export type TSystemContainer = "android" | "docker" | "ios" | "std";

/**
 * SiYuan Network proxy configuration
 */
export interface INetworkProxy {
    /**
     * Host name or host address
     */
    readonly host: string;
    /**
     * Proxy server port number
     */
    readonly port: string;
    /**
     * The protocol used by the proxy server
     * - Empty String: Use the system proxy settings
     * - `http`: HTTP
     * - `https`: HTTPS
     * - `socks5`: SOCKS5
     */
    readonly scheme: TSystemNetworkProxyScheme;
}

/**
 * The protocol used by the proxy server
 * - Empty String: Use the system proxy settings
 * - `http`: HTTP
 * - `https`: HTTPS
 * - `socks5`: SOCKS5
 */
export type TSystemNetworkProxyScheme = "" | "http" | "https" | "socks5";

/**
 * The operating system name determined at compile time
 * (obtained using the command `go tool dist list`)
 * - `android`: Android
 * - `darwin`: macOS
 * - `ios`: iOS
 * - `linux`: Linux
 * - `windows`: Windows
 */
export type TSystemOS = "android" | "darwin" | "ios" | "linux" | "windows";

/**
 * SiYuan tag dock related configuration
 */
export interface ITag {
    /**
     * Tag sorting scheme
     * - `0`: Name alphabetically ascending
     * - `1`: Name alphabetically descending
     * - `4`: Name natural ascending
     * - `5`: Name natural descending
     * - `7`: Reference count ascending
     * - `8`: Reference count descending
     */
    readonly sort: number;
}

/**
 * SiYuan UI layout related configuration
 */
export interface IUILayout {
    readonly bottom: IUILayoutDock;
    /**
     * Whether to hide the sidebar
     */
    readonly hideDock: boolean;
    readonly layout: IUILayoutLayout;
    readonly left: IUILayoutDock;
    readonly right: IUILayoutDock;
}

/**
 * SiYuan dock related configuration
 */
export interface IUILayoutDock {
    /**
     * Dock area list
     */
    readonly data: Array<IUILayoutDockTab[]>;
    /**
     * Whether to pin the dock
     */
    readonly pin: boolean;
}

/**
 * SiYuan dock tab data
 */
export interface IUILayoutDockTab {
    /**
     * Dock tab hotkey
     */
    readonly hotkey: string;
    /**
     * Hotkey description ID
     */
    readonly hotkeyLangId?: string;
    /**
     * Tab icon ID
     */
    readonly icon: string;
    /**
     * Whether to display the tab
     */
    readonly show: boolean;
    readonly size: IUILayoutDockPanelSize;
    /**
     * Tab title
     */
    readonly title: string;
    /**
     * Tab type
     */
    readonly type: string;
}

/**
 * SiYuan dock tab size
 */
export interface IUILayoutDockPanelSize {
    /**
     * Tab height (unit: px)
     */
    readonly height: null | number;
    /**
     * Tab width (unit: px)
     */
    readonly width: null | number;
}

/**
 * SiYuan panel layout
 */
export interface IUILayoutLayout {
    /**
     * Internal elements
     */
    readonly children: IUILayoutLayoutChild[];
    /**
     * Panel content layout direction
     * - `tb`: Top and bottom layout
     * - `lr`: Left and right layout
     */
    readonly direction?: TUILayoutDirection;
    /**
     * Object name
     */
    readonly instance: "Layout";
    /**
     * The direction in which the size can be adjusted
     * - `tb`: Can adjust the size up and down
     * - `lr`: Can adjust the size left and right
     */
    readonly resize?: TUILayoutDirection;
    /**
     * Panel size
     */
    readonly size?: string;
    /**
     * Layout type
     * - `normal`: Normal panel
     * - `center`: Center panel
     * - `top`: Top panel
     * - `bottom`: Bottom panel
     * - `left`: Left panel
     * - `right`: Right panel
     */
    readonly type?: TUILayoutType;
}

/**
 * SiYuan panel layout
 *
 * SiYuan window layout
 */
export interface IUILayoutLayoutChild {
    /**
     * Internal elements
     */
    readonly children: ChildElement[];
    /**
     * Panel content layout direction
     * - `tb`: Top and bottom layout
     * - `lr`: Left and right layout
     */
    readonly direction?: TUILayoutDirection;
    /**
     * Object name
     */
    readonly instance: TUILayout;
    /**
     * The direction in which the size can be adjusted
     * - `tb`: Can adjust the size up and down
     * - `lr`: Can adjust the size left and right
     */
    readonly resize?: TUILayoutDirection;
    /**
     * Panel size
     */
    readonly size?: string;
    /**
     * Layout type
     * - `normal`: Normal panel
     * - `center`: Center panel
     * - `top`: Top panel
     * - `bottom`: Bottom panel
     * - `left`: Left panel
     * - `right`: Right panel
     */
    readonly type?: TUILayoutType;
    /**
     * Panel height
     */
    readonly height?: string;
    /**
     * Panel width
     */
    readonly width?: string;
}

export type Children = ChildElement[] | IUILayoutTabContent;

/**
 * SiYuan panel layout
 *
 * SiYuan window layout
 *
 * SiYuan tab
 */
export interface ChildElement {
    /**
     * Internal elements
     *
     * Tab content
     */
    readonly children: Children;
    /**
     * Panel content layout direction
     * - `tb`: Top and bottom layout
     * - `lr`: Left and right layout
     */
    readonly direction?: TUILayoutDirection;
    /**
     * Object name
     */
    readonly instance: TUILayoutInstance;
    /**
     * The direction in which the size can be adjusted
     * - `tb`: Can adjust the size up and down
     * - `lr`: Can adjust the size left and right
     */
    readonly resize?: TUILayoutDirection;
    /**
     * Panel size
     */
    readonly size?: string;
    /**
     * Layout type
     * - `normal`: Normal panel
     * - `center`: Center panel
     * - `top`: Top panel
     * - `bottom`: Bottom panel
     * - `left`: Left panel
     * - `right`: Right panel
     */
    readonly type?: TUILayoutType;
    /**
     * Panel height
     */
    readonly height?: string;
    /**
     * Panel width
     */
    readonly width?: string;
    /**
     * Whether the tab is active
     */
    readonly active?: boolean;
    /**
     * Tab activation time (Unix timestamp)
     */
    readonly activeTime?: string;
    /**
     * Tab icon
     */
    readonly docIcon?: string;
    /**
     * Icon reference ID
     */
    readonly icon?: string;
    /**
     * Localization field key name
     */
    readonly lang?: string;
    /**
     * Whether the tab is pinned
     */
    readonly pin?: boolean;
    /**
     * Tab title
     */
    readonly title?: string;
}

/**
 * Tab content
 *
 * SiYuan tab without content
 *
 * SiYuan editor tab
 *
 * SiYuan asset file tab
 *
 * SiYuan custom tab
 *
 * SiYuan back link tab
 *
 * SiYuan bookmark tab
 *
 * SiYuan filetree tab
 *
 * SiYuan graph tab
 *
 * SiYuan outline tab
 *
 * SiYuan tag tab
 *
 * SiYuan search tab
 */
export interface IUILayoutTabContent {
    /**
     * (Editor) Actions to be performed after the tab is loaded
     */
    readonly action?: string;
    /**
     * (Editor) Block ID
     *
     * (Backlink) Block ID
     *
     * (Graph) Block ID
     *
     * (Outline) Block ID
     */
    readonly blockId?: string;
    /**
     * Object name
     */
    readonly instance?: TUILayoutTabContentInstance;
    /**
     * (Editor) Editor mode
     * - `wysiwyg`: WYSIWYG mode
     * - `preview`: Export preview mode
     */
    readonly mode?: TUILayoutTabEditorMode;
    /**
     * (Editor) Notebook ID
     */
    readonly notebookId?: string;
    /**
     * (Editor) Document block ID
     *
     * (Backlink) Document block ID
     *
     * (Graph) Document block ID
     */
    readonly rootId?: string;
    /**
     * (Asset) PDF file page number
     */
    readonly page?: number;
    /**
     * (Asset) Asset reference path
     */
    readonly path?: string;
    /**
     * (Custom) Data of the custom tab
     */
    readonly customModelData?: any;
    /**
     * (Custom) Type of the custom tab
     */
    readonly customModelType?: string;
    /**
     * (Backlink) Tab type
     * - `pin`: Pinned backlink panel
     * - `local`: The backlink panel of the current editor
     *
     * (Graph) Tab type
     * - `pin`: Pinned graph
     * - `local`: Graph of the current editor
     * - `global`: Global graph
     *
     * (Outline) Tab type
     * - `pin`: Pinned outline panel
     * - `local`: The outline panel of the current editor
     */
    readonly type?: TuiLayoutTabType;
    /**
     * (Outline) Whether the associated editor is in preview mode
     */
    readonly isPreview?: boolean;
    readonly config?: IUILayoutTabSearchConfig;
}

/**
 * SiYuan search tab configuration
 */
export interface IUILayoutTabSearchConfig {
    /**
     * Grouping strategy
     * - `0`: No grouping
     * - `1`: Group by document
     */
    readonly group: number;
    readonly hasReplace: any;
    /**
     * Readable path list
     */
    readonly hPath: string;
    /**
     * Search in the specified paths
     */
    readonly idPath: string[];
    /**
     * Search content
     */
    readonly k: string;
    /**
     * Search scheme
     * - `0`: Keyword (default)
     * - `1`: Query syntax
     * - `2`: SQL
     * - `3`: Regular expression
     * @defaultValue 0
     */
    readonly method: number;
    /**
     * Custom name of the query condition group
     */
    readonly name?: string;
    /**
     * Current page number
     */
    readonly page: number;
    /**
     * Replace content
     */
    readonly r: string;
    /**
     * Whether to clear the search box after removing the currently used query condition group
     */
    readonly removed?: boolean;
    readonly replaceTypes: IUILayoutTabSearchConfigReplaceTypes;
    /**
     * Search result sorting scheme
     * - `0`: Block type (default)
     * - `1`: Ascending by creation time
     * - `2`: Descending by creation time
     * - `3`: Ascending by update time
     * - `4`: Descending by update time
     * - `5`: By content order (only valid when grouping by document)
     * - `6`: Ascending by relevance
     * - `7`: Descending by relevance
     * @defaultValue 0
     */
    readonly sort: number;
    readonly types: IUILayoutTabSearchConfigTypes;
}

/**
 * Replace type filtering
 */
export interface IUILayoutTabSearchConfigReplaceTypes {
    /**
     * Replace hyperlinks
     * @defaultValue false
     */
    readonly aHref?: boolean;
    /**
     * Replace hyperlink anchor text
     * @defaultValue true
     */
    readonly aText?: boolean;
    /**
     * Replace hyperlink title
     * @defaultValue true
     */
    readonly aTitle?: boolean;
    /**
     * Replace inline code
     * @defaultValue false
     */
    readonly code?: boolean;
    /**
     * Replace code blocks
     * @defaultValue false
     */
    readonly codeBlock?: boolean;
    /**
     * Replace document title
     * @defaultValue true
     */
    readonly docTitle?: boolean;
    /**
     * Replace italic elements
     * @defaultValue true
     */
    readonly em?: boolean;
    /**
     * Replace HTML blocks
     * @defaultValue false
     */
    readonly htmlBlock?: boolean;
    /**
     * Replace image addresses
     * @defaultValue false
     */
    readonly imgSrc?: boolean;
    /**
     * Replace image anchor text
     * @defaultValue true
     */
    readonly imgText?: boolean;
    /**
     * Replace image titles
     * @defaultValue true
     */
    readonly imgTitle?: boolean;
    /**
     * Replace inline formulas
     * @defaultValue false
     */
    readonly inlineMath?: boolean;
    /**
     * Replace inline memos
     * @defaultValue true
     */
    readonly inlineMemo?: boolean;
    /**
     * Replace kdb elements
     * @defaultValue true
     */
    readonly kbd?: boolean;
    /**
     * Replace mark elements
     * @defaultValue true
     */
    readonly mark?: boolean;
    /**
     * Replace formula blocks
     * @defaultValue false
     */
    readonly mathBlock?: boolean;
    /**
     * Replace delete elements
     * @defaultValue true
     */
    readonly s?: boolean;
    /**
     * Replace bold elements
     * @defaultValue true
     */
    readonly strong?: boolean;
    /**
     * Replace subscript elements
     * @defaultValue true
     */
    readonly sub?: boolean;
    /**
     * Replace superscript elements
     * @defaultValue true
     */
    readonly sup?: boolean;
    /**
     * Replace tag elements
     * @defaultValue true
     */
    readonly tag?: boolean;
    /**
     * Replace rich text elements
     * @defaultValue true
     */
    readonly text?: boolean;
    /**
     * Replace underline elements
     * @defaultValue true
     */
    readonly u?: boolean;
}

/**
 * Search type filtering
 */
export interface IUILayoutTabSearchConfigTypes {
    /**
     * Search results contain audio blocks
     * @defaultValue false
     */
    readonly audioBlock?: boolean;
    /**
     * Search results contain blockquote blocks
     * @defaultValue false
     */
    readonly blockquote: boolean;
    /**
     * Search results contain code blocks
     * @defaultValue false
     */
    readonly codeBlock: boolean;
    /**
     * Search results contain database blocks
     * @defaultValue false
     */
    readonly databaseBlock: boolean;
    /**
     * Search results contain document blocks
     * @defaultValue false
     */
    readonly document: boolean;
    /**
     * Search results contain embed blocks
     * @defaultValue false
     */
    readonly embedBlock: boolean;
    /**
     * Search results contain heading blocks
     * @defaultValue false
     */
    readonly heading: boolean;
    /**
     * Search results contain html blocks
     * @defaultValue false
     */
    readonly htmlBlock: boolean;
    /**
     * Search results contain iframe blocks
     * @defaultValue false
     */
    readonly iframeBlock?: boolean;
    /**
     * Search results contain list blocks
     * @defaultValue false
     */
    readonly list: boolean;
    /**
     * Search results contain list item blocks
     * @defaultValue false
     */
    readonly listItem: boolean;
    /**
     * Search results contain math blocks
     * @defaultValue false
     */
    readonly mathBlock: boolean;
    /**
     * Search results contain paragraph blocks
     * @defaultValue false
     */
    readonly paragraph: boolean;
    /**
     * Search results contain super blocks
     * @defaultValue false
     */
    readonly superBlock: boolean;
    /**
     * Search results contain table blocks
     * @defaultValue false
     */
    readonly table: boolean;
    /**
     * Search results contain video blocks
     * @defaultValue false
     */
    readonly videoBlock?: boolean;
    /**
     * Search results contain widget blocks
     * @defaultValue false
     */
    readonly widgetBlock?: boolean;
}

export type TUILayoutTabContentInstance = "Asset" | "Backlink" | "Bookmark" | "Custom" | "Editor" | "Files" | "Graph" | "Outline" | "Search" | "Tag";

/**
 * (Editor) Editor mode
 * - `wysiwyg`: WYSIWYG mode
 * - `preview`: Export preview mode
 */
export type TUILayoutTabEditorMode = "preview" | "wysiwyg";

/**
 * (Backlink) Tab type
 * - `pin`: Pinned backlink panel
 * - `local`: The backlink panel of the current editor
 *
 * (Graph) Tab type
 * - `pin`: Pinned graph
 * - `local`: Graph of the current editor
 * - `global`: Global graph
 *
 * (Outline) Tab type
 * - `pin`: Pinned outline panel
 * - `local`: The outline panel of the current editor
 */
export type TuiLayoutTabType = "global" | "local" | "pin";

/**
 * Panel content layout direction
 * - `tb`: Top and bottom layout
 * - `lr`: Left and right layout
 *
 * The direction in which the size can be adjusted
 * - `tb`: Can adjust the size up and down
 * - `lr`: Can adjust the size left and right
 */
export type TUILayoutDirection = "lr" | "tb";

export type TUILayoutInstance = "Layout" | "Tab" | "Wnd";

/**
 * Layout type
 * - `normal`: Normal panel
 * - `center`: Center panel
 * - `top`: Top panel
 * - `bottom`: Bottom panel
 * - `left`: Left panel
 * - `right`: Right panel
 */
export type TUILayoutType = "bottom" | "center" | "left" | "normal" | "right" | "top";

export type TUILayout = "Layout" | "Wnd";

// #endregion content
