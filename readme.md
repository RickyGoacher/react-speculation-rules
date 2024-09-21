# React Speculation Rules

React component for setting pre-render and pre-fetch speculation rules using the speculation rule API.

## How it works

- Specify the rules for pre-fetching and pre-rendering resources and pages using the speculation rules API.

## How to use

### Install

Installation: `npm install react-speculation-rules`

### Usage

Import the package into your app:

`import {SpeculationRules} from "react-speculation-rules";`

#### Speculation Rules Example:
```   
    <SpeculationRules preRenderEagerness="moderate" preFetchEagerness="moderate" hrefMatches={["/*", "/example-page-one"]} excludeHrefs={["/logout", "/*\\?*(^|&)add-to-cart=*", ".no-prerender"]} excludeSelectors={["[rel~=nofollow]"]} prefetchUrls={["/", "/example-page-two"]}></SpeculationRules>
```
### Component Configuration:

    -  `preRenderEagerness`
        [Required] Takes a sting of "immediate", "eager", "moderate" or "conservative".

    -  `preFetchEagerness`
        [Required] Takes a sting of "immediate", "eager", "moderate" or "conservative".

    -  `hrefMatches`
        [Optional] Takes an array of url strings.

    -  `excludeHrefs`
        [Optional] Takes an array of url strings.

    -  `excludeSelectors`
        [Optional] Takes an array of HTML selector strings.

    -  `prefetchUrls`
        [Optional] Takes an array of url strings.

    -  `referrerPolicy`
        [Optional] Takes a string.

    -  `requires`
        [Opitonal] currently only accepts "anonymous-client-ip-when-cross-origin" which is its default value.