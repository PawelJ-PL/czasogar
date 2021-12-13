import { combineReducers } from "redux"
import { createReducer } from "../../../application/store/async/AsyncActionReducer"
import {
    addOrUpdateProfileAction,
    deleteProfileAction,
    getDefaultProfileAction,
    getProfilesAction,
    setDefaultProfileAction,
} from "./Actions"
import omit from "ramda/src/omit"

const getProfilesReducer = createReducer(getProfilesAction)
    .case(addOrUpdateProfileAction.done, (state, action) => {
        if (state.status === "FINISHED") {
            const updated = { ...state.data, [action.params.profileName]: action.params }
            return { ...state, data: updated }
        } else {
            return state
        }
    })
    .case(deleteProfileAction.done, (state, action) => {
        if (state.status === "FINISHED") {
            const updated = omit([action.params], state.data)
            return { status: "FINISHED", data: updated, params: undefined }
        }
        return state
    })
    .build()

const updateProfilesReducer = createReducer(addOrUpdateProfileAction).build()

const getDefaultProfileReducer = createReducer(getDefaultProfileAction)
    .case(addOrUpdateProfileAction.done, (state, action) =>
        action.params ? { status: "FINISHED", data: action.params.profileName, params: undefined } : state
    )
    .case(deleteProfileAction.done, (state, action) => {
        if (state.status === "FINISHED" && state.data === action.params) {
            return { status: "FINISHED", data: null, params: undefined }
        } else {
            return state
        }
    })
    .case(setDefaultProfileAction.done, (state, action) => {
        if (state.status === "FINISHED") {
            return { status: "FINISHED", params: undefined, data: action.params }
        } else {
            return state
        }
    })
    .build()

const setDefaultProfileReducer = createReducer(setDefaultProfileAction).build()

const deleteProfileReducer = createReducer(deleteProfileAction).build()

export const profilesReducer = combineReducers({
    availableProfiles: getProfilesReducer,
    updateProfileResult: updateProfilesReducer,
    defaultProfile: getDefaultProfileReducer,
    setDefaultProfileResult: setDefaultProfileReducer,
    deleteResult: deleteProfileReducer,
})
