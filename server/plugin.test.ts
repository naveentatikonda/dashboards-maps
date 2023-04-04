/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import {CustomImportMapPlugin} from './plugin';
import { coreMock, httpServiceMock } from '../../../src/core/server/mocks';

describe('CustomImportMapPlugin', () => {
  beforeEach(() => {
    // registryForTutorialsMock.setup.mockClear();
    // registryForTutorialsMock.start.mockClear();
    // registryForSampleDataMock.setup.mockClear();
    // registryForSampleDataMock.start.mockClear();
  });

  describe('setup', () => {
    let mockCoreSetup: ReturnType<typeof coreMock.createSetup>;
    let initContext: ReturnType<typeof coreMock.createPluginInitializerContext>;
    let routerMock: ReturnType<typeof httpServiceMock.createRouter>;

    beforeEach(() => {
      mockCoreSetup = coreMock.createSetup();
      routerMock = httpServiceMock.createRouter();
      mockCoreSetup.http.createRouter.mockReturnValue(routerMock);
      initContext = coreMock.createPluginInitializerContext();

    });
  });
});
