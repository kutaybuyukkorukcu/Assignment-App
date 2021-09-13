import React, { useState } from "react";
// import { SearchBar } from "components";
import { SearchBar } from ".";

import { render } from "@testing-library/react";
import { SearchType } from "types";

const [pageNumber, setPageNumber] = useState<number>(1);

it("matches snapshot", () => {

    const { asFragment } = render(<SearchBar setPageNumber={setPageNumber} /> );

    expect(asFragment()).toMatchSnapshot();
})
