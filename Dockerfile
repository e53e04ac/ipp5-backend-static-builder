#
#   @e53e04ac/ipp5-backend-static-builder/Dockerfile
#   Copyright (C) @e53e04ac
#   MIT License
#

FROM node:18-alpine

COPY $${contextAppDirectoryRelativePath}package*.json $${containerAppDirectoryPath}

WORKDIR $${containerAppDirectoryPath}

RUN npm install

COPY $${contextAppDirectoryRelativePath} $${containerAppDirectoryPath}

COPY $${contextDocumentRootDirectoryRelativePath}thirdparty/ $${containerDocumentRootDirectoryPath}thirdparty/

COPY $${contextDocumentRootDirectoryRelativePath}assets/ $${containerDocumentRootDirectoryPath}assets/

COPY $${contextDocumentRootDirectoryRelativePath} $${containerDocumentRootDirectoryPath}

RUN addgroup -S $${containerAppGroup} && adduser -S $${containerAppUser} -G $${containerAppGroup}

USER $${containerAppUser}

ENTRYPOINT $${containerAppEntrypoint}
