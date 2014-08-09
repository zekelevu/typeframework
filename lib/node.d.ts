// Type definitions for Node.js v0.10.1
// Project: http://nodejs.org/
// Definitions by: Microsoft TypeScript <http://typescriptlang.org>, DefinitelyTyped <https://github.com/borisyankov/DefinitelyTyped>
// Definitions: https://github.com/borisyankov/DefinitelyTyped

/************************************************
 *                                               *
 *               Node.js v0.10.1 API             *
 *                                               *
 ************************************************/

/************************************************
 *                                               *
 *                   GLOBAL                      *
 *                                               *
 ************************************************/
declare var process: NodeJS.Process;
declare var global: any;

declare var __filename: string;
declare var __dirname: string;

declare function setTimeout(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearTimeout(timeoutId: NodeJS.Timer): void;
declare function setInterval(callback: (...args: any[]) => void, ms: number, ...args: any[]): NodeJS.Timer;
declare function clearInterval(intervalId: NodeJS.Timer): void;
declare function setImmediate(callback: (...args: any[]) => void, ...args: any[]): any;
declare function clearImmediate(immediateId: any): void;

declare var require: {
    (id: string): any;
    resolve(id:string): string;
    cache: any;
    extensions: any;
    main: any;
};

declare var module: {
    exports: any;
    require(id: string): any;
    id: string;
    filename: string;
    loaded: boolean;
    parent: any;
    children: any[];
};

// Same as module.exports
declare var exports: any;
declare var SlowBuffer: {
    new (str: string, encoding?: string): Buffer;
    new (size: number): Buffer;
    new (size: Uint8Array): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: Buffer[], totalLength?: number): Buffer;
};

// Buffer class
interface Buffer extends NodeBuffer {}
declare var Buffer: {
    new (str: string, encoding?: string): Buffer;
    new (size: number): Buffer;
    new (array: any[]): Buffer;
    prototype: Buffer;
    isBuffer(obj: any): boolean;
    byteLength(string: string, encoding?: string): number;
    concat(list: Buffer[], totalLength?: number): Buffer;
};

/**
 * @deprecated
 */
interface NodeBuffer {
    [index: number]: number;
    write(string: string, offset?: number, length?: number, encoding?: string): number;
    toString(encoding?: string, start?: number, end?: number): string;
    toJSON(): any;
    length: number;
    copy(targetBuffer: Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
    slice(start?: number, end?: number): Buffer;
    readUInt8(offset: number, noAsset?: boolean): number;
    readUInt16LE(offset: number, noAssert?: boolean): number;
    readUInt16BE(offset: number, noAssert?: boolean): number;
    readUInt32LE(offset: number, noAssert?: boolean): number;
    readUInt32BE(offset: number, noAssert?: boolean): number;
    readInt8(offset: number, noAssert?: boolean): number;
    readInt16LE(offset: number, noAssert?: boolean): number;
    readInt16BE(offset: number, noAssert?: boolean): number;
    readInt32LE(offset: number, noAssert?: boolean): number;
    readInt32BE(offset: number, noAssert?: boolean): number;
    readFloatLE(offset: number, noAssert?: boolean): number;
    readFloatBE(offset: number, noAssert?: boolean): number;
    readDoubleLE(offset: number, noAssert?: boolean): number;
    readDoubleBE(offset: number, noAssert?: boolean): number;
    writeUInt8(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeUInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt8(value: number, offset: number, noAssert?: boolean): void;
    writeInt16LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt16BE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32LE(value: number, offset: number, noAssert?: boolean): void;
    writeInt32BE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatLE(value: number, offset: number, noAssert?: boolean): void;
    writeFloatBE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleLE(value: number, offset: number, noAssert?: boolean): void;
    writeDoubleBE(value: number, offset: number, noAssert?: boolean): void;
    fill(value: any, offset?: number, end?: number): void;
}

/************************************************
 *                                               *
 *               GLOBAL INTERFACES               *
 *                                               *
 ************************************************/

declare module NodeJS {
    export interface ErrnoException extends Error {
        errno?: any;
        code?: string;
        path?: string;
        syscall?: string;
    }

    export interface EventEmitter {
        addListener(event: string, listener: Function): EventEmitter;
        on(event: string, listener: Function): EventEmitter;
        once(event: string, listener: Function): EventEmitter;
        removeListener(event: string, listener: Function): EventEmitter;
        removeAllListeners(event?: string): EventEmitter;
        setMaxListeners(n: number): void;
        listeners(event: string): Function[];
        emit(event: string, ...args: any[]): boolean;
    }

    export interface ReadableStream extends EventEmitter {
        readable: boolean;
        read(size?: number): any;
        setEncoding(encoding: string): void;
        pause(): void;
        resume(): void;
        pipe<T extends WritableStream>(destination: T, options?: { end?: boolean; }): T;
        unpipe<T extends WritableStream>(destination?: T): void;
        unshift(chunk: string): void;
        unshift(chunk: Buffer): void;
        wrap(oldStream: ReadableStream): ReadableStream;
    }

    export interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(buffer: Buffer, cb?: Function): void;
        end(str: string, cb?: Function): void;
        end(str: string, encoding?: string, cb?: Function): void;
    }

    export interface ReadWriteStream extends ReadableStream, WritableStream {}

    export interface Process extends EventEmitter {
        stdout: WritableStream;
        stderr: WritableStream;
        stdin: ReadableStream;
        argv: string[];
        execPath: string;
        abort(): void;
        chdir(directory: string): void;
        cwd(): string;
        env: any;
        exit(code?: number): void;
        getgid(): number;
        setgid(id: number): void;
        setgid(id: string): void;
        getuid(): number;
        setuid(id: number): void;
        setuid(id: string): void;
        version: string;
        versions: {
            http_parser: string;
            node: string;
            v8: string;
            ares: string;
            uv: string;
            zlib: string;
            openssl: string;
        };
        config: {
            target_defaults: {
                cflags: any[];
                default_configuration: string;
                defines: string[];
                include_dirs: string[];
                libraries: string[];
            };
            variables: {
                clang: number;
                host_arch: string;
                node_install_npm: boolean;
                node_install_waf: boolean;
                node_prefix: string;
                node_shared_openssl: boolean;
                node_shared_v8: boolean;
                node_shared_zlib: boolean;
                node_use_dtrace: boolean;
                node_use_etw: boolean;
                node_use_openssl: boolean;
                target_arch: string;
                v8_no_strict_aliasing: number;
                v8_use_snapshot: boolean;
                visibility: string;
            };
        };
        kill(pid: number, signal?: string): void;
        pid: number;
        title: string;
        arch: string;
        platform: string;
        memoryUsage(): { rss: number; heapTotal: number; heapUsed: number; };
        nextTick(callback: Function): void;
        umask(mask?: number): number;
        uptime(): number;
        hrtime(time?:number[]): number[];

        // Worker
        send?(message: any, sendHandle?: any): void;
    }

    export interface Timer {
        ref() : void;
        unref() : void;
    }

    /************************************************
     *                                               *
     *                   MODULES                     *
     *                                               *
     ************************************************/

    module BufferStatic {
        export var INSPECT_MAX_BYTES: number;
    }

    module QueryString {
        export function stringify(obj: any, sep?: string, eq?: string): string;
        export function parse(str: string, sep?: string, eq?: string, options?: { maxKeys?: number; }): any;
        export function escape(): any;
        export function unescape(): any;
    }

    module Events {
        export class EventEmitter implements NodeJS.EventEmitter {
            static listenerCount(emitter: EventEmitter, event: string): number;

            addListener(event: string, listener: Function): EventEmitter;
            on(event: string, listener: Function): EventEmitter;
            once(event: string, listener: Function): EventEmitter;
            removeListener(event: string, listener: Function): EventEmitter;
            removeAllListeners(event?: string): EventEmitter;
            setMaxListeners(n: number): void;
            listeners(event: string): Function[];
            emit(event: string, ...args: any[]): boolean;
        }
    }

    module Http {
        export interface Server extends Events.EventEmitter {
            listen(port: number, hostname?: string, backlog?: number, callback?: Function): Server;
            listen(path: string, callback?: Function): Server;
            listen(handle: any, listeningListener?: Function): Server;
            close(cb?: any): Server;
            address(): { port: number; family: string; address: string; };
            maxHeadersCount: number;
        }
        export interface ServerRequest extends Events.EventEmitter, NodeJS.Stream.Readable {
            method: string;
            url: string;
            headers: any;
            trailers: string;
            httpVersion: string;
            setEncoding(encoding?: string): void;
            pause(): void;
            resume(): void;
            connection: Net.Socket;
        }
        export interface ServerResponse extends Events.EventEmitter, Stream.Writable {
            // Extended base methods
            write(buffer: Buffer): boolean;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            write(str: string, encoding?: string, fd?: string): boolean;

            writeContinue(): void;
            writeHead(statusCode: number, reasonPhrase?: string, headers?: any): void;
            writeHead(statusCode: number, headers?: any): void;
            statusCode: number;
            setHeader(name: string, value: string): void;
            sendDate: boolean;
            getHeader(name: string): string;
            removeHeader(name: string): void;
            write(chunk: any, encoding?: string): any;
            addTrailers(headers: any): void;

            // Extended base methods
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
            end(data?: any, encoding?: string): void;
        }
        export interface ClientRequest extends Events.EventEmitter, Stream.Writable {
            // Extended base methods
            write(buffer: Buffer): boolean;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            write(str: string, encoding?: string, fd?: string): boolean;

            write(chunk: any, encoding?: string): void;
            abort(): void;
            setTimeout(timeout: number, callback?: Function): void;
            setNoDelay(noDelay?: boolean): void;
            setSocketKeepAlive(enable?: boolean, initialDelay?: number): void;

            // Extended base methods
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
            end(data?: any, encoding?: string): void;
        }
        export interface ClientResponse extends Events.EventEmitter, Stream.Readable {
            statusCode: number;
            httpVersion: string;
            headers: any;
            trailers: any;
            setEncoding(encoding?: string): void;
            pause(): void;
            resume(): void;
        }
        export interface Agent { maxSockets: number; sockets: any; requests: any; }

        export var STATUS_CODES: {
            [errorCode: number]: string;
            [errorCode: string]: string;
        };
        export function createServer(requestListener?: (request: ServerRequest, response: ServerResponse) =>void ): Server;
        export function createClient(port?: number, host?: string): any;
        export function request(options: any, callback?: Function): ClientRequest;
        export function get(options: any, callback?: Function): ClientRequest;
        export var globalAgent: Agent;
    }

    module Cluster {
        export interface ClusterSettings {
            exec?: string;
            args?: string[];
            silent?: boolean;
        }

        export class Worker extends Events.EventEmitter {
            id: string;
            process: Child.ChildProcess;
            suicide: boolean;
            send(message: any, sendHandle?: any): void;
            kill(signal?: string): void;
            destroy(signal?: string): void;
            disconnect(): void;
        }

        export var settings: ClusterSettings;
        export var isMaster: boolean;
        export var isWorker: boolean;
        export function setupMaster(settings?: ClusterSettings): void;
        export function fork(env?: any): Worker;
        export function disconnect(callback?: Function): void;
        export var worker: Worker;
        export var workers: Worker[];

        // Event emitter
        export function addListener(event: string, listener: Function): void;
        export function on(event: string, listener: Function): any;
        export function once(event: string, listener: Function): void;
        export function removeListener(event: string, listener: Function): void;
        export function removeAllListeners(event?: string): void;
        export function setMaxListeners(n: number): void;
        export function listeners(event: string): Function[];
        export function emit(event: string, ...args: any[]): boolean;
    }

    module Zlib {
        export interface ZlibOptions { chunkSize?: number; windowBits?: number; level?: number; memLevel?: number; strategy?: number; dictionary?: any; }

        export interface Gzip extends Stream.Transform { }
        export interface Gunzip extends Stream.Transform { }
        export interface Deflate extends Stream.Transform { }
        export interface Inflate extends Stream.Transform { }
        export interface DeflateRaw extends Stream.Transform { }
        export interface InflateRaw extends Stream.Transform { }
        export interface Unzip extends Stream.Transform { }

        export function createGzip(options?: ZlibOptions): Gzip;
        export function createGunzip(options?: ZlibOptions): Gunzip;
        export function createDeflate(options?: ZlibOptions): Deflate;
        export function createInflate(options?: ZlibOptions): Inflate;
        export function createDeflateRaw(options?: ZlibOptions): DeflateRaw;
        export function createInflateRaw(options?: ZlibOptions): InflateRaw;
        export function createUnzip(options?: ZlibOptions): Unzip;

        export function deflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
        export function deflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
        export function gzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
        export function gunzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
        export function inflate(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
        export function inflateRaw(buf: Buffer, callback: (error: Error, result: any) =>void ): void;
        export function unzip(buf: Buffer, callback: (error: Error, result: any) =>void ): void;

        // Constants
        export var Z_NO_FLUSH: number;
        export var Z_PARTIAL_FLUSH: number;
        export var Z_SYNC_FLUSH: number;
        export var Z_FULL_FLUSH: number;
        export var Z_FINISH: number;
        export var Z_BLOCK: number;
        export var Z_TREES: number;
        export var Z_OK: number;
        export var Z_STREAM_END: number;
        export var Z_NEED_DICT: number;
        export var Z_ERRNO: number;
        export var Z_STREAM_ERROR: number;
        export var Z_DATA_ERROR: number;
        export var Z_MEM_ERROR: number;
        export var Z_BUF_ERROR: number;
        export var Z_VERSION_ERROR: number;
        export var Z_NO_COMPRESSION: number;
        export var Z_BEST_SPEED: number;
        export var Z_BEST_COMPRESSION: number;
        export var Z_DEFAULT_COMPRESSION: number;
        export var Z_FILTERED: number;
        export var Z_HUFFMAN_ONLY: number;
        export var Z_RLE: number;
        export var Z_FIXED: number;
        export var Z_DEFAULT_STRATEGY: number;
        export var Z_BINARY: number;
        export var Z_TEXT: number;
        export var Z_ASCII: number;
        export var Z_UNKNOWN: number;
        export var Z_DEFLATED: number;
        export var Z_NULL: number;
    }

    module OS {
        export function tmpDir(): string;
        export function hostname(): string;
        export function type(): string;
        export function platform(): string;
        export function arch(): string;
        export function release(): string;
        export function uptime(): number;
        export function loadavg(): number[];
        export function totalmem(): number;
        export function freemem(): number;
        export function cpus(): { model: string; speed: number; times: { user: number; nice: number; sys: number; idle: number; irq: number; }; }[];
        export function networkInterfaces(): any;
        export var EOL: string;
    }

    module Https {
        export interface ServerOptions {
            pfx?: any;
            key?: any;
            passphrase?: string;
            cert?: any;
            ca?: any;
            crl?: any;
            ciphers?: string;
            honorCipherOrder?: boolean;
            requestCert?: boolean;
            rejectUnauthorized?: boolean;
            NPNProtocols?: any;
            SNICallback?: (servername: string) => any;
        }

        export interface RequestOptions {
            host?: string;
            hostname?: string;
            port?: number;
            path?: string;
            method?: string;
            headers?: any;
            auth?: string;
            agent?: any;
            pfx?: any;
            key?: any;
            passphrase?: string;
            cert?: any;
            ca?: any;
            ciphers?: string;
            rejectUnauthorized?: boolean;
        }

        export interface Agent {
            maxSockets: number;
            sockets: any;
            requests: any;
        }
        export var Agent: {
            new (options?: RequestOptions): Agent;
        };
        export interface Server extends Tls.Server { }
        export function createServer(options: ServerOptions, requestListener?: Function): Server;
        export function request(options: RequestOptions, callback?: (res: Events.EventEmitter) =>void ): Http.ClientRequest;
        export function get(options: RequestOptions, callback?: (res: Events.EventEmitter) =>void ): Http.ClientRequest;
        export var globalAgent: Agent;
    }

    module Punycode {
        export function decode(string: string): string;
        export function encode(string: string): string;
        export function toUnicode(domain: string): string;
        export function toASCII(domain: string): string;
        export var ucs2: ucs2;
        interface ucs2 {
            decode(string: string): string;
            encode(codePoints: number[]): string;
        }
        export var version: any;
    }

    module Repl {
        export interface ReplOptions {
            prompt?: string;
            input?: NodeJS.ReadableStream;
            output?: NodeJS.WritableStream;
            terminal?: boolean;
            eval?: Function;
            useColors?: boolean;
            useGlobal?: boolean;
            ignoreUndefined?: boolean;
            writer?: Function;
        }
        export function start(options: ReplOptions): Events.EventEmitter;
    }

    module ReadLine {
        export interface ReadLineStatic extends Events.EventEmitter {
            setPrompt(prompt: string, length: number): void;
            prompt(preserveCursor?: boolean): void;
            question(query: string, callback: Function): void;
            pause(): void;
            resume(): void;
            close(): void;
            write(data: any, key?: any): void;
        }
        export interface ReadLineOptions {
            input: NodeJS.ReadableStream;
            output: NodeJS.WritableStream;
            completer?: Function;
            terminal?: boolean;
        }
        export function createInterface(options: ReadLineOptions): ReadLineStatic;
    }

    module VM {
        export interface Context { }
        export interface Script {
            runInThisContext(): void;
            runInNewContext(sandbox?: Context): void;
        }
        export function runInThisContext(code: string, filename?: string): void;
        export function runInNewContext(code: string, sandbox?: Context, filename?: string): void;
        export function runInContext(code: string, context: Context, filename?: string): void;
        export function createContext(initSandbox?: Context): Context;
        export function createScript(code: string, filename?: string): Script;
    }

    module Child {
        export interface ChildProcess extends Events.EventEmitter {
            stdin:  Stream.Writable;
            stdout: Stream.Readable;
            stderr: Stream.Readable;
            pid: number;
            kill(signal?: string): void;
            send(message: any, sendHandle: any): void;
            disconnect(): void;
        }

        export function spawn(command: string, args?: string[], options?: {
            cwd?: string;
            stdio?: any;
            custom?: any;
            env?: any;
            detached?: boolean;
        }): ChildProcess;
        export function exec(command: string, options: {
            cwd?: string;
            stdio?: any;
            customFds?: any;
            env?: any;
            encoding?: string;
            timeout?: number;
            maxBuffer?: number;
            killSignal?: string;
        }, callback: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
        export function exec(command: string, callback: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
        export function execFile(file: string, args: string[], options: {
            cwd?: string;
            stdio?: any;
            customFds?: any;
            env?: any;
            encoding?: string;
            timeout?: number;
            maxBuffer?: string;
            killSignal?: string;
        }, callback: (error: Error, stdout: Buffer, stderr: Buffer) =>void ): ChildProcess;
        export function fork(modulePath: string, args?: string[], options?: {
            cwd?: string;
            env?: any;
            encoding?: string;
        }): ChildProcess;
    }

    module Url {
        export interface UrlStatic {
            href: string;
            protocol: string;
            auth: string;
            hostname: string;
            port: string;
            host: string;
            pathname: string;
            search: string;
            query: string;
            slashes: boolean;
            hash?: string;
            path?: string;
        }

        export interface UrlOptions {
            protocol?: string;
            auth?: string;
            hostname?: string;
            port?: string;
            host?: string;
            pathname?: string;
            search?: string;
            query?: any;
            hash?: string;
            path?: string;
        }

        export function parse(urlStr: string, parseQueryString?: boolean , slashesDenoteHost?: boolean ): UrlStatic;
        export function format(url: UrlOptions): string;
        export function resolve(from: string, to: string): string;
    }

    module Dns {
        export function lookup(domain: string, family: number, callback: (err: Error, address: string, family: number) =>void ): string;
        export function lookup(domain: string, callback: (err: Error, address: string, family: number) =>void ): string;
        export function resolve(domain: string, rrtype: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolve(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolve4(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolve6(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolveMx(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolveTxt(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolveSrv(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolveNs(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function resolveCname(domain: string, callback: (err: Error, addresses: string[]) =>void ): string[];
        export function reverse(ip: string, callback: (err: Error, domains: string[]) =>void ): string[];
    }

    module Net {
        export interface Socket extends Stream.Duplex {
            // Extended base methods
            write(buffer: Buffer): boolean;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            write(str: string, encoding?: string, fd?: string): boolean;

            connect(port: number, host?: string, connectionListener?: Function): void;
            connect(path: string, connectionListener?: Function): void;
            bufferSize: number;
            setEncoding(encoding?: string): void;
            write(data: any, encoding?: string, callback?: Function): void;
            destroy(): void;
            pause(): void;
            resume(): void;
            setTimeout(timeout: number, callback?: Function): void;
            setNoDelay(noDelay?: boolean): void;
            setKeepAlive(enable?: boolean, initialDelay?: number): void;
            address(): { port: number; family: string; address: string; };
            remoteAddress: string;
            remotePort: number;
            bytesRead: number;
            bytesWritten: number;

            // Extended base methods
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
            end(data?: any, encoding?: string): void;
        }

        export var Socket: {
            new (options?: { fd?: string; type?: string; allowHalfOpen?: boolean; }): Socket;
        };

        export interface Server extends Socket {
            listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
            listen(path: string, listeningListener?: Function): Server;
            listen(handle: any, listeningListener?: Function): Server;
            close(callback?: Function): Server;
            address(): { port: number; family: string; address: string; };
            maxConnections: number;
            connections: number;
        }
        export function createServer(connectionListener?: (socket: Socket) =>void ): Server;
        export function createServer(options?: { allowHalfOpen?: boolean; }, connectionListener?: (socket: Socket) =>void ): Server;
        export function connect(options: { allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
        export function connect(port: number, host?: string, connectionListener?: Function): Socket;
        export function connect(path: string, connectionListener?: Function): Socket;
        export function createConnection(options: { allowHalfOpen?: boolean; }, connectionListener?: Function): Socket;
        export function createConnection(port: number, host?: string, connectionListener?: Function): Socket;
        export function createConnection(path: string, connectionListener?: Function): Socket;
        export function isIP(input: string): number;
        export function isIPv4(input: string): boolean;
        export function isIPv6(input: string): boolean;
    }

    module DGram {
        interface RemoteInfo {
            address: string;
            port: number;
            size: number;
        }

        interface AddressInfo {
            address: string;
            family: string;
            port: number;
        }

        export function createSocket(type: string, callback?: (msg: Buffer, rinfo: RemoteInfo) => void): Socket;

        interface Socket extends Events.EventEmitter {
            send(buf: Buffer, offset: number, length: number, port: number, address: string, callback?: (error: Error, bytes: number) => void): void;
            bind(port: number, address?: string, callback?: () => void): void;
            close(): void;
            address(): AddressInfo;
            setBroadcast(flag: boolean): void;
            setMulticastTTL(ttl: number): void;
            setMulticastLoopback(flag: boolean): void;
            addMembership(multicastAddress: string, multicastInterface?: string): void;
            dropMembership(multicastAddress: string, multicastInterface?: string): void;
        }
    }

    module FS {
        interface Stats {
            isFile(): boolean;
            isDirectory(): boolean;
            isBlockDevice(): boolean;
            isCharacterDevice(): boolean;
            isSymbolicLink(): boolean;
            isFIFO(): boolean;
            isSocket(): boolean;
            dev: number;
            ino: number;
            mode: number;
            nlink: number;
            uid: number;
            gid: number;
            rdev: number;
            size: number;
            blksize: number;
            blocks: number;
            atime: Date;
            mtime: Date;
            ctime: Date;
        }

        interface FSWatcher extends Events.EventEmitter {
            close(): void;
        }

        export interface ReadStream extends Stream.Readable {}
        export interface WriteStream extends Stream.Writable {}

        export class FSStatic {
            rename(oldPath: string, newPath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            renameSync(oldPath: string, newPath: string): void;
            truncate(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            truncate(path: string, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            truncateSync(path: string, len?: number): void;
            ftruncate(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            ftruncate(fd: number, len: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            ftruncateSync(fd: number, len?: number): void;
            chown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            chownSync(path: string, uid: number, gid: number): void;
            fchown(fd: number, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            fchownSync(fd: number, uid: number, gid: number): void;
            lchown(path: string, uid: number, gid: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            lchownSync(path: string, uid: number, gid: number): void;
            chmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            chmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            chmodSync(path: string, mode: number): void;
            chmodSync(path: string, mode: string): void;
            fchmod(fd: number, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            fchmod(fd: number, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            fchmodSync(fd: number, mode: number): void;
            fchmodSync(fd: number, mode: string): void;
            lchmod(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            lchmod(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            lchmodSync(path: string, mode: number): void;
            lchmodSync(path: string, mode: string): void;
            stat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
            lstat(path: string, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
            fstat(fd: number, callback?: (err: NodeJS.ErrnoException, stats: Stats) => any): void;
            statSync(path: string): Stats;
            lstatSync(path: string): Stats;
            fstatSync(fd: number): Stats;
            link(srcpath: string, dstpath: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            linkSync(srcpath: string, dstpath: string): void;
            symlink(srcpath: string, dstpath: string, type?: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            symlinkSync(srcpath: string, dstpath: string, type?: string): void;
            readlink(path: string, callback?: (err: NodeJS.ErrnoException, linkString: string) => any): void;
            readlinkSync(path: string): string;
            realpath(path: string, callback?: (err: NodeJS.ErrnoException, resolvedPath: string) => any): void;
            realpath(path: string, cache: {[path: string]: string}, callback: (err: NodeJS.ErrnoException, resolvedPath: string) =>any): void;
            realpathSync(path: string, cache?: {[path: string]: string}): string;
            unlink(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            unlinkSync(path: string): void;
            rmdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            rmdirSync(path: string): void;
            mkdir(path: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            mkdir(path: string, mode: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            mkdir(path: string, mode: string, callback?: (err?: NodeJS.ErrnoException) => void): void;
            mkdirSync(path: string, mode?: number): void;
            mkdirSync(path: string, mode?: string): void;
            readdir(path: string, callback?: (err: NodeJS.ErrnoException, files: string[]) => void): void;
            readdirSync(path: string): string[];
            close(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            closeSync(fd: number): void;
            open(path: string, flags: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
            open(path: string, flags: string, mode: number, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
            open(path: string, flags: string, mode: string, callback?: (err: NodeJS.ErrnoException, fd: number) => any): void;
            openSync(path: string, flags: string, mode?: number): number;
            openSync(path: string, flags: string, mode?: string): number;
            utimes(path: string, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            utimes(path: string, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
            utimesSync(path: string, atime: number, mtime: number): void;
            utimesSync(path: string, atime: Date, mtime: Date): void;
            futimes(fd: number, atime: number, mtime: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            futimes(fd: number, atime: Date, mtime: Date, callback?: (err?: NodeJS.ErrnoException) => void): void;
            futimesSync(fd: number, atime: number, mtime: number): void;
            futimesSync(fd: number, atime: Date, mtime: Date): void;
            fsync(fd: number, callback?: (err?: NodeJS.ErrnoException) => void): void;
            fsyncSync(fd: number): void;
            write(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: Buffer) => void): void;
            writeSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
            read(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: Buffer) => void): void;
            readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
            readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
            readFile(filename: string, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
            readFile(filename: string, options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: Buffer) => void): void;
            readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: Buffer) => void ): void;
            readFileSync(filename: string, encoding: string): string;
            readFileSync(filename: string, options: { encoding: string; flag?: string; }): string;
            readFileSync(filename: string, options?: { flag?: string; }): Buffer;
            writeFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
            writeFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
            writeFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
            writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
            writeFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
            appendFile(filename: string, data: any, options: { encoding?: string; mode?: number; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
            appendFile(filename: string, data: any, options: { encoding?: string; mode?: string; flag?: string; }, callback?: (err: NodeJS.ErrnoException) => void): void;
            appendFile(filename: string, data: any, callback?: (err: NodeJS.ErrnoException) => void): void;
            appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: number; flag?: string; }): void;
            appendFileSync(filename: string, data: any, options?: { encoding?: string; mode?: string; flag?: string; }): void;
            watchFile(filename: string, listener: (curr: Stats, prev: Stats) => void): void;
            watchFile(filename: string, options: { persistent?: boolean; interval?: number; }, listener: (curr: Stats, prev: Stats) => void): void;
            unwatchFile(filename: string, listener?: (curr: Stats, prev: Stats) => void): void;
            watch(filename: string, listener?: (event: string, filename: string) => any): FSWatcher;
            watch(filename: string, options: { persistent?: boolean; }, listener?: (event: string, filename: string) => any): FSWatcher;
            exists(path: string, callback?: (exists: boolean) => void): void;
            existsSync(path: string): boolean;
            createReadStream(path: string, options?: {
                flags?: string;
                encoding?: string;
                fd?: string;
                mode?: number;
                bufferSize?: number;
            }): ReadStream;
            createReadStream(path: string, options?: {
                flags?: string;
                encoding?: string;
                fd?: string;
                mode?: string;
                bufferSize?: number;
            }): ReadStream;
            createWriteStream(path: string, options?: {
                flags?: string;
                encoding?: string;
                string?: string;
            }): WriteStream;
        }
    }

    export class Path {
        normalize(p: string): string;
        join(...paths: any[]): string;
        resolve(...pathSegments: any[]): string;
        relative(from: string, to: string): string;
        dirname(p: string): string;
        basename(p: string, ext?: string): string;
        extname(p: string): string;
        sep: string;
    }

    module StringDecoder {
        export interface NodeStringDecoder {
            write(buffer: Buffer): string;
            detectIncompleteChar(buffer: Buffer): number;
        }
        export var StringDecoder: {
            new (encoding: string): NodeStringDecoder;
        };
    }

    module Tls {
        var CLIENT_RENEG_LIMIT: number;
        var CLIENT_RENEG_WINDOW: number;

        export interface TlsOptions {
            pfx?: any;   //string or buffer
            key?: any;   //string or buffer
            passphrase?: string;
            cert?: any;
            ca?: any;    //string or buffer
            crl?: any;   //string or string array
            ciphers?: string;
            honorCipherOrder?: any;
            requestCert?: boolean;
            rejectUnauthorized?: boolean;
            NPNProtocols?: any;  //array or Buffer;
            SNICallback?: (servername: string) => any;
        }

        export interface ConnectionOptions {
            host?: string;
            port?: number;
            socket?: Net.Socket;
            pfx?: any;   //string | Buffer
            key?: any;   //string | Buffer
            passphrase?: string;
            cert?: any;  //string | Buffer
            ca?: any;    //Array of string | Buffer
            rejectUnauthorized?: boolean;
            NPNProtocols?: any;  //Array of string | Buffer
            servername?: string;
        }

        export interface Server extends Net.Server {
            // Extended base methods
            listen(port: number, host?: string, backlog?: number, listeningListener?: Function): Server;
            listen(path: string, listeningListener?: Function): Server;
            listen(handle: any, listeningListener?: Function): Server;

            listen(port: number, host?: string, callback?: Function): Server;
            close(): Server;
            address(): { port: number; family: string; address: string; };
            addContext(hostName: string, credentials: {
                key: string;
                cert: string;
                ca: string;
            }): void;
            maxConnections: number;
            connections: number;
        }

        export interface ClearTextStream extends Stream.Duplex {
            authorized: boolean;
            authorizationError: Error;
            getPeerCertificate(): any;
            getCipher: {
                name: string;
                version: string;
            };
            address: {
                port: number;
                family: string;
                address: string;
            };
            remoteAddress: string;
            remotePort: number;
        }

        export interface SecurePair {
            encrypted: any;
            cleartext: any;
        }

        export function createServer(options: TlsOptions, secureConnectionListener?: (cleartextStream: ClearTextStream) =>void ): Server;
        export function connect(options: TlsOptions, secureConnectionListener?: () =>void ): ClearTextStream;
        export function connect(port: number, host?: string, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
        export function connect(port: number, options?: ConnectionOptions, secureConnectListener?: () =>void ): ClearTextStream;
        export function createSecurePair(credentials?: Crypto.Credentials, isServer?: boolean, requestCert?: boolean, rejectUnauthorized?: boolean): SecurePair;
    }

    module Crypto {
        export interface CredentialDetails {
            pfx: string;
            key: string;
            passphrase: string;
            cert: string;
            ca: any;    //string | string array
            crl: any;   //string | string array
            ciphers: string;
        }
        export interface Credentials { context?: any; }
        export function createCredentials(details: CredentialDetails): Credentials;
        export function createHash(algorithm: string): Hash;
        export function createHmac(algorithm: string, key: string): Hmac;
        export function createHmac(algorithm: string, key: Buffer): Hmac;
        interface Hash {
            update(data: any, input_encoding?: string): Hash;
            digest(encoding: 'buffer'): Buffer;
            digest(encoding: string): any;
            digest(): Buffer;
        }
        interface Hmac {
            update(data: any, input_encoding?: string): Hmac;
            digest(encoding: 'buffer'): Buffer;
            digest(encoding: string): any;
            digest(): Buffer;
        }
        export function createCipher(algorithm: string, password: any): Cipher;
        export function createCipheriv(algorithm: string, key: any, iv: any): Cipher;
        interface Cipher {
            update(data: any, input_encoding?: string, output_encoding?: string): string;
            final(output_encoding?: string): string;
            setAutoPadding(auto_padding: boolean): void;
        }
        export function createDecipher(algorithm: string, password: any): Decipher;
        export function createDecipheriv(algorithm: string, key: any, iv: any): Decipher;
        interface Decipher {
            update(data: any, input_encoding?: string, output_encoding?: string): void;
            final(output_encoding?: string): string;
            setAutoPadding(auto_padding: boolean): void;
        }
        export function createSign(algorithm: string): Signer;
        interface Signer {
            update(data: any): void;
            sign(private_key: string, output_format: string): string;
        }
        export function createVerify(algorith: string): Verify;
        interface Verify {
            update(data: any): void;
            verify(object: string, signature: string, signature_format?: string): boolean;
        }
        export function createDiffieHellman(prime_length: number): DiffieHellman;
        export function createDiffieHellman(prime: number, encoding?: string): DiffieHellman;
        interface DiffieHellman {
            generateKeys(encoding?: string): string;
            computeSecret(other_public_key: string, input_encoding?: string, output_encoding?: string): string;
            getPrime(encoding?: string): string;
            getGenerator(encoding: string): string;
            getPublicKey(encoding?: string): string;
            getPrivateKey(encoding?: string): string;
            setPublicKey(public_key: string, encoding?: string): void;
            setPrivateKey(public_key: string, encoding?: string): void;
        }
        export function getDiffieHellman(group_name: string): DiffieHellman;
        export function pbkdf2(password: string, salt: string, iterations: number, keylen: number, callback: (err: Error, derivedKey: string) => any): void;
        export function pbkdf2Sync(password: string, salt: string, iterations: number, keylen: number) : Buffer;
        export function randomBytes(size: number): Buffer;
        export function randomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
        export function pseudoRandomBytes(size: number): Buffer;
        export function pseudoRandomBytes(size: number, callback: (err: Error, buf: Buffer) =>void ): void;
    }

    module Stream {
        export interface ReadableOptions {
            highWaterMark?: number;
            encoding?: string;
            objectMode?: boolean;
        }

        export interface Readable extends Events.EventEmitter, NodeJS.ReadableStream {
            readable: boolean;
            constructor(opts?: ReadableOptions);
            _read(size: number): void;
            read(size?: number): any;
            setEncoding(encoding: string): void;
            pause(): void;
            resume(): void;
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
            unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
            unshift(chunk: string): void;
            unshift(chunk: Buffer): void;
            wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
            push(chunk: any, encoding?: string): boolean;
        }

        export interface WritableOptions {
            highWaterMark?: number;
            decodeStrings?: boolean;
        }

        export interface Writable extends Events.EventEmitter, NodeJS.WritableStream {
            writable: boolean;
            constructor(opts?: WritableOptions);
            _write(data: Buffer, encoding: string, callback: Function): void;
            _write(data: string, encoding: string, callback: Function): void;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface DuplexOptions extends ReadableOptions, WritableOptions {
            allowHalfOpen?: boolean;
        }

        // Note: Duplex extends both Readable and Writable.
        export interface Duplex extends Readable, NodeJS.ReadWriteStream {
            writable: boolean;
            constructor(opts?: DuplexOptions);
            _write(data: Buffer, encoding: string, callback: Function): void;
            _write(data: string, encoding: string, callback: Function): void;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface TransformOptions extends ReadableOptions, WritableOptions {}

        // Note: Transform lacks the _read and _write methods of Readable/Writable.
        export interface Transform extends Events.EventEmitter, NodeJS.ReadWriteStream {
            readable: boolean;
            writable: boolean;
            constructor(opts?: TransformOptions);
            _transform(chunk: Buffer, encoding: string, callback: Function): void;
            _transform(chunk: string, encoding: string, callback: Function): void;
            _flush(callback: Function): void;
            read(size?: number): any;
            setEncoding(encoding: string): void;
            pause(): void;
            resume(): void;
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
            unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
            unshift(chunk: string): void;
            unshift(chunk: Buffer): void;
            wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
            push(chunk: any, encoding?: string): boolean;
            write(buffer: Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface PassThrough extends Transform {}
    }

    module Util {
        export interface InspectOptions {
            showHidden?: boolean;
            depth?: number;
            colors?: boolean;
            customInspect?: boolean;
        }

        export function format(format: any, ...param: any[]): string;
        export function debug(string: string): void;
        export function error(...param: any[]): void;
        export function puts(...param: any[]): void;
        export function print(...param: any[]): void;
        export function log(string: string): void;
        export function inspect(object: any, showHidden?: boolean, depth?: number, color?: boolean): string;
        export function inspect(object: any, options: InspectOptions): string;
        export function isArray(object: any): boolean;
        export function isRegExp(object: any): boolean;
        export function isDate(object: any): boolean;
        export function isError(object: any): boolean;
        export function inherits(constructor: any, superConstructor: any): void;
    }

    module Assert {
        module AssertStatic {
            export class AssertionError implements Error {
                name: string;
                message: string;
                actual: any;
                expected: any;
                operator: string;
                generatedMessage: boolean;

                constructor(options?: {message?: string; actual?: any; expected?: any;
                    operator?: string; stackStartFunction?: Function});
            }

            export function fail(actual?: any, expected?: any, message?: string, operator?: string): void;
            export function ok(value: any, message?: string): void;
            export function equal(actual: any, expected: any, message?: string): void;
            export function notEqual(actual: any, expected: any, message?: string): void;
            export function deepEqual(actual: any, expected: any, message?: string): void;
            export function notDeepEqual(acutal: any, expected: any, message?: string): void;
            export function strictEqual(actual: any, expected: any, message?: string): void;
            export function notStrictEqual(actual: any, expected: any, message?: string): void;
            export var throws: {
                (block: Function, message?: string): void;
                (block: Function, error: Function, message?: string): void;
                (block: Function, error: RegExp, message?: string): void;
                (block: Function, error: (err: any) => boolean, message?: string): void;
            };

            export var doesNotThrow: {
                (block: Function, message?: string): void;
                (block: Function, error: Function, message?: string): void;
                (block: Function, error: RegExp, message?: string): void;
                (block: Function, error: (err: any) => boolean, message?: string): void;
            };

            export function ifError(value: any): void;
        }
    }

    module Tty {
        export function isatty(fd: number): boolean;
        export interface ReadStream extends Net.Socket {
            isRaw: boolean;
            setRawMode(mode: boolean): void;
        }
        export interface WriteStream extends Net.Socket {
            columns: number;
            rows: number;
        }
    }

    module Domain {
        export class Domain extends Events.EventEmitter {
            run(fn: Function): void;
            add(emitter: Events.EventEmitter): void;
            remove(emitter: Events.EventEmitter): void;
            bind(cb: (err: Error, data: any) => any): any;
            intercept(cb: (data: any) => any): any;
            dispose(): void;

            addListener(event: string, listener: Function): Domain;
            on(event: string, listener: Function): Domain;
            once(event: string, listener: Function): Domain;
            removeListener(event: string, listener: Function): Domain;
            removeAllListeners(event?: string): Domain;
        }

        export function create(): Domain;
    }
}