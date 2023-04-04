/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { i18n } from '@osd/i18n';

const layerList = [
  {
    name: 'Default map',
    description: '',
    type: 'opensearch_vector_tile_map',
    id: '7f045530-a7ed-4d7e-8336-f82002e00856',
    zoomRange: [0, 22],
    opacity: 100,
    visibility: 'visible',
    source: {
      dataURL: 'https://tiles.maps.opensearch.org/data/v1.json',
    },
    style: {
      styleURL: 'https://tiles.maps.opensearch.org/styles/basic.json',
    },
  },
  {
    name: 'Error Tags',
    description: '',
    type: 'documents',
    id: '94b70c26-c85c-4961-8bed-e2af2e90d882',
    zoomRange: [2, 4],
    opacity: 70,
    visibility: 'visible',
    source: {
      indexPatternRefName: 'opensearch_dashboards_sample_data_logs',
      geoFieldType: 'geo_point',
      geoFieldName: 'geo.coordinates',
      documentRequestNumber: 1000,
      tooltipFields: [],
      showTooltips: false,
      indexPatternId: '90943e30-9a47-11e8-b64d-95841ca0b247',
      filters: [
        {
          meta: {
            index: '90943e30-9a47-11e8-b64d-95841ca0b247',
            alias: null,
            negate: false,
            disabled: false,
          },
          query: {
            match_phrase: {
              'tags.keyword': 'error',
            },
          },
          $state: {
            store: 'appState',
          },
        },
      ],
    },
    style: {
      fillColor: '#bb72c2',
      borderColor: '#bb72c2',
      borderThickness: 1,
      markerSize: 5,
    },
  },
  {
    name: 'Success Tags',
    description: '',
    type: 'documents',
    id: 'f2039854-9333-47b2-ae71-f4762de8b763',
    zoomRange: [4, 22],
    opacity: 70,
    visibility: 'visible',
    source: {
      indexPatternRefName: 'opensearch_dashboards_sample_data_logs',
      geoFieldType: 'geo_point',
      geoFieldName: 'geo.coordinates',
      documentRequestNumber: 1000,
      tooltipFields: [],
      showTooltips: false,
      indexPatternId: '90943e30-9a47-11e8-b64d-95841ca0b247',
      filters: [
        {
          meta: {
            index: '90943e30-9a47-11e8-b64d-95841ca0b247',
            alias: null,
            negate: false,
            disabled: false,
          },
          query: {
            match_phrase: {
              'tags.keyword': 'success',
            },
          },
          $state: {
            store: 'appState',
          },
        },
      ],
    },
    style: {
      fillColor: '#90c77a',
      borderColor: '#90c77a',
      borderThickness: 1,
      markerSize: 5,
    },
  },
];

export const getLogsSavedObjects = () => {
  return [
    {
      id: 'fa00f130-a517-11ed-aed4-197664025453',
      type: 'map',
      updated_at: '2023-02-05T05:43:11.548Z',
      version: 'WzE1OSwxXQ==',
      migrationVersion: {},
      attributes: {
        title: i18n.translate('home.sampleData.logsSpec.mapsErrorSuccessTags', {
          defaultMessage: '[Logs] Map for Error Success Tags',
        }),
        description: 'Sample map to show cancelled flights location at destination',
        layerList: JSON.stringify(layerList),
        mapState:
          '{"timeRange":{"from":"now-2d","to":"now"},"query":{"query":"","language":"kuery"},"refreshInterval":{"pause":true,"value":12000}}',
      },
      references: [],
    },
  ];
};
