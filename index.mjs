/*!
    @e53e04ac/ipp5-backend-static-builder/index.mjs
    Copyright (C) @e53e04ac
    MIT License
*/

import { AzureTerraformer } from 'azure-terraformer';
import { EventEmitter } from 'event-emitter';
import { FileEntry } from 'file-entry-native';
import { hold } from 'hold';
import { unwrap } from 'hold';

/** @type {import('.').Ipp5BackendStaticBuilder.Constructor} */
const constructor = ((options) => {

    const _options = ({
        docker: hold(() => {
            return unwrap(options.docker);
        }),
        appDirectory: hold(() => {
            return unwrap(options.appDirectory);
        }),
        staticDistDirectory: hold(() => {
            return unwrap(options.staticDistDirectory);
        }),
        tmpDirectory: hold(() => {
            return unwrap(options.tmpDirectory);
        }),
        runId: hold(() => {
            return unwrap(options.buildId);
        }),
        noCache: hold(() => {
            return unwrap(options.noCache);
        }),
        containerAppGroup: hold(() => {
            return unwrap(options.containerAppGroup);
        }),
        containerAppUser: hold(() => {
            return unwrap(options.containerAppUser);
        }),
        containerAppEntrypoint: hold(() => {
            return unwrap(options.containerAppEntrypoint);
        }),
        containerAppPort: hold(() => {
            return unwrap(options.containerAppPort);
        }),
        containerImageName: hold(() => {
            return unwrap(options.containerImageName);
        }),
        containerAppDirectoryPath: hold(() => {
            return unwrap(options.containerAppDirectoryPath);
        }),
        containerDocumentRootDirectoryPath: hold(() => {
            return unwrap(options.containerDocumentRootDirectoryPath);
        }),
    });

    /** @type {import('.').Ipp5BackendStaticBuilder._Self} */
    const _self = ({
        options: (() => {
            return options;
        }),
        _options: (() => {
            return _options;
        }),
        scriptFile: hold(() => {
            return FileEntry.fromFileUrl(import.meta.url);
        }),
        scriptDirectory: hold(() => {
            return _self.scriptFile().parent();
        }),
        templateDockerfile: hold(() => {
            return _self.scriptDirectory().resolve('Dockerfile.template');
        }),
        runDirectory: hold(() => {
            return _options.tmpDirectory().resolve(_options.runId());
        }),
        contextDirectory: hold(() => {
            return _self.runDirectory().resolve('context');
        }),
        contextDocumentRootDirectory: hold(() => {
            return _self.contextDirectory().resolve('static');
        }),
        contextAppDirectory: hold(() => {
            return _self.contextDirectory().resolve('app');
        }),
        contextDockerfile: hold(() => {
            return _self.contextDirectory().resolve('Dockerfile');
        }),
        contextAppDirectoryRelativePath: hold(() => {
            return _self.contextDirectory().relative(_self.contextAppDirectory()) + '/';
        }),
        contextDocumentRootDirectoryRelativePath: hold(() => {
            return _self.contextDirectory().relative(_self.contextDocumentRootDirectory()) + '/';
        }),
        azureTerraformer: hold(() => {
            return AzureTerraformer({});
        }),
        makeDocumentRoot: hold(async () => {
            await _options.staticDistDirectory().copyDirectory(_self.contextDocumentRootDirectory());
        }),
        makeApp: hold(async () => {
            const src = _options.appDirectory();
            const dest = _self.contextAppDirectory();
            await src.resolve('index.mjs').copyFile(dest.resolve('index.mjs'));
            await src.resolve('package-lock.json').copyFile(dest.resolve('package-lock.json'));
            await src.resolve('package.json').copyFile(dest.resolve('package.json'));
        }),
        makeDockerfile: hold(async () => {
            await _self.azureTerraformer().createFileFromTemplate({
                template: _self.templateDockerfile(),
                destination: _self.contextDockerfile(),
                /** @type {import('.').Ipp5BackendStaticBuilder.DockerfileVariableMap} */
                map: {
                    containerAppGroup: _options.containerAppGroup(),
                    containerAppUser: _options.containerAppUser(),
                    containerAppEntrypoint: _options.containerAppEntrypoint(),
                    containerAppDirectoryPath: _options.containerAppDirectoryPath(),
                    containerDocumentRootDirectoryPath: _options.containerDocumentRootDirectoryPath(),
                    contextAppDirectoryRelativePath: _self.contextAppDirectoryRelativePath(),
                    contextDocumentRootDirectoryRelativePath: _self.contextDocumentRootDirectoryRelativePath(),
                },
            });
        }),
        runDockerImageBuild: hold(async () => {
            await _self.azureTerraformer().dockerImageBuild({
                docker: _options.docker(),
                noCache: _options.noCache(),
                network: 'host',
                tag: _options.containerImageName(),
                context: _self.contextDirectory(),
            });
        }),
    });

    /** @type {import('.').Ipp5BackendStaticBuilder.Self} */
    const self = ({
        ...EventEmitter({}),
        _Ipp5BackendStaticBuilder: (() => {
            return _self;
        }),
        build: hold(async () => {
            await _self.makeDocumentRoot();
            await _self.makeApp();
            await _self.makeDockerfile();
            await _self.runDockerImageBuild();
        }),
    });

    return self;

});

/** @type {import('.').Ipp5BackendStaticBuilder.Companion} */
const companion = ({});

/** @type {import('.').Ipp5BackendStaticBuilder.ConstructorWithCompanion} */
const constructorWithCompanion = Object.assign(constructor, companion);

export { constructorWithCompanion as Ipp5BackendStaticBuilder };
