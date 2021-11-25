import { AppState, Deps } from "./../../../application/store/index"
import { Action } from "redux"
import { combineEpics } from "redux-observable"
import { ProfileSchema } from "./../types/Profile"
import { createEpic } from "./../../../application/store/async/AsyncActionEpic"
import {
    addOrUpdateProfileAction,
    getDefaultProfileAction,
    getProfilesAction,
    setDefaultProfileAction,
} from "./Actions"
import { z } from "zod"
import storageService from "../../../application/api/StorageService"

const PROFILES_STORAGE_KEY = "USER_PROFILES"

const getProfiles = (api: typeof storageService) =>
    api.getObject(PROFILES_STORAGE_KEY, z.record(ProfileSchema)).then((result) => result ?? {})

const getProfilesEpic = createEpic(getProfilesAction, (_, deps) => getProfiles(deps.storageService))

const updateProfileEpic = createEpic(addOrUpdateProfileAction, async (params, deps) => {
    const currentProfiles = await getProfiles(deps.storageService)
    const updated = { ...currentProfiles, [params.profileName]: params }
    return deps.storageService.saveObject(PROFILES_STORAGE_KEY, updated)
})

const getDefaultProfileEpic = createEpic(getDefaultProfileAction, (_, deps) =>
    deps.storageService.getObject(PROFILES_STORAGE_KEY, z.string())
)

const setDefaultProfileEpic = createEpic(setDefaultProfileAction, (params, deps) =>
    deps.storageService.saveObject(PROFILES_STORAGE_KEY, params)
)

export const profileEpics = combineEpics<Action, Action, AppState, Deps>(
    getProfilesEpic,
    updateProfileEpic,
    getDefaultProfileEpic,
    setDefaultProfileEpic
)
