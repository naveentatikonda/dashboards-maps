import { Map as Maplibre, LayerSpecification, SymbolLayerSpecification } from 'maplibre-gl';
import { OSMLayerSpecification } from './mapLayerType';
import {
  addOSMLayerSource,
  addOSMStyleLayer,
  getLayers,
  hasLayer,
  getOSMStyleLayerWithMapLayerId,
  updateOSMStyleLayer,
} from './map/layer_operations';
import { getMapLanguage } from '../../common/util';
import {useOpenSearchDashboards} from "../../../../src/plugins/opensearch_dashboards_react/public";
import {MapServices} from "../types";

interface MaplibreRef {
  current: Maplibre | null;
}

// export interface ConflictErrorMsg {
//   errorMsg: string | null;
// }
export let errorFlag = true;

export const conflictError = (errorMsg: string | null) => {
  return errorMsg;
};

// Fetch style layers from OpenSearch vector tile service
const fetchStyleLayers = (url: string) => {
  return fetch(url)
    .then((res) => res.json())
    .then((json) => json.layers)
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log('error', error);
      // toastNotifications.addWarning('An error has occurred when query dataSource');
      // errorFlag = true;
      // conflictError('OpenSearch Vector Tiles not avavilable in this region');
      // const propsError: ConflictErrorMsg = {
      //   errorMsg: 'OpenSearch Vector Tiles not avavilable in this region',
      // };
      // const conflictError = 'OpenSearch Vector Tiles not avavilable in this region';
    });
};

const handleStyleLayers = (layerConfig: OSMLayerSpecification, maplibreRef: MaplibreRef) => {
  getLayers(maplibreRef.current!, layerConfig.id).forEach((mbLayer) => {
    updateOSMStyleLayer(maplibreRef.current!, layerConfig, mbLayer);
  });
};

const updateLayerConfig = (layerConfig: OSMLayerSpecification, maplibreRef: MaplibreRef) => {
  handleStyleLayers(layerConfig, maplibreRef);
};

const setLanguage = (maplibreRef: MaplibreRef, styleLayer: LayerSpecification) => {
  // if a layer contains label, we will set its language.
  if (styleLayer.layout && (styleLayer as SymbolLayerSpecification).layout?.['text-field']) {
    const language = getMapLanguage();
    maplibreRef.current?.setLayoutProperty(styleLayer.id, 'text-field', [
      'get',
      'name:' + language,
    ]);
  }
};

const addNewLayer = (layerConfig: OSMLayerSpecification, maplibreRef: MaplibreRef) => {
  if (maplibreRef.current) {
    const maplibre = maplibreRef.current;
    const { id, source, style } = layerConfig;
    addOSMLayerSource(maplibre, id, source.dataURL);
    fetchStyleLayers(style?.styleURL).then((styleLayers: LayerSpecification[]) => {
      styleLayers.forEach((layer) => {
        const styleLayer = getOSMStyleLayerWithMapLayerId(id, layer);
        addOSMStyleLayer(maplibre, layerConfig, styleLayer);
        setLanguage(maplibreRef, styleLayer);
      });
    });
  }
};

// Functions for OpenSearch maps vector tile layer
export const OSMLayerFunctions = {
  render: (maplibreRef: MaplibreRef, layerConfig: OSMLayerSpecification) => {
    // If layer already exist in maplibre source, update layer config
    // else add new layer.
    return hasLayer(maplibreRef.current!, layerConfig.id)
      ? updateLayerConfig(layerConfig, maplibreRef)
      : addNewLayer(layerConfig, maplibreRef);
  },
};
