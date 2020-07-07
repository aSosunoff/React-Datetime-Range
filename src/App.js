import React from "react";
import { compose } from "./utils/compose";
import { Page1 } from "./pages/Page1";

const root = <Page1 />;

export const App = () => compose((e) => <>{e}</>)(root);
