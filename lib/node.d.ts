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

/************************************************
 *                                               *
 *               GLOBAL INTERFACES               *
 *                                               *
 ************************************************/

declare module NodeJS {
    export interface Require{
        (path: string): any;
    }

    export interface ErrnoException extends Error {
        errno?: any;
        code?: string;
        path?: string;
        syscall?: string;
    }

    // Buffer class
    interface Buffer extends NodeBuffer {}
    var Buffer: {
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
        copy(targetBuffer: NodeJS.Buffer, targetStart?: number, sourceStart?: number, sourceEnd?: number): number;
        slice(start?: number, end?: number): NodeJS.Buffer;
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
        unshift(chunk: NodeJS.Buffer): void;
        wrap(oldStream: ReadableStream): ReadableStream;
    }

    export interface WritableStream extends EventEmitter {
        writable: boolean;
        write(buffer: NodeJS.Buffer, cb?: Function): boolean;
        write(str: string, cb?: Function): boolean;
        write(str: string, encoding?: string, cb?: Function): boolean;
        end(): void;
        end(buffer: NodeJS.Buffer, cb?: Function): void;
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

    module Events {
        export interface EventEmitter extends NodeJS.EventEmitter {}
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
            unshift(chunk: NodeJS.Buffer): void;
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
            _write(data: NodeJS.Buffer, encoding: string, callback: Function): void;
            _write(data: string, encoding: string, callback: Function): void;
            write(buffer: NodeJS.Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: NodeJS.Buffer, cb?: Function): void;
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
            _write(data: NodeJS.Buffer, encoding: string, callback: Function): void;
            _write(data: string, encoding: string, callback: Function): void;
            write(buffer: NodeJS.Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: NodeJS.Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface TransformOptions extends ReadableOptions, WritableOptions {}

        // Note: Transform lacks the _read and _write methods of Readable/Writable.
        export interface Transform extends Events.EventEmitter, NodeJS.ReadWriteStream {
            readable: boolean;
            writable: boolean;
            constructor(opts?: TransformOptions);
            _transform(chunk: NodeJS.Buffer, encoding: string, callback: Function): void;
            _transform(chunk: string, encoding: string, callback: Function): void;
            _flush(callback: Function): void;
            read(size?: number): any;
            setEncoding(encoding: string): void;
            pause(): void;
            resume(): void;
            pipe<T extends NodeJS.WritableStream>(destination: T, options?: { end?: boolean; }): T;
            unpipe<T extends NodeJS.WritableStream>(destination?: T): void;
            unshift(chunk: string): void;
            unshift(chunk: NodeJS.Buffer): void;
            wrap(oldStream: NodeJS.ReadableStream): NodeJS.ReadableStream;
            push(chunk: any, encoding?: string): boolean;
            write(buffer: NodeJS.Buffer, cb?: Function): boolean;
            write(str: string, cb?: Function): boolean;
            write(str: string, encoding?: string, cb?: Function): boolean;
            end(): void;
            end(buffer: NodeJS.Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
        }

        export interface PassThrough extends Transform {}
    }

    module Net {
        export interface Socket extends Stream.Duplex {
            // Extended base methods
            write(buffer: NodeJS.Buffer): boolean;
            write(buffer: NodeJS.Buffer, cb?: Function): boolean;
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
            end(buffer: NodeJS.Buffer, cb?: Function): void;
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
            write(buffer: NodeJS.Buffer): boolean;
            write(buffer: NodeJS.Buffer, cb?: Function): boolean;
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
            end(buffer: NodeJS.Buffer, cb?: Function): void;
            end(str: string, cb?: Function): void;
            end(str: string, encoding?: string, cb?: Function): void;
            end(data?: any, encoding?: string): void;
        }
        export interface ClientRequest extends Events.EventEmitter, Stream.Writable {
            // Extended base methods
            write(buffer: NodeJS.Buffer): boolean;
            write(buffer: NodeJS.Buffer, cb?: Function): boolean;
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
            end(buffer: NodeJS.Buffer, cb?: Function): void;
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
            write(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, written: number, buffer: NodeJS.Buffer) => void): void;
            writeSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
            read(fd: number, buffer: Buffer, offset: number, length: number, position: number, callback?: (err: NodeJS.ErrnoException, bytesRead: number, buffer: NodeJS.Buffer) => void): void;
            readSync(fd: number, buffer: Buffer, offset: number, length: number, position: number): number;
            readFile(filename: string, encoding: string, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
            readFile(filename: string, options: { encoding: string; flag?: string; }, callback: (err: NodeJS.ErrnoException, data: string) => void): void;
            readFile(filename: string, options: { flag?: string; }, callback: (err: NodeJS.ErrnoException, data: NodeJS.Buffer) => void): void;
            readFile(filename: string, callback: (err: NodeJS.ErrnoException, data: NodeJS.Buffer) => void ): void;
            readFileSync(filename: string, encoding: string): string;
            readFileSync(filename: string, options: { encoding: string; flag?: string; }): string;
            readFileSync(filename: string, options?: { flag?: string; }): NodeJS.Buffer;
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
}