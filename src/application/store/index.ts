import { workingTimeReducer } from "./../../domain/working-time/store/Reducers"
import { Action, applyMiddleware, combineReducers, compose, createStore } from "redux"
import { combineEpics, createEpicMiddleware } from "redux-observable"
import { profileEpics } from "../../domain/application-profile/store/Epics"
import { profilesReducer } from "../../domain/application-profile/store/Reducers"
import storageService from "../api/StorageService"
import workingTimeApi from "../../domain/working-time/api/WorkingTimeApi"
import { workingTimeEpics } from "../../domain/working-time/store/Epics"

const rootReducer = combineReducers({
    profile: profilesReducer,
    workingHours: workingTimeReducer,
})

export type AppState = ReturnType<typeof rootReducer>

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootEpic = combineEpics(profileEpics, workingTimeEpics)

const epicDependencies = {
    storageService: storageService,
    workingTimeApi: workingTimeApi,
}

export type Deps = typeof epicDependencies

function configure() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const composeEnhancer: typeof compose = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
    const epicMiddleware = createEpicMiddleware<Action, Action, AppState, Deps>({ dependencies: epicDependencies })

    const store = createStore(rootReducer, composeEnhancer(applyMiddleware(epicMiddleware)))

    epicMiddleware.run(rootEpic)
    return store
}

const applicationStore = configure()

export default applicationStore
