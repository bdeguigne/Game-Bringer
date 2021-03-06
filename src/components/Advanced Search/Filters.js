import TextFieldFilter from "./TextFieldFilter";
import SliderFilter from "./SliderFilter";
import moment from 'moment'

const getYears = () => {
    const years = []
    const dateStart = moment().add(2, 'y');
    const dateEnd = moment({ year: 1973 });

    while (dateEnd.diff(dateStart, 'years') <= 0) {
        years.push(dateStart.format('YYYY'))
        years.push({
            type: "checkbox",
            label: dateStart.format('YYYY'),
            slug: dateStart.format('YYYY'),
            id: parseInt(dateStart.format('YYYY'))
        })
        dateStart.add(-1, 'year')
    }
    return years
}

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
                        excludeLabel: ["PC (Microsoft Windows)", "Nintendo Switch", "Playstation 5", "Playstation 4", "Xbox Series", "Xbox One"],
                        endpoint: "/platforms",
                        onTypeSuggestion: false
                    }
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
            title: "Years",
            slug: "year",
            collapse: false,
            maxChildren: 12,
            children: getYears()
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
                    props: { label: "Companies", placeholder: "Select companies", slug: "companies", endpoint: "/companies", onTypeSuggestion: true }
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
                    props: { label: "Game engine", placeholder: "Select game engines", slug: "game_engines", endpoint: "/game_engines", onTypeSuggestion: true }
                }
            ]
        },
    ]
}

function checkEmptyObject(obj) {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object ? true : false
}

// Utils function

export function getFiltersWithQuery(query) {
    let result = {};

    for (const [key, value] of query) {
        result[key] = value;
    }


    return checkEmptyObject(result) ? null : result;
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

export const addAndGroupElem = (toAdd, type, data, label, replace) => {
    let isNew = true;
    if (toAdd && toAdd.front) {
        Object.entries(toAdd.front).forEach(
            ([key, value]) => {
                if (key === type) {



                    if (replace === true) {
                        toAdd.front[type] = data
                        toAdd.chip[type] = label || data
                    } else {
                        let separator = ",";

                        if (!toAdd || toAdd.front[type] === "") {
                            separator = "";
                        }
                        toAdd.front[type] = toAdd.front[type] + separator + data;
                        toAdd.chip[type] = toAdd.chip[type] + separator + label;

                    }
                    isNew = false;
                }
            })

        if (isNew === true) {
            toAdd.front[type] = data;
            toAdd.chip[type] = label || data;
        }
    } else {
        toAdd = {
            front: { [type]: data },
            chip: { [type]: label || data }
        }
    }

    if (toAdd.front[type] === "")
        delete toAdd.front[type];
    if (toAdd.chip[type] === "")
        delete toAdd.chip[type];
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

    if (toReplace?.front) {
        Object.entries(toReplace.front).forEach(
            ([key, value]) => {
                if (key === "term") {
                    hasTerm = true;
                    toReplace.front["term"] = replaceValue;
                    toReplace.chip["term"] = replaceValue;
                }
            })
        if (hasTerm === false) {
            toReplace.front["term"] = replaceValue;
            toReplace.chip["term"] = replaceValue;

            return toReplace;
        }
    }

    if (hasTerm === false) {
        toReplace = {
            front: { "term": replaceValue },
            chip: { "term": replaceValue }
        };
    }


    return toReplace;
}

export const replace = (toReplace, replaceKey, replaceValue) => {
    let hasTerm = false;

    if (toReplace) {
        Object.entries(toReplace).forEach(
            ([key, value]) => {
                if (key === "term") {
                    hasTerm = true;
                    toReplace[replaceKey] = replaceValue;
                }
            })
        if (hasTerm === false) {
            toReplace[replaceKey] = replaceValue;

            return toReplace;
        }
    }

    if (hasTerm === false) {
        toReplace = { replaceKey: replaceValue }
    }

    return toReplace;
}

export const removeTerm = (toRemoveId, toRemoveLabel, title, filters, isDelete) => {
    if (toRemoveId && filters) {
        let splitFiltersFront = filters.front[title].split(",");
        let splitFiltersChip = filters.chip[title].split(",");

        splitFiltersFront = splitFiltersFront.filter(item => {
            return item !== toRemoveId
        })

        splitFiltersChip = splitFiltersChip.filter(item => {
            return item !== toRemoveLabel
        })

        filters.front[title] = splitFiltersFront.join(",")

        filters.chip[title] = splitFiltersChip.join(",")


    }

    if (filters) {
        if (filters?.front[title] === "" || isDelete === true)
            delete filters.front[title];
        if (filters.chip[title] === "" || isDelete === true)
            delete filters.chip[title];

    }

    return filters;

}