import { XMLParser } from "fast-xml-parser";

const options = {
    ignoreDeclaration: true,
    ignoreAttributes : false,
    attributeNamePrefix : ""
};

const parser = new XMLParser(options);

export default parser