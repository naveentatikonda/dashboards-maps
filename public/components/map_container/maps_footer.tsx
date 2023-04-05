/*
 * Copyright OpenSearch Contributors
 * SPDX-License-Identifier: Apache-2.0
 */

import { EuiEmptyPrompt, EuiPanel, EuiToast } from '@elastic/eui';
import React, { Fragment, memo, useEffect, useState } from 'react';
import { LngLat, MapEventType } from 'maplibre-gl';
import { Map as Maplibre } from 'maplibre-gl';
import { ConfigSchema } from '../../../common/config';
import './map_container.scss';
import { errorFlag } from '../../model/OSMLayerFunctions';
import { MapsMessages } from './maps_messages';
// import {useOpenSearchDashboards} from "../../../../../src/plugins/opensearch_dashboards_react/public";
// import {MapServices} from "../../types";
// const { services } = useOpenSearchDashboards<MapServices>();

const coordinatesRoundOffDigit = 4;
interface MapFooterProps {
  map: Maplibre;
  zoom: number;
  mapConfig: ConfigSchema;
  mapIdFromSavedObject: string;
}

export const MapsFooter = memo(({ map, zoom, mapConfig, mapIdFromSavedObject }: MapFooterProps) => {
  const msgDetails =
    'You can configure OpenSearch Dashboards to use \na different map server for dashboards maps by\n' +
    ' modifying the default config Schema properties.';
  const [coordinates, setCoordinates] = useState<LngLat>();
  const [msg, updateMsg] = useState<string | null>();
  // logger.info('Printing MapID');
  // logger.info(mapIdFromSavedObject);
  // console.log('Printing MapID');
  // console.log(mapIdFromSavedObject);
  // console.log(mapIdFromSavedObject.toString().length);
  // console.log(map.areTilesLoaded());
  // console.log(map.isStyleLoaded());
  useEffect(() => {
    const getMsg = async () => {
      const dataResponse = await fetch(mapConfig.opensearchVectorTileDataUrl);
      const styleResponse = await fetch(mapConfig.opensearchVectorTileStyleUrl);
      const conditionsArray = [
        dataResponse.status !== 200,
        styleResponse.status !== 200,
        !mapConfig.opensearchVectorTileDataUrl,
        !mapConfig.opensearchVectorTileStyleUrl,
        !mapConfig.opensearchVectorTileGlyphsUrl,
      ];
      // if (conditionsArray.includes(true)) {
      // if (mapIdFromSavedObject == undefined && conditionsArray[0]) {
      // if (errorFlag) {
      //   updateMsg('Unable to load OpenMapTiles');
      // }
    };
    getMsg();
  }, [mapConfig]);

  useEffect(() => {
    function onMouseMoveMap(e: MapEventType['mousemove']) {
      setCoordinates(e.lngLat.wrap());
    }

    if (map) {
      map.on('mousemove', onMouseMoveMap);
    }
    return () => {
      if (map) {
        map.off('mousemove', onMouseMoveMap);
      }
    };
  }, []);

  return (
    <div>
    <EuiPanel
      hasShadow={false}
      hasBorder={false}
      color="transparent"
      className="zoombar"
      data-test-subj="mapStatusBar"
    >
      <small>
        {coordinates &&
          `lat: ${coordinates.lat.toFixed(
            coordinatesRoundOffDigit
          )}, lon: ${coordinates.lng.toFixed(coordinatesRoundOffDigit)}, `}
        zoom: {zoom}
        {/* <div className="maps-error-msg">{msg}</div>*/}
      </small>

      {/*<div className="maps-error-msg">*/}
      {/*  {errorFlag && (*/}
      {/*    <EuiToast title="Unable to load OpenSearchMapTiles" color="warning" iconType="alert">*/}
      {/*      <p>{msgDetails}</p>*/}
      {/*    </EuiToast>*/}
      {/*  )}*/}
      {/*</div>*/}
      {/*<div className="maps-error-msg">*/}
      {/*  <EuiEmptyPrompt*/}
      {/*    iconType="gisApp"*/}
      {/*    iconColor={null}*/}
      {/*    title={<h2>The default Web Map Service is currently not available in your region.</h2>}*/}
      {/*    titleSize="xs"*/}
      {/*    body={*/}
      {/*      <Fragment>*/}
      {/*        <p>*/}
      {/*          You can configure OpenSearch Dashboards to use a different map server for coordinate*/}
      {/*          maps by modifying the default WMS properties.*/}
      {/*        </p>*/}
      {/*      </Fragment>*/}
      {/*    }*/}
      {/*  />*/}
      {/*</div>*/}
    </EuiPanel>

    {/*<div className="maps-error-msg">{<MapsMessages />}</div>*/}
    </div>
);
});
