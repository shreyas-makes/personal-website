import { visit, CONTINUE } from "unist-util-visit";

const visitor = (node) => {
  const dataLanguageMermaid = "mermaid";
  const typeElement = "element";
  const tagNamePre = "pre";
  const classMermaid = dataLanguageMermaid;

  const isPreElement = (node) => 
    typeof node.type !== undefined && 
    node.type === typeElement &&
    node.tagName !== undefined && 
    node.tagName === tagNamePre &&
    node.properties !== undefined && 
    node.properties.dataLanguage === dataLanguageMermaid;

  if (!isPreElement(node)) {
    return CONTINUE;
  }

  const element = node;
  const properties = element.properties;
  const className = properties.className || [];
  properties.className = [...className, classMermaid];

  return CONTINUE;
};

const addMermaidClass = () => (ast) => visit(ast, visitor);

export default addMermaidClass; 