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
            slug: genre.slug,
            id: genre.id
        })
    });
    modes.forEach(mode => {
        renderedModes.push({
            type: "checkbox",
            label: mode.name,
            slug: mode.slug,
            id: mode.id
        })
    });

    perspectives.forEach(perspective => {
        renderedPerspectives.push({
            type: "checkbox",
            label: perspective.name,
            slug: perspective.slug,
            id: perspective.id
        })
    });

    return [
        {
            title: "Ratings",
            slug: "rating",
            children: [
                {
                    type: "component",
                    component: SliderFilter,
                    props: {
                        slug: "rating"
                    }
                },
            ],
        },
        {
            title: "Platform",
            slug: "platforms",
            collapse: false,
            children: [
                {
                    type: "checkbox",
                    label: "PC (Microsoft Windows)",
                    slug: "win",
                    id: 6,
                },
                {
                    type: "checkbox",
                    label: "Nintendo Switch",
                    slug: "switch",
                    id: 130
                },
                {
                    type: "checkbox",
                    label: "Playstation 5",
                    slug: "ps5",
                    id: 167
                },
                {
                    type: "checkbox",
                    label: "Playstation 4",
                    slug: "ps4",
                    id: 48
                },
                {
                    type: "checkbox",
                    label: "Xbox Series",
                    slug: "series-x",
                    id: 169
                },
                {
                    type: "checkbox",
                    label: "Xbox One",
                    slug: "xboxone",
                    id: 49
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
                        slug: "platforms", 
                        exclude: ["6", "130", "167", "48", "169", "49"],
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
            slug: "game_modes",
            collapse: false,
            children: renderedModes
        },
        {
            title: "Perspectives",
            slug: "player_perspectives",
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
            slug: "game_engines",
            collapse: false,
            children: [
                {
                    type: "component",
                    component: TextFieldFilter,
                    props: { label: "Game engine", placeholder: "Select game engines", slug: "game_engines", endpoint: "/game_engines"  }
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
        Object.entries(toAdd.front).forEach(
            ([key, value]) => {
                if (key === type) {
                    if (replace === true) {
                        toAdd.front[type] = data
                    } else {
                        let separator = ",";

                        if (!toAdd || toAdd.front[type] === "") {
                            separator = "";
                        }
                        // toAdd[type] = toAdd[type] + separator + data;
                        toAdd.front[type] = toAdd.front[type] + separator + data;
                        
                    }
                    isNew = false;
                }
            })

        if (isNew === true) {
            toAdd.front[type] = data;
            // add.front[type] = data;
        }
    } else {
        toAdd = {
            front: { [type]: data }
        }
        // toAdd = { [type]: data };
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
        // console.log("IS FILTER EXISTS", toCheck)
    return isExist;
}

export const replaceTerm = (toReplace, replaceValue) => {
    let hasTerm = false;

    console.log("REPLACE", toReplace, replaceValue)

    if (toReplace?.front) {
        Object.entries(toReplace.front).forEach(
            ([key, value]) => {
                if (key === "term") {
                    hasTerm = true;
                    toReplace.front["term"] = replaceValue;
                }
            })
            if (hasTerm === false) {
                toReplace.front["term"] = replaceValue;

                return toReplace;
                // toReplace =  {"term" : replaceValue};
            }
    }

    if (hasTerm === false) {
        toReplace = {
            front: {"term": replaceValue}
        };
    }

    console.log("TOO REPLACE", toReplace)

    return toReplace;
}

export const removeTerm = (toRemove, title, filters) => {


    if (toRemove && filters) {
        let splitFilters = filters.front[title].split(",");
    
        splitFilters = splitFilters.filter(item => {
            return item !== toRemove.slug
        })

        filters.front[title] = splitFilters.join(",")

        return filters;
    }

}