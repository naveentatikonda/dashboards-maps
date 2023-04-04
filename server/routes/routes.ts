/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { Logger } from '@osd/logging';
import fetch from 'node-fetch';
import { IRouter, OpenSearchDashboardsResponseFactory } from '../../../../src/core/server';
import { ConfigSchema } from '../../common/config';
// @ts-ignore
import { APP_PATH } from '../../common';

export function initRoutes(router: IRouter, logger: Logger, config: ConfigSchema) {
  router.get(
    {
      // path: `${APP_PATH.CREATE_MAP}`,
      path: `/create`,
      validate: false,
    },
    async (context, request, response): Promise<any | OpenSearchDashboardsResponseFactory> => {
      try {
        const resp = await fetch(config.opensearchVectorTileDataUrl);
        logger.info('Printing dataurl response');
        logger.info(String(resp.status));
        if (resp.status !== 200) {
          logger.info('Printing dataurl response');
          logger.info(String(resp.status));
          return response.custom({
            statusCode: resp.status || 500,
            body: `TilesDataUrl not provided`,
          });
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        return response.custom({
          statusCode: error.statusCode || 500,
          body: error.message,
        });
      }
    }
  );
}
  // try {
  //   const response = await fetch(config.opensearchVectorTileDataUrl);
  //   logger.info('Printing dataurl response');
  //   logger.info(String(response.status));
  //   // return response.ok();
  // } catch (error) {
  //   logger.warn(`Failed to load the map tiles, error: ${error.message}.`);
  //   logger.error('Error loading map tiles data url');
  //   if (error) {
  //     return error.message;
  //   }
  // return response.custom({
  //   body: 'Error loading map tiles data url',
  //   statusCode: 400,
  // });

  // router.get(
  //   {
  //     path: APP_PATH.CREATE_MAP,
  //     // path: `/${FONTS_API_PATH}/{fontstack}/{range}`,
  //     validate: {
  //       params: schema.object({
  //         dataUrl: schema.string(),
  //       }),
  //     },
  //   },
  //   (context, request, response) => {
  //     const range = path.normalize(request.params.range);
  //     const rootPath = path.resolve(__dirname, 'fonts', 'open_sans');
  //     const fontPath = path.resolve(rootPath, `${range}.pbf`);
  //     return !fontPath.startsWith(rootPath)
  //       ? response.notFound()
  //       : new Promise((resolve) => {
  //           fs.readFile(fontPath, (error, data) => {
  //             if (error) {
  //               resolve(response.notFound());
  //             } else {
  //               resolve(
  //                 response.ok({
  //                   body: data,
  //                 })
  //               );
  //             }
  //           });
  //         });
  //   }
  // );


// export async function initRoutes(coreSetup: CoreSetup, logger: Logger): Promise<void> {
//   const router: IRouter<DataRequestHandlerContext> = coreSetup.http.createRouter();
//   const [coreStart, { data: dataPlugin }]: [CoreStart, StartDeps] =
//     (await coreSetup.getStartServices()) as unknown as [CoreStart, StartDeps];
//
//   router.get(
//     {
//       path: `/${FONTS_API_PATH}/{fontstack}/{range}`,
//       validate: {
//         params: schema.object({
//           fontstack: schema.string(),
//           range: schema.string(),
//         }),
//       },
//     },
//     (context, request, response) => {
//       const range = path.normalize(request.params.range);
//       const rootPath = path.resolve(__dirname, 'fonts', 'open_sans');
//       const fontPath = path.resolve(rootPath, `${range}.pbf`);
//       return !fontPath.startsWith(rootPath)
//         ? response.notFound()
//         : new Promise((resolve) => {
//           fs.readFile(fontPath, (error, data) => {
//             if (error) {
//               resolve(response.notFound());
//             } else {
//               resolve(
//                 response.ok({
//                   body: data,
//                 })
//               );
//             }
//           });
//         });
//     }
//   );
//
//   router.get(
//     {
//       path: `/${INDEX_SETTINGS_API_PATH}`,
//       validate: {
//         query: schema.object({
//           indexPatternTitle: schema.string(),
//         }),
//       },
//     },
//     async (context, request, response) => {
//       const { query } = request;
//       if (!query.indexPatternTitle) {
//         logger.warn(`Required query parameter 'indexPatternTitle' not provided.`);
//         return response.custom({
//           body: `Required query parameter 'indexPatternTitle' not provided.`,
//           statusCode: 400,
//         });
//       }
//
//       try {
//         const coreContext = await context.core;
//         const resp = await coreContext.elasticsearch.client.asCurrentUser.indices.getSettings({
//           index: query.indexPatternTitle,
//         });
//         const indexPatternSettings = getIndexPatternSettings(
//           resp as unknown as Record<string, string | number | boolean>
//         );
//         return response.ok({
//           body: indexPatternSettings,
//         });
//       } catch (error) {
//         logger.warn(
//           `Cannot load index settings for data view '${query.indexPatternTitle}', error: ${error.message}.`
//         );
//         return response.custom({
//           body: 'Error loading index settings',
//           statusCode: 400,
//         });
//       }
//     }
//   );
//
//   initMVTRoutes({ router, logger, core: coreStart });
//   initIndexingRoutes({ router, logger, dataPlugin });
// }
