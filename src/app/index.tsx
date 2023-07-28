import React, { FC } from "react";

import { PageLayout } from "@components";
import { TableContainer } from "@containers";

export const App: FC = () => {
  return (
    <PageLayout>
      <TableContainer />
    </PageLayout>
  );
};
