import { SearchbarFilter } from "./SearchbarFilter";
import SliderFilter from "./SliderFilter";

export function filters(genres, modes, perspectives) {
    const renderedGenres = [];
    const renderedModes = [];
    const renderedPerspectives = [];

    if (genres.length === 0) {
        return [];
    }

    genres.forEach(genre => {
        renderedGenres.push({
            type: "checkbox",
            label: genre.name,
            slug: genre.slug
        })
    });
    modes.forEach(mode => {
        renderedModes.push({
            type: "checkbox",
            label: mode.name,
            slug: mode.slug
        })
    });

    perspectives.forEach(perspective => {
        renderedPerspectives.push({
            type: "checkbox",
            label: perspective.name,
            slug: perspective.slug
        })
    });

    return [
        {
            title: "Ratings",
            children: [
                {
                    type: "component",
                    component: SliderFilter
                },
            ],
        },
        {
            title: "Platform",
            children: [
                {
                    type: "checkbox",
                    label: "PC (Microsoft Windows)",
                    slug: "win"
                },
                {
                    type: "checkbox",
                    label: "Nintendo Switch",
                    slug: "switch"
                },
                {
                    type: "checkbox",
                    label: "Playstation 5",
                    slug: "ps5"
                },
                {
                    type: "checkbox",
                    label: "Playstation 4",
                    slug: "ps4"
                },
                {
                    type: "checkbox",
                    label: "Xbox Series",
                    slug: "series-x"
                },
                {
                    type: "checkbox",
                    label: "Xbox One",
                    slug: "xboxone"
                },
                {
                    type: "divider"
                },
                {
                    type: "component",
                    component: SearchbarFilter,
                    props: { label: "Other platforms", placeholder: "Select platforms" }
                }
            ]
        },
        {
            title: "Genres",
            maxChildren: 5,
            children: renderedGenres
        },
        {
            title: "Years",
            collapse: false,
            children: []
        },
        {
            title: "Modes",
            collapse: false,
            children: renderedModes
        },
        {
            title: "Perspectives",
            collapse: false,
            children: renderedPerspectives
        },
        {
            title: "Companies",
            collapse: false,
            children: [
                {
                    type: "component",
                    component: SearchbarFilter,
                    props: { label: "Companies", placeholder: "Select companies" }
                }
            ]
        },
        {
            title: "Game engine",
            collapse: false,
            children: [
                {
                    type: "component",
                    component: SearchbarFilter,
                    props: { label: "Game engine", placeholder: "Select game engines" }
                }
            ]
        },
    ]
}

export function getFiltersWithQuery(query) {
    let result = {};

    for (const [key, value] of query) {
        result[key] = value;
    }
    return result;
}

export const findValueFromQuery = (queryArray, findValue) => {
    let term = "";

    if (queryArray) {
        Object.entries(queryArray).forEach(
            ([key, value]) => {
                if (key === findValue) {
                    term = value;
                }
            })
    }
    return term;
}

export const addAndGroupElem = (toAdd, type, data) => {
    let isNew = true;
    // console.log("TOO ADD", toAdd);

    if (toAdd !== null) {
        Object.entries(toAdd).forEach(
            ([key, value]) => {
                if (key === type) {
                    // console.log("EXIST", key, type);
                    toAdd[type] = toAdd[type] + "," + data;
                    isNew = false;
                }
            })

        if (isNew === true) {
            toAdd[type] = data;
        }
    } else {
        // console.log("LENGTH 0");
        toAdd = { [type]: data };
    }
    return toAdd;
}

export const generateParams = (filtersArray) => {
    let params = new URLSearchParams(filtersArray).toString();

    return params;
}

export const isFiltersExist = (toCheck, type, data) => {
    let isExist = false;
    
    if (toCheck) {
        Object.entries(toCheck).forEach(
            ([key, value]) => {
                if (key === type) {
                    // console.log(`${key} === ${type}`)
                    let filters = value.split(",");
                    filters.forEach(filter => {
                        if (filter === data) {
                            // console.log(`FIND : ${filter} === ${data}`)
                            isExist = true;
                        }
                    })
                }
            })
    }
    return isExist;
}

export const replaceTerm = (toReplace, replaceValue) => {
    let hasTerm = false;
    console.log("VALUE ===", replaceValue);

    if (toReplace) {
        Object.entries(toReplace).forEach(
            ([key, value]) => {
                if (key === "term") {
                    console.log(`${key} === term`, replaceValue)
                    hasTerm = true;
                    toReplace["term"] = replaceValue;
                }
            })
            if (hasTerm === false) {
                console.log(`${hasTerm} === false`)
                toReplace["term"] = replaceValue;

                return toReplace;
                // toReplace =  {"term" : replaceValue};
            }
    }

    if (hasTerm === false) {
        console.log(`${hasTerm} === false`)
        toReplace = {"term": replaceValue};
        // toReplace =  {"term" : replaceValue};
    }

    

    console.log("REPLACE", toReplace);
    return toReplace;
}