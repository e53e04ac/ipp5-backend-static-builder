/*!
    @e53e04ac/ipp5-backend-static-builder/index.d.ts
    Copyright (C) @e53e04ac
    MIT License
*/

import { AzureTerraformer } from 'azure-terraformer';
import { EventEmitter } from 'event-emitter';
import { FileEntry } from 'file-entry';
import { Get } from 'hold';
import { ValueOrGet } from 'hold';

export declare namespace Ipp5BackendStaticBuilder {

    type DockerfileVariableMap = {
        readonly containerAppGroup: string;
        readonly containerAppUser: string;
        readonly containerAppEntrypoint: string;
        readonly containerAppDirectoryPath: string;
        readonly containerDocumentRootDirectoryPath: string;
        readonly contextAppDirectoryRelativePath: string;
        readonly contextDocumentRootDirectoryRelativePath: string;
    };

    type EventSpecs = Record<never, never>;

    type Options = {
        readonly docker: ValueOrGet<string>;
        readonly appDirectory: ValueOrGet<FileEntry>;
        readonly staticDistDirectory: ValueOrGet<FileEntry>;
        readonly tmpDirectory: ValueOrGet<FileEntry>;
        readonly buildId: ValueOrGet<string>;
        readonly noCache: ValueOrGet<boolean>;
        readonly containerAppGroup: ValueOrGet<string>;
        readonly containerAppUser: ValueOrGet<string>;
        readonly containerAppEntrypoint: ValueOrGet<string>;
        readonly containerAppPort: ValueOrGet<number>;
        readonly containerImageName: ValueOrGet<string>;
        readonly containerAppDirectoryPath: ValueOrGet<string>;
        readonly containerDocumentRootDirectoryPath: ValueOrGet<string>;
    };

    type _Self = {
        readonly options: Get<Options>;
        readonly _options: Get<unknown>;
        readonly scriptFile: Get<FileEntry>;
        readonly scriptDirectory: Get<FileEntry>;
        readonly templateDockerfile: Get<FileEntry>;
        readonly runDirectory: Get<FileEntry>;
        readonly contextDirectory: Get<FileEntry>;
        readonly contextDocumentRootDirectory: Get<FileEntry>;
        readonly contextAppDirectory: Get<FileEntry>;
        readonly contextDockerfile: Get<FileEntry>;
        readonly contextAppDirectoryRelativePath: Get<string>;
        readonly contextDocumentRootDirectoryRelativePath: Get<string>;
        readonly azureTerraformer: Get<AzureTerraformer>;
        readonly makeDocumentRoot: Get<Promise<void>>;
        readonly makeApp: Get<Promise<void>>;
        readonly makeDockerfile: Get<Promise<void>>;
        readonly runDockerImageBuild: Get<Promise<void>>;
    };

    type Self = EventEmitter<EventSpecs> & {
        readonly _Ipp5BackendStaticBuilder: Get<_Self>;
        readonly build: Get<Promise<void>>;
    };

    type Constructor = {
        (options: Options): Self;
    };

    type Companion = Record<never, never>;

    type ConstructorWithCompanion = Constructor & Companion;

}

export declare type Ipp5BackendStaticBuilder = Ipp5BackendStaticBuilder.Self;

export declare const Ipp5BackendStaticBuilder: Ipp5BackendStaticBuilder.ConstructorWithCompanion;
