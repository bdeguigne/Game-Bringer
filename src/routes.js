import HomePage from "./components/HomePage";
import GameDetails from "./components/Game details/GameDetails";
import AdvancedSearch from "./components/Advanced Search/AdvancedSearch";

export const routes = [
    {
        path: "/search/",
        component: AdvancedSearch
    },
    {
        path: "/:id/:name/",
        component: GameDetails
    },
    {
        path: "/",
        component: HomePage
    }
]