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
 * Echo the content of the request
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
 * Response information
 */
export interface IData {
    readonly Context: IContext;
    readonly Request: IRequest;
    readonly URL: IURL;
    readonly User: IUser;
}

/**
 * Request context
 */
export interface IContext {
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.ClientIP}
     *
     * ClientIP implements one best effort algorithm to return the real client IP.
     *
     * It calls c.RemoteIP() under the hood, to check if the remote IP is a trusted proxy or
     * not.
     *
     * If it is it will then try to parse the headers defined in Engine.RemoteIPHeaders
     * (defaulting to [X-Forwarded-For, X-Real-Ip]).
     *
     * If the headers are not syntactically valid OR the remote IP does not correspond to a
     * trusted proxy, the remote IP (coming from Request.RemoteAddr) is returned.
     */
    readonly ClientIP: string;
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.ContentType}
     *
     * ContentType returns the Content-Type header of the request.
     */
    readonly ContentType: string;
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.FullPath}
     *
     * FullPath returns a matched route full path.
     *
     * For not found routes returns an empty string.
     */
    readonly FullPath: string;
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.HandlerNames}
     *
     * HandlerNames returns a list of all registered handlers for this context in descending
     * order, following the semantics of HandlerName()
     */
    readonly HandlerNames: string[];
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.IsWebsocket}
     *
     * IsWebsocket returns true if the request headers indicate that a websocket handshake is
     * being initiated by the client.
     */
    readonly IsWebsocket: boolean;
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Params}
     *
     * Params is a Param-slice, as returned by the router.
     *
     * The slice is ordered, the first URL parameter is also the first slice value.
     *
     * It is therefore safe to read values by the index.
     */
    readonly Params: IParam[] | null;
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.GetRawData}
     *
     * GetRawData returns stream data.
     *
     * Use base64 encoding.
     */
    readonly RawData: string;
    /**
     * {@link https://pkg.go.dev/github.com/gin-gonic/gin@v1.9.1#Context.RemoteIP}
     *
     * RemoteIP parses the IP from Request.RemoteAddr, normalizes and returns the IP (without
     * the port).
     */
    readonly RemoteIP: string;
}

/**
 * Param is a single URL parameter, consisting of a key and a value.
 */
export interface IParam {
    /**
     * key name
     */
    readonly Key: string;
    /**
     * key value
     */
    readonly Value: string;
}

/**
 * Request content
 */
export interface IRequest {
    /**
     * {@link https://pkg.go.dev/net/http#Request.Close}Close indicates whether to close the
     * connection after replying to this request (for servers) or after sending this request and
     * reading its response (for clients).
     *
     * For server requests, the HTTP server handles this automatically and this field is not
     * needed by Handlers.
     *
     * For client requests, setting this field prevents re-use of TCP connections between
     * requests to the same hosts, as if Transport.DisableKeepAlives were set.
     */
    readonly Close: boolean;
    /**
     * {@link https://pkg.go.dev/net/http#Request.ContentLength}
     *
     * ContentLength records the length of the associated content.
     *
     * The value -1 indicates that the length is unknown.
     *
     * Values `>=` 0 indicate that the given number of bytes may be read from Body.
     *
     * For client requests, a value of 0 with a non-nil Body is also treated as unknown.
     */
    readonly ContentLength: number;
    /**
     * {@link https://pkg.go.dev/net/http#Request.CookiesP}
     *
     * Cookies parses and returns the HTTP cookies sent with the request.
     */
    readonly Cookies: ICookie[];
    /**
     * {@link https://pkg.go.dev/net/http#Request.Form}
     *
     * Form contains the parsed form data, including both the URL field's query parameters and
     * the PATCH, POST, or PUT form data.
     *
     * This field is only available after ParseForm is called.
     *
     * The HTTP client ignores Form and uses Body instead.
     */
    readonly Form: { [key: string]: string[] };
    /**
     * {@link https://pkg.go.dev/net/http#Request.Header}
     *
     * A Header represents the key-value pairs in an HTTP header.
     *
     * The keys should be in canonical form, as returned by CanonicalHeaderKey.
     */
    readonly Header: { [key: string]: string[] };
    /**
     * {@link https://pkg.go.dev/net/http#Request.Host}
     *
     * For server requests, Host specifies the host on which the URL is sought. For HTTP/1 (per
     * RFC 7230, section 5.4), this is either the value of the "Host" header or the host name
     * given in the URL itself. For HTTP/2, it is the value of the ":authority" pseudo-header
     * field.
     *
     * It may be of the form "host:port". For international domain names, Host may be in
     * Punycode or Unicode form. Use golang.org/x/net/idna to convert it to either format if
     * needed.
     *
     * To prevent DNS rebinding attacks, server Handlers should validate that the Host header
     * has a value for which the Handler considers itself authoritative. The included
     *
     * ServeMux supports patterns registered to particular host names and thus protects its
     * registered Handlers.
     *
     * For client requests, Host optionally overrides the Host header to send. If empty, the
     * Request.Write method uses the value of URL.Host. Host may contain an international domain
     * name.
     */
    readonly Host: string;
    /**
     * {@link https://pkg.go.dev/net/http#Request.Method}
     *
     * Method specifies the HTTP method (GET, POST, PUT, etc.).
     *
     * For client requests, an empty string means GET.
     *
     * Go's HTTP client does not support sending a request with the CONNECT method. See the
     * documentation on Transport for details.
     */
    readonly Method: string;
    /**
     * {@link https://pkg.go.dev/mime/multipart#Form}
     *
     * Form is a parsed multipart form.
     *
     * Its File parts are stored either in memory or on disk,
     *
     * and are accessible via the *FileHeader's Open method.
     *
     * Its Value parts are stored as strings.
     *
     * Both are keyed by field name.
     */
    readonly MultipartForm: IMultipartForm | null;
    /**
     * {@link https://pkg.go.dev/net/http#Request.PostForm}
     *
     * PostForm contains the parsed form data from PATCH, POST or PUT body parameters.
     *
     * This field is only available after ParseForm is called.
     *
     * The HTTP client ignores PostForm and uses Body instead.
     */
    readonly PostForm: { [key: string]: string[] };
    /**
     * {@link https://pkg.go.dev/net/http#Request.Proto}
     *
     * The protocol version for incoming server requests.
     *
     * For client requests, these fields are ignored. The HTTP client code always uses either
     * HTTP/1.1 or HTTP/2.
     *
     * See the docs on Transport for details.
     */
    readonly Proto: string;
    /**
     * {@link https://pkg.go.dev/net/http#Request.ProtoMajor}
     */
    readonly ProtoMajor: number;
    /**
     * {@link https://pkg.go.dev/net/http#Request.ProtoMinor}
     */
    readonly ProtoMinor: number;
    /**
     * {@link https://pkg.go.dev/net/http#Request.RemoteAddr}
     *
     * Referer returns the referring URL, if sent in the request.
     *
     * Referer is misspelled as in the request itself, a mistake from the earliest days of
     * HTTP.  This value can also be fetched from the Header map as Header["Referer"]; the
     * benefit of making it available as a method is that the compiler can diagnose programs
     * that use the alternate (correct English) spelling req.Referrer() but cannot diagnose
     * programs that use Header["Referrer"].
     */
    readonly Referer: string;
    /**
     * {@link https://pkg.go.dev/net/http#Request.RemoteAddr}
     *
     * RemoteAddr allows HTTP servers and other software to record the network address that sent
     * the request, usually for logging. This field is not filled in by ReadRequest and has no
     * defined format. The HTTP server in this package sets RemoteAddr to an "IP:port" address
     * before invoking a handler.
     *
     * This field is ignored by the HTTP client.
     */
    readonly RemoteAddr: string;
    /**
     * {@link https://pkg.go.dev/net/http#Request.TLS}
     *
     * TLS allows HTTP servers and other software to record information about the TLS connection
     * on which the request was received. This field is not filled in by ReadRequest.
     *
     * The HTTP server in this package sets the field for TLS-enabled connections before
     * invoking a handler; otherwise it leaves the field nil.
     *
     * This field is ignored by the HTTP client.
     */
    readonly TLS: Itls | null;
    /**
     * {@link https://pkg.go.dev/net/http#Request.Trailer}
     *
     * Trailer specifies additional headers that are sent after the request body.
     *
     * For server requests, the Trailer map initially contains only the tailer keys, with nil
     * values. (The client declares which trailers it will later send.)  While the handler is
     * reading from Body, it must not reference Trailer. After reading from Body returns EOF,
     * Trailer can be read again and will contain non-nil values, if they were sent by the
     * client.
     *
     * For client requests, Trailer must be initialized to a map containing the trailer keys to
     * later send. The values may be nil or their final values. The ContentLength must be 0 or
     * -1, to send a chunked request.
     *
     * After the HTTP request is sent the map values can be updated while the request body is
     * read. Once the body returns EOF, the caller must not mutate Trailer.
     *
     * Few HTTP clients, servers, or proxies support HTTP trailers.
     */
    readonly Trailer: { [key: string]: string[] } | null;
    /**
     * {@link https://pkg.go.dev/net/http#Request.TransferEncoding}
     *
     * TransferEncoding lists the transfer encodings from outermost to innermost. An empty list
     * denotes the "identity" encoding.
     *
     * TransferEncoding can usually be ignored; chunked encoding is automatically added and
     * removed as necessary when sending and receiving requests.
     */
    readonly TransferEncoding: null | string[];
    /**
     * {@link https://pkg.go.dev/net/http#Request.URL}
     *
     * URL specifies either the URI being requested (for server requests) or the URL to access
     * (for client requests).
     *
     * For server requests, the URL is parsed from the URI supplied on the Request-Line as
     * stored in RequestURI.  For most requests, fields other than Path and RawQuery will be
     * empty. (See RFC 7230, Section 5.3)
     *
     * For client requests, the URL's Host specifies the server to connect to, while the
     * Request's Host field optionally specifies the Host header value to send in the HTTP
     * request.
     */
    readonly URL: IRequestURL;
    /**
     * {@link https://pkg.go.dev/net/http#Request.UserAgent}
     *
     * UserAgent returns the client's User-Agent, if sent in the request.
     */
    readonly UserAgent: string;
}

/**
 * {@link https://pkg.go.dev/net/http#Cookie}
 *
 * A Cookie represents an HTTP cookie as sent in the Set-Cookie header of an HTTP response
 * or the Cookie header of an HTTP request.
 *
 * See https://tools.ietf.org/html/rfc6265 for details.
 */
export interface ICookie {
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Domain}
     *
     * Cookie efficient URL hostname
     */
    readonly Domain: string;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Expires}
     *
     * Cookie expiration time (ISO 8601)
     */
    readonly Expires: string;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.HttpOnly}
     *
     * Cookie HttpOnly flag
     */
    readonly HttpOnly: boolean;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.MaxAge}
     *
     * - `MaxAge=0` means no 'Max-Age' attribute specified.
     * - `MaxAge<0` means delete cookie now, equivalently 'Max-Age: 0'
     * - `MaxAge>0` means 'Max-Age' attribute present and given in seconds
     */
    readonly MaxAge: number;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Name}
     *
     * Cookie name
     */
    readonly Name: string;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Path}
     *
     * Cookie efficient URL path
     */
    readonly Path: string;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Raw}
     *
     * Raw text of this cookie
     */
    readonly Raw: string;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.RawExpires}
     *
     * for reading cookies only
     */
    readonly RawExpires: string;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.SameSite}
     *
     * Cookie SameSite flag
     *
     * - `1`: Default mode
     * - `2`: Lax mode
     * - `3`: Strict mode
     * - `4`: None mode
     */
    readonly SameSite: number;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Secure}
     *
     * Cookie Secure flag
     */
    readonly Secure: boolean;
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Unparsed}
     *
     * Raw text of unparsed attribute-value pairs
     */
    readonly Unparsed: null | string[];
    /**
     * {@link https://pkg.go.dev/net/http#Cookie.Value}
     *
     * Cookie value
     */
    readonly Value: string;
}

/**
 * multipart form data
 */
export interface IMultipartForm {
    readonly File: { [key: string]: IFile[] };
    readonly Value: { [key: string]: string[] };
}

/**
 * multipart form file part
 */
export interface IFile {
    /**
     * File data encoded using base64
     */
    readonly Content: string;
    /**
     * File name
     */
    readonly Filename: string;
    /**
     * {@link https://pkg.go.dev/net/http#Header}
     *
     * A MIMEHeader represents a MIME-style header mapping keys to sets of values.
     */
    readonly Header: { [key: string]: string[] };
    /**
     * File size (unit: byte)
     */
    readonly Size: number;
}

/**
 * {@link https://pkg.go.dev/crypto/tls#ConnectionState}
 *
 * ConnectionState records basic TLS details about the connection.
 */
export interface Itls {
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.CipherSuite}
     *
     * CipherSuite is the cipher suite negotiated for the connection (e.g.
     * TLS_ECDHE_ECDSA_WITH_AES_128_GCM_SHA256, TLS_AES_128_GCM_SHA256).
     */
    readonly CipherSuite: number;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.DidResume}
     *
     * DidResume is true if this connection was successfully resumed from a previous session
     * with a session ticket or similar mechanism.
     */
    readonly DidResume: boolean;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.HandshakeComplete}
     *
     * HandshakeComplete is true if the handshake has concluded.
     */
    readonly HandshakeComplete: boolean;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.NegotiatedProtocol}
     *
     * NegotiatedProtocol is the application protocol negotiated with ALPN.
     */
    readonly NegotiatedProtocol: string;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.NegotiatedProtocolIsMutual}
     *
     * NegotiatedProtocolIsMutual used to indicate a mutual NPN negotiation.
     *
     * Deprecated: this value is always true.
     */
    readonly NegotiatedProtocolIsMutual: boolean;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.OCSPResponse}
     *
     * OCSPResponse is a stapled Online Certificate Status Protocol (OCSP) response provided by
     * the peer for the leaf certificate, if any.
     */
    readonly OCSPResponse: any;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.PeerCertificates}
     *
     * PeerCertificates are the parsed certificates sent by the peer, in the order in which they
     * were sent. The first element is the leaf certificate that the connection is verified
     * against.
     *
     * On the client side, it can't be empty. On the server side, it can be empty if
     * Config.ClientAuth is not RequireAnyClientCert or RequireAndVerifyClientCert.
     *
     * PeerCertificates and its contents should not be modified.
     */
    readonly PeerCertificates: ICertificate[];
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.NegotiatedProtocolIsMutual}
     *
     * ServerName is the value of the Server Name Indication extension sent by the client. It's
     * available both on the server and on the client side.
     */
    readonly ServerName: string;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.SignedCertificateTimestamps}
     *
     * SignedCertificateTimestamps is a list of SCTs provided by the peer through the TLS
     * handshake for the leaf certificate, if any.
     */
    readonly SignedCertificateTimestamps: any;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.TLSUnique}
     *
     * TLSUnique contains the "tls-unique" channel binding value (see RFC 5929, Section 3).
     * This value will be nil for TLS 1.3 connections and for resumed connections that don't
     * support Extended Master Secret (RFC 7627).
     */
    readonly TLSUnique: any;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.VerifiedChains}
     *
     * VerifiedChains is a list of one or more chains where the first element is
     * PeerCertificates[0] and the last element is from Config.RootCAs (on the client side) or
     * Config.ClientCAs (on the server side).
     *
     * On the client side, it's set if Config.InsecureSkipVerify is false. On the server side,
     * it's set if Config.ClientAuth is VerifyClientCertIfGiven (and the peer provided a
     * certificate) or RequireAndVerifyClientCert.
     *
     * VerifiedChains and its contents should not be modified.
     */
    readonly VerifiedChains: Array<ICertificate[]>;
    /**
     * {@link https://pkg.go.dev/crypto/tls#ConnectionState.Version}
     *
     * Version is the TLS version used by the connection (e.g. VersionTLS12).
     */
    readonly Version: number;
}

/**
 * {@link https://pkg.go.dev/crypto/x509#Certificate}
 *
 * A Certificate represents an X.509 certificate.
 */
export interface ICertificate {
    readonly Raw: any;
    readonly RawTBSCertificate: any;
    readonly RawSubjectPublicKeyInfo: any;
    readonly RawSubject: any;
    readonly RawIssuer: any;
    readonly Signature: any;
    readonly SignatureAlgorithm: any;
    readonly PublicKeyAlgorithm: any;
    readonly PublicKey: any;
    readonly Version: any;
    readonly SerialNumber: any;
    readonly Issuer: any;
    readonly Subject: any;
    readonly NotBefore: any;
    readonly KeyUsage: any;
    readonly Extensions: any;
    readonly ExtraExtensions: any;
    readonly UnhandledCriticalExtensions: any;
    readonly ExtKeyUsage: any;
    readonly UnknownExtKeyUsage: any;
    readonly BasicConstraintsValid: any;
    readonly IsCA: any;
    readonly MaxPathLen: any;
    readonly MaxPathLenZero: any;
    readonly SubjectKeyId: any;
    readonly AuthorityKeyId: any;
    readonly OCSPServer: any;
    readonly IssuingCertificateURL: any;
    readonly DNSNames: any;
    readonly EmailAddresses: any;
    readonly IPAddresses: any;
    readonly URIs: any;
    readonly PermittedDNSDomainsCritical: any;
    readonly PermittedDNSDomains: any;
    readonly ExcludedDNSDomains: any;
    readonly PermittedIPRanges: any;
    readonly ExcludedIPRanges: any;
    readonly PermittedEmailAddresses: any;
    readonly ExcludedEmailAddresses: any;
    readonly PermittedURIDomains: any;
    readonly ExcludedURIDomains: any;
    readonly CRLDistributionPoints: any;
    readonly PolicyIdentifiers: any;
    [property: string]: any;
}

/**
 * {@link https://pkg.go.dev/net/http#Request.URL}
 *
 * URL specifies either the URI being requested (for server requests) or the URL to access
 * (for client requests).
 *
 * For server requests, the URL is parsed from the URI supplied on the Request-Line as
 * stored in RequestURI.  For most requests, fields other than Path and RawQuery will be
 * empty. (See RFC 7230, Section 5.3)
 *
 * For client requests, the URL's Host specifies the server to connect to, while the
 * Request's Host field optionally specifies the Host header value to send in the HTTP
 * request.
 *
 * {@link https://pkg.go.dev/net/http#Request.URL}
 *
 * A URL represents a parsed URL (technically, a URI reference).
 *
 * The general form represented is:
 *
 * `[scheme:][//[userinfo@]host][/]path[?query][#fragment]`
 *
 * URLs that do not start with a slash after the scheme are interpreted as:
 *
 * `scheme:opaque[?query][#fragment]`
 *
 * Note that the Path field is stored in decoded form: /%47%6f%2f becomes /Go/.
 *
 * A consequence is that it is impossible to tell which slashes in the Path were slashes in
 * the raw URL and which were %2f. This distinction is rarely important, but when it is, the
 * code should use the EscapedPath method, which preserves the original encoding of Path.
 *
 * The RawPath field is an optional field which is only set when the default encoding of
 * Path is different from the escaped path. See the EscapedPath method for more details.
 *
 * URL's String method uses the EscapedPath method to obtain the path.
 */
export interface IRequestURL {
    /**
     * {@link https://pkg.go.dev/net/url#URL.ForceQuery}
     *
     * append a query ('?') even if RawQuery is empty
     */
    readonly ForceQuery: boolean;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Fragment}
     *
     * fragment for references, without '#'
     */
    readonly Fragment: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Host}
     *
     * host or host:port
     */
    readonly Host: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.OmitHost}
     *
     * do not emit empty host (authority)
     */
    readonly OmitHost: boolean;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Opaque}
     *
     * encoded opaque data
     */
    readonly Opaque: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Path}
     *
     * path (relative paths may omit leading slash)
     */
    readonly Path: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.RawFragment}
     *
     * encoded fragment hint (see EscapedFragment method)
     */
    readonly RawFragment: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.RawPath}
     *
     * encoded path hint (see EscapedPath method)
     */
    readonly RawPath: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.RawQuery}
     *
     * encoded query values, without '?'
     */
    readonly RawQuery: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Scheme}
     *
     * URL schema
     */
    readonly Scheme: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.User}
     *
     * username and password information
     */
    readonly User: null;
    [property: string]: any;
}

/**
 * {@link https://pkg.go.dev/net/http#Request.URL}
 *
 * URL specifies either the URI being requested (for server requests) or the URL to access
 * (for client requests).
 *
 * For server requests, the URL is parsed from the URI supplied on the Request-Line as
 * stored in RequestURI.  For most requests, fields other than Path and RawQuery will be
 * empty. (See RFC 7230, Section 5.3)
 *
 * For client requests, the URL's Host specifies the server to connect to, while the
 * Request's Host field optionally specifies the Host header value to send in the HTTP
 * request.
 */
export interface IURL {
    /**
     * {@link https://pkg.go.dev/net/url#URL.EscapedFragment}
     *
     * EscapedFragment returns the escaped form of u.Fragment.
     *
     * In general there are multiple possible escaped forms of any fragment.
     *
     * EscapedFragment returns u.RawFragment when it is a valid escaping of u.Fragment.
     *
     * Otherwise EscapedFragment ignores u.RawFragment and computes an escaped form on its own.
     *
     * The String method uses EscapedFragment to construct its result.
     *
     * In general, code should call EscapedFragment instead of reading u.RawFragment directly.
     */
    readonly EscapedFragment: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.EscapedPath}
     *
     * EscapedPath returns the escaped form of u.Path.
     *
     * In general there are multiple possible escaped forms of any path.
     *
     * EscapedPath returns u.RawPath when it is a valid escaping of u.Path.
     *
     * Otherwise EscapedPath ignores u.RawPath and computes an escaped form on its own.
     *
     * The String and RequestURI methods use EscapedPath to construct their results.
     *
     * In general, code should call EscapedPath instead of reading u.RawPath directly.
     */
    readonly EscapedPath: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Hostname}
     *
     * Hostname returns u.Host, stripping any valid port number if present.
     *
     * If the result is enclosed in square brackets, as literal IPv6 addresses are, the square
     * brackets are removed from the result.
     */
    readonly Hostname: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.IsAbs}
     *
     * IsAbs reports whether the URL is absolute.
     *
     * Absolute means that it has a non-empty scheme.
     */
    readonly IsAbs: boolean;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Port}
     *
     * Port returns the port part of u.Host, without the leading colon.
     *
     * If u.Host doesn't contain a valid numeric port, Port returns an empty string.
     */
    readonly Port: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.Query}
     *
     * Query parses RawQuery and returns the corresponding values.
     *
     * It silently discards malformed value pairs.
     *
     * To check errors use ParseQuery.
     */
    readonly Query: { [key: string]: string[] };
    /**
     * {@link https://pkg.go.dev/net/url#URL.Redacted}
     *
     * Redacted is like String but replaces any password with "xxxxx".
     *
     * Only the password in u.User is redacted.
     */
    readonly Redacted: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.RequestURI}
     *
     * RequestURI returns the encoded path?query or opaque?query string that would be used in an
     * HTTP request for u.
     */
    readonly RequestURI: string;
    /**
     * {@link https://pkg.go.dev/net/url#URL.String}
     *
     * String reassembles the URL into a valid URL string.
     *
     * The general form of the result is one of:
     * - `scheme:opaque?query#fragment`
     * - `scheme://userinfo@host/path?query#fragment`
     *
     * If u.Opaque is non-empty, String uses the first form; otherwise it uses the second form.
     *
     * Any non-ASCII characters in host are escaped.
     *
     * To obtain the path, String uses u.EscapedPath().
     *
     * In the second form, the following rules apply:
     * - if u.Scheme is empty, `scheme:` is omitted.
     * - if u.User is nil, `userinfo@` is omitted.
     * - if u.Host is empty, `host/` is omitted.
     * - if u.Scheme and u.Host are empty and u.User is nil, the entire
     * `scheme://userinfo@host/` is omitted.
     * - if u.Host is non-empty and u.Path begins with a /, the form `host/path` does not add
     * its own /.
     * - if u.RawQuery is empty, `?query` is omitted.
     * - if u.Fragment is empty, `#fragment` is omitted.
     */
    readonly String: string;
}

/**
 * Request user
 */
export interface IUser {
    /**
     * {@link https://pkg.go.dev/net/url#Userinfo.Password}
     *
     * Password returns the password in case it is set.
     */
    readonly Password: string;
    /**
     * {@link https://pkg.go.dev/net/url#Userinfo.Password}
     *
     * Password returns the password whether it is set.
     */
    readonly PasswordSet: boolean;
    /**
     * {@link https://pkg.go.dev/net/url#Userinfo.String}
     *
     * String returns the encoded userinfo information in the standard form of
     * "username[:password]".
     */
    readonly String: string;
    /**
     * {@link https://pkg.go.dev/net/url#Userinfo.Username}
     *
     * Username returns the username.
     */
    readonly Username: string;
}

// #endregion content
