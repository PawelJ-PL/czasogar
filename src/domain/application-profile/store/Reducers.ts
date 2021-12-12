import { combineReducers } from "redux"
import { createReducer } from "../../../application/store/async/AsyncActionReducer"
import {
    addOrUpdateProfileAction,
    getDefaultProfileAction,
    getProfilesAction,
    setDefaultProfileAction,
} from "./Actions"

const getProfilesReducer = createReducer(getProfilesAction)
    .case(addOrUpdateProfileAction.done, (state, action) => {
        if (state.status === "FINISHED") {
            const updated = { ...state.data, [action.params.profileName]: action.params }
            return { ...state, data: updated }
        } else {
            return state
        }
    })
    .build()

const updateProfilesReducer = createReducer(addOrUpdateProfileAction).build()

const getDefaultProfileReducer = createReducer(getDefaultProfileAction)
    .case(addOrUpdateProfileAction.done, (state, action) =>
        action.params ? { status: "FINISHED", data: action.params.profileName, params: undefined } : state
    )
    .build()

const setDefaultProfileReducer = createReducer(setDefaultProfileAction).build()

export const profilesReducer = combineReducers({
    availableProfiles: getProfilesReducer,
    updateProfileResult: updateProfilesReducer,
    defaultProfile: getDefaultProfileReducer,
    setDefaultProfileResult: setDefaultProfileReducer,
})
