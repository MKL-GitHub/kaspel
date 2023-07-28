import React, { FC } from "react";

import { PageLayout } from "@components";
import { TableContainer } from "@containers";

export const App: FC = () => {
  return (
    <PageLayout>
      <h1 style={{ textAlign: "center", marginBottom: "4rem" }}>
        Компания "OOO Каспел" <br /> тестовое задание
      </h1>
      <TableContainer />
    </PageLayout>
  );
};
