import { EuiEmptyPrompt } from '@elastic/eui';
import React, { Fragment } from 'react';
import { errorFlag } from '../../model/OSMLayerFunctions';

export const MapsMessages = () => {
  return (
    <div>
      {errorFlag && (
        <EuiEmptyPrompt
          iconType="gisApp"
          iconColor={null}
          title={<h2>The default Dashboards Maps Service is currently not available in your region.</h2>}
          titleSize="xs"
          body={
            <Fragment>
              <p>
                You can configure OpenSearch Dashboards to use a different map server for dashboards
                maps by modifying the default config properties.
              </p>
            </Fragment>
          }
        />
      )}
    </div>
  );
};
