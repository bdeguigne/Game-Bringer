import TextFieldFilter from "./TextFieldFilter";
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
                    component: TextFieldFilter,
                    props: { 
                        label: "Other platforms", 
                        placeholder: "Select platforms", 
                        slug: "platform", 
                        exclude: ["win", "switch", "ps5", "ps4", "series-x", "xboxone"],
                        endpoint: "/platforms"  }
                }
            ]
        },
        {
            title: "Genres",
            maxChildren: 5,
            children: renderedGenres
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
                    component: TextFieldFilter,
                    props: { label: "Companies", placeholder: "Select companies", slug: "companies", endpoint: "/companies" }
                }
            ]
        },
        {
            title: "Game engine",
            slug: "game-engine",
            collapse: false,
            children: [
                {
                    type: "component",
                    component: TextFieldFilter,
                    props: { label: "Game engine", placeholder: "Select game engines", slug: "game-engine", endpoint: "/game_engines"  }
                }
            ]
        },
    ]
}

// Utils function

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

export const addAndGroupElem = (toAdd, type, data, replace) => {
    let isNew = true;

    if (toAdd !== null) {
        Object.entries(toAdd).forEach(
            ([key, value]) => {
                if (key === type) {
                    if (replace === true) {
                        toAdd[type] = data;
                    } else {
                        let separator = ",";

                        if (!toAdd || toAdd[type] === "") {
                            separator = "";
                        }
                        toAdd[type] = toAdd[type] + separator + data;
                    }
                    isNew = false;
                }
            })

        if (isNew === true) {
            toAdd[type] = data;
        }
    } else {
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
                    let filters = value.split(",");
                    filters.forEach(filter => {
                        if (filter === data) {
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

    if (toReplace) {
        Object.entries(toReplace).forEach(
            ([key, value]) => {
                if (key === "term") {
                    hasTerm = true;
                    toReplace["term"] = replaceValue;
                }
            })
            if (hasTerm === false) {
                toReplace["term"] = replaceValue;

                return toReplace;
                // toReplace =  {"term" : replaceValue};
            }
    }

    if (hasTerm === false) {
        toReplace = {"term": replaceValue};
    }

    return toReplace;
}

export const removeTerm = (toRemove, title, filters) => {

    if (toRemove) {
        let splitFilters = filters[title].split(",");
    
        splitFilters = splitFilters.filter(item => {
            return item !== toRemove.slug
        })

        filters[title] = splitFilters.join(",")

        return filters;
    }
}