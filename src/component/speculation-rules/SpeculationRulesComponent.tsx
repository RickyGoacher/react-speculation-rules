import { useState, useEffect } from "react";

interface SpeculationRulesInterface {
    preRenderEagerness: string;
    preFetchEagerness: string;
    hrefMatches?: Array<string>;
    excludeHrefs?: Array<string>;
    excludeSelectors?: Array<string>;
    prefetchUrls?: Array<string>;
    referrerPolicy?: string;
    requires?: string;
}

const SpeculationRules = (props:SpeculationRulesInterface) => {

    const [isClient, setIsClient] = useState(false);
 
    useEffect(() => {
        setIsClient(true);
    }, []);

    const MatchingHrefs = props.hrefMatches && props.hrefMatches.map(item => {
        if(item !== "") return JSON.stringify({"href_matches": item});
    }) || [];

    const ExcludeHrefs = props.excludeHrefs && props.excludeHrefs.map(item => {
        if(item !== "") return JSON.stringify({ "not": { "href_matches": item } });
    }) || [];

    const ExcludeSelectors = props.excludeSelectors && props.excludeSelectors.map(item => {
        if(item !== "") return JSON.stringify({ "not": {"selector_matches": item } });
    }) || [];

    const PrefetchUrls = props.prefetchUrls && props.prefetchUrls.map(item => {
        if(item !== "") return `"${item}"`;
    });

    const WhereAnd = [...MatchingHrefs, ...ExcludeHrefs, ...ExcludeSelectors];

    const Rules =  `{
        "prerender": [
            {
                "where": {
                    "and": [${WhereAnd}]
                },
                "eagerness": "${props.preRenderEagerness}"
          }
        ],
        "prefetch": [
            {
                "where": {
                    "urls": [${PrefetchUrls}],
                    "requires": [${props.requires || '"anonymous-client-ip-when-cross-origin"'}],
                    "referrer_policy": "${props.referrerPolicy || 'no-referrer'}"
                },
                "eagerness": "${props.preFetchEagerness}"
          }
        ]
    }`

    if (HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) {
        console.info("Your browser supports the Speculation Rules API.");
    }

    return (
        (isClient && HTMLScriptElement.supports && HTMLScriptElement.supports("speculationrules")) && <script type="speculationrules">{`${Rules}`}</script>   
    );
}

export default SpeculationRules;